'use strict';

const _ = require('lodash');

module.exports = {

    getPronunciation: (word) =>
        _.get(word, 'hwi.prs[0].ipa', ''),

    getWordType: (word) =>
        _.get(word, 'fl', 'unknown'),

    getSenses: (word) =>
        _.concat(
            _.map(
                word.def,
                (def) => _.map(
                    _.filter(
                        _.flatten(def.sseq),
                        (pair) => pair[0] === 'sense'
                    ),
                    (pair) => pair[1]
                )
            )
        ),

    getDefinition: (sense) =>
        _.join(
            _.get(sense, 'definitions', []),
            ', '
        ),

    getExamples: (sense) =>
        _.map(
            _.get(sense, 'examples', []),
            'text'
        )
};
