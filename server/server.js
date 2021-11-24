const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const entryController = require('./controllers/EntryController.js');
const userController = require('./controllers/userController')

//intialize port 3000 const
const PORT = 3000;

//init your server as app
const app = express();


//url encoded and json body parsers
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const entryRouter = express.Router();
// app.use('/test', entryRouter);

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

/////////////////////////// ROUTE HANDLERS //////////////////////////////////

// create a new user
app.post('/users/signup', userController.registerUser, (req, res) => {
  return res.status(200).redirect('/');
});

// login a user
app.post('/users/login', userController.loginUser, (req, res) => {
  return res.status(200).redirect('/');
});

// display all journal entries in DB
app.get('/api', entryController.getEntries, (req, res) => {
  return res.json(res.locals.entries)
});

// create a journal entry
app.post('/api/test', entryController.createEntry, (req, res) => {
  return res.status(200).redirect('/');
});

// find a journal entry
app.get('/api/test', entryController.getEntry, (req, res) => {
  return res.status(200).json('Entry found')
});

// update a journal entry
app.put('/api/update/:entryId', entryController.updateEntry, (req, res) => {
  return res.status(200).json('Entry updated successfully')
});

// delete a journal entry
app.delete('/api/delete/:entryId', entryController.deleteEntry, (req, res) => {
  // res.json('This works');
  return res.status(200).json('deleted successfully');
});

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
