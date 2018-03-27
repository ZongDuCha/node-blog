var express = require('express'),
    router = express.Router(),
    { sel,add,update,del} = require('./mysql'),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart(),
    fs = require('fs')

router.post('/user/find',function(q,s,n){
    var name = q.body.name,
        password = q.body.password;
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
    var sql = 'delete from blog where username=1',
        obj = {password: '2'}
    del(sql,obj,function(e,r,n){
        console.log(r)
    })
})


// 以上为入门实例 ******************************************************

// 获取首页文章
router.post('/user/index',function(q,s,n){
        var list = q.body.list,
            times = 6,
            ls='';
        if(!!list){
            ls = 'limit 0,'+times*list
        }
        var sql = 'select * from `news` ORDER BY `time` DESC '+ ls;
        sel(sql,function(e,r,n){
            s.json(r)
        })
})

// 获取首页文章全部分类
router.post('/user/tabNews',function(q,s,n){
    var tab = q.body.tab,
        sql = "select * from `news`";
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


// 文章评论
router.post('/news/comm',function(q,s){
    if(JSON.stringify(q.userInfo) == '{}'){
        s.send(false)
        return;
    }

    var nameId = q.userInfo.id;
    var sql = 'select * from blog where username="'+nameId+'"';
    // 获取logo图片
    sel(sql,function(e,r){
        var addSql = "INSERT INTO comment SET ?";
        var newsId = q.body.newsId
        var cont = q.body.cont;
        var date = new Date();
        var time = date.getFullYear() + '-' + (date.getMonth()+1)+ '-'+ date.getDate() + '  '+ date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        var addObj = {nameId:nameId,comCont:cont,contTime:time,newsId:newsId};
        add(addSql,addObj,function(ee,rr){
            s.send(!!rr)
        })
    })
    
})

// 获取文章评论
router.post('/news/getComm',function(q,s){
    var id = q.body.id;
    // 获取用户现在的真实数据，防止评论后修改了资料

    var sql = 'select * from comment where newsId="'+id+'" ORDER BY `contTime` DESC';
    sel('select * from blog',function(ee,rr){
        sel(sql,function(e,r){
            // 循环用户表信息
            for(var i=0;i<rr.length;i++){
                // 循环评论表信息
                for(var j=0;j<r.length;j++){
                    // 同时判断相同用户，获取当前的数据
                    if(r[j].nameId == rr[i].id){
                        r[j].logoURL = rr[i].logoURL;
                        r[j].comName = rr[i].username;
                    }
                }
            }
            console.log(r)
            s.send(r)
        })
    })
})

// 删除个人评论
router.post('/news/delComm',function(q,s){
    var id = q.body.id;
    var sql = 'delete from comment where id="'+id+'"'
    del(sql,function(e,r){
        s.send(!!r)
    })
})


// 文章访问量
router.post('/news/commLen',function(q,s){
    var id = q.body.id;
    var sql = 'select * from news where id="'+id+'"';
    sel(sql,function(e,r){
        var vis = r[0].visit == null ? 0 : r[0].visit;
        vis++;
        var upSql = 'update news SET visit="'+vis+'" where id="'+id+'"';
        update(upSql,function(e,r){
            // 转字符串 ，否则会报错
            s.send(r.vis = vis.toString())
        })
    })
})

// 获取点赞数
router.post('/news/zan',function(q,s){
    var id = q.body.id;
    var sql = 'select * from news where id="'+id+'"';
    sel(sql,function(e,r){
        var len = !!r[0].zan ? r[0].zan.split(',') : '0';
        s.send(len);
    })
})


// 点击 点赞
router.post('/news/setZan',function(q,s){
    var id = q.body.id;
    var sql = 'select * from news where id="'+id+'"';
    sel(sql,function(e,r){
        var is;
        // 判断存在
        if(!!r[0].zan){
            var isName = r[0].zan.split(',');
            var isZan = isName.indexOf(q.userInfo.username);
            // 存在的情况下删除
            if(!(isZan < 0)){
                isName.splice(isZan,1);
            // 不存在则添加
            }else{
                isName.push(q.userInfo.username)
            }
            var updateSql = 'update news set zan="'+isName+'" where id="'+id+'"';
            update(updateSql,function(e,r){
                is = !!r;
            })
        }else{
            is = fasle;
        }
        s.send(is)
    })
})

/****************************************************************************** */


// 后台登陆
router.post('/admin/login',function(q,s,n){
    var name = q.body.name,
        password = q.body.password,
        sql = 'select * from blog where username="'+name+'" and password="'+password+'"';
    sel(sql,function(e,r){
        if(!!r.length){
            q.cookies.set('userInfo',JSON.stringify({
                'id': r[0].id,
                'username': r[0].username,
                'logoURL': r[0].logoURL,
                'isAdmin': r[0].isAdmin
            }));
        }
        s.send(!!r.length)
    })
})

// 后台注册
router.post('/admin/logon',function(q,s,n){
    var name = q.body.name,
        password = q.body.password,
        us = 'select * from blog where username="'+name+'"';
    sel(us,function(e,r,n){
        if(r.length > 0){
            s.send('false')
        }else{
            var sql = 'INSERT INTO blog SET  ?',
                date = new Date();
                time = date.getFullYear() + '-' + (date.getMonth()+1)+ '-'+ date.getDate() + ' '+ date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
                obj = {username:name,password:password,newTime:time},
            add(sql,obj,function(ee,rr,nn){
                s.send(!!rr)
            })
        }
    })
})


router.post('/admin/logout',function(q,s,n){
    q.cookies.set('userInfo',null);
    s.send(true)
})


// 后台-- 获取文章
router.post('/admin/newList',function(q,s,n){
    var wh='';
    var list = q.body.total || 0;
    var lim = 'limit '+list+','+list+5;
    if(q.userInfo.isAdmin == 'false'){
        wh = ' where name="'+q.userInfo.username+'"'
    }
    var sql = 'select * from news'+wh+' ORDER BY time DESC '+lim ;
    sel(sql,function(e,r,n){
        s.send(r)
    })
})


// 后台--获取所有文章
router.post('/admin/newsAll',function(q,s){
    var wh='';
    if(q.userInfo.isAdmin == 'false'){
        wh = ' where name="'+q.userInfo.username+'"'
    }
    var sql = 'select * from news '+wh;
    sel(sql,function(e,r,n){
        s.send(r)
    })
})

// 后台-- 获取单条文章记录
router.post('/admin/newsFind',function(q,s,n){
    var i = q.body.id,
        sql = 'select * from news where id='+i;
    sel(sql,function(e,r,n){
        r ? s.send(r) :  s.send(false)
    })
})

// 后台-- 删除单条文章记录
router.post('/admin/delNews',function(q,s,n){
    var i = q.body.id,
        sql = 'delete from news where id='+i,
        obj = {id:i}
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
        obj = {title:t,cont:c,time:m,tab:b,name:q.userInfo.username};
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
    var username = q.body.name,
        sql = 'select * from blog where username="'+username+'"';
    sel(sql,function(e,r,n){
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
    var id = req.userInfo.id,
        sec = 'select * from blog where id="'+id+'"';
     sel(sec,function(e,r){
         var url = req.server_path + r[0].logoURL;
        // 删除原本存放在文件夹的文件
        fs.unlink(url,function(e,r){
            console.log(e)
        })
        
        // // 返回保存图片的地址
        res.send(req.files.file)
        //分别返回body，文件属性，以及文件存放地址
        //res.send(req.body,req.files,req.files.file.path);
        if(req){
            // 在mysql里路径会有问题，大概是已经字符串对单个\转译了，，所以提前重新定义下路径
            var url = '/public/temp/' + req.files.file.path.split('\\')[2],
                sql = 'update blog set logoURL="'+url+'" where id="'+id+'"';
            update(sql,function(e,r,n){
                // console.log(e,r)
            })
        }
     })
});


// 删除全部用户
router.post('/admin/delUserAll',function(q,s){
    var is;
    // 删除不包括zongdu的所有用户
    var sql = 'delete from blog where not `username` like "zongdu"'
    if(q.userInfo.isAdmin == 'true'){
        del(sql,function(e,r){
        })
        is = true;
    }else{
        is = false;
    }
    s.send(is)
})

module.exports = router;