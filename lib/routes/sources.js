'use strict';

const Helpers = require('../helpers');
const Joi = require('@hapi/joi');

module.exports = Helpers.withDefaults({
    method: 'get',
    path: '/sources/dictionaries',
    options: {
        description: 'Get info about source dictionaries',
        plugins: {
            'hapi-swagger': {
                responses: {
                    200: {
                        description: 'Info about source dictionaries',
                        schema: Joi.array().items(Joi.object({
                            sourceName: Joi.string(),
                            searchUrl: Joi.string()
                        }))
                    }
                }
            }
        }
    },
    handler: (request) => {

        const { dictionaryService } = request.services();
        return dictionaryService.getSourceInfo();
    }
});
