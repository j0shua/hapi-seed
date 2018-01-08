
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

const Rejoice = require('rejoice');

//console.log(process.argv);
//console.log('-------------------------');

before((done) => {

    /*
    const options = {
        args: [
            '-c', `${PROJECT_ROOT}/manifest.js`,
            '-p', `${PROJECT_ROOT}`]
    };
    Rejoice.start(options);

    // hmm server isn't passed back so how do i know when
    // it is safe to call done ?
    process.nextTick(done);
    */

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

experiment('Execute', () => {

    experiment('endpoint should work', () => {

        const url = '/execute';
        const method = 'post';

        test('should respond with 200', (done) => {

            const options = {
                url: url,
                method: method
            };

            server.inject(options, (res) => {

                const payload = JSON.parse(res.payload);
                const expectedResponse = { message: 'it works!' };

                expect(res.statusCode).to.equal(200);
                expect(payload).to.equal(expectedResponse);

                done();
            });
        });

    }); // end experiment
});

after((done) => {

    server.stop({ timeout: 0 }, done);

});
