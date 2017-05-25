/**
 * Created by wanrenya on 2016/11/23.
 */
const express = require('express');
const router = express.Router();
const tips = require('./config').tips;
const db = require('./db');
const util = require('./utils');

router.post('*',(req,res,next)=>{
  if(!req.cookies || !req.cookies['o-token']){
    res.send({msg:'没有权限'})
  }else{
    next()
  }
})
router.post('/addPost',(req,res,next)=>{
  let params = req.body;
  let text = util.htmlToWord(params.content,{word:50});
  let index = params.content.indexOf('<!--more-->');
  params.description = index == -1 ? text : params.content.substring(0,index);
  db.insert('post',params)
  .then(function(){
    res.json(tips.addSuccess)
  }).catch(function(){
    res.json(tips.addFailure)
  })
})
router.post('/updatePost',(req,res,next)=>{
  let params = req.body;
  let text = util.htmlToWord(params.content,{word:50});
  let index = params.content.indexOf('<!--more-->');
  params.description = index == -1 ? text : params.content.substring(0,index);
  let id = params.id;
  delete params.id
  db.update('post',id,params)
    .then(function(result){
      res.json(Object.assign({data:result},tips.querySuccess))
    }).catch(function(){
    res.json(tips.queryFailure)
  })
})
router.get('/postList',(req,res,next)=>{
  let sql = 'select (select count() from post) as count, a.* ,b.name as category from post as a '
    + 'left join categories as b on a.cid=b.id'
  db.execSql(sql)
  .then(function(result){
    res.json(Object.assign({data:result},tips.querySuccess))
  }).catch(function(){
    res.json(tips.queryFailure)
  })
})
router.get('/article/:id',function (req,res,next) {
  let sql = 'select a.* ,b.name as category from post as a '
    + 'left join categories as b on a.cid=b.id where a.id="' + req.params.id + '"'
  db.execSql(sql)
    .then(function (result) {
      res.json({data:result[0]})
    })
    .catch(()=> next())
})

router.post('/delPost',(req,res)=>{
  db.del('post',req.body.id)
    .then(function(){
      res.json(tips.delSuccess)
    }).catch(function () {
      res.json(tips.delFailture)
  })
})

router.post('/addTag',(req,res)=>{
  let params = req.body;
  db.insert('tags',params)
    .then(function(){
      res.json(tips.addSuccess)
    }).catch(function(){
    res.json(tips.addFailure)
  })
})

router.get('/tagList',(req,res)=>{
  db.findAll('tags')
    .then(function(result){
      res.json(Object.assign({data:result},tips.querySuccess))
    }).catch(function(){
    res.json(tips.queryFailure)
  })
})
router.post('/updateTag',(req,res)=>{
  let params = req.body;
  let id = params.id;
  delete params.id
    db.update('tags',id,params)
    .then(function(result){
      res.json(Object.assign({data:result},tips.querySuccess))
    }).catch(function(){
    res.json(tips.queryFailure)
  })
})
router.post('/delTag',(req,res)=>{
  db.del('tags',req.body.id)
    .then(function(){
      res.json(tips.delSuccess)
    }).catch(function () {
    res.json(tips.delFailture)
  })
})
router.get('/tag/:name',(req,res)=>{
  let where = 'tag like "%' + req.params.name +'%"'
  db.where('post','*',where)
    .then((result)=>{
      res.json({data:result})
    })
})

/*类别增删改差*/
router.post('/addCategorite',(req,res)=>{
  let params = req.body;
  db.insert('categories',params)
    .then(function(){
      res.json(tips.addSuccess)
    }).catch(function(){
    res.json(tips.addFailure)
  })
})
router.get('/categoriteList',(req,res)=>{
  db.findAll('categories')
    .then(function(result){
      res.json(Object.assign({data:result},tips.querySuccess))
    }).catch(function(){
    res.json(tips.queryFailure)
  })
})
router.post('/updateCategorite',(req,res)=>{
  let params = req.body;
  let id = params.id;
  delete params.id
  db.update('categories',id,params)
    .then(function(result){
      res.json(Object.assign({data:result},tips.querySuccess))
    }).catch(function(){
    res.json(tips.queryFailure)
  })
})
router.post('/delCategorite',(req,res)=>{
  db.del('categorite',req.body.id)
    .then(function(){
      res.json(tips.delSuccess)
    }).catch(function () {
    res.json(tips.delFailture)
  })
})
router.get('/category/:name',(req,res)=>{
  let name = req.params.name;
  let sql = 'select a.id,a.title,a.publishtime,b.name as category from post as a '
    + 'left join categories as b on a.cid=b.id where b.name="' + name + '"'
  db.execSql(sql)
    .then(function(result){
      res.json({data:result,category:name})
    })
})
module.exports = router
