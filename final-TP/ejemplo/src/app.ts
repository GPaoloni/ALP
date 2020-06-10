import * as express from 'express';
import * as compression from 'compression'; // compresses requests
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as lusca from 'lusca';
import * as mongo from 'connect-mongo';
import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';
import * as expressJwt from 'express-jwt';
import router from './routes';
import config from './config';

const MongoStore = mongo(session);

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = config.MONGODB_URI;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(mongoose as any).Promise = bluebird;

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);

mongoose
  .connect(mongoUrl)
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch((err: any) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    // process.exit();
  });

// Express configuration
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: config.SESSION_SECRET,
    store: new MongoStore({
      url: mongoUrl,
      autoReconnect: true,
    }),
  }),
);
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

app.use(
  expressJwt({
    secret: config.JWT_SECRET,
    requestProperty: 'auth',
    getToken: function fromHeader(req: express.Request) {
      const tokenHeader = req.headers.Authorization || req.headers.authorization;
      if (tokenHeader && (tokenHeader as string).split(' ')[0] === 'Bearer') {
        return (tokenHeader as string).split(' ')[1];
      }
    },
  }).unless({
    path: [/\/api-docs\//g, { url: '/', method: 'OPTIONS' }, /\/auth\//g],
  }),
);

app.use(function (
  err: any,
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: express.NextFunction,
) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      msg: 'Invalid or no token supplied',
      code: 401,
    });
  }
});

app.use('/', router);

app.use((req: express.Request, resp: express.Response) => {
  resp.status(404).send({
    msg: 'Not Found!',
  });
});

export default app;
