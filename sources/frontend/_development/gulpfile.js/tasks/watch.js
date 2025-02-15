var gulp = require('gulp');
var path = require('path');
var watch = require('gulp-watch');

var watchTask = function watchTask() {
	var watchableTasks = ['fonts', 'images', 'icons', 'html', 'styles', 'scripts', 'data', 'htaccess'];

	watchableTasks.forEach(function (taskName) {
		var task = CONFIG.tasks[taskName];
		if (task) {
			var glob = path.join(CONFIG.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}');
			watch(glob, function () {
				require('./' + taskName)();
			});
		}
	});
};

gulp.task('watch', ['browserSync'], watchTask);
module.exports = watchTask;
