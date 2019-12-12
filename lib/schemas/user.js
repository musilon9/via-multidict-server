'use strict';

const Joi = require('@hapi/joi');

const CardSchema = require('./card');
const UserExample = require('./examples/user');

module.exports = Joi.object({
    username: Joi.string(),
    password: Joi.string(),
    dictionary: Joi.object({
        queryHistory: Joi.array().items(Joi.object({
            word: Joi.string(),
            timestamp: Joi.number().integer()
        }))
    }),
    stored: Joi.object({
        cards: Joi.array().items(CardSchema)
    })
}).label('user_info');
//.example(UserExample);
