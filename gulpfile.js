var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var nunjucks = require('gulp-nunjucks');
var data = require('./data');

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('js/grayscale.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'));
});

// Copy root libraries from /dist
gulp.task('copy', function() {
    gulp.src('css/**/*')
        .pipe(gulp.dest('dist/css'));

    gulp.src('fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
        
    gulp.src('img/**/*')
        .pipe(gulp.dest('dist/img'));

    gulp.src('js/**/*')
        .pipe(gulp.dest('dist/js'));

});

// Compile template
gulp.task('template', () =>
    gulp.src('templates/index.html')
        .pipe(nunjucks.compile(data))
        .pipe(gulp.dest('dist'))
);

// Run everything
gulp.task('default', ['minify-js', 'copy', 'template']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
});

// Dev task with browserSync
gulp.task('dev', ['minify-js', 'template','copy', 'browserSync'], function() {
    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML, MARKDOWN or JS files change
    gulp.watch('templates/**/*.html', ['template'], browserSync.reload);
    gulp.watch('pages/**/*.md', ['template'], browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});
