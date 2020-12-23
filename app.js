const express = require('express');
/** Body Parsr */
var bodyParser = require('body-parser');
const app = express();
/** Morgan Logger */
var logger = require('morgan');
/** Folder holding routes */
var routes = require('./routes/routes');
/** CORS middleware */
const corsHandler = require('./helper/cors');
/** Mongoose ORM */
var mongoose = require('mongoose');
/** Error Handling Functions */
var errorControllers = require('./controllers/errorControllers');
/** Cookies */
var cookieParser = require('cookie-parser');

/** Middlewares */
/** Logger */
app.use(logger('dev'));
/** Parsing Incoming Requests */
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
/** Cross Origin Resourse Sharing */
app.use(corsHandler.corsHandler);
/** Routes */
app.use('/', jsonParser, routes);
/** Route to view photos */
app.use('/profile-images', express.static('profile-images'));
/** Cookies Parser */
app.use(cookieParser());

/** Connect to MongoDB */
const dbURI = "mongodb+srv://omarjarkas:Da0oAcjNm0to8NnG@cluster0.cjgkn.mongodb.net/Cluster0";
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
var db = mongoose.connection; // Reffernce db
/** Logging Error Event */
db.on('error', console.error.bind(console,'connection error:'));


/** Catching 404 Errors */
app.use(errorControllers.catch404Errors);

/** Error Handling */
app.use(errorControllers.errorHandler);

const port = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log('Server running on port:',port);
});