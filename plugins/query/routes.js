'use strict';

const Handlers = require('./handlers');

const routes = [
    { method: 'get',   path: '/probe', config: Handlers.probe },
    { method: 'post',  path: '/execute', config: Handlers.execute }
];


module.exports = routes;