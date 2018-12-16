'use strict';

const Routes = require('./routes');
const internals = {};

internals.register = function (server, options) {

    // if there is a 2nd plugin that is a dependency for this one do this
    //serve.dependency(['depdent_plugin-name'], internals.after)
    internals.after(server);
};

internals.after = function (server) {

    // mount the routes
    server.route(Routes);
};


module.exports = {
    name: 'query',
    register: internals.register
};

module.exports.register.attributes = {
    pkg: require('./package.json')
};

;
