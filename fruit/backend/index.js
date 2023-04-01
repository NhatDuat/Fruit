import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import fruitRoute from './routers/fruits.js';
import userRoute from './routers/users.js';
import authRoute from './routers/auth.js';
import reviewRoute from './routers/review.js';
import bookingRoute from './routers/bookings.js';



dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin:true,
  Credentials:true
}

//database connection
mongoose.set('strictQuery', false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 50,
      wtimeoutMS: 2500,
      useNewUrlParser: true,
      // userNewUrlParser:true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB database connected');
  } catch (err) {
    // if (err) console.error(err)
    console.log('MongoDB database connection failed');
  }
};

// for testing
// app.get('/', (req, res) => {
//   res.send('api is working');
// });

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/v1/fruits', fruitRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);




app.listen(port, () => {
  connect();
  console.log('server listening on port', port);
});
