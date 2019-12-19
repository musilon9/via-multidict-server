'use strict';

const HauteCouture = require('haute-couture');
const Package = require('../package.json');
const Mongoose = require('mongoose');

exports.plugin = {
    pkg: Package,
    name: 'MultiDict',
    register: async (server, options) => {

        // Custom plugin code can go here

        // When registering this plugin pass something like this as plugin options:
        // { mongoURI: 'mongodb://localhost/test' }
        server.app.connection = Mongoose.createConnection(process.env.MONGO_URL);

        await HauteCouture.using()(server, options);
    }
};
