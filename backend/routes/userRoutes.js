const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'gamevault_secret_key_123';

// Middleware to verify token
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};

// @route   GET /api/user/profile
// @desc    Get current user profile with wishlist
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select('-password')
            .populate('wishlist');
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST /api/user/wishlist/:gameId
// @desc    Add game to wishlist
router.post('/wishlist/:gameId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user.wishlist.includes(req.params.gameId)) {
            user.wishlist.push(req.params.gameId);
            await user.save();
        }
        res.json(user.wishlist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   DELETE /api/user/wishlist/:gameId
// @desc    Remove game from wishlist
router.delete('/wishlist/:gameId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.gameId);
        await user.save();
        res.json(user.wishlist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
