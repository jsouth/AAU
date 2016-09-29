var gulp = require('gulp'), 
    sass = require('gulp-ruby-sass') 
    notify = require("gulp-notify") 
    bower = require('gulp-bower');
    parker = require('gulp-parker');
    browserSync = require("browser-sync").create();

var source = {
     sass: './scss',
     bow: './bower_components' 
}

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(source.bow)) 
});

gulp.task('watch', function() {
     gulp.watch(source.sass + '/**/*.scss', ['css']); 
});

// output
gulp.task('css', function() { 
    return gulp.src(source.sass + '/style.scss')
         .pipe(sass({
             style: 'compressed',
             loadPath: [
                 './scss'
             ]
         })
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))) 
         .pipe(gulp.dest('./public/css')); 
});

gulp.task('serve', function() {
    browserSync.init({
        server: "public"
    });
    gulp.watch("public/*.html").on('change', browserSync.reload);
    // gulp.watch("public/*.css").on('change', browserSync.reload);
});

// parker
gulp.task('parker', function() {
    return gulp.src('./*.css')
        .pipe(parker());
});

  gulp.task('default',['bower','css','parker','serve']);
