'use strict';

/* eslint @hapi/hapi/no-arrowception: 0 */
/* eslint @hapi/hapi/scope-start: 0 */

module.exports = {
    ensureWrappedBy: (wrapper) => (content) =>
        (content.startsWith(wrapper) ? '' : wrapper)
        + content
        + (content.endsWith(wrapper) ? '' : wrapper)
};
