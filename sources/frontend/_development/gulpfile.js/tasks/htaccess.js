var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var watch = require('gulp-watch');
var gulp = require('gulp');
var path = require('path');

var paths = {
	src: path.join(CONFIG.root.src, CONFIG.tasks.htaccess.src, '.htaccess'),
	dest: path.join(CONFIG.root.dest, CONFIG.tasks.htaccess.dest)
};

var htaccessTask = function htaccessTask() {
	return gulp.src(paths.src)
		.pipe(changed(paths.dest))
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream());
};

watch(paths.src, function () {
    htaccessTask();
});

gulp.task('htaccess', htaccessTask);
module.exports = htaccessTask;
