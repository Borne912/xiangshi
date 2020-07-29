// var bluebird = require("./release/promise")()
// module.exports.Promise = bluebird

/*获取系统时间*/
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
 
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
 
  return {
    date:[year, month, day].map(formatNumber).join('-') + ' ',
    time:[hour, minute, second].map(formatNumber).join(':')}
}
 
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
 
module.exports = {
  formatTime: formatTime
}