var gulp = require('gulp'),
	connect = require('gulp-connect')
;


gulp.task('dev', function() {
	connect.server({
    	port: 4000
	});
});


gulp.task('prod', function() {
	console.log('build prod');
});

gulp.task('default', ['dev']);