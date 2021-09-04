module.exports = function (grunt) {
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('aws-keys.json'),
    aws_s3: {
      options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>',
        secretAccessKey: '<%= aws.AWSSecretKey %>',
        region: '<%= aws.region %>'
      },
      dist: {
        options: {
          bucket: '<%= aws.AWSBucketName %>'
        },
        files: [
          {
            expand: true,
            cwd: 'dist/public/aws',
            src: ['appRouter-bundle.js', 'appRouter.min.css', 'footer-bundle.js', 'footer.min.css', 'minesweeper-bundle.js', 'minesweeper.min.css'],
            dest: 'main/build/public'
          },
          {
            expand: true,
            cwd: 'dist/server/aws',
            src: ['server.min.css', 'server-bundle.js'],
            dest: 'main/build/server'
          },
          {
            expand: true,
            cwd: 'src/images',
            src: ['*.png', '*.jpg', '*.jpeg'],
            dest: 'main/main-images'
          }
        ]
      }
    },
    webpack: {
      myConfig: require('./webpack.config.js')
    },
    uglify: {
      my_target: {
        files: {
          'dist/public/aws/appRouter-bundle.js': ['dist/public/appRouter.js'],
          'dist/public/aws/footer-bundle.js': ['dist/public/footer.js'],
          'dist/public/aws/minesweeper-bundle.js': ['dist/public/minesweeper.js'],
          'dist/server/aws/server-bundle.js': ['dist/server/server.js']
        }
      }
    },
    cssmin: {
      options: {
        level: {
          1: {
            specialComments: 0
          }
        }
      },
      target: {
        files: [
          {
            expand: true,
            cwd: 'dist/public',
            src: ['*.css', '!*.min.css'],
            dest: 'dist/public/aws',
            ext: '.min.css'
          }, {
            expand: true,
            cwd: 'dist/server',
            src: ['*.css', '!*.min.css'],
            dest: 'dist/server/aws',
            ext: '.min.css'
          }
        ]
      }
    },
    gitadd: {
      task: {
        options: {
          all: true
        }
      }
    },
    gitcommit: {
      task: {
        options: {
          message: 'End of day commit'
        }
      }
    },
    gitpush: { your_target: {} }
  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-git');

  grunt.registerTask('bucketDeploy', 'aws_s3:dist');
  grunt.registerTask('build', 'webpack');

  // Deploy To AWS First
  grunt.registerTask('deploy', ['build', 'uglify', 'cssmin', 'bucketDeploy']);
  // Push to Github
  grunt.registerTask('git', ['gitadd', 'gitcommit', 'gitpush']);
};