const gulp = require('gulp');
const sass = require('gulp-sass');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const browserSync = require('browser-sync').create();
const nunjucksRender = require('gulp-nunjucks-render');

// compile scss into css
function style() {
	console.log('Compiling SCSS');
	return (
		gulp
			// 1. where is my scss file
			.src('./scss/**/*.scss')

			// 2. pass file throughsass compiler
			.pipe(sass({ outputStyle: 'compressed' }))

			// Prefix the CSS with appropriate browser fallbacks
			.pipe(autoprefixer(/* get browserslist from package.json */))

			// 3. where do i save the compiled CSS?
			.pipe(gulp.dest('./app/css'))

			// 4. stream changes to all browsers
			.pipe(browserSync.stream())
	);
}

function script() {
	console.log('Compiling TypeScript');
	return gulp
		.src('./ts/**/*.ts')
		.pipe(ts('tsconfig.json'))
		.pipe(uglify())
		.pipe(gulp.dest('./app/js'))
		.pipe(browserSync.stream());
}

function minImages() {
	console.log('Transforming Images');
	return gulp
		.src('./images/**/*.+(png|jpeg|jpg|gif|svg)')
		.pipe(
			cache(
				imagemin({
					interlaced: true
				})
			)
		)
		.pipe(gulp.dest('./app/images'));
}

function nunjucks() {
	console.log('Transforming Nunjucks');
	return gulp
		.src('./pages/**/*.+(html|nunjucks|njk)')
		.pipe(
			nunjucksRender({
				path: ['./templates']
			})
		)
		.pipe(gulp.dest('./app'));
}

function build() {
	console.log('Building App');
	return new Promise(function (resolve, reject) {
		style();
		script();
		minImages();
		nunjucks();
		resolve();
	});
}

async function watch() {
	console.log('Initial Building...');
	await build();

	console.log('Launch BrowserSync...');
	browserSync.init({
		server: {
			baseDir: './app'
		}
	});

	console.log('Start Watching...');
	gulp.watch('./scss/**/*.scss', style);
	gulp.watch('./ts/**/*.ts', script);
	gulp.watch('./app/*.html').on('change', browserSync.reload);
	gulp.watch('./templates/**/*.njk', nunjucks);
	gulp.watch('./pages/**/*.njk', nunjucks);
	gulp.watch('./images/*', minImages);
	gulp.watch('./app/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.script = script;
exports.minImages = minImages;
exports.build = build;
exports.watch = watch;
exports.nunjucks = nunjucks;
