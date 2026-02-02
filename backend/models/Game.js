const mongoose = require('mongoose');

const systemSpecSchema = new mongoose.Schema({
    os: { type: String, required: true },
    cpu: { type: String, required: true },
    gpu: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true }
}, { _id: false });

const editionSchema = new mongoose.Schema({
    name: { type: String, required: true, enum: ['Standard', 'Deluxe', 'Ultimate'] },
    price: { type: Number, required: true }
}, { _id: false });

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    shortDescription: {
        type: String,
        required: true,
        maxLength: 300
    },
    description: { // Main concept / Gameplay loop
        type: String,
        required: true
    },
    story: { // Origin / Narrative background
        type: String,
        required: false
    },
    features: [{ // Main concepts detailed
        type: String
    }],
    genre: {
        type: String,
        required: true
    },
    developer: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    yearRange: {
        type: String,
        required: true,
        enum: ['2000-2004', '2005-2009', '2010-2014', '2015-2019', '2020-2022', '2023-Present']
    },
    posterImage: {
        type: String,
        required: true
    },
    systemRequirements: {
        minimum: { type: systemSpecSchema, required: true },
        recommended: { type: systemSpecSchema, required: true }
    },
    providers: {
        type: [{
            name: { type: String, required: true, enum: ['Steam', 'Epic Games', 'Epic', 'Xbox', 'PlayStation', 'Battle.net', 'Riot Games', 'Riot', 'Rockstar', 'Official Site', 'GSC', 'Capcom'] },
            url: { type: String, required: true },
            price: { type: Number, required: true }
        }],
        default: []
    }
}, {
    timestamps: true
});

// Index for efficient filtering by yearRange
gameSchema.index({ yearRange: 1 });

module.exports = mongoose.model('Game', gameSchema);
