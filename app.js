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

/** Insert incoming message in the db */
const convoFunctions = require('./helper/convoFunctions');

/** UserMessage */
const UserMessage = require('./models/UserMessages');

/** Socket IO */
/** Creating Http server for Socket IO */
const http = require('http');
const server = http.createServer(app);
/** Socket */
const socketio = require('socket.io');
const User = require('./models/User');
const io = socketio(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});


/** Run when a client connection is established */

io.on('connection', socket => {
    console.log("New Web Socket Connection");

    socket.on('message', message => {
        console.log(message);
        /** Makes sure the message has the correct feild or a server error might occur */
        if (message.conversationID && message.recipientID && message.senderID) {
            
            // send message to client involed
            io.emit(message.recipientID, message);
            io.emit(message.senderID, message);
            // Save message in the db
            const convo = convoFunctions.createConvoOrAddMessage(message.senderID, message.recipientID, message.body);
        } else {
            var err = new Error("Message Feilds are wrong!")
            console.log(err);
        }
    });
});


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
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
var db = mongoose.connection; // Reffernce db
/** Logging Error Event */
db.on('error', console.error.bind(console, 'connection error:'));


/** Catching 404 Errors */
app.use(errorControllers.catch404Errors);

/** Error Handling */
app.use(errorControllers.errorHandler);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('Server running on port:', port);
});