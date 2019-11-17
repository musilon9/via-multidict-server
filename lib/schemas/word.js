'use strict';

const Joi = require('@hapi/joi');

module.exports = Joi.object({
    word: Joi.string(),
    definitions: Joi.array().items(
        Joi.object({
            source: Joi.string(),
            wordType: Joi.string(),
            pronunciation: Joi.string(),
            definition: Joi.string(),
            examples: Joi.array().items(Joi.string()),
            synonyms: Joi.array().items(Joi.string())
        }).label('definition entry')).label('array of definition entries'),
    note: Joi.string().allow('')
}).label('word entry');
