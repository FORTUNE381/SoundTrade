const fs = require("fs");
const express = require("express");
const mongoose = require('mongoose');
const { runInNewContext } = require("vm");

const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose").default
require("dotenv").config();

const app = express();

const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost:27017/test');


const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const postSchema = new mongoose.Schema({
  poster: String,
  knows: String,
  wants: String,
  accepted: Boolean
});

const Post = mongoose.model("Post", postSchema);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


app.get("/", (req, res) => {
  res.render("index");
});


app.get("/auth", (req, res) => {
  res.render("auth");
});


app.post("/login", async (req, res) => {
    console.log(req.body);

    console.log("User " + req.body.username + " is attempting to log in");
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, (err) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.render("index");
            });
        }
    });
});


app.post("/signup", async (req, res) => {
    console.log(req.body);
        console.log("User " + req.body.Username + " is attempting to register");
        const user = new User({ username: req.body.Username });
        await User.register(user, req.body.pass);
        passport.authenticate("local")(req, res, () => {
            res.render("index");
        })
});


app.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});


app.get("/results", (req, res) => {
  const matches = readJSON(postsFilePath);
  res.render("results", {
    matches,
    skillOffered: "",
    skillWanted: ""
  });
});


app.get("/dashboard", (req, res) => {
  const posts = readJSON(postsFilePath);
  const trades = readJSON(tradesFilePath);

  res.render("dashboard", {
    posts,
    trades
  });
});


app.get("/trade", (req, res) => {
  const trades = readJSON(tradesFilePath);

  res.render("trade", {
    trades
  });
});


app.get("/search", async (req, res) => {
 const posts = await Post.find();

let matches = false;
  
iKnow = req.body.knowSkill.toLowerCase();
wantToLearn = req.body.learnSkill.toLowerCase();
  
  for (let i = 0; 0 < posts.length(); i++) {
    if (posts[i].knows === wantToLearn && posts[i].wants === iKnow){
      matches = true;
      break;
    }
  }
  if (matches == true) {
    res.render("results");
  }
  if (matches == false) {
    res.render("no-match")
  }
});


app.post("/post-skill", async (req, res) => {

  const newPost = new Post({
    poster: req.user.username,
    knows: req.body.knowSkill,
    wants: req.body.learnSkill,
    accepted: false
  });
  await newPost.save();

  res.redirect("/dashboard");
});


app.get("/messages", (req, res) => {
  res.redirect("/trade");
});

app.get("/explore", (req, res) => {
  res.redirect("/results");
});

app.use((req, res) => {
  res.status(404).send("404 - Page not found");
});

