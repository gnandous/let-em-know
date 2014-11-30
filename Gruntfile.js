module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /* js files */

    concat:{
      options:{
        separator: ";"
      },
      jsplugins:{
        src: ["vendor/assets/javascripts/jquery/jquery.js", "vendor/assets/javascripts/angular/angular.js",  "vendor/assets/javascripts/*/*.js"],
        dest: "vendor/assets/javascripts/plugins.js"
      },
      alljs:{
        src:["vendor/assets/javascripts/plugins.js", "client/assets/app/modules/*.js","client/assets/app/app.js", "client/assets/app/services/*.js", "client/assets/app/controllers/*.js"],
        dest: "client/public/js/application.js"
      }

    },

    /* css files */

    concat_css: {
      options: {
        // Task-specific options go here.
      },
      cssplugins: {
        src: ['vendor/assets/stylesheets/bootstrap/bootstrap.css', 'vendor/assets/stylesheets/*/*.css'],
        dest:'vendor/assets/stylesheets/plugins.css'
      },
      allcss:{
        src: ['vendor/assets/stylesheets/plugins.css', 'client/assets/stylesheets/css/*.css'],
        dest:'client/public/css/application.css'
      }
    },
    less: {
        options: {
            paths: ["client/assets/stylesheets/less/"]
        },
        files: {
            expand: true,
            cwd: "client/assets/stylesheets/less/",
            src: ["**/*.less"],
            dest: "client/assets/stylesheets/css/",
            ext: ".css"
        }
    },
    watch:{
      dist:{
        files:['client/assets/app/*.js','client/assets/stylesheets/less/*.less'],
        tasks:['default'],
        options: {spawn:false}
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default',['less','concat_css:cssplugins','concat_css:allcss', 'concat:jsplugins', 'concat:alljs']);
}
