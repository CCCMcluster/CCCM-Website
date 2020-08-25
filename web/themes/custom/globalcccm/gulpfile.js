const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();

const paths = {
  scss: {
    src: "./scss/style.scss",
    dest: "./css",
    watch: "./scss/**/*.scss",
    bootstrap: "./node_modules/bootstrap/scss/bootstrap.scss",
  },
  js: {
    jquery: "./node_modules/jquery/dist/jquery.min.js",
    dest: "./js",
  },
};

// Compile sass into CSS & auto-inject into browsers
function styles() {
  return gulp
    .src([paths.scss.bootstrap, paths.scss.src])
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      postcss([
        autoprefixer({
          browsers: [
            "Chrome >= 35",
            "Firefox >= 38",
            "Edge >= 12",
            "Explorer >= 10",
            "iOS >= 8",
            "Safari >= 8",
            "Android 2.3",
            "Android >= 4",
            "Opera >= 12",
          ],
        }),
      ])
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(cleanCss())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

// Move the javascript files into our js folder
function js() {
  return gulp
    .src([paths.js.jquery])
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
}

// Static Server + watching scss/html files
function serve() {
  browserSync.init({
    proxy: "http://127.0.0.1:8888",
  });

  gulp
    .watch([paths.scss.watch, paths.scss.bootstrap], styles)
    .on("change", browserSync.reload);
}

const build = gulp.series(styles, gulp.parallel(js, serve));

exports.styles = styles;
exports.js = js;
exports.serve = serve;

exports.default = build;
