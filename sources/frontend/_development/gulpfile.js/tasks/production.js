var gulp = require('gulp');
var runSequence = require('run-sequence');
var fs = require('fs');

var productionTask = function productionTask(cb) {
    global.PRODUCTION = true;
	runSequence('clean', ['fonts', 'images', 'icons', 'data', 'cache'], ['scripts', 'styles', 'html'], function cb() {
        process.exit(0);
    });
};

fs.writeFile('source/config.json', JSON.stringify({
    env: 'production'
}));

gulp.task('production', productionTask);
