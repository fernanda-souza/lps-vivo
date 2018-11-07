var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var path = require('path');

var paths = {
	src: path.join(CONFIG.root.src, CONFIG.tasks.images.src, '/**'),
	dest: path.join(CONFIG.root.dest, CONFIG.tasks.images.dest)
};

var imagesTask = function imagesTask() {
	return gulp.src(paths.src)
		.pipe(changed(paths.dest))
		// .pipe(imagemin())
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream());
};

gulp.task('images', imagesTask);
module.exports = imagesTask;