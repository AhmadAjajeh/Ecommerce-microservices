import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

let mongo: MongoMemoryServer;
jest.mock('../nats-wrapper');
// jest.mock('../stripe');

process.env.STRIPE_KEY =
  'sk_test_51P0UnxFAdzgeyK2WAR8Nx3Lza41xkvZ2m5grKnBxXfZWtpiSmIaiuQCyMFUX09FyRW9i65aEt9AYEXY1vu2xG7TW00X6XxqRI5';

beforeAll(async () => {
  process.env.JWT_KEY = 'secret';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();

  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

declare global {
  var signin: (id?: string) => string[];
}

global.signin = (id?: string) => {
  // build a jwt payload. {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId(),
    email: 'test@test.com',
  };

  // create the jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build session object
  const session = { jwt: token };

  // turn that session into json
  const sessionJSON = JSON.stringify(session);

  // take the json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string that the cookie with an encoded data
  return [`session=${base64}`];
};
