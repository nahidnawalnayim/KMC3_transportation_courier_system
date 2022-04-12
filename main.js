const express=require('express');
const app=express();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const mongoose = require("./database");
var cons = require('consolidate');
// app.set("view engine", "html")
// app.set("views", "views")
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(session({
    secret: "bbq chips",
    resave: true,
    saveUninitialized: false
}))


app.get('/',(req,res)=>{
    res.render('index.html',{title: 'Main Page', message: 'Hello World'});
})

// app.get('/login',(req,res)=>{
//     res.render('login',{title: 'login Page', message: 'Hello stranger'});
// })

// app.post('/login',(req,res)=>{
//     res.render('login',{title: 'login Page', message: 'Hello stranger'});
// })

//router
const loginRoute=require('./api/registerroute')

app.use("/login",loginRoute)
app.listen(3005,()=>{
    console.log('Server is running on port 3005');
})