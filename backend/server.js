const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection with better error handling
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kecoco_services';

console.log('🔗 Connecting to MongoDB...');
console.log(`📊 Database: ${MONGODB_URI}`);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log(`📁 Database: ${mongoose.connection.db.databaseName}`);
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error.message);
  console.log('💡 Tips:');
  console.log('   - Emeza ko MongoDB iriho');
  console.log('   - Emeza connection string muri .env');
  console.log('   - Emeza username na password');
  console.log('   - Emeza internet connection');
  process.exit(1); // Stop server if MongoDB connection fails
});

// MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('🔄 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from MongoDB');
});

// Close MongoDB connection when app stops
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('📪 MongoDB connection closed');
  process.exit(0);
});

// MongoDB Schemas
const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, default: 0 },
  duration: { type: String, default: '1-3 days' }
}, { timestamps: true });

const RequestSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  serviceType: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  documents: [String],
  priority: { type: String, default: 'Medium' }
}, { timestamps: true });

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Service = mongoose.model('Service', ServiceSchema);
const Request = mongoose.model('Request', RequestSchema);
const Admin = mongoose.model('Admin', AdminSchema);

// File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create uploads directory if it doesn't exist
    const fs = require('fs');
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only documents and images are allowed (JPEG, JPG, PNG, PDF, DOC, DOCX)'));
    }
  }
});

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'kecoco_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMessages = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
  };
  
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: {
      status: statusMessages[dbStatus] || 'Unknown',
      readyState: dbStatus
    },
    server: {
      port: PORT,
      environment: process.env.NODE_ENV || 'development'
    }
  });
});

// Test MongoDB connection
app.get('/api/test-db', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState;
    let statusMessage = '';
    
    switch(dbStatus) {
      case 0: statusMessage = 'Disconnected'; break;
      case 1: statusMessage = 'Connected'; break;
      case 2: statusMessage = 'Connecting'; break;
      case 3: statusMessage = 'Disconnecting'; break;
      default: statusMessage = 'Unknown';
    }
    
    // Test database operation
    const adminDb = mongoose.connection.db.admin();
    const pingResult = await adminDb.ping();
    
    // Get database stats
    const dbStats = await mongoose.connection.db.stats();
    
    res.json({
      database: 'MongoDB',
      status: statusMessage,
      connection: 'Healthy',
      ping: pingResult,
      timestamp: new Date().toISOString(),
      details: {
        host: mongoose.connection.host,
        port: mongoose.connection.port,
        name: mongoose.connection.name,
        collections: dbStats.collections,
        objects: dbStats.objects,
        dataSize: `${(dbStats.dataSize / 1024 / 1024).toFixed(2)} MB`
      }
    });
  } catch (error) {
    res.status(500).json({
      database: 'MongoDB',
      status: 'Error',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Admin Authentication
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Input validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }
    
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'kecoco_secret',
      { expiresIn: '24h' }
    );

    res.json({ 
      token, 
      admin: { 
        id: admin._id,
        username: admin.username 
      },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Public Routes
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find().sort({ category: 1, name: 1 });
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Error fetching services' });
  }
});

app.post('/api/requests', upload.array('documents', 5), async (req, res) => {
  try {
    const { clientName, phone, email, serviceType, description } = req.body;
    
    // Input validation
    if (!clientName || !phone || !serviceType || !description) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }
    
    const documents = req.files ? req.files.map(file => file.filename) : [];

    const newRequest = new Request({
      clientName,
      phone,
      email,
      serviceType,
      description,
      documents
    });

    await newRequest.save();
    
    // Log the request for debugging
    console.log('New service request created:', {
      id: newRequest._id,
      clientName,
      serviceType,
      timestamp: new Date().toISOString()
    });
    
    res.status(201).json({ 
      message: 'Request submitted successfully',
      requestId: newRequest._id 
    });
  } catch (error) {
    console.error('Error submitting request:', error);
    res.status(500).json({ message: 'Error submitting request' });
  }
});

// Handle file upload errors
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Maximum size is 10MB.' });
    }
  }
  res.status(500).json({ message: error.message });
});

// Protected Admin Routes
app.get('/api/admin/requests', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = status ? { status } : {};
    
    const requests = await Request.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Request.countDocuments(query);
    
    res.json({
      requests,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Error fetching requests' });
  }
});

app.put('/api/admin/requests/:id', authenticateToken, async (req, res) => {
  try {
    const { status, priority } = req.body;
    const updateData = {};
    
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    
    res.json({ 
      message: 'Request updated successfully', 
      request 
    });
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).json({ message: 'Error updating request' });
  }
});

app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    const totalRequests = await Request.countDocuments();
    const pendingRequests = await Request.countDocuments({ status: 'Pending' });
    const processingRequests = await Request.countDocuments({ status: 'Processing' });
    const completedRequests = await Request.countDocuments({ status: 'Completed' });
    const totalServices = await Service.countDocuments();

    // Get recent requests (last 7 days)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const recentRequests = await Request.countDocuments({
      createdAt: { $gte: oneWeekAgo }
    });

    res.json({
      totalRequests,
      pendingRequests,
      processingRequests,
      completedRequests,
      totalServices,
      recentRequests
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

// Get single request details
app.get('/api/admin/requests/:id', authenticateToken, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(request);
  } catch (error) {
    console.error('Error fetching request:', error);
    res.status(500).json({ message: 'Error fetching request' });
  }
});

