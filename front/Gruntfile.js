module.exports = function(grunt){
  grunt.initConfig({
    copy: {
      public: {
        files:[{
          expend: true,
          cwd: "src/",
          src:["*.html"],
          dest: "../back/public/pages/"
        }],
      },
    },
    uglify: {
      public: {
        files: {
          'public/js/main.min.js': ['src/js/main.js']
        },
      },
    },
    handlebarslayouts : {
      public : {
        files : {
          'public/pages/*.html':'src/views/pages/*.hbs'
        },
        options : {
          partials : [
          'src/views/partials/*.hbs'
        ],
        context : "../back/datas/pages.json"
        }
      }
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
          expend: true,
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
         tasks: ['handlebarslayouts']
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
  grunt.loadNpmTasks("grunt-handlebars-layouts");

  // Default task(s)
  grunt.registerTask('default',["uglify:public", "newer:copy:public", "handlebarslayouts", "compass","imagemin","svgmin", "watch"]);
};
