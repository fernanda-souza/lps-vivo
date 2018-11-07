var gulp = require('gulp');
var del = require('del');

var cleanTask = function cleanTask(cb) {
	del([CONFIG.root.dest]).then(function (paths) {
		cb();
	});
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;