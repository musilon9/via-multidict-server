'use strict';

const Mongoose = require('mongoose');
// const Joigoose = require('joigoose')(Mongoose);

// const WordSchema = require('../schemas/word');

module.exports = {
    name: 'Word',
    // temporary fix, waiting for Joigoose compatible with Joi v16
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
    // schema: new Mongoose.Schema(Joigoose.convert(WordSchema))
};
