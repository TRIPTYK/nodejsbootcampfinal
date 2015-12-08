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
    compass: {
      public:{
        options:{
          sassDir:"src/sass",
          cssDir: "../back/public/css",
          environment:"production",
        },
      },
    },
    imagemin: {
      dynamic:{
        files: [{
          expand: true,
          cwd: "src/",
          src: ["img/**/*.{png,jpg,gif}"],
          dest: '../back/public/img/',
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
          dest: '../back/public/img/',
        }],
      },
    },
  });

  //Load the plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-newer');

  // Default task(s)
  grunt.registerTask('default',["newer:copy:public","compass","imagemin","svgmin"]);
};
