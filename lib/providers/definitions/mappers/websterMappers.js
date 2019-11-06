'use strict';

/* eslint @hapi/hapi/scope-start: 0 */

const _ = require('lodash');

module.exports = {

    getPronunciation: (word) =>
        _.get(word, 'hwi.prs[0].ipa') || _.get(word, 'hwi.altprs[0].ipa') || '',

    getWordType: (word) =>
        _.get(word, 'fl', 'unknown'),

    getSenses: (word) =>
        _.flatten(
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

            )
        ),

    getDefinition: (sense) =>
        _.join(
            _.map(
                _.map(
                    _.filter(
                        _.get(sense, 'dt', []),
                        (pair) => pair[0] === 'text'
                    ),
                    (pair) => pair[1]
                ),
                (def) =>
                    _.replace(
                        def,
                        /\{(.*?)\}/g,
                        ''
                    )
            ),
            '; '
        ),

    getExamples: (sense) =>
        _.map(
            _.flatMap(
                _.filter(
                    _.get(sense, 'dt', []),
                    (pair) => pair[0] === 'vis'
                ),
                (pair) => pair[1]
            ),
            (def) =>
                _.replace(
                    _.get(def, 't', ''),
                    /\{(.*?)\}/g,
                    ''
                )
        )

};
