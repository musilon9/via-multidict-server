'use strict';

const Helpers = require('../helpers');
const Joi = require('@hapi/joi');

const DictionaryService = require('../servicees/dictionary');

module.exports = Helpers.withDefaults({
    method: 'get',
    path: '/words/{word}',
    options: {
        validate: {
            params: Joi.object({
                word: Joi.string().required()
            })
        }
    },
    handler: async (request) => {

        const { word } = request.params;

        return await DictionaryService.getWord(word, request);
    }
});
