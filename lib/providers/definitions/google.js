'use strict';

/* eslint @hapi/hapi/no-arrowception: 0 */
/* eslint @hapi/hapi/scope-start: 0 */

const Wreck = require('@hapi/wreck');

const extractDefinitions = (word) => {

    const { meaning, phonetic } = word;
    const results = [];
    for (const wordType in meaning) {
        // noinspection JSUnfilteredForInLoop
        for (const def of meaning[wordType]) {
            // noinspection JSUnfilteredForInLoop
            results.push({
                definition: def.definition,
                examples: def.example ? [def.example] : [],
                synonyms: def.synonyms,
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

        return payload.flatMap(extractDefinitions);
    }
};
