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
};
