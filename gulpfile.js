'use strict';

const Bossy = require('bossy');
const Gulp = require('gulp-help')(require('gulp'));
const Plugins = require('gulp-load-plugins')({ lazy: true });

const src = [
    '*.js',
    '**/*.js'
];

Gulp.task('lint', 'lint source code files', () => {

    return Gulp.src(src)
        .pipe(Plugins.eslint())
        .pipe(Plugins.eslint.format());
});

Gulp.task('test', 'run unit tests', () => {

    let path = './test/**/*.js';

    const definition = {
        path: {
            description: 'path to test file(s)'
        }
    };

    const args = Bossy.parse(definition);

    if (args instanceof Error){
        console.error(args.message);
        return;
    }

    if (args.path){
        path = args.path;
    }

    process.env.PROJECT_ROOT = __dirname;
    process.env.PORT = process.env.PORT || 9999;

    return Gulp.src(path)
        .pipe(Plugins.lab('-v -t 100 -e test'));


}, {
    options: {
        'path': 'path to the test file(s)'
    }
});
