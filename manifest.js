'use strict';

const Confidence = require('confidence');
const store = new Confidence.Store();

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
    'registrations': [
        {
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
        },
        {
            'plugin': {
                'register': './plugins/query'
            }
        },
        {
            'plugin': {
                'register': 'good',
                'options': {
                    'reporters': [
                        {
                            'reporter': 'good-console',
                            'events': {
                                'request': '*',
                                'response': '*',
                                'error': '*'
                            }
                        }
                    ]
                }
            }
        }
    ]
};

store.load(config)
const manifest = store.get('/', { env: process.env.NODE_ENV });

module.exports = manifest;
