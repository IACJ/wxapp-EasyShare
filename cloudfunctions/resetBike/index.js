// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-share-92a8ff'
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {

  let removeResult = await db.collection('bike').where({
    _id: _.neq('000000')
  }).remove()
  
  let addResult={}
  for (let i=0;i<100;i++){
    addResult[100000 + i] = await db.collection('bike').add({
      data: {
        description: "a sharing bike",
        addTime: new Date(),
        orderList: [],
        reportLisy: [],
        // 位置（113°E，23°N）
        position: new db.Geo.Point(113, 23),
        numberId: 100000 + i,
        status: {
          isUsing: false,
          isLocking: true
        }
      }
    })
  }
  return {
    removeResult: removeResult,
    addResult: addResult
  }
}