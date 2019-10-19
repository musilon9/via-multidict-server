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
        const { res, payload } = await Wreck.get(
            `https://googledictionaryapi.eu-gb.mybluemix.net/?define=${word}&lang=en`
        ).catch(() => {

            throw Boom.notFound();
        });

        return payload;
    }
});
