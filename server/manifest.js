'use strict';

const Dotenv = require('dotenv');
const Confidence = require('confidence');
const Toys = require('toys');

// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` });

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
    server: {
        host: 'localhost',
        port: {
            $env: 'PORT',
            $coerce: 'number',
            $default: 3000
        },
        debug: {
            $filter: { $env: 'NODE_ENV' },
            $default: {
                log: ['error'],
                request: ['error']
            },
            production: {
                request: ['implementation']
            }
        }
    },
    register: {
        plugins: [
            {
                plugin: 'schmervice'
            },
            {
                plugin: 'hapi-auth-jwt2'
            },
            {
                plugin: '../lib', // Main plugin
                options: {
                    jwtKey: {
                        $filter: { $env: 'NODE_ENV' },
                        $default: {
                            $env: 'APP_SECRET',
                            $default: 'app-secret'
                        },
                        production: {           // In production do not default to "app-secret"
                            $env: 'APP_SECRET'
                        }
                    }
                }
            },
            {
                plugin: './plugins/swagger'
            },
            {
                plugin: {
                    $filter: { $env: 'NODE_ENV' },
                    $default: 'hpal-debug',
                    production: Toys.noop
                }
            }
        ]
    }
});
