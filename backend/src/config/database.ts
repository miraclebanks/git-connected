import mongoose from 'mongoose';

let MONGODB_URL = '';

process.env.NODE_ENV !== 'production'
  ? MONGODB_URL = `${process.env.DEVELOPMENT_MONGODB_URL}`
  : MONGODB_URL = `${process.env.PRODUCTION_MONGODB_URL}`;

mongoose.connect(`${MONGODB_URL}`, (err) => {
  if (err) throw err;
  console.log('MongoDB connected');
});