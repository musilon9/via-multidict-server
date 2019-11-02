'use strict';

const Wreck = require('@hapi/wreck');
const Mappers = require('./mappers/oxfordMappers');

const extractDefinitions = (word) => {

    const { lexicalEntries } = word;
    const results = [];
    for (const lexEntry of lexicalEntries) {
        for (const entry of lexEntry.entries) {
            for (const sense of entry.senses) {
                results.push({
                    definition: Mappers.getDefinition(sense),
                    examples: Mappers.getExamples(sense),
                    synonyms: [],
                    source: 'Oxford',
                    wordType: Mappers.getWordType(lexEntry),
                    pronunciation: Mappers.getPronunciation(lexEntry)
                });
            }
        }
    }

    return results;
};

module.exports = {
    define: async (word, request) => {

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

            request.log('error', err);
            throw err;
        });

        const { results } = payload;

        request.log('info', 'oxford OK');

        try {
            return results.flatMap(extractDefinitions);
        }
        catch (err) {
            request.log('error', err);
        }
    }
};
