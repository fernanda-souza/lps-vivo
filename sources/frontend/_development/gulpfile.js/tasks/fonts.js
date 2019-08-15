var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var gulp = require('gulp');
var path = require('path');

var paths = {
	src: path.join(CONFIG.root.src, CONFIG.tasks.fonts.src, '/**/*'),
	dest: path.join(CONFIG.root.dest, CONFIG.tasks.fonts.dest)
};

var fontsTask = function fontsTask() {
	return gulp.src(paths.src)
		.pipe(changed(paths.dest))
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream());
};

gulp.task('fonts', fontsTask);
module.exports = fontsTask;