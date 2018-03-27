var express = require('express');
var router = express.Router();
var { sel,add,update,del} = require('./mysql');

router.get('/',function(req,res,next){
    var sql = 'select * from news';
    sel(sql,function(e,r){
        var tabCl = [];
        if(!!r.length){
            // 去重
            for(var i=0;i<r.length;i++){
                // 判断是否为空
                if(!!r[i].tab){
                    var ab = r[i].tab.split(',');
                    for(var j=0;j<ab.length;j++){
                        if(tabCl.indexOf(ab[j]) < 0){
                            tabCl.push(ab[j])
                        }
                    }
                }
                
            }
        }

        res.render('web/index',{
            'username': req.userInfo.username,
            tab:tabCl,
            'logoURL':req.userInfo.logoURL
        })
    })
})


// 文章详情
router.get('/newInfo',function(req,res,next){
    if(!req.query.id){
        res.redirect('/')
    }else{
        var sql = 'select * from news where id="'+req.query.id+'"';
        sel(sql,function(e,r){
            var tab = r[0].tab.split(',');
            if(r){
                res.render('web/newInfo',{
                    'name':r[0].newsName,
                    'time': r[0].time,
                    'tab': tab,
                    'title': r[0].title,
                    'cont': r[0].cont,
                    'username': req.userInfo.username,
                    'logoURL':req.userInfo.logoURL
                })
            }
        })
    }
})

module.exports = router;