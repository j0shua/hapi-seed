'use strict';

const internals = {};

internals.handler = function (request, h) {

    request.log(['server', 'request', 'api'], { message: 'helloooooooooooooo' });
    return { message: 'it works!' };
};

internals.config = {
    tags: ['api'],
    description: 'Run stuff',
    handler: internals.handler
};

module.exports = internals.config;


