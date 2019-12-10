'use strict';

/* eslint @hapi/hapi/no-arrowception: 0 */
/* eslint @hapi/hapi/scope-start: 0 */

const R = require('ramda');

module.exports = {
    cardEquals: (word, source) => (definition) =>
        R.and(
            R.propEq('word', word)(definition),
            R.propEq('source', source)(definition)
        )
};

