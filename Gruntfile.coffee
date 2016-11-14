#global module:false

"use strict"

module.exports = (grunt) ->
  grunt.loadNpmTasks "grunt-bower-task"
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-exec"
  grunt.loadNpmTasks "grunt-contrib-uglify"

  grunt.initConfig

    exec:
      jekyll:
        cmd: "jekyll build --trace --incremental --future true"

      clean:
        cmd: "jekyll clean"

      unpublished:
        cmd: "jekyll build --trace --incremental --future --unpublished"

    watch:
      options:
        livereload: true
      source:
        files: [
          "_includes/**/*"
          "_layouts/**/*"
          "_sass/**/*"
          "css/**/*"
          "pages/**/*"
          "js/**/*"
          "_config.yml"
          "*.html"
          "**/*.md"
        ]
        tasks: [
          "exec:jekyll"
        ]

    connect:
      server:
        options:
          port: 4000
          base: 'public'
          livereload: true

    uglify:
      vendor:
        files:
          'js/vendor/jquery.min.js': [
            'bower_components/jquery/dist/jquery.js'
          ],
          'js/vendor/modernizr.min.js': [
            'bower_components/modernizr/modernizr.js'
          ],

    copy:
      normailize:
        files: [
          cwd: 'bower_components/normalize.css'
          src: ['*.css']
          ext: '.scss'
          extDot: 'last'
          expand: true
          dest: '_sass/vendor/assets/normalize/'

          rename: (dir, name) ->
            dir + '_' + name
        ]

  grunt.registerTask "update", [
    "copy"
  ]

  grunt.registerTask "build", [
    "clean"
    "update"
    "uglify"
    "exec:jekyll"
  ]

  grunt.registerTask "unpublished", [
    "clean"
    "update"
    "uglify"
    "exec:unpublished"
  ]

  grunt.registerTask "serve", [
    "unpublished"
    "connect:server"
    "watch"
  ]

  grunt.registerTask "clean", [
    "exec:clean"
  ]

  # Bumdle JS source files
  grunt.registerTask "bundle", [
    "update"
    "uglify"
  ]

  grunt.registerTask "default", [
    "serve"
  ]
