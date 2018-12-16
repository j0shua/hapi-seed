
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

//const Rejoice = require('rejoice');

before(async () => {

    /*
    const options = {
        args: [
            '-c', `${PROJECT_ROOT}/manifest.js`,
            '-p', `${PROJECT_ROOT}`]
    };
    Rejoice.start(options);

    */

    const options = {
        relativeTo: PROJECT_ROOT
    };

    // load server
    try {

        server = await Glue.compose(Manifest, options);
        await server.start();
    }
    catch (err) {
        console.error('error while starting server:', err);
        return Promise.reject(err.message);
    }
});

experiment('Probe', () => {

    experiment('probe should work', () => {

        const url = '/probe';
        const method = 'get';

        test('should respond with 200', async () => {

            const options = {
                url: url,
                method: method
            };

            const res = await server.inject(options);

            const payload = JSON.parse(res.payload);
            const expectedResponse = { status: 'ok' };

            expect(res.statusCode).to.equal(200);
            expect(payload).to.equal(expectedResponse);
        });

    }); // end experiment
});

after(async () => {

    await server.stop({ timeout: 0 });

});
