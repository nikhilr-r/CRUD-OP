const { randomUUID } = require("crypto");
const express = require("express");
const app = express();
const port = 8080;

const methodOverride = require("method-override");
app.use(methodOverride('_method'));
const {v4 :uuidv4} = require("uuid")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

let posts = [
    {
        id: uuidv4(),
        username: "user1",
        content: "I Love Programming"        
    }, {
        id: uuidv4(),
        username: "user2",
        content: "I Love Cooking"        
    }, {
        id: uuidv4(),
        username: "nikhilrajput",
        content: "If You dreaming then make sure you dream big"        
    }, {
        id: uuidv4(),
        username: "user4",
        content: "I Love Farming"        
    }, {
        id: uuidv4(),
        username: "user5",
        content: "I Love Nature"        
    }
];


//loading all posts 
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
//creating a post
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

//submit  and loading new posts
app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})


//fetching specific post 
app.get("/posts/:id",(req,res)=>{
        let {id} = req.params;
        let post = posts.find((p)=> id == p.id);
        if(!post) return res.status(404).send("Post Not Found");
        res.render("show.ejs",{post});
})

//updating the content using patch request 
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id == p.id);
    if(!post) return res.status(404).send("Post Not Found");
    post.content = newContent;
    res.redirect("/posts");
})
//updating posts 
app.get("/posts/:id/edit",(req,res)=>{
      let {id} = req.params;
      let post = posts.find((p)=> id == p.id);
      if(!post) return res.status(404).send("Post Not Found");
      res.render("edit.ejs",{post});
})
//Delete Functionality
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id == p.id);
    if(!post) return res.status(404).send("Post Not Found");
    posts = posts.filter((p)=> p.id !== id);
    res.redirect("/posts");
})

//listening on port
app.listen(port, () => {
    console.log(`listening to the port ${port}`);
});