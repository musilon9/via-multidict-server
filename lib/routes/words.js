'use strict';

const Helpers = require('../helpers');
const Joi = require('@hapi/joi');

const WordSchema = require('../schemas/word');

module.exports = Helpers.withDefaults({
    method: 'get',
    path: '/words/{word}',
    options: {
        description: 'Get list of definitions for given word',
        notes: 'Definitions come from multiple dictionaries ' +
            '(Google Dictionary, Oxford Dictionaries, Merriam-Webster Learners Dictionary)',
        validate: {
            params: Joi.object({
                word: Joi.string().required().description('Word to search for in dictionaries')
            })
        },
        auth: {
            strategy: 'jwt',
            mode: 'optional'
        },
        plugins: {
            'hapi-swagger': {
                responses: {
                    200: {
                        description: 'Dictionary data for given word',
                        schema: WordSchema
                    },
                    404: {
                        description: 'Word was not found in any of the dictionaries'
                    }
                }
            }
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
