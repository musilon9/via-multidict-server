'use strict';

const Helpers = require('../helpers');
const Joi = require('@hapi/joi');

const UserSchema = require('../schemas/user');
const CardSchema = require('../schemas/card');

module.exports = Helpers.withDefaults([
    {
        method: 'post',
        path: '/user/cards',
        options: {
            description: 'Store definition card for current user',
            auth: 'jwt',
            validate: {
                payload: CardSchema
            },
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
        handler: async (request) => {

            const { cardService } = request.services();
            return await cardService.saveWordCard(request.payload, request.auth.credentials);
        }
    },
    {
        method: 'patch',
        path: '/user/cards/{id}',
        options: {
            description: 'Update definition card with given id',
            auth: 'jwt',
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('id of definition card to update')
                }),
                payload: CardSchema
            },
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
        handler: async (request) => {

            const { id } = request.params;
            const { cardService } = request.services();
            return await cardService.updateWordCard(id, request.payload, request.auth.credentials);
        }
    },
    {
        method: 'delete',
        path: '/user/cards/{id}',
        options: {
            description: 'Remove definition card with given id',
            auth: 'jwt',
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('id of definition card to remove')
                })
            },
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
        handler: async (request) => {

            const { id } = request.params;
            const { cardService } = request.services();
            return await cardService.removeWordCard(id, request.auth.credentials);
        }
    }
]);
