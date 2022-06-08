const express=require("express");
const app=express()
const session = require('express-session')

app.use(session({
    secret:'key that will sign cookie',
    resave:false,
    saveUninitialized:false,
}))

app.get('/',function(req,res){
    req.session.isAuth=true;
    console.log(req.session);
    res.send("hello session");
});
app.listen(5000);