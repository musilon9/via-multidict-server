
'use strict';

const _ = require('lodash');

module.exports = {

    getPronunciation: (lexicalEntry) =>
        _.get(
            _.find(
                _.get(lexicalEntry, 'pronunciations', []),
                { 'phoneticNotation': 'IPA' }
            ),
            'phoneticSpelling',
            ''
        ),

    getWordType: (lexicalEntry) =>
        _.get(
            lexicalEntry,
            'lexicalCategory.id',
            'unknown'
        ),

    getDefinition: (sense) =>
        _.join(
            _.get(
                sense,
                'definitions',
                []
            ),
            ', '
        ),

    getExamples: (sense) =>
        _.map(
            _.get(
                sense,
                'examples',
                []
            ),
            'text'
        )
};
