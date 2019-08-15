var browserSync = require('browser-sync');
var gulp = require('gulp');
var handleErrors = require('../lib/handleErrors');
var useref = require('gulp-useref');
var path = require('path');
var nunjucksRender = require('gulp-nunjucks-render');
var watch = require('gulp-watch');
var decache = require('decache');
var wait = require('gulp-wait');
var gulpif = require('gulp-if');
var htmlmin = require('gulp-htmlmin');
var dataHelper = require('../lib/dataHelper');

var exclude = path.normalize('!**/{' + CONFIG.tasks.html.excludeFolders.join(',') + '}/**');

var paths = {
	src: [path.join(CONFIG.root.src, CONFIG.tasks.html.src, '/**/*.html'), exclude],
	dest: path.join(CONFIG.root.dest, CONFIG.tasks.html.dest)
};

var defaultsNunjucks = {
  path: [
    CONFIG.root.src + '/html/',
    CONFIG.root.src + '/html/components/', 
    CONFIG.root.src + '/html/pages/'
  ],
  ext: '.html'
};

var htmlTask = function htmlTask() {
//   defaultsNunjucks.data = dataHelper.getJson("main");

	return gulp.src(paths.src)
        .pipe(nunjucksRender(defaultsNunjucks)).on('error', handleErrors)
        .pipe(gulpif(global.PRODUCTION, htmlmin({collapseWhitespace: true, removeComments: true, conservativeCollapse: true})))
        .pipe(useref({searchPath: CONFIG.root.nodeModules })).on('error', handleErrors)
        .pipe(gulp.dest(paths.dest))
        .pipe(wait(500))
        .pipe(browserSync.stream());
};

watch(paths.src, function () {
    htmlTask();
});

gulp.task('html', htmlTask);
module.exports = htmlTask;
