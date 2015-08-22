var gulp = require('gulp');
var harmonize = require('harmonize');
var gulpFrontMatter = require('gulp-front-matter');
var _ = require('lodash');

harmonize();

var metalsmith = require('gulpsmith');
var layouts = require('metalsmith-layouts');
var templates = require('metalsmith-templates');

var sourceFiles = 'src/**/*.html';

var templatingConfig = {
  engine: 'handlebars',
  directory: 'templates'
};

gulp.task('metalsmith-layouts', function() {
  return gulp.src(sourceFiles)
    // Handling the front matter, since gulpsmith
    // can't handle it like vanilla metalsmith
    .pipe(gulpFrontMatter()).on('data', function(file) {
      if (!_.isEmpty(file.frontMatter)) {
        _.assign(file, file.frontMatter);
        delete file.frontMatter;
      }
    })
    .pipe(metalsmith()
      .use(layouts(templatingConfig))
    )
    .pipe(gulp.dest('build'));
});

gulp.task('metalsmith-templates', function() {
  return gulp.src(sourceFiles)
    // Handling the front matter, since gulpsmith
    // can't handle it like vanilla metalsmith
    .pipe(gulpFrontMatter()).on('data', function(file) {
      if (!_.isEmpty(file.frontMatter)) {
        _.assign(file, file.frontMatter);
        delete file.frontMatter;
      }
    })
    .pipe(metalsmith()
      .use(templates(templatingConfig))
    )
    .pipe(gulp.dest('build'));
});