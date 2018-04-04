// 加载express模块
var express = require('express');
var swig = require('swig');
var app = express();
var bp = require('body-parser');
var cookies = require('cookies');
// 后台上传的模块
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
// 文件的存放地址
app.use(multipart({uploadDir:'./public/temp' }));
// 取消缓存
swig.setDefaults({cache:false})
// 配置当前使用的模版引擎
app.engine('html',swig.renderFile)
// 定义静态文件的路径
app.set('views','./views')
// 模版后缀，模版解析
app.set('view engine','html')
// 允许接受参数
app.use(bp.urlencoded({ extended: true, }))
// 允许参数json类型，否则axios使用请求 后端无法接受
app.use(bp.json())


// 设置cookie
app.use(function(req,res,next){
    req.cookies = new cookies(req,res);
    // 设置全局cookie信息
    req.userInfo = {}; 
    if(!!req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'))
        }catch(e){}
    }
    req.server_path = path.join(__dirname);
    next();
})



//------

//加载ueditor 模块  
var ueditor = require("ueditor");  
  
//使用模块  
app.use("/ueditor/ue",ueditor('http://localhost:4040',function (req, res, next) {
    console.log(1)  
    // ueditor 客户发起上传图片请求  
    if (req.query.action === 'uploadimage') {  
        var foo = req.ueditor;  
  
        var imgname = req.ueditor.filename;  
  
        var img_url = '/images/ueditor/';  
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做  
        res.setHeader('Content-Type', 'text/html');//IE8下载需要设置返回头尾text/html 不然json返回文件会被直接下载打开  
    }  
    //  客户端发起图片列表请求  
    else if (req.query.action === 'listimage') {  
        var dir_url = '/images/ueditor/';  
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片  
    }  
    // 客户端发起其它请求  
    else {
        // console.log('config.json')  
        res.setHeader('Content-Type', 'application/json');  
        res.redirect('/ueditor/jsp/config.json');  
    }  
}));


//------







// 定义不同路径的模块
// 后台
app.use('/admin',require('./routers/admin'));
// api
app.use('/api',require('./routers/api'));
// 前端
app.use('/',require('./routers/web'));

// 定义静态文件访问的路径
app.use('/public',express.static(__dirname+'/public'));
app.use('/temp',express.static(__dirname+'/temp'));
//百度富文本
app.use('./ueditor/ue',require('./ue'))
// 开启端口
app.listen(4040)
// 用户发送http请求 -》url =》 解析路由 =》 找到匹配的规则 =》 执行指定绑定函数，返回对应内容给用户
// /public -> 静态 =》 直接读取指定目录下的文件，返回给用户 =》 动态 =》 处理业务逻辑，计息模版 =》 返回数据给用户