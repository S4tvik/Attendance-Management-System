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
app.use(express.static(path.join(__dirname, 'static')));


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
    res.sendfile('index.html');
});

app.post('/check', function (req, res) {
    let uname = req.body.username;
    let pword = req.body.password;
    // console.log(uname);
    // console.log(pword);
    if (uname && pword) {
        var query = { 'username': uname };
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            dbo=db.db("firstdb");
            var query = { username: uname };
            dbo.collection("login").find(query).toArray(function (err, result) {
                if (result.length == 0) {
                    res.send('Incorrect username  or password');
                }
                if (err) throw err;
                // console.log(result[0].username);
                // console.log(result[0].password);
                if (result[0].password == pword) {
                    req.session.loggedin=true;
                    req.session.username=uname;
                    res.redirect("/home");
                }
                db.close;
            });
        });
    }
});

app.get('/home',function(req,res){
	if (req.session.loggedin) {
		res.sendfile(__dirname+"/home.html",{percentage:'95'});
	}else{
		res.send("first login idiot");
	}
});

app.listen(3000);