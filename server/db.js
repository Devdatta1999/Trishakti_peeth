const { MongoClient } = require('mongodb');

// MongoDB connection string - can be overridden with environment variable
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://dygandole_db_user:dygandole_db_pass@trishaktipeethdb.sbs1yun.mongodb.net/trishaktipeethdb?retryWrites=true&w=majority&appName=Trishaktipeethdb';
const DB_NAME = 'trishaktipeethdb';

let client = null;
let db = null;

async function connectDB() {
  if (db) {
    return db;
  }

  try {
    console.log('Attempting to connect to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log('✓ Connected to MongoDB successfully');
    console.log('✓ Database:', DB_NAME);
    return db;
  } catch (error) {
    console.error('✗ MongoDB connection error:', error.message);
    if (error.code === 8000) {
      console.error('✗ Authentication failed. Please check:');
      console.error('  1. Username and password in connection string');
      console.error('  2. IP address is whitelisted in MongoDB Atlas');
      console.error('  3. Database user has proper permissions');
    }
    throw error;
  }
}

async function closeDB() {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

module.exports = { connectDB, closeDB };

