var gulp = require('gulp');
var runSequence = require('run-sequence');

var productionTask = function productionTask(cb) {
    global.PRODUCTION = true;
	runSequence('clean', ['fonts', 'images', 'icons', 'data', 'htaccess'], ['scripts', 'styles', 'html'], function cb() {
        process.exit(0);
    });
};

gulp.task('production', productionTask);
