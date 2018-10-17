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
    result = await db.collection('bike').where({
      numberId: _.eq(event.id)
    }).get()
    console.log(result)

    if (result.data.length===0) {
      return "Empty."
    }
    let thing = result.data[0]
    console.log(thing)
    if (thing.status.isUsing) {
      return "isUsing."
    }
  
    // TODO:创建订单
    result = await addOrder(event.userInfo.openId, thing._id)
    console.log('result:')
    console.log(result)
    
    result = await db.collection('bike').doc(thing._id).update({
      data: {
        status: {
          isUsing: true
        }
      }
    })
    console.log(result)

    return "OK."
  } catch (e) {
    console.error(e)
    return "Error."
  }
}


async function addOrder(user_openid, thing_id){
  console.log('[addOrder] ' + user_openid + ' ' + thing_id)
  let res = await db.collection('order').add({
    data:{
      'user_openid': user_openid,
      'thing_type': 'bike',
      'thing_id': thing_id,
      'createTime': new Date(),
      'status':{
        'isRunning' : true
      }
    }
  })
  console.log('__________[res]:__________')
  console.log(res)
  return res
}