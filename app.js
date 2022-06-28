const express = require('express')
const mongoose = require("mongoose");

const ejs = require('ejs')
const path = require('path')

const Post = require('./model/Post')
const postController = require("./controllers/PostController");
const pageController = require("./controllers/PageController");
const app = express();
var methodOverride = require('method-override')

//create DB
mongoose.connect('mongodb://localhost/cleanblog-test-db',{
    useNewUrlParser: true,
      useUnifiedTopology: true,
})

app.use(methodOverride('_method',{
    methods:['POST','GET']
}));

app.set("view engine","ejs");

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended:true }))
app.use(express.json())

// ROUTES 
app.get("/", postController.getPosts);

app.get("/posts/:id", postController.getPost);

app.get("/about", pageController.getAboutPage);

app.get("/add_post", pageController.getAddPostPage);

app.post("/posts", postController.createPost);

app.put("/posts/:id", postController.updatePost);

app.delete("/posts/:id", postController.deletePost);

const port = 3000;
app.listen(port,() => {
    console.log(`Sunucu ${port} portunda başlatıldı.....`)
})