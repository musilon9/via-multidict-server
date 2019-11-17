'use strict';

const Joi = require('@hapi/joi');

const WordExample = require('./examples/word');

module.exports = Joi.object({
    word: Joi.string(),
    definitions: Joi.array()
        .label('array of definition entries')
        .items(
            Joi.object({
                source: Joi.string(),
                wordType: Joi.string(),
                pronunciation: Joi.string(),
                definition: Joi.string(),
                examples: Joi.array().items(Joi.string()),
                synonyms: Joi.array().items(Joi.string())
            }).label('definition entry')),
    note: Joi.string().allow('')
}).label('word entry').example(WordExample);
