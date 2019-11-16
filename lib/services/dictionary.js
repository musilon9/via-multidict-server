'use strict';

const Schmervice = require('schmervice');

const Google = require('../providers/definitions/google');
const Oxford = require('../providers/definitions/oxford');
const Webster = require('../providers/definitions/webster');

const withCustomFields = (definitions) => {

    for (let i = 0; i < definitions.length; ++i) {
        definitions[i].order = i;
        definitions[i].note = '';
    }

    return definitions;
};

module.exports = class DictionaryService extends Schmervice.Service {

    async getWord(word) {

        const { Word } = this.server.app.models;

        const wordFromDb = await Word.find({ word });
        if (wordFromDb.length) {
            return wordFromDb[0];
        }

        const results = await Promise.allSettled(
            [
                Google,
                Oxford,
                Webster
            ].map((provider) => provider.define(word))
        );

        results.forEach((r) => r.status === 'rejected' && this.server.log('error', r.reason));

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

