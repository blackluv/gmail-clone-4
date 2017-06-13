import gulp from 'gulp';
import connect from 'gulp-connect';
import browserify from 'browserify';
import watchify from 'watchify';
import stringify from 'stringify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';

const autoprefixerOptions = {
    browsers: [
        "Android 2.3",
        "Android >= 4",
        "Chrome >= 20",
        "Firefox >= 24",
        "Explorer >= 8",
        "iOS >= 6",
        "Opera >= 12",
        "Safari >= 6"
    ]
};


gulp.task('connect', () => {
	connect.server({
		livereload: true
	});
	
})

gulp.task('default', ['connect','watch','bundle','css']);

gulp.task('html', function () {
  gulp.src('**/*.html')
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(['*.html'], ['html']);
});

gulp.task('bundle', () => {
	let b = browserify({
		entries : ['./app/app.js'],
		cache : {},
		packageCache : {},
		plugin: watchify
	})
	.transform(stringify, {
		appliesTo: {
			includeExtensions : ['.html'],
			minify: true
		}
	})
	.transform(babelify, {
		presets : ['es2015']
	})

	b.on('update', bundle);
	bundle();

	function bundle() {
		console.log("I rebundled");
		b.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('dist/js/'))
	}
})

gulp.task('sass', () => {
    console.log("reloading sass files...");
    return gulp.src('./app/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      // .pipe(autoprefixer(autoprefixerOptions))
      .pipe(concat('main.css'))
      .pipe(gulp.dest('dist/css/'))
      .pipe(connect.reload());
});

gulp.task('css', () => {
	gulp.watch('app/**/*.scss',['sass']);
});