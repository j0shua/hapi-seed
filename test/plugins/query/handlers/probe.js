
'use strict';

const Path = require('path');
const Code = require('code');
const Lab = require('lab');
const Glue = require('glue');

const expect = Code.expect;
const lab = exports.lab = Lab.script();
const test = lab.test;
const before = lab.before;
const after = lab.after;
const experiment = lab.experiment;


const PROJECT_ROOT = process.env.PROJECT_ROOT;
const Manifest = require(Path.join(PROJECT_ROOT, 'config', 'manifest'));

let server;

before((done) => {

    const options = {
        relativeTo: PROJECT_ROOT
    };
   // load server
    Manifest.connections[0].port = parseInt(process.env.PORT, 10);
    Glue.compose(Manifest, options, (err, _server_) => {

        if (err) {
            throw err;
        }

        server = _server_;
        server.start((err) => {

            if (err) {
                throw err;
            }

            done();
        });
    });
});

experiment('Probe', () => {

    experiment('probe should work', () => {

        const url = '/probe';
        const method = 'get';

        /*
        test('should respond with 401 in case when user is not authorized', (done) => {

            const options = {
                url: url,
                method: method
            };

            server.inject(options, (res) => {

                const payload = JSON.parse(res.payload);

                expect(payload.statusCode).to.equal(401);
                expect(payload.error).to.equal('Unauthorized');

                done();
            });
        });
        */

        test('should respond with 200', (done) => {

            const options = {
                url: url,
                method: method
            };

            server.inject(options, (res) => {

                //const payload = JSON.parse(res.payload);

                expect(res.statusCode).to.equal(200);

                done();
            });
        });

    }); // end experiment
});

after((done) => {

    server.stop({ timeout: 0 }, done);

});
