const mongoose = require('mongoose');
const Game = require('./models/Game');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gamevaultx';

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('Connected to DB');
        const count = await Game.countDocuments();
        console.log(`Total Games: ${count}`);

        const games = await Game.find({}, 'title yearRange');
        console.log('Games found:');
        games.forEach(g => console.log(`- ${g.title} (${g.yearRange})`));

        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
