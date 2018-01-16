// Include gulp
var gulp = require('gulp');

// Load all plugins in package.json
var plugin = require('gulp-load-plugins')();
//var transform = require('vinyl-transform');
//var browserify = require('gulp-browserify');

// Path vars
const BASE_PATH = './';
const SRC_PATH = BASE_PATH + 'src';
const DEST_PATH = BASE_PATH + 'lib';


//=================================//
// ES6
//=================================//
gulp.task("transpile", function () {
	return gulp.src(SRC_PATH + "/**/*.js")
		//.pipe(plugin.sourcemaps.init())
		.pipe(plugin.babel())
		//.pipe(plugin.concat())
		.pipe(plugin.sourcemaps.write("."))
		.pipe(gulp.dest(DEST_PATH));
});


//=================================//
// Watch  ( usage: $ gulp watch )
//=================================//
gulp.task('watch', function() {
	//plugin.livereload.listen();

	// Watch files
	gulp.watch(SRC_PATH + '/**/*.js', ['transpile']);
});


//=================================//
// DEBUG to console
//=================================//
gulp.task('debug', function() {
	debug = true;
	gulp.start('watch');
});


/**
 * Error handler/beeper
 * @param e
 */
function onError(e){
	console.log(e);
	this.emit('end')
}