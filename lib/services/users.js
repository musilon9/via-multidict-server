'use strict';

const Schmervice = require('schmervice');
const Boom = require('@hapi/boom');
const Bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const Util = require('util');

module.exports = class UserService extends Schmervice.Service {

    async signup({ password, ...userAttrs }) {

        const { User } = this.server.app.models;
        const createUser = Util.promisify(User.create.bind(User));

        try {
            await createUser({
                password: await Bcrypt.hash(password, 10),
                ...userAttrs
            });
            return this.login({ username: userAttrs.username, password });
        }
        catch (dbError) {
            throw Boom.conflict();
        }
    }

    async login({ username, password }) {

        const { User } = this.server.app.models;

        const user = await User.findOne({ username });

        if (user && await Bcrypt.compare(password, user.password)) {
            const token = await this.createToken(user._id);
            const { _id, password, ...userAttrs } = user.toObject();
            return {
                ...userAttrs,
                token
            };
        }

        throw Boom.unauthorized();
    }

    async createToken(id) {

        // TODO use real app secret, see manifest.js in real world example
        return await JWT.sign({ id }, 'app-secret', {
            algorithm: 'HS256',
            expiresIn: '7d'
        });
    }
};
