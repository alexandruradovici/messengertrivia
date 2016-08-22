"use strict";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint:
    {
        options:
        {
          node: true  
        },
        files: ['source/**/*.js']
    },
    watch:
    {
        files: 'source/**/*.js',
        tasks: ['default']
    },
    nodemon:
    {
        dev:
        {
            script: 'source/index.js'
        }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  
  grunt.registerTask('default', ['jshint', 'watch']);
  
};