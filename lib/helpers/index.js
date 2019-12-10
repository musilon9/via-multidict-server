'use strict';

const Toys = require('toys');

exports.withDefaults = Toys.withRouteDefaults({
    options: {
        cors: true,
        tags: ['api'],
        validate: {
            failAction: (request, h, err) => {

                throw err;
            }
        }
    }
});
