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
                        'src/css/addon.css',
                        'vendor/superfish/superfish.css'
                    ]
                }
                /*src: COMMON_MODULE_LIST.concat(DIST_MODULE_LIST),
                dest: 'dist/master/master.js'*/
            }/*,
            dev: {
                options: {
                    banner: BANNER
                },
                files: {
                    'dist/dev/dev.css': [
                        'src/css/addon.css',
                        'vendor/superfish/superfish.css'
                    ]
                }
            }*/
        },
 
        uglify: {
            dist: {
                files: (function () {
                    // Using an IIFE so that the destination property name can be
                    // created dynamically with sub().
                    //var obj = {};
                    //obj[sub('dist/%s.min.js')] = [sub('dist/%s.js')];
                    //return obj;
                }())
            },
            options: {
                banner: BANNER
            }
        }

    });
 
 
    grunt.registerTask('build', [
        'concat:dist',
        'uglify:dist',
        'concat:dev'
    ]);

    /*
    grunt.registerTask('dev', [
        'webmake:dev',
        'concat:dev'
    ]);
    */

    grunt.registerTask('default', [
        'browserify:addon'
        //'concat:dist'
    ]);

    /*
    grunt.registerTask('all', [
        'webmake:dev',
        'concat:dev',
        'webmake:dist',
        'concat:dist'
    ]);
    */
 
};

