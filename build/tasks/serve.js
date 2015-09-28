var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('serve', ['build'], function (done) {
  browserSync({
    open: true,
    port: 9000,
    server: {
      baseDir: ['./dist'],
      middleware: [
        function (req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          next();
        }]
    }
  }, done);
});
