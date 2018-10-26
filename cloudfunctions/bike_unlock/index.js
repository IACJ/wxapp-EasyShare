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
  console.log(event)
  let result = null
  try {
    result = await db.collection(event.sort).where({
      numberId: _.eq(event.id)
    }).get()
    console.log(result)

    let one = result.data[0]
    console.log(one)
    result = await db.collection(event.sort).doc(one._id).update({
      data: {
        status: {
          isLocking: 'false'
        }
      },
    })
    console.log(result)
    return "OK."
  } catch (e) {
    console.error(e)
    return "Error."
  }
}