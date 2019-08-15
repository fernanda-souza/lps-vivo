var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var gulp = require('gulp');
var path = require('path');
var svgSprite = require('gulp-svg-sprite');
var handleErrors = require('../lib/handleErrors');

var paths = {
	src: path.join(CONFIG.root.src, CONFIG.tasks.icons.src, '/**/*.{' + CONFIG.tasks.icons.extensions + '}'),
	dest: path.join(CONFIG.root.dest, CONFIG.tasks.icons.dest)
};

var svgConfig = {
    shape: {
        id:{
            separator: '-',
            whitespace: '-',
            generator: function(name, file){
                return 'icon-' + path.parse(name).name;
            }
        },
        dimension: {
            maxWidth: 32,
            maxHeight: 32
        },
        spacing: {
            padding: 0
        },
        transform: [{
            svgo: {
                plugins: [
                    {
                        cleanupIDs: false
                    }
                ]
            }
        }]
    },
    mode: {
        symbol: {
            dest: '.',
            sprite : './icons-sprite.svg'
        }
    },
    svg: {
        namespaceIDs: false
    }
};

var iconsTask = function iconsTask() {
	return gulp.src(paths.src, { base: "./" })
		.pipe(changed(paths.src))
        .pipe(svgSprite(svgConfig)).on('error', handleErrors)
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream());
};

gulp.task('icons', iconsTask);
module.exports = iconsTask;
