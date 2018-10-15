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
      _id: _.neq('000000')
    }).remove()
    console.log(result)

    for (let i=0;i<100;i++){
      let data = {
        description: "a sharing bick",
        addTime: new Date(),
        orderList: [],
        reportLisy: [],
        // 位置（113°E，23°N）
        position: new db.Geo.Point(113, 23),
        numberId : 100000+i,
        status: {
          isUsing: false,
          isLocking: true
        }
      }
      result = await db.collection('bike').add({
        data: data
      })
      console.log(result)
    }
    return "OK."
  } catch (e) {
    console.error(e)
    return "Error."
  }

}