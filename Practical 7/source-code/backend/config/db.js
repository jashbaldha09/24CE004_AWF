const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  try {
    if (uri && !uri.includes('localhost') && !uri.includes('127.0.0.1')) {
      console.log('Attempting connection to MongoDB Atlas...');
      const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });
      console.log(`Connected to MongoDB Atlas: ${conn.connection.host}`);
      return conn;
    }
  } catch (err) {
    console.warn(`MongoDB Atlas connection timed out: ${err.message}. Initializing local in-memory MongoDB server...`);
  }

  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    const memUri = mongod.getUri();
    const conn = await mongoose.connect(memUri);
    console.log(`Connected to local MongoDB database at: ${memUri}`);
    return conn;
  } catch (memErr) {
    console.error('Failed to initialize MongoDB:', memErr.message);
    throw memErr;
  }
};

module.exports = connectDB;
