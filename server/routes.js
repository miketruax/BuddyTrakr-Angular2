import authRoutes from './routes/_authentication.routes.js';
import buddyRoutes from './routes/_buddy.routes.js';
import userRoutes from './routes/_user.routes';

export default (app) => {

  //applies auth routes
  app.use('/api/auth/', authRoutes)
  //applies buddy routes to router
  app.use('/api/buddy/', buddyRoutes);

	//applies user Routes
	app.use('/api/user', userRoutes);

  //ALL requests get routed through to index.html to ensure app is used
  app.get('*', (req, res) => {
      res.sendFile('/dist/index.html', {root: __dirname + "/../"});
  });
};
