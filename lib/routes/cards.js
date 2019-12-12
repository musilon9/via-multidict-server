'use strict';

const Helpers = require('../helpers');
const Joi = require('@hapi/joi');

const CardSchema = require('../schemas/card');

module.exports = Helpers.withDefaults([
    {
        method: 'post',
        path: '/user/cards',
        options: {
            auth: 'jwt',
            validate: {
                payload: CardSchema
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
            auth: 'jwt',
            validate: {
                params: Joi.object({
                    id: Joi.string().required()
                }),
                payload: CardSchema
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
            auth: 'jwt',
            validate: {
                params: Joi.object({
                    id: Joi.string().required()
                })
            }
        },
        handler: async (request) => {

            const { id } = request.params;
            const { cardService } = request.services();
            return await cardService.removeWordCard(id, request.auth.credentials);
        }
    }
]);
