import config from './config';
import * as errorHandler from 'errorhandler';

import app from './app';

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
// Listen on port and export server
const server = app
  .listen(config.PORT, () => {
    console.log(
      '  App is running at http://localhost:%d in %s mode',
      config.PORT,
      app.get('env'),
    );
    console.log('  Press CTRL-C to stop\n');
  })
  .on('error', (e) => {
    console.log('Error happened: ', e.message);
  });

// const server = https
//   .createServer(
//     {
//       key: fs.readFileSync(__dirname + '/config/localhost.key'),
//       cert: fs.readFileSync(__dirname + '/config/localhost.crt'),
//     },
//     app,
//   )
//   .listen(SECURE_PORT, function() {
//     console.log('Example app listening on port 3443! Go to https://localhost:3443/');
//   });

export default server;
