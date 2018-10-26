// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-share-92a8ff'
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('-----fn begin-----')
  let result = null

  try {
    let thingObjList = await db.collection(event.sort).where({
      numberId: _.eq(event.id)
    }).get()
    console.log('[根据编号查询]: ' + JSON.stringify(thingObjList))

    if (thingObjList.data.length===0) {
      return "Empty."
    }
    let thing = thingObjList.data[0]
    
    // [是否被人使用]
    if (thing.status.isUsing) {
      return "isUsing."
    }
  
    // [创建订单]
    result = await addOrder(event.userInfo.openId, event.shareType, event.sort, thing._id, thing.numberId)
    console.log('[创建订单]: ' + JSON.stringify(result))

    let orderList = thing.orderList
    orderList.unshift(result._id)
    
    console.log(orderList)
    result = await db.collection(event.sort).doc(thing._id).update({
      data: {
        'status': {
          isUsing: true
        },
        'orderList': orderList
      },
    })
    console.log('[update]' + JSON.stringify(result))

    return "OK."
  } catch (e) {
    console.error(e)
    return "Error."
  }
}

// 添加订单
async function addOrder(user_openid, share_type,thing_type, thing_id, thing_numberId){
  console.log('[addOrder] ' + user_openid + ' ' + thing_id)
  let res = await db.collection('order').add({
    data:{
      'user_openid': user_openid,
      'share_type': share_type,
      'thing_type': thing_type,
      'thing_id': thing_id,
      'thing_numberId': thing_numberId,
      'createTime': new Date(),
      'finishTime': null,
      'status':{
        'step' : '进行中'
      }
    }
  })
  return res
}