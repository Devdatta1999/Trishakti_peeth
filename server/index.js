const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware - CORS must be before other middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB (non-blocking)
connectDB().catch(err => {
  console.error('⚠️  MongoDB connection failed on startup:', err.message);
  console.error('⚠️  Server will continue running, but database operations will fail.');
  console.error('⚠️  Please check your MongoDB connection string and credentials.');
});

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Volunteer API
app.post('/api/volunteer', async (req, res) => {
  try {
    console.log('Received volunteer data:', req.body);
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'address', 'state', 'district'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    let db;
    try {
      db = await connectDB();
    } catch (dbError) {
      console.error('MongoDB connection failed:', dbError.message);
      // For testing: return success even if DB fails (remove this in production)
      if (process.env.NODE_ENV === 'development' && process.env.ALLOW_TEST_MODE === 'true') {
        console.log('⚠️  TEST MODE: Simulating successful save (MongoDB not connected)');
        return res.status(201).json({
          success: true,
          message: 'Volunteer information saved successfully (TEST MODE - not saved to DB)',
          testMode: true,
          data: req.body
        });
      }
      throw dbError;
    }

    console.log('Database connected, inserting data...');
    const collection = db.collection('volunteers');
    
    const volunteerData = {
      ...req.body,
      createdAt: new Date(),
      status: 'pending'
    };

    const result = await collection.insertOne(volunteerData);
    console.log('✓ Volunteer saved successfully:', result.insertedId);
    res.status(201).json({ 
      success: true, 
      message: 'Volunteer information saved successfully',
      id: result.insertedId 
    });
  } catch (error) {
    console.error('✗ Error saving volunteer:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Error saving volunteer information',
      error: error.message 
    });
  }
});

// Donation API
app.post('/api/donation', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('donations');
    
    const donationData = {
      ...req.body,
      createdAt: new Date(),
      paymentStatus: 'pending',
      verified: false
    };

    const result = await collection.insertOne(donationData);
    res.status(201).json({ 
      success: true, 
      message: 'Donation information saved successfully',
      id: result.insertedId 
    });
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error saving donation information' 
    });
  }
});

// Update donation payment mode
app.put('/api/donation/update-payment', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('donations');
    
    const { email, paymentMode } = req.body;
    
    const result = await collection.updateOne(
      { email: email },
      { 
        $set: { 
          paymentMode: paymentMode,
          updatedAt: new Date()
        } 
      },
      { sort: { createdAt: -1 } } // Update the most recent donation
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Donation not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Payment mode updated successfully' 
    });
  } catch (error) {
    console.error('Error updating payment mode:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating payment mode' 
    });
  }
});

// Serve React app for all other routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

