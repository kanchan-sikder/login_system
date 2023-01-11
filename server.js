const express = require("express");
const path= require('path');
const bodyparser=require('body-parser');
const session =require('express-session');
const {v4:uuidv4}=require('uuid')
const PORT = 3000;

const router = require('./router');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended:true
}));
//view engine
app.set("view engine", "ejs");

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')));
app.use('/assets',express.static(path.join(__dirname,'public/assets')));

app.use(session({
  secret :uuidv4(),
  resave:true,
  saveUninitialized:true
}));

app.use('/router',router);

//homepage
app.get("/", (req, res) => {
  res.render("base", { title: "LOGIN SYSTEM" });
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
