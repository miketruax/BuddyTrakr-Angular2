
//Loads authentication routes
import authRoutes from './routes/_authentication.routes.js';

//Imports all API routes
import buddyRoutes from './routes/_buddy.routes.js';
let jwt = require('jsonwebtoken');

export default (app, router, passport) => {


  router.use((req, res, next) => {
    next();
  });

  let auth = (req, res, next) => {
    if(req.isAuthenticated()){
      next();
    }
    else{
      res.send(401);
    }
  };


  //Admin routes
  let admin = (req, res, next) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin')
      res.send(401);

    else
      next();
  };

  //Applies auth routes to router
  authRoutes(app, router, passport, auth, admin);

  //applies buddy routes to router
  buddyRoutes(app, router, passport, auth);

	//applies api routes
	app.use('/api', router);

  //ALL requests get routed through to index.html to ensure app is used
  app.get('*', (req, res) => {
      res.sendFile('/dist/index.html', {root: __dirname + "/../"});
  });
};
