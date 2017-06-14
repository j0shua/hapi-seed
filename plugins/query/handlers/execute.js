'use strict';

const Controller = require('../controller');

const internals = {};

internals.config = {
    tags: ['api'],
    description: 'Run stuff',
    handler: Controller.execute
};

module.exports = internals.config;


