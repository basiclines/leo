var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify-es').default;


gulp.task('minify-js', function() {
	return gulp.src('dist/leo.js')
		.pipe(uglify())
		.pipe(rename('leo.min.js'))
		.pipe(gulp.dest('dist'));
});