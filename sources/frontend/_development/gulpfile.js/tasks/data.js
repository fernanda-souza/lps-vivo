var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var gulp = require('gulp');
var path = require('path');

var paths = {
	src: path.join(CONFIG.root.src, CONFIG.tasks.data.src, '/**/*'),
	dest: path.join(CONFIG.root.dest, CONFIG.tasks.data.dest)
};

var dataTask = function dataTask() {
	return gulp.src(paths.src)
		.pipe(changed(paths.dest))
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream());
};

gulp.task('data', dataTask);
module.exports = dataTask;