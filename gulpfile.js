// imports
var gulp = require('gulp');
var electron = require('gulp-electron');
var stylus = require('gulp-stylus');
var del = require('del');
var jade = require('gulp-jade');
var bower = require('gulp-bower');

var packageJson = require('./package.json');


gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('dist/vendor'))
});

gulp.task('clean:dist', function(cb) {
    del('./dist', cb);
})

gulp.task('clean:release', function(cb) {
    del('./release', cb);
})

// Get one .styl file and render
gulp.task('stylus', function () {
  gulp.src('./src/styles/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('jade', function() {
  gulp.src('./src/views/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist/views'))
});

gulp.task('copy:assets', function(){
    gulp.src(['./src/assets/*', './src/assets/**/*'])
    .pipe(gulp.dest('./dist/assets'))
})

gulp.task('copy:js', function(){
    gulp.src('**/*.js', {base: './src'})
    .pipe(gulp.dest('./dist'))
})

gulp.task('copy:package.json', function(){
    gulp.src('./package.json')
    .pipe(gulp.dest('./dist'))
})

gulp.task('electron', ['build:dist'] ,function() {
    gulp.src("")
    .pipe(electron({
        src: './dist',
        packageJson: packageJson,
        release: './release',
        cache: './cache',
        version: 'v0.26.0',
        packaging: true,
        platforms: ['darwin-x64']
    }))
    .pipe(gulp.dest(""));
});

gulp.task('build:dist', ['stylus', 'jade', 'copy:js', 'copy:package.json', 'copy:assets'])
