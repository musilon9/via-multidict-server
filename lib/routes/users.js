'use strict';

const Helpers = require('../helpers');
const Joi = require('@hapi/joi');

const UserSchema = require('../schemas/user');

module.exports = Helpers.withDefaults([
    {
        method: 'post',
        path: '/users',
        options: {
            description: 'Sign up a new user',
            validate: {
                payload: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required()
                })
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: {
                            description: 'Created user with api token',
                            schema: UserSchema
                        },
                        409: {
                            description: 'User with given username already exists'
                        }
                    }
                }
            }
        },
        handler: async (request) => {

            const { userService } = request.services();
            return await userService.signup(request.payload);
        }
    },
    {
        method: 'post',
        path: '/users/login',
        options: {
            description: 'Log in with username and password',
            validate: {
                payload: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required()
                })
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: {
                            description: 'User with api token',
                            schema: UserSchema
                        },
                        401: {
                            description: 'Invalid credentials'
                        }
                    }
                }
            }
        },
        handler: async (request) => {

            const { userService } = request.services();
            return await userService.login(request.payload);
        }
    },
    {
        method: 'get',
        path: '/user',
        options: {
            description: 'Get current user',
            auth: 'jwt',
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: {
                            description: 'User with api token',
                            schema: UserSchema
                        }
                    }
                }
            }
        },
        handler: (request) => {

            const { userService } = request.services();
            return userService.getUser(request.auth);
        }
    }
]);
