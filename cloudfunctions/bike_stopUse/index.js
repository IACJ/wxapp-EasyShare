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
    result = await db.collection(event.sort).where({
      numberId: _.eq(event.id)
    }).get()
    console.log(result)

    if (result.data.length === 0) {
      return "Empty."
    }
    let thing = result.data[0]
    console.log(thing)

    // TODO:结束订单
    let orderId = thing.orderList[0]
    result = await finishOrder(orderId)
    console.log(result)

    result = await db.collection(event.sort).doc(thing._id).update({
      data: {
        status: {
          isUsing: false
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

// 结束订单
async function finishOrder(id) {
  console.log('[finishOrder] ' + id )
  let res = await db.collection('order').doc(id).update({
    data: { 
      'finishTime': new Date(),
      'status': {
        'step': '完成'
      }
    }
  })
  return res
}