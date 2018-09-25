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
        description: "learn cloud database",
        due: new Date("2018-09-01"),
        tags: [
          "cloud",
          "database"
        ],
        // 位置（113°E，23°N）
        location: new testDB.Geo.Point(113, 23),
        done: false
      }
    })
    return result
  } catch (e) {
    console.error(e)
    return "Error."
  }
}