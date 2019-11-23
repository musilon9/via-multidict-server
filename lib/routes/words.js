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
        },
        auth: {
            strategy: 'jwt',
            mode: 'optional'
        }
    },
    handler: async (request) => {

        const { word } = request.params;
        const { dictionaryService, userService } = request.services();

        const wordDictionaryData = await dictionaryService.getWord(word);

        if (request.auth.credentials) {
            userService.saveWordToHistory(word, request.auth.credentials);
        }

        return wordDictionaryData;
    }
});
