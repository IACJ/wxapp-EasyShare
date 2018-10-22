// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-share-92a8ff'
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let orderList = await db.collection('order').where({
      user_openid: _.eq(event.userInfo.openId)
    }).orderBy('createTime','desc').get()
    console.log('[根据openId查询]: ' + JSON.stringify(orderList))
    return orderList
  }
  catch(e) {
    console.error(e)
    return 'Error.'
  }
}