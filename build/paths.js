var path = require('path');
var appRoot = 'app/';
var outputRoot = 'dist/';
var tmp = 'tmp/';
var deployRoot = 'deploy/';
var topRoot = './';
var serverRoot = 'server/';

module.exports = {
  top: topRoot,
  root: appRoot,
  source: [appRoot + '**/*.js', '!**/jspm_packages/**', '!**/config.js'],
  deploy: deployRoot,
  tmp: tmp,
  html: appRoot + '**/*.html',
  style: 'styles/**/*.css',
  less: appRoot + 'styles/styles.less',
  images: appRoot + 'images/**/*',
  fonts: appRoot + 'fonts/**/*',
  output: outputRoot,
  server: serverRoot + '**/*'
};
