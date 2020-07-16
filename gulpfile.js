const gulp = require("gulp");
const sass = require("gulp-sass");
const ts = require("gulp-typescript");
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const browserSync = require("browser-sync").create();

// compile scss into css
function style() {
  return (
    gulp
      // 1. where is my scss file
      .src("./scss/**/*.scss")

      // 2. pass file throughsass compiler
      .pipe(sass())

      // Prefix the CSS with appropriate browser fallbacks
      .pipe(autoprefixer(/* get browserslist from package.json */))

      // 3. where do i save the compiled CSS?
      .pipe(gulp.dest("./app/css"))

      // 4. stream changes to all browsers
      .pipe(browserSync.stream())
  );
}

function script() {
  return gulp
    .src("./ts/**/*.ts")
    .pipe(ts("tsconfig.json"))
    .pipe(gulp.dest("./app/js"))
    .pipe(browserSync.stream());
}

function minImages() {
  return gulp
    .src("./images/**/*.+(png|jpeg|jpg|gif|svg)")
    .pipe(
      cache(
        imagemin({
          // Setting interlaced to true
          interlaced: true,
        })
      )
    )
    .pipe(gulp.dest("app/images"));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./app",
    },
  });

  gulp.watch("./scss/**/*.scss", style);
  gulp.watch("./ts/**/*.ts", script);
  gulp.watch("./app/*.html").on("change", browserSync.reload);
  gulp.watch("./images/*", minImages);
  gulp.watch("./app/js/**/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.script = script;
exports.minImages = minImages;
exports.build = gulp.parallel(style, script, minImages);
exports.watch = watch;
