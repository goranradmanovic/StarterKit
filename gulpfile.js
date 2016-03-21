//Use strict JS mode
'use strict';

//Gulp paths
var config = require('./gulp/paths');

//Gulp packages
var gulp = require('gulp'),
	plumber = require('plumber'),
	sass = require('gulp-sass'),
	autoprefix = require('gulp-autoprefixer'),
	jade = require('gulp-jade'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	browserSync = require('browser-sync').create();

/******************* Gulp Tasks **********************/

//Function for handling errors and allowing Gulp to run with out stoping
/*
function errorLog(error) {
	console.error.bind(error);
	this.emit('end');
}
*/

//BrowserSync task
gulp.task('browser-sync', function () {
	browserSync.init({proxy: '192.168.1.4'});
});

//Sass task
gulp.task('sass', function () {
	return gulp.src(config.sassSRC)
				//.pipe(sass({outputStyle: 'compressed'})) //Compressing output css file
				.pipe(plumber())
				.pipe(sass())							  //Not Compressing output css file
				.pipe(autoprefix())
				//.on('error', errorLog) //Output error with out plumber plugin
				.pipe(gulp.dest(config.cssDEST))
				.pipe(browserSync.reload({stream: true}));
});

//Jade task
gulp.task('jade', ['jade-public','jade-views'], function () {
	return gulp.src(config.jadeSRC)
				.pipe(plumber())
				.pipe(jade({pretty: true}))
				//.on('error', errorLog) //Output error with out plumber plugi
				.pipe(gulp.dest(config.jadeDEST))
				.pipe(browserSync.reload({stream: true}));
});

//Jade public
gulp.task('jade-public', function () {
	return gulp.src(config.jadePublicSRC)
				.pipe(plumber())
				.pipe(jade({pretty: true}))
				//.on('error', errorLog) //Output error with out plumber plugi)
				.pipe(gulp.dest(config.jadePublicDEST))
				.pipe(browserSync.reload({stream: true}));
});

//Jade views
gulp.task('jade-views', ['jade-public'], function () {
	return gulp.src(config.jadeViewSRC)
				.pipe(plumber())
				.pipe(jade({pretty: true}))
				//.on('error', errorLog) //Output error with out plumber plugi)
				.pipe(gulp.dest(config.jadeViewDEST))
				.pipe(browserSync.reload({stream: true}));
});

//JavaScrip task (concatination & minifying)
gulp.task('concatJS', function () {
	return gulp.src(config.jsSRC)
				.pipe(plumber())
				.pipe(concat('main.min.js'))
				.pipe(uglify())
				//.on('error', errorLog) //Output error with out plumber plugi
				.pipe(gulp.dest(config.jsDEST))
				.pipe(browserSync.reload({stream: true}));
});

//Compressing images
gulp.task('imagemin', function () {
	return gulp.src(config.imageSRC)
				.pipe(plumber())
				.pipe(imagemin({progressive: true, optimizationLevel: 7}))
				//.on('error', errorLog) //Output error with out plumber plugi
				.pipe(gulp.dest(config.imageDEST));
});

//Watch task
gulp.task('watch', function () {
	gulp.watch(config.sassSRC, ['sass']);
	gulp.watch(config.jadeSRC, ['jade']);
	gulp.watch(config.jadePublicSRC, ['jade-public']);
	gulp.watch(config.jadeViewSRC, ['jade-views']);
	gulp.watch(config.jsSRC, ['concatJS']);
});

//Default task
gulp.task('default', ['sass','jade-public','jade-views','jade','concatJS','watch','browser-sync']);