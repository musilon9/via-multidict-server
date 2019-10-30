'use strict';

const Mongoose = require('mongoose');

module.exports = {
    name: 'Word',
    schema: new Mongoose.Schema({
        word: String,
        definitions: [{
            source: String,
            wordType: String,
            pronunciation: String,
            definition: String,
            examples: [String],
            synonyms: [String],
            note: String,
            order: Number
        }],
        note: String
    })
};
