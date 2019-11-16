'use strict';

/* eslint @hapi/hapi/no-arrowception: 0 */
/* eslint @hapi/hapi/scope-start: 0 */

const Wreck = require('@hapi/wreck');
const Mappers = require('./mappers/oxfordMappers');

const extractDefinitions = (word) =>
    word.lexicalEntries.flatMap((lexEntry) =>
        Mappers.getSenses(lexEntry)
            .map((sense) => ({
                definition: Mappers.getDefinition(sense),
                examples: Mappers.getExamples(sense),
                synonyms: [],
                source: 'Oxford',
                wordType: Mappers.getWordType(lexEntry),
                pronunciation: Mappers.getPronunciation(lexEntry)
            }))
    );

module.exports = {
    define: async (word) => {

        const { payload } = await Wreck.get(
            `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word}`,
            {
                headers: {
                    'app_id': process.env.OXFORD_APP_ID,
                    'app_key': process.env.OXFORD_APP_KEY
                },
                json: true
            }
        ).catch((err) => {

            throw err;
        });

        return payload.results
            .flatMap(extractDefinitions);
    }
};
