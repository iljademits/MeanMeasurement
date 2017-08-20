const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const mongoose = require('mongoose');
const config = require('./config/database')

// connect to the database
mongoose.connect(config.database);
// Gives a deprecation warning, and documentation suggests to use below code
// mongoose.connect(config.database, {useMongoClient: true});
// This times out the request though

// on connection
mongoose.connection.on('connected', () => {
  console.log('connected to database' + config.database);
});

// on error
mongoose.connection.on('error', (err) => {
  console.log('Error connecting to database: ' + err);
});

const app = express();

// Files where the routes are defined
const users = require('./routes/users');
const measurements = require('./routes/measurements');
const parameters = require('./routes/parameters');

// Port number used by the app
const port = 3000;

// Set Static folder
app.use(express.static(path.join(__dirname, 'public'))); // Where the Angular front end resides

// CORS middleware
app.use(cors()); // Handles the requests for resources on other domains

// body-parser middleware
app.use(bodyParser.json()); // Parses data from form e.g.

// Passport middleware, handles the authentication
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/measurements', measurements);
app.use('/parameters', parameters);

// Index Route
app.get('/', (req, res) => {
  res.send('Ongeldig eindpunt!');
});

// Starts server
app.listen(port, () => {
  console.log('Server started on port: ' + port);;
});
