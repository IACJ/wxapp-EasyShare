// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-share-92a8ff'
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('-----fn begin-----')
  try {
    let result = await db.collection(event.sort).where({
      
    }).get()
   
    return result
  } catch (e) {
    console.error(e)
    return "Error."
  }
}