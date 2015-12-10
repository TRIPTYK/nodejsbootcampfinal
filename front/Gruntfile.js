module.exports = function(grunt){
  grunt.initConfig({
    copy: {
      views: {
        files:[{
          expand: true,
          cwd:'src/views/pages/',
          src:["**/*.hbs"],
          dest: "../back/views/"
        },{
          expand: true,
          cwd:'src/views/partials/',
          src:["**/*.hbs"],
          dest: "../back/views/partials/"
        }],
      },
    },
    uglify: {
      public: {
        files: {
          '../back/public/js/main.min.js': ['src/js/main.js']
        },
      },
    },
    compass: {
      public:{
        options:{
          sassDir:"src/sass",
          cssDir: "../back/public/css",
          environment:"production",
        },
      },
    },
    sass: {
      public: {
        options: {
          style: 'expanded',
          require: 'susy'
        },
        files: [{
          expand: true,
          cwd: "src/sass",
          src:["*.scss"],
          dest: "../back/public/css/"
        }],
      },
    },
    imagemin: {
      dynamic:{
        files: [{
          expand: true,
          cwd: "src/",
          src: ["img/**/*.{png,jpg,gif}"],
          dest: '../back/public/',
        }],
      },
    },
    svgmin: {
      options: {
        plugins:[{
          removeViewBox: false
        },{
          removeUselessStrokeAndFill: false
        }]
      },
      public: {
        files:[{
          expand: true,
          cwd: "src/",
          src: ["img/**/*.svg"],
          dest: '../back/public/',
        }],
      },
    },
    watch: {
      options:{
        livereload: true
      },
       js: {
         files: 'src/js/**/*.js',
         tasks: ['uglify:public']
       },
       sass : {
         files : 'src/sass/**/*.scss',
         tasks : ['compass:public']
       },
       views: {
         files: ['src/views/**/**/*.hbs', 'src/views/**/**/*.json'],
         tasks: ['newer:copy']
       }
     }
  });

  //Load the plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s)
  grunt.registerTask('default',["uglify:public", "newer:copy:views", "compass","imagemin","svgmin", "watch"]);
};
