'use strict';

const Mongoose = require('mongoose');

module.exports = {
    name: 'User',
    schema: new Mongoose.Schema({
        username: {
            type: String,
            unique: true
        },
        email: String,
        password: String
    })
};
