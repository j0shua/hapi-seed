'use strict';

const Confidence = require('confidence');

const hapiSwaggerDependencies = [{
    'plugin': 'inert'
},
{
    'plugin': 'vision'
},
{
    'plugin': 'hapi-swagger'
}];

const loggingConfig = {
    'plugin': 'good',
    'options': {
        'reporters': {
            'myConsoleReporter': [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    log: '*',
                    request: '*',
                    response: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        } // end reporters
    }

};

const config = {
    'server': {
        'host': '0.0.0.0',
        'port': 8888,
        'app': {
            'foo': {
                '$filter': 'env',
                '$default': 'default',
                'local': 'local'
            }
        }
    },
    'register': {
        'plugins': {
            '$filter': 'env',
            '$base': [
                {
                    'plugin': './plugins/query'
                }
            ],
            'local': [
                ...hapiSwaggerDependencies
                ,loggingConfig
            ],
            'test': [

            ]
        }
    }
};

const store = new Confidence.Store();
store.load(config);
const manifest = store.get('/', { env: process.env.NODE_ENV });

module.exports = manifest;
