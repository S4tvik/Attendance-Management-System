//this is to run sesisons
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
    // var myquery={date:"10-06-2022"};
    // dbo.collection("student").deleteMany(myquery,function(err,obj){
    //         if (err) throw err;
    //         console.log('values deleted');
    //         db.close();
    //     });
});

app.listen(5000);