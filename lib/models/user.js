'use strict';

const Mongoose = require('mongoose');
const Joigoose = require('joigoose')(Mongoose);

const UserSchema = require('../schemas/user');

module.exports = {
    name: 'User',
    schema: new Mongoose.Schema(Joigoose.convert(UserSchema))
};
