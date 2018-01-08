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
    'registrations': {
        '$filter': 'env',
        'test': [],
        'local': [
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
        ],
        '$base': [
            {
                'plugin': {
                    'register': './plugins/query'
                }
            }
        ]
    }
};

store.load(config);
const manifest = store.get('/', { env: process.env.NODE_ENV });

module.exports = manifest;
