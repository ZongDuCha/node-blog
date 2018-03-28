var express = require('express');
var router = express.Router()
var { sel,add,update,del} = require('./mysql')

// 创建后台管理页面
router.get('/',function(req,res,next){
    if(req.userInfo.username){
        res.redirect('/admin/user')
    }else{
        res.render('admin/admin')
    }
})



router.get('/user',function(req,res,next){
    if(JSON.stringify(req.userInfo) == '{}'){
        res.redirect('/admin')
    }else{
        var sql = 'select * from blog where username="'+req.userInfo.username+'"'
        sel(sql,function(e,r){
            if(!r.length){
                res.redirect('/admin')
            }else{
                res.render('admin/user',{
                    'userInfo': req.userInfo
                })
            }
        })
    }
})

router.get('/admin-userAll',function(req,res){
    var sql = 'select * from blog';
    sel(sql,function(e,r){
        if(r.length){
            res.render('admin/admin-userAll',{
                'blog':r
            })
        }
    })
})


// 后台文章管理
router.get('/admin-new',function(req,res,next){
    res.render('admin/admin-new')
})


// 后台添加文章
router.get('/mod-news',function(req,res,next){
    res.render('admin/mod-news')
})


// 后台个人信息
router.get('/admin-user',function(req,res,next){
    res.render('admin/admin-user')
})


module.exports = router;