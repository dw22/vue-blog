/**
 * Created by wanrenya on 2016/11/23.
 */
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const shortid = require('shortid');
const DB = {
  db:undefined,
  connect:function(){
    this.db = new sqlite3.Database(__dirname + '/data/sqlite3.db');
    this.createTable();
  },
  createTable:function(){
    let sql = [
      'CREATE TABLE IF NOT EXISTS post (id  VARCHAR( 16 ) PRIMARY KEY,title VARCHAR( 64 ),tag  VARCHAR( 32 ),cid VARCHAR( 32 ),description TEXT,content TEXT,marktext TEXT,author  VARCHAR( 16 ),publish INT( 2 ),publishtime VARCHAR( 32 ));',
      'CREATE TABLE IF NOT EXISTS tags (id VARCHAR( 16 ) PRIMARY KEY,name VARCHAR( 64 ),description TEXT);',
      'CREATE TABLE IF NOT EXISTS categories (id VARCHAR( 16 ) PRIMARY KEY,name VARCHAR( 64 ),description TEXT);'
    ]
    for(let i=0;i<sql.length;i++){
      this.db.run(sql[i]);
    }
  },
  insert:function(table,params){
    let that = this;
    return new Promise(function(resolve,reject){
      let sql = 'INSERT INTO '+ table,keys = '',vaules=[],sign='';
      let keyArr = Object.keys(params);
      for(let i =0,len= keyArr.length;i<len;i++){
        keys += keyArr[i] + ',' ;
        vaules.push(params[keyArr[i]]);
        sign += '?' + ',';
      }
      keys = keys.substring(0,keys.length -1);
      sign = sign.substring(0,sign.length -1);
      sql = sql +'('+ keys + ',id) VALUES('+ sign +',?)';
      let stmt = that.db.prepare(sql);
      vaules.push(shortid.generate());
      stmt.run(vaules,function(err){
        if(err){
          reject(err);
        }else{
          stmt.finalize();
          resolve()
        }
      })
    })
  },
  where:function(table,str,where){
    let that = this;
    return new Promise(function(resolve,reject){
      let sql = 'SELECT '+ str +'  FROM '+ table + ' WHERE ';
      sql = sql + where;
      let rows = [];
      that.db.each(sql,function(err,row){
        if(err){
          reject(err);
        }else{
          rows.push(row);
        }
      },function () {
        resolve(rows);
      })
    })
  },
  findOne:function(table,params){
    let that = this;
    return new Promise(function(resolve,reject){
      let sql = 'SELECT *  FROM '+ table + ' WHERE ';
      let keys = Object.keys(params);
      let where = '';
      for(let key in params){
        where += key + '="' + params[key] +'" AND ';
      }
      where += '1=1'
      sql = sql + where;
      console.log(sql)
      that.db.each(sql,function(err,row){
        if(err){
          reject(err);
        }else{
          resolve(row);
        }
      })
    })
  },
  findAll:function(table){
    let that = this;
    return new Promise(function(resolve,reject){
      let rows = [];
      that.db.each('SELECT * FROM '+ table,function(err,row){
        if(err){
          reject(err);
        }else{
          rows.push(row);
        }
      },function(){
        resolve(rows);
      })
    })
  },
  execSql:function(sql){
    let that = this;
    return new Promise(function(resolve,reject){
      let rows = [];
      that.db.each(sql,function(err,row){
        if(err){
          reject(err);
        }else{
          rows.push(row);
        }
      },function(){
        resolve(rows);
      })
    })
  },
  update:function(table,id,params){
    let that = this;
    return new Promise(function(resolve,reject){
      let sql = 'UPDATE ' + table + ' SET ';
      let keyArr = Object.keys(params);
      let str='',vaules=[];
      for(let i =0,len= keyArr.length;i<len;i++){
        str += keyArr[i] + '= ?,' ;
        vaules.push(params[keyArr[i]]);
      }
      str = str.substring(0,str.length -1);
      sql += str + ' WHERE id= ?';
      let stmt = that.db.prepare(sql);
      vaules.push(id);
      stmt.run(vaules,
        function(err){
          if (err){
            reject(err);
          } else {
            stmt.finalize();
            resolve(null);
          }
        })
    })
  },
  del:function(table,id){
    let that = this;
    return new Promise(function(resolve,reject){
      that.db.run('DELETE FROM '+ table +' WHERE id = ?;',
        [id],
        function(err){
          if (err){
            reject(err);
          } else {
            resolve(null);
          }
        })
    })
  }
}
module.exports = DB;
