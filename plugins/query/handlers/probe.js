'use strict';

const internals = {};

internals.config = {
    description: 'Probe if the system is up',
    tags: ['api'],
    handler: (request, h) => {

        return { status: 'ok', 'foo': request.server.app.foo };
    }
};

module.exports = internals.config;
