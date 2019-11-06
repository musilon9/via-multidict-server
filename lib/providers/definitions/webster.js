'use strict';

const Wreck = require('@hapi/wreck');
const Mappers = require('./mappers/websterMappers');

// eslint-disable-next-line @hapi/hapi/no-arrowception
const headwordMatches = (query) => (word) => word.hwi.hw === query;

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
                    source: 'Merriam-Webster',
                    wordType: Mappers.getWordType(lexEntry),
                    pronunciation: Mappers.getPronunciation(lexEntry)
                });
            }
        }
    }

    return results;
};

module.exports = {
    define: async (word) => {

        const { payload } = await Wreck.get(
            `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${process.env.WEBSTER_APP_KEY}`,
            {
                json: true
            }
        ).catch((err) => {

            throw err;
        });

        const { results } = payload;

        return results
            .filter(headwordMatches(word))
            .flatMap(extractDefinitions);
    }
};
