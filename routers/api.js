var express = require('express');
var router = express.Router()
var { sel,add,update,del} = require('./mysql')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.post('/user/find',function(q,s,n){
    var name = q.body.name;
    var password = q.body.password;
    console.log(password)
    // 判断是否为空
    if(name == '' | password == ''){
        s.json('用户名密码不能为空')
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
    // updata 表名 set 修改的字段  where  条件  , { 原数据 }(可忽略)
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

// 获取首页文章
router.post('/user/index',function(q,s,n){
        var list = q.body.list;
        var times = 6;
        var ls=''
        if(!!list){
            ls = 'limit 0,'+times*list
        }
        var sql = 'select * from `news` '+ ls;
        sel(sql,function(e,r,n){
            s.json(r)
        })
})

router.post('/user/tabNews',function(q,s,n){
    var tab = q.body.tab
    var sql = "select * from `news`";
    sel(sql,function(e,r,n){
        var str = [];
        for(var i=0;i<r.length;i++){
            var arr = r[i].tab.split(',');
            if(arr.indexOf(tab) >= 0){
                str.push(r[i])
            }
        }
        s.send(str)
    })
})


/****************************************************************************** */


// 后台登陆
router.post('/admin/login',function(q,s,n){
    var name = q.body.name;
    var password = q.body.password

    var sql = 'select * from blog where username="'+name+'" and password="'+password+'"';
    sel(sql,function(e,r){
        r ? s.send(r) :  s.send(false)
    })
})

// 后台注册
router.post('/admin/logout',function(q,s,n){
    var name = q.body.name;
    var password = q.body.password
    var us = 'select * from blog where username="'+name+'"';
    sel(us,function(e,r,n){
        if(r.length > 0){
            s.send('false')
        }else{
            var sql = 'INSERT INTO blog SET  ?';
            var obj = {username:name,password:password}
            add(sql,obj,function(ee,rr,nn){
                s.send(!!rr)
            })
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
        r ? s.send(r) :  s.send(false)
    })
})

// 后台-- 删除单条文章记录
router.post('/admin/delNews',function(q,s,n){
    var i = q.body.id
    var sql = 'delete from news where id='+i;
    var obj = {id:i}
    del(sql,obj,function(e,r,n){
        r ? s.send(true) :  s.send(false)
    })
})

// 后台--添加文章
router.post('/admin/addNews',function(q,s,n){
    var t = q.body.title,
        c = q.body.cont,
        b = q.body.tab,
        m = q.body.time
        sql = 'INSERT INTO news SET  ?',
        obj = {title:t,cont:c,time:m,tab:b};
    add(sql,obj,function(e,r,n){
        r ? s.send(true) :  s.send(false)
    })
})

// 后台--修改文章
router.post('/admin/modNews',function(q,s,n){
    var t = q.body.title,
        id = q.body.id,
        c = q.body.cont,
        b = q.body.tab,
        m = q.body.time,
        add = "title='"+t+"',cont='"+c+"',tab='"+b+"',time='"+m+"'";
        sql = 'UPDATE news SET '+add+' where id="'+id+'"';
    update(sql,function(e,r,n){
        s.send(!!r)
    })
})


// 后台--删除全部文章
router.post('/admin/delAll',function(q,s,n){
    var sql = 'delete from news';
    del(sql,function(e,r,n){
        r ? s.send(true) :  s.send(false)
    })
})


// 后台--获取个人资料
router.post('/admin/keep-user',function(q,s,n){
    var username = q.body.name;
    var sql = 'select * from blog where username="'+username+'"';
    sel(sql,function(e,r,n){
        console.log(e,r)
        s.send(r)
    })
})


// 实时更新个人资料
router.post('/admin/heat-user',function(q,s,n){
    var l = q.body.l,
        d = q.body.d,
        c = q.body.c;
        sql = 'update blog set '+l+'="'+d+'" where username="'+c+'"';
    update(sql,function(e,r,n){
        
    })
})

router.post('/admin/img',multipartMiddleware, function (req,res) {
    var id = req.body.id;
    // 返回保存图片的地址
    res.send(req.files.file)
    //分别返回body，文件属性，以及文件存放地址
    //res.send(req.body,req.files,req.files.file.path);
    if(req){
        // 在mysql里路径会有问题，大概是已经字符串对单个\转译了，，所以提前重新定义下路径
        var url = '/temp/' + req.files.file.path.split('\\')[1]
        var sql = 'update blog set logoURL="'+url+'" where username="'+id+'"';
        console.log(sql)
        update(sql,function(e,r,n){
           // console.log(e,r)
        })
    }
});

module.exports = router;