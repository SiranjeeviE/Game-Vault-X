const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// GET all games
// Optional query param: ?era=2000-2009
router.get('/', async (req, res) => {
    try {
        const { era } = req.query;
        let query = {};
        if (era) {
            query.yearRange = era;
        }
        const games = await Game.find(query).sort({ releaseYear: -1 }); // Newest first
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET game by ID
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ message: 'Game not found' });
        res.json(game);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
