var gulp = require('gulp');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');


gulp.task('browser-sync', ['sass'], function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
                .pipe(sass().on('error', sass.logError))
                .pipe(gulp.dest('css'))
                .pipe(bs.reload({stream: true}));
});

gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({
            suffix: '.min'
        }))
    .pipe(gulp.dest('css/min'));
});

gulp.task('scripts', function() {
  return gulp.src('js/modules/*.js')
    .pipe(concat('app.js',{newLine: ';'}))
    .pipe(gulp.dest('js/'));
});

//Watch task
gulp.task('default', ['browser-sync'], function () {
    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("css/**/*.css", ['minify-css']);
    gulp.watch(['js/modules/*.js'], ['scripts']);
    bs.watch("js/app.js").on('change', bs.reload);
    bs.watch("*.html").on('change', bs.reload);
    bs.watch(['./css/**/*.css'], function (event, file) {
        if (event === "change" || event === "add") {
          bs.reload();
        };
    });
});