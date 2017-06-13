
import {envValidator} from './config/env.conf.js';
import helmet from 'helmet';
  envValidator();
import csrf from 'csurf';
  import express from 'express';
import socketio from 'socket.io';
let log4js = require('log4js');
let logger = log4js.getLogger();
let cors = require('cors');


// Load Node http module
import http from 'http';
let app = express();
let server = http.createServer(app);
let io = socketio.listen(server);
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';

let mongoStore  = require('connect-mongo/es5')(session);
import base from './sockets/base';

base(io);

// Set the port for this app
let port = process.env.PORT || 8080;

import mongooseConf from './config/mongoose.conf.js';
mongooseConf(mongoose);
import passportConf from './config/passport.conf.js';
passportConf(passport);


if (process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test')
  app.use(morgan('dev'));

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Override with the X-HTTP-Method-Override header in the request. Simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/dist'));
app.use(helmet());


app.use(session({
  cookieName: 'session',
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: new mongoStore({
    url: process.env.MONGO_URI,
    touchAfter: 2 * 3600 // time period in seconds
  })
}));
let router = express.Router();


app.use(csrf());
app.use(function(req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});

app.use(passport.initialize());

// Persistent login sessions
app.use(passport.session());


import routes from './app/routes';
routes(app, router, passport);



server.listen(port);

// Shoutout to the user
console.log(`Internet Bears have collected buddies on port: ${port}`);

setInterval(function() {
  http.get("http://buddytrakr.herokuapp.com");
}, 300000);

// Expose app
export {app};
