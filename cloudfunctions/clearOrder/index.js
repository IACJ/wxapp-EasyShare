// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-share-92a8ff'
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  let result = await db.collection('order').where({
    _id: _.neq('000000')
  }).remove()
  console.log('[result]: '+ JSON.stringify(result))
  return result
}