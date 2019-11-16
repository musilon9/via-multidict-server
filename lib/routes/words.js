'use strict';

const Helpers = require('../helpers');
const Joi = require('@hapi/joi');

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
        const { dictionaryService } = request.services();

        return await dictionaryService.getWord(word);
    }
});
