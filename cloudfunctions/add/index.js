// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('-----fn begin-----')
  console.log(event)
  console.log(context)
  console.log('-----fn begin-----')
  return event.x + event.y
}