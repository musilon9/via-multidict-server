'use strict';

const Joi = require('@hapi/joi');

const CardExample = require('./examples/card');

module.exports = Joi.object({
    word: Joi.string(),
    source: Joi.string(),
    wordType: Joi.string(),
    pronunciation: Joi.string(),
    definition: Joi.string(),
    examples: Joi.array().items(Joi.string()),
    synonyms: Joi.array().items(Joi.string()),
    note: Joi.string().allow(''),
    order: Joi.number().integer()
}).label('definition_card');
//.example(CardExample);
