'use strict';

const Mongoose = require('mongoose');
const Joigoose = require('joigoose')(Mongoose);

const WordSchema = require('../schemas/word');

module.exports = {
    name: 'Word',
    schema: new Mongoose.Schema(Joigoose.convert(WordSchema))
};
