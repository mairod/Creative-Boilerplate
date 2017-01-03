module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", {
                            loose: "all"
                        }],
                        "glslify"
                    ]
                },
                files: {
                    "../build/javascript/bundle.js": ["./index.js"]
                }
            }
        },
        compass: { // Task
            dist: { // Target
                options: {
                    config: './config.rb'
                }
            }
        },
        watch: {
            scripts: {
                files: [
                    "./*.js",
                    "./components/*.js",
                    "./sass/*.scss"
                ],
                tasks: ["compass", "browserify", "notify:watch"]
            }
        },
        notify: {
            watch: {
                options: {
                    title: 'Ninna Ricci | Super iFrame',
                    message: 'SASS and Browserfiy finished running'
                }
            },
            build: {
                options: {
                    title: 'Ninna Ricci | Super iFrame',
                    message: 'Build Successful !'
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        '../build/stylesheets/*.css',
                        '../build/javascript/*.js',
                        '../build/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: '../build'
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask("default", ["browserSync", "watch"]);
    grunt.registerTask("build", ["browserify", "compass", "notify:build"]);
};
