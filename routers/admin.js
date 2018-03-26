var express = require('express');
var router = express.Router()
var { sel,add,update,del} = require('./mysql')

// 创建后台管理页面
router.get('/',function(req,res,next){
    if(JSON.stringify(req.userInfo) != '{}'){
        res.redirect('/admin/user')
    }else{
        res.render('admin/admin')
    }
})

// router.get('*',function(req,res){
//     console.log(req.userInfo)
// })


router.get('/user',function(req,res,next){
    if(JSON.stringify(req.userInfo) == '{}'){
        res.redirect('/admin')
    }else{
        res.render('admin/user',{
            'userInfo': req.userInfo
        })
    }
})


// 后台文章管理
router.get('/admin-new',function(req,res,next){
    res.render('admin/admin-new')
})


// 后台添加文章
router.get('/mod-news',function(req,res,next){
    res.render('admin/mod-news')
})

router.get('/admin-user',function(req,res,next){
    res.render('admin/admin-user')
})


module.exports = router;