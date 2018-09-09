'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var cleancss = require('gulp-clean-css');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('sass', function() {
    return gulp.src('./src/style/**/*.scss')
    // .pipe(sass().on('error, sass.logError'))
    .pipe(sass({outputStyle:'expanded'})).on('error', sass.logError)
    .pipe(autoprefixer(['last 30 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    // .pipe(autoprefixer({
    //     browsers:['last 2 versions'],cascade: false}))
    .pipe(csso())
    .pipe(rename('main.css'))
    .pipe(gulp.dest('dest/css'));
});
// gulp.task('minify-css', () => {
//     return gulp.src('./*.css')
//       .pipe(cleanCSS({debug: true}, (details) => {
//         console.log(`${details.name}: ${details.stats.originalSize}`);
//         console.log(`${details.name}: ${details.stats.minifiedSize}`);
//       }))
//     .pipe(gulp.dest('dist'));
//   });
gulp.task('sass:watch', function(){
    gulp.watch('.src/style/**/*.scss', ['sass']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

// gulp.task('serve', ['sass'], function(){
    
  gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/style/**/*.scss', ['sass']);
    gulp.watch('*.html').on('change', browserSync.reload);
});  
// gulp.task('sass', function(){
//     return gulp.src('./style/**/*.sass')
//     .pipe(sass())
//     .pipe(gulp.dest('./css'))
//     .pipe(browserSync.stream());
// })
// });

// gulp.task('css', function() {
//     return gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js'])
//       .pipe(concat('all.js'))
//       .pipe(gulp.dest('./dist/'));
//   });

gulp.task('default', [ 'sass', 'browser-sync' ]);
