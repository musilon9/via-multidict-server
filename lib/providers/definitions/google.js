'use strict';

const Wreck = require('@hapi/wreck');

const extractDefinitions = (word) => {

    const { meaning, phonetic } = word;
    const results = [];
    for (const wordType in meaning) {
        for (const def of meaning[wordType]) {
            results.push({
                ...def,
                source: 'Google',
                wordType,
                pronunciation: phonetic
            });
        }
    }

    return results;
};

module.exports = {
    define: async (word) => {

        const { payload } = await Wreck.get(
            `https://googledictionaryapi.eu-gb.mybluemix.net/?define=${word}&lang=en`,
            {
                json: true
            }
        ).catch((err) => {

            throw err;
        });

        const results = payload;

        return [].concat(results.map(extractDefinitions));
        // return {
        //     word: results[0].word,
        //     definitions: [].concat(results.map(extractDefinitions))
        // };
    }
};
