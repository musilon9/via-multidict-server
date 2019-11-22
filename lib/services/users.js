'use strict';

const Schmervice = require('schmervice');
const Boom = require('@hapi/boom');
const Bcrypt = require('bcrypt');
const Util = require('util');

const saltRounds = 10;
const pwd = {
    hash: Util.promisify(Bcrypt.hash.bind(Bcrypt)),
    verify: Util.promisify(Bcrypt.compare.bind(Bcrypt))
};

module.exports = class UserService extends Schmervice.Service {

    async signup({ password, ...userInfo }) {

        const { User } = this.server.app.models;
        const createUser = Util.promisify(User.create.bind(User));

        try {
            return await createUser({
                password: await pwd.hash(password, saltRounds),
                ...userInfo
            });
        }
        catch (dbError) {
            throw Boom.conflict();
        }
    }
};
