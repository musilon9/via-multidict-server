'use strict';

/* eslint @hapi/hapi/scope-start: 0 */

const _ = require('lodash');

module.exports = {

    getPronunciation: (word) =>
        _.get(word, 'hwi.prs[0].ipa', ''),

    getWordType: (word) =>
        _.get(word, 'fl', 'unknown'),

    getSenses: (word) =>
        _.concat(
            _.map(
                _.get(word, 'def', []),
                (def) => _.map(
                    _.filter(
                        _.flatten(_.get(def, 'sseq', [])),
                        (pair) => pair[0] === 'sense'
                    ),
                    (pair) => pair[1]
                )
            )
        ),

    getDefinition: (sense) =>
        _.map(
            _.filter(
                _.get(sense, 'dt', []),
                (pair) => pair[0] === 'text'
            ),
            (pair) => pair[1]
        ),

    getExamples: (sense) =>
        _.map(
            _.get(sense, 'examples', []),
            'text'
        )
};
