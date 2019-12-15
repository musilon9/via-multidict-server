'use strict';

/* eslint @hapi/hapi/no-arrowception: 0 */
/* eslint @hapi/hapi/scope-start: 0 */

const R = require('ramda');

module.exports = {
    cardEquals: (word, source, definition) => (card) =>
        R.propEq('word', word)(card) &&
        R.propEq('source', source)(card) &&
        R.propEq('definition', definition)(card)

};

