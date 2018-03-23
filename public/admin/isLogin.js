var un = sessionStorage.getItem('username')
var ps = sessionStorage.getItem('password')
if(!!un && !!ps){
    axios.post('../api/admin/login',{
        name: un,
        password: ps
    }).then(function(res){
        if(!res.data){
            window.location.href = location.origin + '/admin'
        }
    })
}else{
    window.location.href = location.origin + '/admin'
}