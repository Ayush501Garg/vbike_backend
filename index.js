const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const bikeTypeRoutes = require('./routes/bikeTypeRoutes');
const bikeModelRoutes = require('./routes/bikeModelRoutes');
const bikeRoutes = require('./routes/bikeRoutes');
const bikeRegisterRoutes = require('./routes/bikeRegisterRoutes');
const productRoutes = require('./routes/productRoutes');

// Import socket module
const { initSocket, sendToUser } = require('./socket');
const BikeRegister = require("./models/bikeRegisterModel"); // adjust path

dotenv.config();

const app = express();
app.use(cors({ origin: '*', credentials: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('uploads'));

// ✅ Connect to MongoDB first
connectDB();

// Test route
app.get('/', (req, res) => res.send("Backend Running with Socket.IO ✅"));

// ✅ POST /api/device-data
app.post("/api/device-data", async (req, res) => {
  try {
    const deviceId = req.headers["device-id"];
    if (!deviceId) {
      return res.status(400).json({
        status: "error",
        message: "Device ID header required",
      });
    }

    const bodyData = req.body;
    console.log("📩 API hit => DeviceID:", deviceId.trim(), "Body:", bodyData);

    // 🔎 Lookup bike in DB
    const bike = await BikeRegister.findOne({ bikeId: deviceId.trim() });

    if (!bike) {
      return res.status(404).json({
        status: "error",
        message: "Bike not found for this deviceId",
      });
    }

    const userId = bike.user_id;

    // 🔥 Emit to all active devices of this user
    sendToUser(userId, { deviceId, userId, body: bodyData });

    res.status(201).json({
      status: "success",
      message: "Data sent to user",
      userId,
      deviceId,
      body: bodyData,
    });
  } catch (err) {
    console.error("❌ Error in /api/device-data:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Create HTTP server + attach Socket.IO
const server = http.createServer(app);
initSocket(server);

// Other API routes
app.use('/api/auth', authRoutes);
app.use("/api/bike-types", bikeTypeRoutes);
app.use("/api/bike-models", bikeModelRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/bike-register", bikeRegisterRoutes);
app.use('/api/products', productRoutes);

// Start server
server.listen(8000, () => console.log("🚀 Server running on port 8000"));
