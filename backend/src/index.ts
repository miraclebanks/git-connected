import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import routes from './routes/index';
import path from 'path';
import mongoStore from 'connect-mongo';

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `${process.env.FRONTEND_DEV_URL}`,
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  })
);
app.use(
  morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined', {
    skip: function (req, res) {
      return res.statusCode >= 400;
    },
    stream: process.stdout,
  })
);
app.set('trust proxy', 1);

let MONGODB_URL = '';

process.env.NODE_ENV !== 'production'
  ? (MONGODB_URL = `${process.env.DEVELOPMENT_MONGODB_URL}`)
  : (MONGODB_URL = `${process.env.PRODUCTION_MONGODB_URL}`);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 60000, //1Sec * 1H * 24 = 1 Day
      secure: process.env.NODE_ENV !== "production" ? false : true
    }
    ,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      mongoUrl: `${MONGODB_URL}`,
    }),
  })
);
app.use((err: any, req: any, res: any, next: any) => {
  if (!err.status) err.status = 500;

  return res.status(err.status).json({ error: err.toString() });
});

// Passport
import './config/passport/passport';
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', routes);

// Database
import './config/database';

// Production Deploy
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || process.env.BACKEND_DEV_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
