// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-share-92a8ff'
})
const testDB = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('-----fn begin-----')
  let result = null
  try {
    result = await testDB.collection('todos').doc(event.id).update({
      data: {
        description:event.desc,
      },
    })
    return result
  } catch (e) {
    console.error(e)
    return "Error."
  }
}