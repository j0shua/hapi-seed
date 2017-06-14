'use strict';

const controller = {};

const internals = {};

internals.someSharedFunctionality = () => {

    return Math.random();
};

controller.execute = function (request, reply) {

    reply({ 
        message: 'it works!',
        random: internals.someSharedFunctionality()
    });
};

controller.probe = function (request, reply) {

    reply({ 
        status: 'ok',
        random: internals.someSharedFunctionality()
    });
};

module.exports = controller;
