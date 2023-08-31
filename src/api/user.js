
var db = openDatabase('myTel','1.0','test db',1024*100);//数据库名 版本 数据库描述 大小

// 创建TelData表格
export function createTelData() {
  return new Promise((reslove,reject) =>{
    db.transaction(tx => {
      tx.executeSql('create table if not exists TelData(name TEXT,tel TEXT)', [], 
      function (tx,res) {
        reslove(tx,res)
      }, function (tx, err) {
        reject(err.message)
      })
    })
  })

}
// 添加用户信息
export function addUser(obj) {
  return new Promise((reslove,reject) =>{
    db.transaction(function (tx) {
      tx.executeSql('insert into TelData values(?,?)', [obj.name, obj.tel], 
      function (tx,res) {
        reslove(res)
      }, function (tx, err) {
        reject(err.message)
      })
    })
  })
}
//删除所有数据
export function delAllUser() {
  return new Promise((reslove,reject)=>{
    db.transaction(function (tx) {
      tx.executeSql('delete from TelData', [], 
      function (tx,res) {
        reslove(res)
      }, function (tx, err) {
        reject(err.message)
      })
    })    
  })

}
// 查询个人信息
export function getUser() {
  return new Promise((reslove,reject)=>{
    db.transaction(function(tx) {
      tx.executeSql('select * from TelData', [], 
      function (tx,res) {
        reslove(res)
      },function (tx,err) {
        reject(err)
      })
    })
  })
}