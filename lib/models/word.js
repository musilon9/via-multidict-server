'use strict';

const Mongoose = require('mongoose');

module.exports = {
    name: 'Word',
    schema: new Mongoose.Schema({
        word: String,
        phonetics: [{
            source: String,
            value: String
        }],
        meanings: [{
            source: String,
            wordType: String,
            definition: String,
            examples: [String],
            synonyms: [String],
            note: String,
            order: Number
        }],
        note: String
    })
};
