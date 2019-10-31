'use strict';

const Wreck = require('@hapi/wreck');

module.exports = {
    define: async (word) => {

        const { payload } = await Wreck.get(
            `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}`,
            {
                headers: {
                    'app-id': process.env.OXFORD_APP_ID,
                    'app-key': process.env.OXFORD_APP_KEY
                },
                json: true
            }
        ).catch((err) => {

            throw err;
        });

        const results = payload.results;

        return [];
    }
};
