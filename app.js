require('dotenv').config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./models/user");

const indexRouter = require('./routes/index')
const groupRouter = require('./routes/group')

const mongoDb = process.env.MONGO

mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// const Member = mongoose.model(
//   "Member",
//   new Schema({
//     username: { type: String, required: true },
//     password: { type: String, required: true }
//   })
// );
const app = express();

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));



app.use(function(req,res, next) {
	res.locals.currentUser = req.user;
	next();
});


app.set("views", path.join( __dirname, 'views'));
app.set("view engine", "pug");


// app.get("/", (req, res) => res.render("index"));

app.use('/', indexRouter)
app.use("/group", groupRouter)
app.get("/sign-up", (req, res) => res.render("sign-up-form"));

passport.serializeUser(function(user,done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ username: username}, (err, user) => {
			if(err){
				return done(err);
			}
			if (!user) {
                console.log("wrong email")
				return done(null, false, { message: "Incorrect username" });
			}
			if (user.password !== password){
                console.log("wrong password")
				return done(null, false, { message: "Incorrect password" });
			}
			return done (null, user)
		});
	})
);

app.post(
	"/log-in",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/"
	})
);


app.get("/log-out", (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/");

	});
});


// app.get("/group", (req, res) => {
//     res.render("index", { user: req.user });
//   });

app.listen(3000, () => console.log("app listening on port 3000!"));