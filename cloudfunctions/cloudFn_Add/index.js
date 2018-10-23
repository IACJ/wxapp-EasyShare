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
    result = await testDB.collection('todos').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        test:{
          first:"fff",
          second:"ssss"
        }
      }
    })
    return result
  } catch (e) {
    console.error(e)
    return "Error."
  }
}