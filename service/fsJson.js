/**
 * 数据提纯
 */

const fs = require('fs')

fs.readFile('./data_json/goods.json', 'utf8', function(err, data) {
  let newData = JSON.parse(data);
  let pushData = []
  newData.RECORDS.map(function(value, index) {
    if (value.IMAGE1) {
      pushData.push(value)
    }
  })
  // console.log(pushData)
  // 写入到新文件
  fs.writeFile('./data_json/newGoods.json',JSON.stringify(pushData),function(err){
  	if(err) console.log('写文件操作失败')
  	else console.log('写文件操作成功')
  })
})
