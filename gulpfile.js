const gulp = require('gulp'),
      sass = require('gulp-sass'),
      browserSync = require('browser-sync').create(),
      header = require('gulp-header'),
      cleanCSS = require('gulp-clean-css'),
      rename = require("gulp-rename"),
      uglify = require('gulp-uglify'),
      pkg = require('./package.json'),
      nunjucks = require('gulp-nunjucks'),
      data = require('./data');

// Set the banner content
const banner = ['/*!\n',
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
        .pipe(gulp.dest('js'));
});

// Compile template
gulp.task('template', () =>
    gulp.src('templates/index.html')
        .pipe(nunjucks.compile(data))
        .pipe(gulp.dest('./'))
);

// Run everything
gulp.task('default', ['minify-js', 'template']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
});

// Dev task with browserSync
gulp.task('dev', ['minify-js', 'template', 'browserSync'], function() {
    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML, MARKDOWN or JS files change
    gulp.watch('templates/**/*.html', ['template'], browserSync.reload);
    gulp.watch('pages/**/*.md', ['template'], browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
    gulp.watch('img/**/*', ['template'], browserSync.reload);
});
