require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gamevaultx';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/games', gameRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.send('GameVault X API is running');
});

// Health check route
app.get('/api/health', async (req, res) => {
    let connectionState = mongoose.connection.readyState;
    let errorMsg = null;

    // If not connected, try to connect explicitly to capture the error
    if (connectionState !== 1) {
        try {
            console.log('Attempting to reconnect to MongoDB...');
            await mongoose.connect(MONGODB_URI);
            connectionState = mongoose.connection.readyState;
        } catch (err) {
            console.error('Reconnect Error:', err);
            errorMsg = err.message;
        }
    }

    res.status(connectionState === 1 ? 200 : 500).json({
        status: 'UP',
        database: connectionState === 1 ? 'connected' : 'disconnected',
        readyState: connectionState, // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
        envVarLength: MONGODB_URI ? MONGODB_URI.length : 0, // Check if Env Var exists (don't show value)
        error: errorMsg,
        timestamp: new Date().toISOString()
    });
});

// Database Connection
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('MongoDB Connected');
        // Only start server if NOT in production (Vercel handles startup)
        if (process.env.NODE_ENV !== 'production') {
            app.listen(PORT, () => {
                console.log(`Server running on http://localhost:${PORT}`);
            });
        }
    })
    .catch(err => console.error('MongoDB Connection Error:', err));

// Export for Vercel
module.exports = app;
