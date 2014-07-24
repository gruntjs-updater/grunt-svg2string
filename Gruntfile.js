/*
 * grunt-svg2string
 * https://github.com/mistakster/grunt-svg2string
 *
 * Copyright (c) 2014 Vladimir Kuznetsov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    svg2string: {
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options.js': ['test/fixtures/short.svg', 'test/fixtures/elements.svg']
        }
      },
      template_option: {
        options: {
          template: 'App.defaults("App.SVG", {[%= filename %]: [%= content %]});'
        },
        files: {
          'tmp/template_option.js': ['test/fixtures/short.svg']
        }
      },
      split_option: {
        options: {
          splitByLines: false
        },
        files: {
          'tmp/split_option.js': ['test/fixtures/elements.svg']
        }
      },
      length_option: {
        options: {
          lineLength: 59
        },
        files: {
          'tmp/length_option.js': ['test/fixtures/elements.svg']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'svg2string', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
