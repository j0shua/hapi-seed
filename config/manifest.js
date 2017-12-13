'use strict';

const Confidence = require('confidence');

const hapiSwaggerDependencies = [{
    'plugin': {
        'register': 'inert'
    }
},
{
    'plugin': {
        'register': 'vision'
    }
},
{
    'plugin': {
        'register': 'hapi-swagger'
    }
}];

const loggingConfig = {
    'plugin': {
        'register': 'good',
        'options': {
            'reporters': {
                'ops-console': [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        ops: '*',
                        'log': '*',
                        'request': '*',
                        'response': '*',
                        'error': '*'
                    }]
                }, {
                    module: 'good-squeeze',
                    name: 'SafeJson'
                }, 'stdout']
            }
        }
    }
};

const config = {
    'connections': [
        {
            'host': '0.0.0.0',
            'port': '$env.PORT'
        }
    ],
    'server': {
        'app': {
            'foo': {
                '$filter': 'env',
                '$default': 'default',
                'local': 'local'
            }
        }
    },
    'registrations': {
        '$filter': 'env',
        '$base': [
            {
                'plugin': {
                    'register': './plugins/query'
                }
            }
        ],
        'local': [
            ...hapiSwaggerDependencies,
            loggingConfig
        ],
        'test': [

        ]
    }
};

const store = new Confidence.Store();
store.load(config);
const manifest = store.get('/', { env: process.env.NODE_ENV });

module.exports = manifest;
