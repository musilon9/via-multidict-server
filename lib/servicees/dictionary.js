'use strict';

// const Schmervice = require('schmervice');

const Google = require('../providers/dictionaries/google');

const addCustomFields = (word) => {

    for (const meaning of word.meanings) {
        meaning.note = '';
        meaning.order = 1;
    }

    word.note = '';
};

module.exports = {

    async getWord(word, request) {

        const { Word } = request.server.app.models;
        const wordFromDb = Word.find({ word });

        if (wordFromDb.length) {
            return wordFromDb[0];
        }

        const wordFromDict = await Google.define(word);
        addCustomFields(wordFromDict);

        Word.create(wordFromDict, (error) => console.log(error));

        return wordFromDict;
    }
};

