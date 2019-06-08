
import {envValidator} from './server/config/env.conf.js';
import helmet from 'helmet';
  envValidator();
import express from 'express';
import socketio from 'socket.io';
import compression from 'compression';
let cors = require('cors');


// Load Node http module
import http from 'http';
let app = express();
let server = http.createServer(app);
let io = socketio.listen(server);
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import passport from 'passport';
import base from './sockets/base';
base(io);

// Set the port for this app
let port = process.env.PORT || 8080;

import passportConf from './server/config/passport.conf.js';
passportConf(passport);


if (process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test')
  app.use(morgan('dev'));

app.use(cors());
app.use(compression())
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));


// Override with the X-HTTP-Method-Override header in the request. Simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    }
    else {
      next()
    }
  });
}

app.use(express.static(__dirname + '/dist'));
app.use(helmet());
app.use(passport.initialize());

import routes from './server/routes';
routes(app);

  //ALL requests get routed through to index.html to ensure app is used
app.get('*', (req, res) => {
  console.log('working');
    res.sendFile('/dist/index.html', {root: __dirname + "/"});
});


server.listen(port);

// Shoutout to the user
console.log(`Internet Bears have collected buddies on port: ${port}`);

//Lazy work around for uptime on heroku
setInterval(function() {
  http.get("http://buddytrakr.herokuapp.com");
}, 300000);