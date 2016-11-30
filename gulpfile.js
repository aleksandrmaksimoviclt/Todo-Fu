var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var merge = require('merge-stream');
var browserSync = require('browser-sync').create();


gulp.task('concatCssFiles', function () {
  var lessFiles = gulp.src('./frontend/app/components/**/*.less');
  var fonts = gulp.src('./frontend/assets/fonts/**/*.css');
  var appLess = gulp.src('./frontend/app/app.less');

  return merge(lessFiles, fonts, appLess)
    .pipe(concat('app.css'))
    .pipe(less())
    .pipe(gulp.dest('./frontend/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('concatJsFiles', function () {
  var componentsJS = gulp.src('./frontend/app/components/**/*.js');
  var appJS = gulp.src('./frontend/app/*.js');

  return merge(componentsJS, appJS)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./frontend/assets/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    proxy: "127.0.0.1:8000",
    reloadDebounce: 500,
    reloadDelay: 300,
  })
});

gulp.task('watch', ['browserSync', 'concatCssFiles', 'concatJsFiles'], function(){
  gulp.watch(['./frontend/app/components/**/*.less',
              './frontend/assets/fonts/**/*.css',
              './frontend/app/app.less'], ['concatCssFiles']);
  gulp.watch(['./frontend/app/components/**/*.js',
              '.frontend/app/*.js'], ['concatJsFiles']);
  gulp.watch(['./frontend/index.html',
              './frontend/app/components/**/*.html'], browserSync.reload);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);