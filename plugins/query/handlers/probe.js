'use strict';

const Controller = require('../controller');

const internals = {};

internals.config = {
    description: 'Probe if the system is up',
    tags: ['api'],
    handler: Controller.probe
    };

module.exports = internals.config;
