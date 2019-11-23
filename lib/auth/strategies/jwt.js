'use strict';

const Bounce = require('@hapi/bounce');
const { NotFoundError } = require('objection');

module.exports = (server, options) => ({
    scheme: 'jwt',
    options: {
        key: options.jwtKey,
        urlKey: false,
        cookieKey: false,
        tokenType: 'Token',
        verifyOptions: { algorithms: ['HS256'] },
        validate: async (decoded, request) => {

            const { User } = request.server.app.models;

            try {
                return {
                    isValid: true,
                    credentials: await User.findById(decoded.id)
                };
            }
            catch (error) {
                Bounce.ignore(error, NotFoundError);
                return {
                    isValid: false
                };
            }
        }
    }
});
