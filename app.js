require('dotenv').config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const indexRouter = require('./routes/index')
const groupRouter = require('./routes/group')

const mongoDb = process.env.MONGO

mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const Member = mongoose.model(
  "Member",
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
  })
);

const app = express();
app.set("views", path.join( __dirname, 'views'));
app.set("view engine", "pug");

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// app.get("/", (req, res) => res.render("index"));

app.use('/', indexRouter)
app.use("/group", groupRouter)
app.get("/sign-up", (req, res) => res.render("sign-up-form"));

app.listen(3000, () => console.log("app listening on port 3000!"));