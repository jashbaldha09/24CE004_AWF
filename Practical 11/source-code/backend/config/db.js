const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskmanager_db';
    console.log(`[Docker DB]: Connecting to MongoDB via: ${connUri}`);
    
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 5000
    });

    console.log(`[Docker DB]: MongoDB Connected successfully to host: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error(`[Docker DB Error]: ${err.message}`);
    throw err;
  }
};

module.exports = connectDB;
