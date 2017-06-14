
'use strict';

const Code = require('code');
const Lab = require('lab');
const Glue = require('glue');

const expect = Code.expect;
const lab = exports.lab = Lab.script();
const test = lab.test;
const before = lab.before;
const after = lab.after;
const experiment = lab.experiment;


const Manifest = require('../../../../manifest');
const PROJECT_ROOT = process.env.PROJECT_ROOT;


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

experiment('Execute endpoint', () => {

    experiment('should respond with 200', () => {

        const url = '/execute';
        const method = 'post';

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
