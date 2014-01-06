/*global module:false*/
module.exports = function (grunt) {
 
    // Gets inserted at the top of the generated files in dist/.
    var BANNER = [
        '/*! <%= pkg.name %> - v<%= pkg.version %> - ',
        '<%= grunt.template.today("yyyy-mm-dd") %> - <%= pkg.author %> */\n'
    ].join('');
 
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-webmake');
 
    grunt.initConfig({
 
        pkg: grunt.file.readJSON('package.json'),
 
        webmake: {
            dist: {
                files: {
                    'dist/moysklad-master.js': ['src/js/addon.js']
                }
            }/*,
            dev: {
                files: {
                    'dist/dev/dev.js': ['src/js/dev.js']
                }
            }*/
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

    grunt.registerTask('dist', [
        'webmake:dist',
        'concat:dist'
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

