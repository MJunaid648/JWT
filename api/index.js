const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const users = [
  {
    id: "1",
    username: "john",
    password: "John0908",
    isAdmin: true,
  },
  {
    id: "2",
    username: "jane",
    password: "Jane0908",
    isAdmin: false,
  },
];

app.use(express.json());

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      "mySecretKey"
    );
    res.json({ user_id: user.id, is_admin: user.isAdmin, access_token: token });
  } else {
    res.status(400).json("username or password is incorrect!");
  }
});

const verify = (req, res, next) => {
  const authHeader = req.header.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, mySecretKey, (err, user) => {
      if (err) return res.status(403).json("Invalid token!");
      else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json("Unauthorized!");
  }
};

app.delete("/api/users/:userId", verify, (res, res) => {});

app.listen(5000, () => console.log("server is listening to port: ", 5000));
