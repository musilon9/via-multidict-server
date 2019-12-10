'use strict';

const Joi = require('@hapi/joi');

const WordExample = require('./examples/word');

module.exports = Joi.object({
    word: Joi.string(),
    definitions: Joi.array()
        .label('array_of_definition_entries')
        .items(
            Joi.object({
                source: Joi.string(),
                wordType: Joi.string(),
                pronunciation: Joi.string(),
                definition: Joi.string(),
                examples: Joi.array().items(Joi.string()),
                synonyms: Joi.array().items(Joi.string())
            }).label('definition_entry'))
}).label('word_entry').example(WordExample);
