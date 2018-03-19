var express = require('express');
var router = express.Router()
var { sel,add,update,del} = require('./mysql')

router.get('/user',function(req,res,next){
    res.render('admin/user')
})


module.exports = router;