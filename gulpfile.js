// Initial setup from Gulp v4 - Sass and BrowserSync setup tutorial on https://www.youtube.com/watch?v=QgMQeLymAdU

const gulp = require('gulp');
const sass = require('gulp-sass');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const browserSync = require('browser-sync').create();
const nunjucksRender = require('gulp-nunjucks-render');
const replace = require('gulp-replace');

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

function cacheBuster() {
	const cbString = new Date().getTime();
	console.log(`Cache busting with timestamp: ${cbString}`);
	return gulp
		.src('./app/**/*.html')
		.pipe(replace(/\?version=\d*/g, `?version=${cbString}`))
		.pipe(gulp.dest('./app'));
}

const build = gulp.series(gulp.parallel(nunjucks, style, script, minImages), cacheBuster);

async function watch() {
	console.log('Launch BrowserSync...');
	browserSync.init({
		server: {
			baseDir: './app',
			serveStaticOptions: {
				extensions: ['html']
			}
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

exports.build = build;
exports.watch = gulp.series(build, watch);
