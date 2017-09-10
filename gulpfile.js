//Use strict JS mode
'use strict';

//Gulp paths
var config = require('./gulp/paths');

//Gulp packages
var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	sass = require('gulp-sass'),
	autoprefix = require('gulp-autoprefixer'),
	pug = require('gulp-pug'),
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
	browserSync.init({proxy: ''}); //!! HERE PUT YOUR IP ADDRES,PORT AND THE NAME OF FOLDER ECT. 127.0.0.1:80/Example !!
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

//Pug task
gulp.task('pug', ['pug-public','pug-views'], function () {
	return gulp.src(config.pugSRC)
				.pipe(plumber())
				.pipe(pug({pretty: true}))
				//.on('error', errorLog) //Output error with out plumber plugi
				.pipe(gulp.dest(config.pugDEST))
				.pipe(browserSync.reload({stream: true}));
});

//Pug public
gulp.task('pug-public', function () {
	return gulp.src(config.pugPublicSRC)
				.pipe(plumber())
				.pipe(pug({pretty: true}))
				//.on('error', errorLog) //Output error with out plumber plugi)
				.pipe(gulp.dest(config.pugPublicDEST));
});

//Pug views
gulp.task('pug-views', ['pug-public'], function () {
	return gulp.src(config.pugViewSRC)
				.pipe(plumber())
				.pipe(pug({pretty: true}))
				//.on('error', errorLog) //Output error with out plumber plugi)
				.pipe(gulp.dest(config.pugViewDEST));
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

//Copy JS files (Using when working with AngularJs)
gulp.task('copyJS', function () {
	return gulp.src(config.jsSRC)
				.pipe(plumber())
				.pipe(gulp.dest(config.jsDEST));
});

//Copy data JSON files (Using when working with AngularJs)
gulp.task('copyData', function () {
	return gulp.src(config.dataSRC)
				.pipe(plumber())
				.pipe(gulp.dest(config.dataDEST));
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
	gulp.watch(config.pugTemplatesSRC, ['pug']);
	gulp.watch(config.pugPublicSRC, ['pug-public']);
	gulp.watch(config.pugViewSRC, ['pug-views']);
	gulp.watch(config.jsSRC, ['concatJS']);
	gulp.watch(config.jsSRC, ['copyJS']);
	gulp.watch(config.dataSRC, ['copyData']);
});

//Default task
gulp.task('default', ['sass','pug','concatJS','watch','browser-sync']);