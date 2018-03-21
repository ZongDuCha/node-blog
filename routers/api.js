var express = require('express');
var router = express.Router()
var { sel,add,update,del} = require('./mysql')


router.post('/user/find',function(q,s,n){
    var name = q.body.name;
    var password = q.body.password;
    console.log(password)
    // 判断是否为空
    if(name == '' | password == ''){
        s.json('帐号密码不能为空')
        return false;
    }

    // 判断数据库是否有数据
    add('INSERT INTO blog SET  ?',{username:name,password:password},function(e,r,n){
        var sql = 'select * from `blog`';
        sel(sql,function(e,r,n){
            s.json(r)
        })
    })
})

router.post('/user/add',function(q,s,n){
    var name = q.body.name,
        password = q.body.password;
    add('INSERT INTO blog SET  ?',{username:name,password:password},function(e,r,n){
        console.log(r)
    })
})

router.post('/user/update',function(q,s,n){
    var name = q.body.name,
        password = q.body.password;
    // updata 表明 set 修改的字段  where  条件  , { 原数据 }(可忽略)
    update('UPDATE blog SET username="123" where password="qwe"',function(e,r,n){
        console.log(r)
    })
})

router.post('/user/del',function(q,s,n){
    // delete from 表明 where 条件(唯一并删除一行的记录)
    var sql = 'delete from blog where username=1'
    var obj = {password: '2'}
    del(sql,obj,function(e,r,n){
        console.log(r)
    })
})


// 以上为入门实例

// 获取首页全部的文章
router.post('/user/index',function(q,s,n){
    var sql = 'select * from `news`'
    sel(sql,function(e,r,n){
        s.json(r)
    })
})


// 后台登陆
router.post('/admin/login',function(q,s,n){
    var name = q.body.name;
    var password = q.body.password

    var sql = 'select * from blog where username="'+name+'" and password="'+password+'"';
    sel(sql,function(e,r){
        if(r.length){
            s.send(true)
        }else{
            s.send(false)
        }
    })
})

// 后台注册
router.post('/admin/logout',function(q,s,n){
    var name = q.body.name;
    var password = q.body.password
    var sql = 'INSERT INTO blog SET  ?';
    var obj = {username:name,password:password}
    add(sql,obj,function(e,r,n){
        if(!!e){
            s.send(true)
        }else{
            s.send(false)
        }
    })
})


// 后台-- 获取所有文章
router.post('/admin/newsAll',function(q,s,n){
    var sql = 'select * from news';
    sel(sql,function(e,r,n){
        s.send(r)
    })
})

// 后台-- 获取单条文章记录
router.post('/admin/newsFind',function(q,s,n){
    var i = q.body.id
    var sql = 'select * from news where id='+i;
    sel(sql,function(e,r,n){
        if(r.length || r.id == i){
            s.send(true)
        }else{
            s.send(false)
        }
    })
})

// 后台-- 删除单条文章记录
router.post('/admin/delNews',function(q,s,n){
    var i = q.body.id
    var sql = 'delete from news where id='+i;
    var obj = {id:i}
    del(sql,obj,function(e,r,n){
        if(r){
            s.send(true)
        }else{
            s.send(false)
        }
    })
})

// 后台--添加和修改文章
router.post('/admin/modNews',function(q,s,n){
    var t = q.body.title,
        c = q.body.cont,
        b = q.body.tab,
        m = q.body.time
        sql = 'INSERT INTO news SET  ?',
        obj = {title:t,cont:c,time:m,tab:b};
    add(sql,obj,function(e,r,n){
        if(r){
            s.send(true)
        }else{
            s.send(false)
        }
    })
})


module.exports = router;