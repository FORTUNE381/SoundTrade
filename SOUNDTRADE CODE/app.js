const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const usersFilePath = path.join(__dirname, "data", "users.json");
const postsFilePath = path.join(__dirname, "data", "posts.json");
const tradesFilePath = path.join(__dirname, "data", "trades.json");

function readJSON(filePath) {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/auth", (req, res) => {
  res.render("auth");
});

app.get("/results", (req, res) => {
  const matches = readJSON(postsFilePath);
  res.render("results", {
    matches,
    skillOffered: "",
    skillWanted: ""
  });
});

app.get("/no-match", (req, res) => {
  res.render("no-match");
});

app.get("/post-skill", (req, res) => {
  res.render("post-skill");
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

app.get("/search", (req, res) => {
  const skillOffered = req.query.skillOffered?.trim().toLowerCase();
  const skillWanted = req.query.skillWanted?.trim().toLowerCase();

  if (!skillOffered || !skillWanted) {
    return res.redirect("/");
  }

  const posts = readJSON(postsFilePath);

  const matches = posts.filter((post) => {
    return (
      post.skillOffered.toLowerCase() === skillWanted &&
      post.skillWanted.toLowerCase() === skillOffered
    );
  });

  if (matches.length === 0) {
    return res.redirect("/no-match");
  }

  res.render("results", {
    matches,
    skillOffered: req.query.skillOffered,
    skillWanted: req.query.skillWanted
  });
});

app.post("/signup", (req, res) => {
  const { signupUsername, signupEmail, signupPassword } = req.body;

  const users = readJSON(usersFilePath);

  const existingUser = users.find(
    (user) => user.email.toLowerCase() === signupEmail.trim().toLowerCase()
  );

  if (existingUser) {
    return res.send("A user with that email already exists.");
  }

  const newUser = {
    id: users.length + 1,
    username: signupUsername.trim(),
    email: signupEmail.trim(),
    password: signupPassword.trim()
  };

  users.push(newUser);
  writeJSON(usersFilePath, users);

  res.redirect("/dashboard");
});

app.post("/login", (req, res) => {
  const { loginEmail, loginPassword } = req.body;

  const users = readJSON(usersFilePath);

  const foundUser = users.find(
    (user) =>
      user.email.toLowerCase() === loginEmail.trim().toLowerCase() &&
      user.password === loginPassword.trim()
  );

  if (!foundUser) {
    return res.send("Invalid email or password.");
  }

  res.redirect("/dashboard");
});

app.post("/post-skill", (req, res) => {
  const { username, skillOffered, skillWanted, description } = req.body;

  const posts = readJSON(postsFilePath);

  const newPost = {
    id: posts.length + 1,
    username: username.trim(),
    skillOffered: skillOffered.trim(),
    skillWanted: skillWanted.trim(),
    description: description.trim()
  };

  posts.push(newPost);
  writeJSON(postsFilePath, posts);

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

app.listen(PORT, () => {
  console.log(`SoundTrade server running at http://localhost:${PORT}`);
});