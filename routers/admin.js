var express = require('express');
var router = express.Router()

router.get('/user',function(q,s,n){
    s.send('user')
})

module.exports = router;