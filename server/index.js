'use strict';

const Glue = require('@hapi/glue');
const Manifest = require('./manifest');


const DictionaryService = require('../lib/servicees/dictionary');

require('dotenv').config();

exports.deployment = async (start) => {

    const manifest = Manifest.get('/');
    const server = await Glue.compose(manifest, { relativeTo: __dirname });

    await server.initialize();

    server.method('getWord', DictionaryService.getWord);

    // await server.register(Schmervice);
    // server.registerService(DictionaryService);

    if (!start) {
        return server;
    }

    await server.start();

    console.log(`Server started at ${server.info.uri}`);

    return server;
};

if (!module.parent) {

    exports.deployment(true);

    process.on('unhandledRejection', (err) => {

        throw err;
    });
}
