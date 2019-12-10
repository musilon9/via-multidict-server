'use strict';

const Mongoose = require('mongoose');

module.exports = {
    name: 'User',
    schema: new Mongoose.Schema({
        username: {
            type: String,
            unique: true
        },
        password: String,
        dictionary: {
            queryHistory: [{
                word: String,
                timestamp: Number
            }]
        },
        stored: {
            cards: [{
                word: String,
                source: String,
                wordType: String,
                pronunciation: String,
                definition: String,
                examples: [String],
                synonyms: [String],
                note: String,
                order: Number
            }]
        }
    })
};
