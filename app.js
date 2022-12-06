//jshint esversion:6

const express = require("express");
//const bodyParser = require("body-parser");
const ejs = require("ejs");
//LOADASH
var lodash=require("lodash"); 

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//For storing all the objects in the array
let items=[];

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


// GETTING THE HOME PAGE
app.get("/",function(req,res){
  res.render("home",{heading:"HOME",content:homeStartingContent,showing:items});
  // res.render("list",{kindOfDay:day});
 // console.log(items);

});
// GETTING THE ABOUT PAGE
app.get("/about",function(req,res){
  res.render("about",{aboutPage:aboutContent})
});

// GETTING THE CONTACT PAGE
app.get("/contact",function(req,res){
  res.render("contact",{contactPage:contactContent})
});

// GETTING THE COMPOSE PAGE
app.get("/compose",function(req,res){
  res.render("compose");

});
app.get("/post/:topic",function(req,res){
 // console.log(req.params.topic);
  items.forEach(function(item){
    var a= lodash.lowerCase(req.params.topic);
    var b=lodash.lowerCase(item.title);
    if(a===b){
    //  res.redirect("/post");
    res.render("post",{heading:"BLOGS", title:item.title, content:item.content});
    }
    else
    console.log("MATCH NOT FOUND");

  })



  
});

app.post("/compose",function(req,res){

//  console.log(req.body.compose);

//CREATING JAVASCRIPT OBJECT TO STORE BOTH THE TITLE AND THE CONTENT
//better to use "const" cz we are not interested in changing its value ever
const posted={
  title:req.body.title,
  content:req.body.compose

};
items.push(posted);


res.redirect("/");

});











app.listen(3000, function() {
  console.log("Server started on port 3000");
});
