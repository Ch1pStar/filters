'use strict';

module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json');

  var cfg = {

    pkg: pkg,

    gitinfo: {},

    stylus: {
      build: {
        options: {
          sourcemap: { inline: true },
          paths: ['node_modules/'],
          compress: false,
          'include css': true,
          use: [
            function() { return require('autoprefixer-stylus')({browsers: ['last 2 versions', 'Safari >= 8']}); }
          ]
        },
        files: { 
          'dist/ext.min.css': ['src/styles/main.styl']
        }
      }
    },

    browserify: {
      options: {
        watch: true,
        transform: [
          ['babelify', {presets: ['es2015'], plugins: ['transform-class-properties']}], ['hbsify']
        ],
      },
      dev: {
        options: {
          browserifyOptions: {debug: true},
        },
        files: { 'dist/ext.min.js': 'src/js/main.js' }
      },
      prod: {
        files: { 'dist/ext.min.js': 'src/js/main.js' }
      }
    },

    clean: {
      build: ['dist/**/*.*']
    },

    watch: {
      options: {
        livereload: true
      },
      stylus: {
        files: ['src/styles/**/*.+(styl|css)'], tasks: 'stylus'
      },
      // eslint: {
      //   files: ['src/**/*.js'], tasks: 'eslint'
      // },
      rebuild: {
        files: ['Gruntfile.js'], tasks: 'build:dev'
      },
      install: {
        files: ['src/**/*.+(js|hbs)', 'src/styles/**/*.+(styl|css)'], tasks: 'execute:install'
      }
    },
    // eslint: {
    //   target: ['src/**/*.js']
    // },
    execute: {
      install: {
        src: ['install.js']
      }
    }
  };
  
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-execute');
  grunt.initConfig(cfg);
  // grunt.registerTask('build:dev',  ['gitinfo', 'eslint', 'clean', 'stylus', 'browserify:dev']);
  grunt.registerTask('build:dev',  ['gitinfo', 'clean', 'stylus', 'browserify:dev']);
  grunt.registerTask('build:prod', ['gitinfo', 'clean', 'stylus', 'browserify:prod']);
  grunt.registerTask('watchers', ['build:dev', 'watch']);
  grunt.registerTask('watchers:install', ['build:dev', 'execute:install', 'watch']);

};