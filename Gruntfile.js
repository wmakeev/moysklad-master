/*global module:false*/
module.exports = function (grunt) {
 
    // Gets inserted at the top of the generated files in dist/.
    var BANNER = [
        '/*! <%= pkg.name %> - v<%= pkg.version %> - ',
        '<%= grunt.template.today("yyyy-mm-dd") %> - <%= pkg.author %> */\n'
    ].join('');
 
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.initConfig({
 
        pkg: grunt.file.readJSON('package.json'),

        browserify: {

            addon: {
                src: ['src/js/addon.js'],
                dest: 'dist/moysklad-master.js',
                options: {
                    alias: [
                        './src/js/addon.js:addon',
                        './node_modules/lodash/dist/lodash.min.js:lodash',
                        './node_modules/lodash/dist/lodash.min.js:underscore',
                        './node_modules/backbone/backbone-min.js:backbone'
                        //'./node_modules/moment/min/moment.min.js:moment'
                    ],
                    // wrapp as Taist addon
                    postBundleCB: function (err, src, next) {
                        src = 'function init(){var ' + src + ';return require("addon")}';
                        next(err, src)
                    }
                }
            }
        },
 
        concat: {
            dist: {
                options: {
                    banner: BANNER
                },
                files: {
                    'dist/moysklad-master.css': [
                        'src/css/addon.css'
                    ]
                }
            }
        }

    });

    grunt.registerTask('default', [
        'browserify:addon'
        //'concat:dist'
    ]);
 
};

