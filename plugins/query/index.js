'use strict';

const Routes = require('./routes');
const internals = {};

exports.register = function (server, options, next) {

    // if there is a 2nd plugin that is a dependency for this one do this
    //serve.dependency(['depdent_plugin-name'], internals.after)
    internals.after(server, next);
};

internals.after = function (server, next) {

    // mount the routes
    server.route(Routes);

    return next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
