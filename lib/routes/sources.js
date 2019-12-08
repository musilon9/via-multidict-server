'use strict';

const Helpers = require('../helpers');

module.exports = Helpers.withDefaults({
    method: 'get',
    path: '/sources/dictionaries',
    options: {
        handler: (request) => {

            const { dictionaryService } = request.services();
            return dictionaryService.getSourceInfo();
        }
    }
});
