'use strict';

/* eslint @hapi/hapi/no-arrowception: 0 */
/* eslint @hapi/hapi/scope-start: 0 */

const Wreck = require('@hapi/wreck');

const extractDefinitions = (word) =>
    Object.keys(word.meaning).flatMap((wordType) =>
        word.meaning[wordType].map((def) => ({
            definition: def.definition,
            examples: def.example ? [def.example] : [],
            synonyms: def.synonyms,
            source: 'Google',
            wordType,
            pronunciation: word.phonetic
        }))
    );

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

        return payload
            .flatMap(extractDefinitions);
    }
};
