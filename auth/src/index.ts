import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  console.log('starting up...');

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined!');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongodb');
  } catch (err) {
    console.log(err);
  }
};

start();

app.listen(3000, () => {
  console.log('Listening on port 3000!!!');
});

// express catches errors in the sync code blocks
// in async code blocks we should depend on the next function .