// Delete request
app.delete('/api/admin/requests/:id', authenticateToken, async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Error deleting request:', error);
    res.status(500).json({ message: 'Error deleting request' });
  }
});

// Service Management Routes
app.get('/api/admin/services', authenticateToken, async (req, res) => {
  try {
    const services = await Service.find().sort({ category: 1, name: 1 });
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Error fetching services' });
  }
});

app.post('/api/admin/services', authenticateToken, async (req, res) => {
  try {
    const { name, description, category, price, duration } = req.body;
    
    if (!name || !description || !category) {
      return res.status(400).json({ message: 'Name, description, and category are required' });
    }
    
    const newService = new Service({
      name,
      description,
      category,
      price: price || 0,
      duration: duration || '1-3 days'
    });

    await newService.save();
    res.status(201).json({ 
      message: 'Service created successfully', 
      service: newService 
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Error creating service' });
  }
});

app.put('/api/admin/services/:id', authenticateToken, async (req, res) => {
  try {
    const { name, description, category, price, duration } = req.body;
    
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description, category, price, duration },
      { new: true, runValidators: true }
    );
    
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json({ 
      message: 'Service updated successfully', 
      service: updatedService 
    });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Error updating service' });
  }
});

app.delete('/api/admin/services/:id', authenticateToken, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Error deleting service' });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }
    
    // Here you can add email sending logic
    console.log('Contact form submission:', { name, email, phone, subject, message });
    
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending contact message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

// Search requests
app.get('/api/admin/requests/search/:query', authenticateToken, async (req, res) => {
  try {
    const { query } = req.params;
    
    const requests = await Request.find({
      $or: [
        { clientName: { $regex: query, $options: 'i' } },
        { serviceType: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });
    
    res.json(requests);
  } catch (error) {
    console.error('Error searching requests:', error);
    res.status(500).json({ message: 'Error searching requests' });
  }
});

// Dashboard analytics
app.get('/api/admin/analytics', authenticateToken, async (req, res) => {
  try {
    const monthlyRequests = await Request.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 6 }
    ]);

    const serviceStats = await Request.aggregate([
      {
        $group: {
          _id: '$serviceType',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const statusStats = await Request.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({ 
      monthlyRequests, 
      serviceStats, 
      statusStats 
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Error fetching analytics' });
  }
});

// Initialize Admin (Run once)
app.post('/api/admin/init', async (req, res) => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new Admin({
      username: 'admin',
      password: hashedPassword
    });
    await admin.save();
    
    console.log('Admin user created successfully');
    res.json({ 
      message: 'Admin initialized successfully',
      credentials: {
        username: 'admin',
        password: 'admin123'
      }
    });
  } catch (error) {
    console.error('Error initializing admin:', error);
    res.status(500).json({ message: 'Error initializing admin' });
  }
});

// Initialize Sample Services
app.post('/api/services/init', async (req, res) => {
  try {
    // Check if services already exist
    const existingServices = await Service.countDocuments();
    if (existingServices > 0) {
      return res.status(400).json({ message: 'Services already exist' });
    }
    
    const sampleServices = [
      {
        name: "Irembo Services",
        description: "All Irembo government services registration and processing including document processing, license applications, and public service registrations",
        category: "Government Services",
        price: 5000,
        duration: "1-2 days"
      },
      {
        name: "Tax Payment",
        description: "Business and personal tax payment assistance, tax clearance certificates, and tax consulting services",
        category: "Financial Services",
        price: 10000,
        duration: "1 day"
      },
      {
        name: "House Construction",
        description: "Complete construction services including project management, architectural design, and construction supervision",
        category: "Construction",
        price: 0,
        duration: "Varies by project"
      },
      {
        name: "Building Materials",
        description: "Supply of quality construction materials including cement, bricks, steel, and finishing materials",
        category: "Construction",
        price: 0,
        duration: "1-3 days"
      },
      {
        name: "Land Registration",
        description: "Land title registration, transfer of ownership, and all land-related documentation services",
        category: "Legal Services",
        price: 20000,
        duration: "1-2 weeks"
      },
      {
        name: "Plot Surveying",
        description: "Professional land surveying, plot division, boundary marking, and topographic surveys",
        category: "Surveying",
        price: 15000,
        duration: "3-5 days"
      }
    ];

    await Service.insertMany(sampleServices);
    
    console.log('Sample services created successfully');
    res.json({ 
      message: 'Sample services added successfully',
      count: sampleServices.length
    });
  } catch (error) {
    console.error('Error adding sample services:', error);
    res.status(500).json({ message: 'Error adding sample services' });
  }
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('📧 K.E COCO Services Backend is ready!');
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});