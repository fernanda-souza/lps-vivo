var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');
var wait = require('gulp-wait');
var gulpif = require('gulp-if');
var cleanCSS = require('gulp-clean-css');

var paths = {
	src: path.join(CONFIG.root.src, CONFIG.tasks.styles.src, '/**/*.{' + CONFIG.tasks.styles.extensions + '}'),
	dest: path.join(CONFIG.root.dest, CONFIG.tasks.styles.dest)
};

var stylesTask = function stylesTask() {
	return gulp.src(paths.src)
        .pipe(wait(500))
        .pipe(gulpif(!global.PRODUCTION, sourcemaps.init()))
        .pipe(sass()).on('error', handleErrors)
        .pipe(autoprefixer(CONFIG.tasks.styles.autoprefixer))
        .pipe(gulpif(!global.PRODUCTION, sourcemaps.write()))
        .pipe(gulpif(global.PRODUCTION, cleanCSS({inline: ['none']})))
        .pipe(gulp.dest(paths.dest))
        .pipe(browserSync.stream());
};

gulp.task('styles', stylesTask);
module.exports = stylesTask;
