'use strict';

// const Schmervice = require('schmervice');

const Google = require('../providers/dictionaries/google');

module.exports = {

    async getWord(word) {

        return await Google.define(word);
    }
};

