var gulp = require('gulp');
var runSequence = require('run-sequence');

var defaultTask = function defaultTask(cb) {
	runSequence('clean', ['fonts', 'images', 'icons', 'data'], ['scripts', 'styles', 'html'], 'watch', cb);
};

gulp.task('default', defaultTask);
