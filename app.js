const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

// setup view engine
app.set('view engine', 'ejs');

//connect to mongo db
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('connect to mongoose db');
});

//setup routes
app.use('/auth', authRoutes);

//create home route
app.get('/', (req, res) => {
  res.render('home');
})

app.listen(3000, () => {
  console.log('App now listening to port 3000');
});

