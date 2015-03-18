'use strict';

var path = require('path');
var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var sourcemaps = require('gulp-sourcemaps');
var eslint = require('gulp-eslint');
var del = require('del');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');

gulp.task('default', ['development']);
gulp.task('development',
	['clean', 'javascript']
);
//TODO: gulp task for distribution

function runBatchTasks(tasks)
{
	return batch(function (events, done) {
		events
			.on('error', done)
			.on('end', done)
			.on('close', done)
			.on('data', function (){
				gulp.start(tasks);
			});
	});
}

gulp.task('watch', function () {
	gulp.start(['default']);
	watch('src/**', runBatchTasks('javascript'));
	watch('tests/**', runBatchTasks('test:javascript'));
});

gulp.task('clean', function (done) {
	del(['dist/**', '!dist'], done);
});

var getBundleName = function () {
	// var version = require('./package.json').version;
	// var name = require('./package.json').name;
	// return version + '.' + name + '.' + 'min';
	return 'humanizeMidiMessage';
};

gulp.task('javascript', ['lint:javascript', 'test:javascript'], function (done) {
	var bundler = browserify({
		entries: ['./'],
		debug: true,
		standalone: 'humanizeMidiMessage'
	});
	var npmPackage = require('./package.json');
	var bundle = function () {
		return bundler
				.transform(babelify)
				.bundle()
				.on('error', function (error) {
					gulpUtil.log(gulpUtil.colors.red('Browserify Error:'), error.message);
					done(error);
				})
				.pipe(source(getBundleName() + '.js'))
				.pipe(buffer())
				.pipe(sourcemaps.init({loadMaps: true}))
				.pipe(sourcemaps.write('./'))
				.pipe(gulp.dest('./dist'));
	};
	return bundle();
});

gulp.task('lint:javascript', function () {
	return gulp.src(['src/**/*.js'])
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failOnError());
});

gulp.task('test:javascript', function (done) {
	done();
});
