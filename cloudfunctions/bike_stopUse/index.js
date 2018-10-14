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

    if (result.data.length === 0) {
      return "Empty."
    }
    let thing = result.data[0]
    console.log(thing)

    // TODO:结束订单

    result = await db.collection('bike').doc(thing._id).update({
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