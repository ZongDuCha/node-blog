var express = require('express');
var router = express.Router()
var { sel,isStay,update,del} = require('./api')


router.post('/user/find',function(q,s,n){
    var name = q.body.name;
    var password = q.body.passwrod;
    // 判断是否为空
    if(name == '' | password == ''){
        s.json('帐号密码不能为空')
        return false;
    }

    // 判断数据库是否有数据
    var sql = 'select * from `blog` where username='+name;
    sel(sql,function(e,r,n){
        for(var i=0,len=r.length;i<len;i++){
            var a = r[i].username;
            console.log(r[i])
        }
    })
})

router.post('/user/isStay',function(q,s,n){
    var name = q.body.name,
        password = q.body.password;
    isStay('INSERT INTO blog SET  ?',{username:name,password:password},function(e,r,n){
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
    var sql = 'delete from blog where username=1'
    var obj = {password: '2'}
    del(sql,obj,function(e,r,n){
        console.log(r)
    })
})

module.exports = router;