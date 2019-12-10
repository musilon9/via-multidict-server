'use strict';

/* eslint @hapi/hapi/no-arrowception: 0 */
/* eslint @hapi/hapi/scope-start: 0 */

module.exports = {
    cardEquals: (definition) => (word, source) =>
        definition.word === word && definition.source === source
};

