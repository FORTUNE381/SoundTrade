const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose").default;
require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SECRET || "soundtrade-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  next();
});

app.set("view engine", "ejs");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
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
  accepted: {
    type: Boolean,
    default: false,
  },
});

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/auth", (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("auth");
});

app.get("/login", (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.redirect("/auth");
});

app.get("/signup", (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.redirect("/auth");
});

app.post("/login", (req, res, next) => {
  const email = (req.body.loginEmail || "").trim();
  const password = req.body.loginPassword || "";

  if (!email || !password) {
    return res.redirect("/auth");
  }

  const user = new User({
    username: email,
    password: password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
      return res.redirect("/auth");
    }

    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth",
    })(req, res, next);
  });
});

app.post("/signup", async (req, res) => {
  try {
    const email = (req.body.signupEmail || "").trim();
    const password = req.body.signupPassword || "";

<<<<<<< HEAD

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


//app.get("/trade", (req, res) => {
  //const trades = readJSON(tradesFilePath);

  //res.render("trade", {
    //trades
  //});
//});
app.get("/trade", (req, res) => {

  // TEMP demo data 
  const tradePost = {
    _id: "123",
    knows: "Java",
    wants: "Guitar",
    accepted: false
  };

  const messages = [
    { sender: "You", text: "Hey! When can we start?" },
    { sender: "Other User", text: "Maybe this weekend?" }
  ];

  res.render("trade", {
    currentUser: req.user,
    partner: { username: "Other User" },
    tradePost,
    messages
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
=======
    if (!email || !password) {
      return res.redirect("/auth");
>>>>>>> 27f6489 (Added auth CSS and results page)
    }

    const existingUser = await User.findOne({ username: email });
    if (existingUser) {
      return res.redirect("/auth");
    }

    const newUser = new User({ username: email });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        console.log(err);
        return res.redirect("/auth");
      }
      res.redirect("/");
    });
  } catch (error) {
    console.log(error);
    res.redirect("/auth");
  }
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/results", async (req, res) => {
  try {
    const posts = await Post.find();

    const matches = posts.map((post) => ({
      username: post.poster,
      skillOffered: post.knows,
      skillWanted: post.wants,
      description: "Music skill exchange match",
    }));

    res.render("results", {
      matches,
      skillOffered: "",
      skillWanted: "",
      currentUser: req.user,
    });
  } catch (error) {
    console.log(error);
    res.render("results", {
      matches: [],
      skillOffered: "",
      skillWanted: "",
      currentUser: req.user,
    });
  }
});

app.post("/search", async (req, res) => {
  try {
    const knowSkill = (req.body.knowSkill || "").trim();
    const learnSkill = (req.body.learnSkill || "").trim();

    if (!knowSkill || !learnSkill) {
      return res.render("results", {
        matches: [],
        skillOffered: knowSkill,
        skillWanted: learnSkill,
        currentUser: req.user,
      });
    }

    const iKnow = knowSkill.toLowerCase();
    const wantToLearn = learnSkill.toLowerCase();

    const posts = await Post.find();

    const matches = posts
      .filter(
        (post) =>
          post.knows &&
          post.wants &&
          post.knows.toLowerCase() === wantToLearn &&
          post.wants.toLowerCase() === iKnow
      )
      .map((post) => ({
        username: post.poster,
        skillOffered: post.knows,
        skillWanted: post.wants,
        description: "Music skill exchange match",
      }));

    res.render("results", {
      matches,
      skillOffered: knowSkill,
      skillWanted: learnSkill,
      currentUser: req.user,
    });
  } catch (error) {
    console.log(error);
    res.render("results", {
      matches: [],
      skillOffered: "",
      skillWanted: "",
      currentUser: req.user,
    });
  }
});

app.get("/post-skill", (req, res) => {
  if (!req.user) {
    return res.redirect("/auth");
  }

  const knowSkill = (req.query.knowSkill || "").trim();
  const learnSkill = (req.query.learnSkill || "").trim();

  res.render("post-skill", {
    knowSkill,
    learnSkill,
    currentUser: req.user,
  });
});

app.post("/post-skill", async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth");
  }

  try {
    const knowSkill = (req.body.knowSkill || "").trim();
    const learnSkill = (req.body.learnSkill || "").trim();

    if (!knowSkill || !learnSkill) {
      return res.redirect("/post-skill");
    }

    const newPost = new Post({
      poster: req.user.username,
      knows: knowSkill,
      wants: learnSkill,
    });

    await newPost.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/post-skill");
  }
});

app.get("/dashboard", async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth");
  }

  try {
    const posts = await Post.find({ poster: req.user.username });

    res.render("dashboard", {
      posts,
      trades: [],
      currentUser: req.user,
    });
  } catch (error) {
    console.log(error);
    res.render("dashboard", {
      posts: [],
      trades: [],
      currentUser: req.user,
    });
  }
});

app.get("/trade", async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth");
  }

  try {
    const tradePostId = req.query.postId || "";
    let tradePost = null;
    let partner = null;

    if (tradePostId) {
      tradePost = await Post.findById(tradePostId);
      if (tradePost) {
        partner = { username: tradePost.poster };
      }
    }

    res.render("trade", {
      currentUser: req.user,
      tradePost,
      partner,
      messages: [],
    });
  } catch (error) {
    console.log(error);
    res.render("trade", {
      currentUser: req.user,
      tradePost: null,
      partner: null,
      messages: [],
    });
  }
});

app.post("/trade/accept", async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth");
  }

  try {
    const postId = req.body.postId || "";

    if (postId) {
      await Post.findByIdAndUpdate(postId, { accepted: true });
      return res.redirect(`/trade?postId=${postId}`);
    }

    res.redirect("/trade");
  } catch (error) {
    console.log(error);
    res.redirect("/trade");
  }
});

app.post("/trade/message", (req, res) => {
  if (!req.user) {
    return res.redirect("/auth");
  }

  const postId = req.body.postId || "";
  res.redirect(postId ? `/trade?postId=${postId}` : "/trade");
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

mongoose
  .connect("mongodb://127.0.0.1:27017/soundtrade")
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));