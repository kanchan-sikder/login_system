var express = require('express');

router = express.Router();

const creditential ={
    username:'admin123@gmail.com',
    password:'admin123'
}

router.post('/login',(req,res)=>{
    if(req.body.email== creditential.username && req.body.password==creditential.password)
    {
        req.session.user=req.body.email;
        res.redirect('/router/dashboard');
    }else{
        res.end('Username entered incorrect');
    }
})

router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        req.send('Unauthorize user');
    }
    
})

router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err)
        {
            console.log(err);
            res.send("Err");
        }else{
            res.render('base',{title:"Express",logout:"Logout Successful..."});
        }
    })
})

module.exports = router;