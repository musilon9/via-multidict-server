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
            queryHistory: [String]
        }
    })
};
