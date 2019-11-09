'use strict';

const R = require('ramda');

const removeTags = R.replace(/\{(.*?)\}/g)('');

const sensesFromWord = R.pipe(
    R.prop('def'),
    R.map(R.pipe(
        R.prop('sseq'),
        R.unnest,
        R.filter(R.pathEq([0], 'sense')),
        R.map(R.path([1, 'dt'])),
    ))
);

const definitionFromSense = R.pipe(
    R.unnest,
    R.filter(R.pathEq([0], 'text')),
    R.map(R.pipe(R.nth(1), removeTags, R.trim)),
    R.reject(R.isEmpty),
    R.reject(R.invoker(1, 'startsWith')('see also')),
    R.join('; ')
);

const examplesFromSense = R.pipe(
    R.unnest,
    R.filter(R.pathEq([0], 'vis')),
    R.map(R.nth(1)),
    R.unnest,
    R.map(R.pipe(R.prop('t'), removeTags, R.trim))
);

const wordType = R.prop('fl');

const pronunciation = R.pipe(
    R.prop('hwi'),
    R.props(['prs', 'altprs']),
    R.reject(R.isNil),
    R.head,
    R.pathOr('')([0, 'ipa']),
    R.trim
);

module.exports = {
    getSenses: sensesFromWord,
    getDefinition: definitionFromSense,
    getExamples: examplesFromSense,
    getWordType: wordType,
    getPronunciation: pronunciation
};
