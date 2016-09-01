'use strict';

const internals = {};

internals.handler = function (request, reply) {

    reply({ message: 'it works!' });
};

internals.config = {
    tags: ['api'],
    description: 'Run stuff',
    handler: internals.handler
};

module.exports = internals.config;


