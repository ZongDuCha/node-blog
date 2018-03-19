var express = require('express');
var router = express.Router()
var { sel,add,update,del} = require('./mysql')

router.get('/user',function(req,res,next){
    res.render('admin/user')
})


// 后台文章管理
router.get('/admin-new',function(req,res,next){
    res.render('admin/admin-new')
})


module.exports = router;