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
        files: ['*.js']
    },
    watch:
    {
        files: '*.js',
        tasks: ['default']
    },
    nodemon:
    {
        dev:
        {
            script: 'index.js'
        }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  
  grunt.registerTask('default', ['jshint', 'watch']);
  
};