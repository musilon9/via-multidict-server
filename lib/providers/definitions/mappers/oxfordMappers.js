'use strict';

const R = require('ramda');

const sensesFromLexEntry = R.pipe(
    R.prop('entries'),
    R.map(R.prop('senses')),
    R.unnest,
);

const definitionFromSense = R.pipe(
    R.propOr([])('definitions'),
    R.map(R.trim),
    R.join('; ')
);

const examplesFromSense = R.pipe(
    R.propOr([])('examples'),
    R.map(R.pipe(R.prop('text'), R.trim))
);

const wordType = R.pathOr('unknown')(['lexicalCategory', 'id']);

const pronunciation = R.pipe(
    R.propOr([])('pronunciations'),
    R.find(R.propEq('phoneticNotation')('IPA')),
    R.propOr('')('phoneticSpelling'),
    R.trim
);

module.exports = {

    getSenses: sensesFromLexEntry,
    getDefinition: definitionFromSense,
    getExamples: examplesFromSense,
    getWordType: wordType,
    getPronunciation: pronunciation
};
