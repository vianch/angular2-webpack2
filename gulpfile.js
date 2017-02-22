const gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    buildWebpack = require('webpack-gulp'),
    sass = require('gulp-sass'),
    htmlmin = require('gulp-htmlmin'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    pump = require('pump');

const webpackConfiguration = require('./config/webpack.config.js');

gulp.task('build', function(done){
    runSequence(
        ['clean'],
        ['sass'],
        ['minify-css'],
        function(){
            console.log("Compiling webpack...");
            buildWebpack({
                statsOptions: {
                    'colors': true,
                    'errorDetails': true
                },
                config: webpackConfiguration
            });
        }
    );
});

gulp.task('sass', function () {
    return gulp.src('./src/stylesheets/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('www/assets/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/stylesheets/**/*.scss', ['sass']);
    gulp.watch('./src/stylesheets/**/**/*.scss', ['sass']);
});

gulp.task('clean', function(){
    return del('www/');
});

gulp.task('minify-css', function() {
    return gulp.src('www/assets/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('www/assets/css'));
});

gulp.task('minify-html', function() {
    return gulp.src('www/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('www'));
});

gulp.task('minify-js', function (cb) {
    pump([
            gulp.src('www/assets/js/*.js'),
            uglify(),
            gulp.dest('www/assets/js')
        ],
        cb
    );
});
