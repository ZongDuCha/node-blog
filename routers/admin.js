var express = require('express');
var router = express.Router()
var { sel,add,update,del} = require('./mysql')

router.get('/user',function(req,res,next){
    res.render('admin/user')
    // 获取当前路由
    //  console.log(req.route.path,1)
})


// 后台文章管理
router.get('/admin-new',function(req,res,next){
    res.render('admin/admin-new')
})


// 后台添加文章
router.get('/add-news',function(req,res,next){
    res.render('admin/add-news')
})


module.exports = router;