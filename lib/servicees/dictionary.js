'use strict';

// const Schmervice = require('schmervice');

const Google = require('../providers/definitions/google');
const Oxford = require('../providers/definitions/oxford');

const withCustomFields = (definitions) => {

    for (let i = 0; i < definitions.length; ++i) {
        definitions[i].order = i;
        definitions[i].note = '';
    }

    return definitions;
};

module.exports = {

    async getWord(word, request) {

        const { Word } = request.server.app.models;
        const wordFromDb = Word.find({ word });

        if (wordFromDb.length) {
            return wordFromDb[0];
        }

        // const googleDefinitions = await Google.define(word);

        const results = await Promise.allSettled(
            [
                Google
                // Oxford
            ].map((provider) => provider.define(word))
        );

        results.forEach((r) => console.log(r.status));
        const definitions = results.map((r) => r.value || []);

        const wordFromDict = {
            word,
            definitions: definitions.flatMap(withCustomFields),
            note: ''
        };

        Word.create(wordFromDict, (error) => console.log(error));

        return wordFromDict;
    }
};

