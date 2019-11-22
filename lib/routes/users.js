'use strict';

const Helpers = require('../helpers');
const Joi = require('@hapi/joi');

module.exports = Helpers.withDefaults([
    {
        method: 'post',
        path: '/users',
        options: {
            validate: {
                payload: Joi.object({
                    username: Joi.string().required(),
                    email: Joi.string().allow(''),
                    password: Joi.string().required()
                })
            }
        },
        handler: async (request) => {

            const { userService } = request.services();
            await userService.signup(request.payload);
            return {}; // TODO login automatically
        }
    }
]);
