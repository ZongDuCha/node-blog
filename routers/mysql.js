
var mysql = require('mysql')
db = mysql.createConnection({
    host: 'localhost', // 连接服务器地址
    user: 'root',  // 连接用户名
    password: '', // 连接密码
    port: 3306, // 端口号
    database:'mysql' // 数据库名称
});
global.db.connect();

// 用户表不存在则创建
db.query('show tables like "blog"',function(e,r,n){
    if(!r.length){
        db.query('CREATE TABLE IF NOT EXISTS `blog` ( \
            `id` int(11) NOT NULL auto_increment,   \
           `username` varchar(255) default NULL,   \
           `password` varchar(255) default NULL,   \
           `web` varchar(255) default NULL,\
           `intr` varchar(255) default NULL,   \
           `comp` varchar(255) default NULL,   \
           `logoURL` varchar(255) default NULL,   \
           `isAdmin` varchar(255) default NULL,   \
           `creatTime` varchar(255) default NULL,   \
           PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;',function(ee,rr,n){
        })
    }
})

// 评论表不存在则创建
db.query('show tables like "comment"',function(e,r,n){
    if(!r.length){
        db.query('CREATE TABLE IF NOT EXISTS `comment` ( \
            `id` int(11) NOT NULL auto_increment,   \
           `nameId` varchar(255) default NULL,   \
           `comCont` varchar(255) default NULL,   \
           `contTime` varchar(255) default NULL,\
           `newsId` varchar(255) default NULL,   \
           `comName` varchar(255) default NULL,   \
           PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;',function(ee,rr,n){
        })
    }
})

// 文章表不存在则创建
db.query('show tables like "news"',function(e,r,n){
    if(!r.length){
        db.query('CREATE TABLE IF NOT EXISTS `news` ( \
            `id` int(11) NOT NULL auto_increment,   \
           `title` varchar(255) default NULL,   \
           `cont` varchar(255) default NULL,   \
           `time` varchar(255) default NULL,\
           `tab` varchar(255) default NULL,   \
           `name` varchar(255) default NULL,   \
           `zan` varchar(255) default NULL,   \
           `visit` int(11) default NULL,   \
           PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;',function(ee,rr,n){
        })
    }
})

// 查询记录
function sel(sel,callback){
    db.query(sel,function(e,r,n){
        if(e){
            callback(e,null)
            return;
        }
        if(!r){
            console.log('无该记录，，api-sel')
            callback(e,null)
        }else{
            callback(e,r,n)
        }
    })
    
}

// 将数据 插入数据库中
function add(sql,obj,callback){
    db.query(sql,obj,function(e,r,n){
        if(e) {
            console.log('添加失败，，api-isStay');
            callback(e,null);
            return false
        };
        callback(e,r,n);
    })
}

// 修改数据
function update(sql,obj,callback){
    db.query(sql,obj,function(e,r,n){
        if(e){
            console.log('修改失败，，api-update')
            callback(e,null)
            return;
        }else{
            callback(e,r=true,n)
        }
    })
}


function del(sql,obj,callback){
    db.query(sql,obj || '',function(e,r,n){
        if(e){
            console.log('删除失败，，api-del')
            callback(e,null)
            return;
        }
        callback(e,r,n)
    })
}

module.exports = {
    sel:sel,
    add:add,
    update: update,
    del: del
}