var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    inky = require('inky'),
    inlineCss = require('gulp-inline-css'),
    inlinesource = require('gulp-inline-source');


//STYLES
gulp.task('styles', function () {
  return gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({stream:true}));
});

//CONVERTE INKY
gulp.task('inky', ['styles'], function() {
  return gulp.src('./templates/**/*.html')
    .pipe(inlinesource())
    .pipe(inky())
    .pipe(inlineCss({
        preserveMediaQueries: true,
        removeLinkTags: false
    }))
    .pipe(gulp.dest('./dist'));
});

//BROWSER SYNC
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        startPath: "/dist"
    });
});

//WATCH
gulp.task('default', ['browser-sync', 'styles', 'inky'], function () {
    gulp.watch("./scss/*.scss", ['styles']);
    gulp.watch('./css/*.css', browserSync.reload);
    gulp.watch('./templates/*.html').on('change', browserSync.reload);
    gulp.watch(['./scss/*.scss', './templates/*.html'],['inky']);
});
