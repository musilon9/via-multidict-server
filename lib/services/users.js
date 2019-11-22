'use strict';

const Schmervice = require('schmervice');
const Boom = require('@hapi/boom');
const Bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const R = require('ramda');

module.exports = class UserService extends Schmervice.Service {

    async signup(user) {

        const { User } = this.server.app.models;

        try {
            await User.create({
                ...user,
                password: await Bcrypt.hash(user.password, 10)
            });
            return this.login(user);
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
            return {
                ...R.omit(['_id', 'password'])(user.toObject()),
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
