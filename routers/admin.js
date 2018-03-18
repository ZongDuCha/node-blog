var express = require('express');
var router = express.Router()
var { sel,add,update,del} = require('./mysql')

router.get('/index',function(req,res,next){
    res.send('主页')
})


module.exports = router;