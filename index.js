const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bikeTypeRoutes = require('./routes/bikeTypeRoutes');
const bikeModelRoutes = require('./routes/bikeModelRoutes');
const bikeRoutes = require('./routes/bikeRoutes');

// Load env variables
dotenv.config();

// Initialize app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes

app.get('/',async (req, res)=>{
  res.send("Backed Runing");
});


app.use('/api/auth', authRoutes);
app.use("/api/bike-types", bikeTypeRoutes);
app.use("/api/bike-models", bikeModelRoutes);
app.use("/api/bikes", bikeRoutes);

// Connect DB and Start Server
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Server failed to start:', err);
  }
};

startServer();
