var gulp = require('gulp');
var runSequence = require('run-sequence');
var fs = require('fs');

var defaultTask = function defaultTask(cb) {
	runSequence('clean', ['fonts', 'images', 'icons', 'data'], ['scripts', 'styles', 'html'], 'watch', cb);
};

fs.writeFile('source/config.js', 'export default' + JSON.stringify({
	env: 'development'
}));	

gulp.task('default', defaultTask);
