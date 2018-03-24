// 加载express模块
var express = require('express');
var swig = require('swig');
var app = express();
var bp = require('body-parser');
// 后台上传的模块
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
// 文件的存放地址
app.use(multipart({uploadDir:'./temp' }));
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
// 定义不同路径的模块
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
// 创建前端首页
app.get('/',function(req,res,next){
    // 指定模版文件，相对于views
    res.render('web/index')
})
app.get('/newInfo',function(req,res,next){
    // 指定模版文件，相对于views
    res.render('web/newInfo')
})
// 创建后台管理页面
app.get('/admin',function(req,res,next){
    res.render('admin/admin')
})
// 定义静态文件访问的路径
app.use('/public',express.static(__dirname+'/public'));
app.use('/temp',express.static(__dirname+'/temp'));
//百度富文本
app.use('./ueditor/ue',require('./ue'))
// 开启端口
app.listen(4040)
// 用户发送http请求 -》url =》 解析路由 =》 找到匹配的规则 =》 执行指定绑定函数，返回对应内容给用户
// /public -> 静态 =》 直接读取指定目录下的文件，返回给用户 =》 动态 =》 处理业务逻辑，计息模版 =》 返回数据给用户