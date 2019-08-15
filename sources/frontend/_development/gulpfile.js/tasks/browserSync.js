var browserSync = require('browser-sync');
var gulp = require('gulp');

var browserSyncTask = function browserSyncTask() {
	var proxy = CONFIG.tasks.browserSync.proxy || null;
	if (typeof proxy === 'string') {
		CONFIG.tasks.browserSync.proxy = proxy = {
			target: proxy
		};
	}

	var server = proxy || CONFIG.tasks.browserSync.server;
	browserSync.init(CONFIG.tasks.browserSync);
};

gulp.task('browserSync', browserSyncTask);
module.exports = browserSyncTask;