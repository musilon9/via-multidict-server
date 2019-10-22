'use strict';

const Wreck = require('@hapi/wreck');

const extractMeanings = (word) => {

    const { meaning } = word;
    const results = [];
    for (const wordType in meaning) {
        for (const def of meaning[wordType]) {
            results.push({ ...def, wordType });
        }
    }

    return results;
};

module.exports = {
    define: async (word) => {

        const { payload } = await Wreck.get(
            `https://googledictionaryapi.eu-gb.mybluemix.net/?define=${word}&lang=en`
        ).catch((err) => {

            throw err;
        });

        const def = JSON.parse(payload)[0];

        return {
            word: def.word,
            phonetics:  def.phonetic ?
                [{
                    source: 'Google',
                    value: def.phonetic
                }]
                : [],
            meanings: extractMeanings(def)
        };
    }
};
