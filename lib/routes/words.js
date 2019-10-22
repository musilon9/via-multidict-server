'use strict';

const Helpers = require('../helpers');
const Joi = require('@hapi/joi');
const Wreck = require('@hapi/wreck');
const Boom = require('@hapi/boom');

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
        const { getWord } = request.server.methods;

        return await getWord(word, request);
    }
});
