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
                user: R.omit(['_id', 'password'])(user.toObject()),
                token
            };
        }

        throw Boom.unauthorized();
    }

    async createToken(id) {

        return await JWT.sign({ id }, this.options.jwtKey, {
            algorithm: 'HS256',
            expiresIn: '7d'
        });
    }

    getUser(auth) {

        const user = auth.credentials;
        const token = auth.token; // could be also auth.artifacts

        return {
            user: R.omit(['_id', 'password'])(user.toObject()),
            token
        };
    }

    saveWordToHistory(word, user) {

        user.dictionary.queryHistory = [
            ...user.dictionary.queryHistory.filter((w) => w !== word),
            word
        ];
        user.save();
    }
};
