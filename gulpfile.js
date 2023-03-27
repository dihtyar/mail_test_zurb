const gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    browserSync = require('browser-sync').create(),
    inky = require('inky'),
    inlineCss = require('gulp-inline-css'),
    inlinesource = require('gulp-inline-source');


//STYLES

function styles(){
    return gulp.src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

//CONVERTE INKY

function html(){
    return gulp.src('./templates/**/*.html')
    .pipe(inlinesource())
    .pipe(inky())
    .pipe(inlineCss({
        preserveMediaQueries: true,
        removeLinkTags: false
    }))
    .pipe(gulp.dest('./dist'));
}

//BROWSER SYNC

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        startPath: "/dist"
    })
    gulp.watch('./templates/*.html').on('change', browserSync.reload);
    gulp.watch('./templates/*.html', html)
    gulp.watch("./scss/*.scss", styles);
    gulp.watch('./css/*.css', browserSync.reload);
    gulp.watch(['./scss/*.scss', './templates/*.html']);
}


exports.html = html
exports.styles = styles
exports.watch = watch

// Таск, который выполняется по команде gulp

exports.default = gulp.series(html, gulp.parallel(styles), watch)