'use strict';

const Schmervice = require('schmervice');
const Boom = require('@hapi/boom');
const R = require('ramda');

const Google = require('../providers/definitions/google');
const Oxford = require('../providers/definitions/oxford');
const Webster = require('../providers/definitions/webster');

const providers = [Google, Oxford, Webster];

module.exports = class DictionaryService extends Schmervice.Service {
    async getWord(word) {

        const { Word } = this.server.app.models;

        const wordFromDb = await Word.find({ word });
        if (wordFromDb.length) {
            return wordFromDb[0];
        }

        const results = await Promise.allSettled(
            providers.map((provider) => provider.define(word))
        );
        results.forEach((r) => r.status === 'rejected' && this.server.log('error', r.reason));

        const definitionsByProvider = results.map((r) => r.value || [])
            .filter((defs) => defs.length);
        if (!definitionsByProvider.length) {
            throw Boom.notFound();
        }

        const wordFromDict = {
            word,
            definitions: definitionsByProvider.flat(),
            note: ''
        };

        if (definitionsByProvider.length === providers.length) {
            Word.create(wordFromDict, (error) => this.server.log('error', error));
        }

        return wordFromDict;
    }

    getSourceInfo() {

        return R.map(R.pick(['sourceName', 'searchUrl']))(providers);
    }
};

