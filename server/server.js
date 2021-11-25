const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
var cors = require('cors');
const bodyParser = require('body-parser');
const session = require("express-session");
require("dotenv").config();
const passport = require("passport");
const entryController = require('./controllers/EntryController.js');
const userController = require('./controllers/userController')
const initializePassport = require('../passportConfig')

initializePassport(passport);

//intialize port 3000 const
const PORT = process.env.PORT || 3000;


//init your server as app
const app = express();

app.use(session({
  // Key we want to keep secret which will encrypt all of our information
  secret: 'secret',
  // Should we resave our session variables if nothing has changes which we dont
  resave: false,
  // Save empty value if there is no vaue which we do not want to do
  saveUninitialized: false
}))

// Funtion inside passport which initializes passport
app.use(passport.initialize())
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(passport.session());

//url encoded and json body parsers
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// const entryRouter = express.Router();
// app.use('/test', entryRouter);

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

/////////////////////////// ROUTE HANDLERS //////////////////////////////////

// create a new user
app.post('/users/signup', userController.registerUser, checkAuthenticated, (req, res) => {
  return res.status(200).json({user_id: res.locals.user_id})
});


// login a user
app.post('/users/login', userController.loginUser, checkAuthenticated, (req, res) => {
  return res.status(200).json({user_id: res.locals.user_id})
});

// display all journal entries in DB
app.get('/api', entryController.getEntries, checkNotAuthenticated, (req, res) => {
  return res.json(res.locals.entries)
});

// create a journal entry
app.post('/api/test', entryController.createEntry, (req, res) => {
  return res.status(200).redirect('/');
});

// find a journal entry
app.get('/api/test', entryController.getEntry, (req, res) => {
  return res.status(200).json('Entry found');
});

// update a journal entry
app.put('/api/update/:entryId', entryController.updateEntry, (req, res) => {
  return res.status(200).json('Entry updated successfully');
});

// delete a journal entry
app.delete('/api/delete/:entryId', entryController.deleteEntry, (req, res) => {
  // res.json('This works');
  return res.status(200).json('deleted successfully');
});


app.post("/users/login", passport.authenticate("local", {
  successRedirect: "/maincontainer",
  failureRedirect: "/users/login",
})
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/maincontainer");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/users/login");
}



// /////////////////////////////////////////////////////////////////////////////
// //test to send main file to 3000
app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/index.html'));
});

//404 error handler
app.use('*', (req, res) => {
  return res
    .status(418)
    .json("Could not find what you're looking for so you're a teapot");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
