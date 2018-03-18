var express = require('express');
var router = express.Router()
var { sel,add,update,del} = require('./api')


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

module.exports = router;