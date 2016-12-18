module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/lodash/lodash.min.js',
      'src/**/*.js',
      'test/**/*_spec.js'
    ],
    preprocessors: {
      'test/**/*.js': ['jshint'],
      'src/**/*.js': ['jshint']
    },
    browsers: ['PhantomJS']
  })
}
