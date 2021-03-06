'use strict';

/* eslint @hapi/hapi/no-arrowception: 0 */
/* eslint @hapi/hapi/scope-start: 0 */

const Wreck = require('@hapi/wreck');
const Mappers = require('./mappers/websterMappers');

const headwordMatches = (query) => (word) => word.hwi && word.hwi.hw.replace('*', '') === query;

const extractDefinitions = (word) =>
    Mappers.getSenses(word).flatMap((sense) =>
        Mappers.getDefinitions(sense).map((definition) => ({
            definition,
            examples: Mappers.getExamples(sense),
            synonyms: [],
            source: 'Merriam-Webster',
            wordType: Mappers.getWordType(word),
            pronunciation: Mappers.getPronunciation(word)
        }))
    );

module.exports = {
    define: async (word) => {

        const { payload } = await Wreck.get(
            `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${process.env.WEBSTER_APP_KEY}`,
            {
                json: true
            }
        );

        return payload
            .filter(headwordMatches(word))
            .flatMap(extractDefinitions);
    },

    sourceName: 'Merriam-Webster',
    searchUrl: 'https://www.merriam-webster.com/dictionary/'
};
