MongoClient = require('mongodb').MongoClient;
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const { devNull } = require('os');
const { GridFSBucket } = require('mongodb');
const { redirect } = require('express/lib/response');
const url = 'mongodb://localhost:27017/';
const databasename = 'firstdb';
const session = require('express-session');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('firstdb');
    // var query={username:"160120733050"};
    // dbo.collection("login").find(query).toArray(function(err,result){
        //     if (err) throw err;
        //     console.log(result);
        //     console.log(result[0].username);
        //     console.log(result[0].password);
        //     db.close;
        // });
        // to create a collection
        // dbo.createCollection("login",function(err,res){
            //     if(err)throw err;
            //     console.log('collection created');
            //     db.close();
            // });
            
            //to insert 
            // var myobj = {  tid: "1001",sid:"160120733003",hour:"1",date:"08-06-2022", present:"1"};
            // dbo.collection("attendance").insertOne(myobj,function(err,res){
            //         if (err) throw err;
            //         console.log("1 document inserted");
            //         db.close;
            //     });
                
                //to delete
                // var myquery={usernmae:"160120733050"}
                // dbo.collection("student").deleteOne(myquery,function(err,obj){
                    //     if (err) throw err;
                    //     console.log('1 document deleted');
                    //     db.close();
                    // });
                });
                
                
                
                // app.post('/check',function(req,res){
                    //     res.send(req.body);
// });

app.get('/', function (req, res) {
    res.sendfile('login.html');
});

app.post('/check', function (req, res) {
    let uname = req.body.username;
    let pword = req.body.password;
    // console.log(uname);
    // console.log(pword);
    if (uname && pword) {
        
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            dbo=db.db("firstdb");
            var query = { username: uname };
            dbo.collection("login").find(query).toArray(function (err, result) {
                if (result.length == 0) {
                    res.send('Incorrect username  or password');
                }
                else
                {
                    if (err) throw err;
                    // console.log(result[0].username);
                    // console.log(result[0].password);
                    else
                    {
                        if (result[0].password == pword && result[0].type=="student") {
                            req.session.loggedin=true;
                            req.session.username=uname;
                            res.redirect("/student-home");
                        }
                        if (result[0].password == pword && result[0].type=="teacher") {
                            req.session.loggedin=true;
                            req.session.username=uname;
                            res.redirect("/teacher-home");
                        }
                    }
                }
                db.close;
            });
        });
    }
    else{
        res.send("enter details idiot");
    }
});

app.get('/student-home',function(req,res){
	if (req.session.loggedin) {
        uname=req.session.username;
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            dbo=db.db("firstdb");
            var query={sid:uname};
            dbo.collection("attendance").find(query).toArray(function (err, result) {
                if (err) throw err;
                var total_classes_attended=0;
                for (let i=0;i<result.length;i++){
                    if(result[i].present=="1")
                    {
                        total_classes_attended+=1;
                    }
                }
                // console.log(result.length);
                // console.log(total_classes_attended);
                percentage=total_classes_attended*100/result.length;
                res.render(__dirname+"/student_home.ejs",{percentage: percentage,uname:uname});
                db.close;
            });
        });
	}else{
		res.send("first login idiot");
	}
});
app.get('/teacher-home',function(req,res){
	if (req.session.loggedin) {
        uname=req.session.username;
		res.render(__dirname+"/teacher_home.ejs",{uname:uname});
	}else{
		res.send("first login idiot");
	}
});
app.get('/teacher-class',function(req,res){
	if (req.session.loggedin) {
		res.render(__dirname+"/teacher_class.ejs",{uname:uname});
	}else{
		res.send("first login idiot");
	}
});
app.get('/teacher-form',function(req,res){
	if (req.session.loggedin) {
        date=req.session.date;
		res.render(__dirname+"/teacher_form.ejs",{date:date});
	}else{
		res.send("first login idiot");
	}
});
app.get('/teacher-form1',function(req,res){
	if (req.session.loggedin) {
        req.session.date="10-06-2022";
		res.redirect("/teacher-form");
	}else{
		res.send("first login idiot");
	}
});
app.get('/teacher-form2',function(req,res){
	if (req.session.loggedin) {
        req.session.date="11-06-2022";
		res.redirect("/teacher-form");
	}else{
		res.send("first login idiot");
	}
});
app.get('/teacher-form3',function(req,res){
	if (req.session.loggedin) {
        req.session.date="12-06-2022";
		res.redirect("/teacher-form");
	}else{
		res.send("first login idiot");
	}
});
app.get('/teacher-form4',function(req,res){
	if (req.session.loggedin) {
        req.session.date="13-06-2022";
		res.redirect("/teacher-form");
	}else{
		res.send("first login idiot");
	}
});
app.get('/teacher-form5',function(req,res){
	if (req.session.loggedin) {
        req.session.date="14-06-2022";
		res.redirect("/teacher-form");
	}else{
		res.send("first login idiot");
	}
});
app.get('/attendance-submit',function(req,res){
	if (req.session.loggedin) {
        
		res.redirect("/teacher-form");
	}else{
		res.send("first login idiot");
	}
});

app.listen(3000);