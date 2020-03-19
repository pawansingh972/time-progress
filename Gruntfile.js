    module.exports = function(grunt) {
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            // concat task configuration goes here.
            dist: {
                src: [
                    'src/js/utils.js', 'src/js/date_time_utils.js', 'src/js/colors_util.js', 'src/js/timeprogress.js'
                ],
                dest: 'dist/script.js'
            }            
        },
        uglify: {
            // uglify task configuration goes here.
            static_mappings: {
                // Because these src-dest file mappings are manually specified, every
                // time a new file is added or removed, the Gruntfile has to be updated.
                files: [{
                    src: 'src/js/background.js', dest: 'dist/background.min.js'
                }, {
                    src: 'dist/script.js', dest: 'dist/script.min.js',
                }],
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
                keepSpecialComments: 0
            },
            target: {
                files: [{
                    src: 'src/css/style.css', dest: 'dist/style.min.css'
                }]
            }
        },
        copy: {
            dist: {
                files : [{
                    src: 'src/timeprogress.html',
                    dest: 'dist/timeprogress.html'
                }, {
                    src: 'src/assets/images/glass.png',
                    dest: 'dist/img/glass.png'
                }, {
                    src: 'manifest.json',
                    dest: 'dist/manifest.json'
                }]
            }
        },
        'string-replace': {
            inline: {
                files: {
                    'dist/timeprogress.html': 'dist/timeprogress.html'
                },
                options: {
                    replacements: [
                        {
                            pattern: '<!--start PROD imports',
                            replacement: '<!--start PROD imports-->'
                        },
                        {
                            pattern: 'end PROD imports-->',
                            replacement: '<!--end PROD imports-->'
                        },
                        {
                            pattern: '<!--start DEV imports-->',
                            replacement: '<!--start DEV imports'
                        },
                        {
                            pattern: '<!--end DEV imports-->',
                            replacement: 'end DEV imports-->'
                        },
                        {
                            pattern: '<!--start STYLE PROD imports',
                            replacement: '<!--start STYLE PROD imports-->'
                        },
                        {
                            pattern: 'end STYLE PROD imports-->',
                            replacement: '<!--end STYLE PROD imports-->'
                        },
                        {
                            pattern: '<!--start STYLE DEV imports-->',
                            replacement: '<!--start STYLE DEV imports'
                        },
                        {
                            pattern: '<!--end STYLE DEV imports-->',
                            replacement: 'end STYLE DEV imports-->'
                        }
                    ]
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    
    //load cssmin plugin
	grunt.loadNpmTasks('grunt-contrib-cssmin');
    
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('dist', ['concat:dist', 'uglify', 'cssmin:target', 'copy', 'string-replace']);
    // grunt.registerTask('dist', ['concat:dist', 'cssmin:target', 'copy', 'string-replace']);
    // grunt.registerTask('dist', ['uglify']);
}

