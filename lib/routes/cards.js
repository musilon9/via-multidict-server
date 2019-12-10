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
        handler: (request) => {

            const { cardService } = request.services();
            cardService.saveWordCard(request.payload, request.auth.credentials);
        }
    },
    {
        method: 'patch',
        path: '/user/cards/{_id}',
        options: {
            auth: 'jwt'
            // payload: CardSchema // TODO partial???
        },
        handler: (request) => {

            const { _id } = request.params();
            const { cardService } = request.services();
            cardService.updateWordCard(_id, request.payload, request.auth.credentials);
        }
    },
    {
        method: 'delete',
        path: '/user/cards/{_id}',
        options: {
            auth: 'jwt'
        },
        handler: (request) => {

            const { _id } = request.params();
            const { cardService } = request.services();
            cardService.removeWordCard(_id, request.auth.credentials);
        }
    }
]);
