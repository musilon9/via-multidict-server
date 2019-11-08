'use strict';

const R = require('ramda');

const removeTags = R.replace(/\{(.*?)\}/g)('');

const sensesFromWord = R.pipe(
    R.prop('def'),
    R.map(R.pipe(
        R.prop('sseq'),
        R.unnest,
        R.filter(R.pipe(
            R.nth(0),
            R.equals('sense')
        )),
        R.map(R.pipe(
            R.nth(1),
            R.prop('dt')
        ))
    ))
);

const defFromSense = R.pipe(
    R.unnest,
    R.filter(R.pipe(
        R.nth(0),
        R.equals('text')
    )),
    R.map(R.pipe(R.nth(1), removeTags, R.trim)),
    R.reject(R.isEmpty),
    R.reject(R.invoker(1, 'startsWith')('see also')),
    R.join('; ')
);

const examplesFromSense = R.pipe(
    R.unnest,
    R.unnest,
    R.filter(R.pipe(
        R.nth(0),
        R.equals('vis')
    )),
    R.map(R.nth(1)),
    R.unnest,
    R.map(R.pipe(R.prop('t'), removeTags, R.trim))
);

const wordType = R.prop('fl');

const pronunciation = R.pipe(
    R.pathOr(R.path(['hwi', 'altprs', 0, 'ipa']))(['hwi', 'prs', 0, 'ipa']),
    R.trim
);

module.exports = {
    sensesFromWord,
    defFromSense,
    examplesFromSense,
    wordType,
    pronunciation
};
