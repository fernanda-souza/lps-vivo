var handleErrors = require('../lib/handleErrors');
var path = require('path');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var named = require('vinyl-named');
var gulpif = require('gulp-if');

var paths = {
	src: path.join(CONFIG.root.src, CONFIG.tasks.scripts.src),
	dest: path.join(CONFIG.root.dest, CONFIG.tasks.scripts.dest)
};

var entry = [
    path.join(paths.src, "main.js")
];

var webpackConfigDev = {
    devtool: 'inline-source-map',
    target: 'web',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                         "presets": [
                            ["env"]
                        ]
                    }
                }
            }
        ]
    },
    output: {
        filename: '[name].js',
    },
    externals: {
        jquery: 'jQuery'
    }
}

var webpackConfigProd = {
    devtool: 'source-map',
    target: 'web',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                         "presets": [
                            ["env"]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ],
    output: {
        filename: '[name].js',
    },
    externals: {
        jquery: 'jQuery'
    }
}

var scriptsTask = function scriptsTask() {
	return gulp.src(entry)
        .pipe(named())
        .pipe(gulpif(global.PRODUCTION, webpackStream(webpackConfigProd, webpack)))
        .pipe(gulpif(!global.PRODUCTION, webpackStream(webpackConfigDev, webpack)))
        .on('error', handleErrors)
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream());
};

gulp.task('scripts', scriptsTask);
module.exports = scriptsTask;

