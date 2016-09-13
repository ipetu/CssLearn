module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    var imgExts = 'png,jpg,jpeg',
        getRequirejsOpts = function (dist) {
            return {
                optimize: dist ? 'uglify' : 'none',
                appDir: './js/',
                dir: './dist/js/',
                baseUrl: './lib',
                paths: {
                    app: '../app',
                    mod: '../mod'
                },
                modules: grunt.file.readJSON("optimize.json"),
                done: function (done, output) {
                    var duplicates = require('rjs-build-analysis').duplicates(output);

                    if (duplicates.length > 0) {
                        grunt.log.subhead('Duplicates found in requirejs build:');
                        grunt.log.warn(duplicates);
                        return done(new Error('r.js built duplicate modules, please check the excludes option.'));
                    }

                    done();
                }
            }
        },
        cfg = {
            protocol: 'http',
            hostname: '*',
            port: '9001',
            version: new Date().getTime(),
            defaultUrl: 'http://localhost:9001/',
            releaseUrl: 'http://localhost:9001/'//可更改为发布服务器的地址
        },
        getReplaceOptions = function (dist) {
            var baseUrl = cfg.defaultUrl,
                replacement = '" + new Date().getTime() + "';
            if (dist) {
                baseUrl = cfg.releaseUrl;
                replacement = cfg.version;
            }
            return {
                patterns: [
                    {
                        match: 'version',
                        replacement: cfg.version
                    },
                    {
                        match: 'baseUrl',
                        replacement: baseUrl
                    },
                    {
                        match: 'requirejsBust',
                        replacement: replacement
                    }
                ]
            }
        };

    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            config: {
                bowerDir: 'bower_components',
                tmp: 'tmp',
                src: {
                    img: 'img/',
                    css: 'less/',
                    js: 'js/',
                    html: 'html/'
                },
                dest: {
                    img: 'dist/img/',
                    css: 'dist/css/',
                    js: 'dist/js/',
                    html: 'dist/html/'
                }
            },
            clean: {
                dist: [
                    './dist'
                ],
                js: [
                    '<%=config.dest.js %>**'
                ]
            },
            imagemin: {
                dist: {
                    options: {
                        optimizationLevel: 3
                    },
                    files: [
                        {
                            expand: true,
                            cwd: '<%=config.src.img %>',
                            src: ['**/*.{' + imgExts + '}'],
                            dest: '<%=config.dest.img %>'
                        }
                    ]
                }
            },
            cssmin: {
                dist: {
                    expand: true,
                    cwd: '<%=config.dest.css %>',
                    src: '**/*.css',
                    dest: '<%=config.dest.css %>'
                }
            },
            autoprefixer: {
                dist: {
                    expand: true,
                    cwd: '<%=config.dest.css %>',
                    src: '**/*.css',
                    dest: '<%=config.dest.css %>'
                }
            },
            htmlmin: {
                dist: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: [
                        {
                            expand: true,
                            cwd: '<%=config.src.html %>',
                            src: '**/*',
                            dest: '<%=config.dest.html %>'
                        }
                    ]
                }
            },
            copy: {
                jquery: {
                    expand: true,
                    cwd: '<%=config.bowerDir %>/jquery/dist/',
                    src: ['jquery.js'],
                    dest: '<%=config.src.js %>lib/'
                },
                fullpage_js: {
                    expand: true,
                    cwd: '<%=config.bowerDir %>/fullpage.js/dist/',
                    src: ['jquery.fullpage.js'],
                    dest: '<%=config.src.js %>lib/'
                },
                fullpage_css: {
                    expand: true,
                    cwd: '<%=config.bowerDir %>/fullpage.js/dist/',
                    src: ['jquery.fullpage.css'],
                    dest: '<%=config.src.css %>lib/'
                },
                requirejs: {
                    expand: true,
                    cwd: '<%=config.bowerDir %>/requirejs/',
                    src: ['require.js'],
                    dest: '<%=config.src.js %>lib/'
                },
                lib_flexible: {
                    expand: true,
                    cwd: '<%=config.tmp %>/lib-flexible-master/src/',
                    src: ['*.js'],
                    dest: '<%=config.src.js %>lib/'
                },
                build_js: {
                    expand: true,
                    cwd: '<%=config.src.js %>',
                    src: ['**/*.js'],
                    dest: '<%=config.dest.js %>'
                },
                html: {
                    expand: true,
                    cwd: '<%=config.src.html %>',
                    src: ['**/*'],
                    dest: '<%=config.dest.html %>'
                }
            },
            less: {
                build: {
                    options: {
                        compress: false
                    },
                    files: [
                        {
                            expand: true,
                            cwd: '<%=config.src.css %>/mod/',
                            src: ['**/*.less'],
                            ext: '.css',
                            dest: '<%=config.dest.css %>'
                        }
                    ]
                }
            },
            watch: {
                options: {
                    livereload: true
                },
                image: {
                    files: '<%=config.src.img %>**/*.{' + imgExts + '}',
                    tasks: ['imagemin']
                },
                less: {
                    files: '<%=config.src.css %>**/*.less',
                    tasks: ['less:build', 'autoprefixer', 'replace:css']
                },
                js: {
                    files: '<%=config.src.js %>**/*.js',
                    tasks: ['copy:build_js', 'replace:js']
                },
                html: {
                    files: '<%=config.src.html %>**/*',
                    tasks: ['copy:html', 'replace:html']
                }
            },
            requirejs: {
                build: {
                    options: getRequirejsOpts()
                },
                dist: {
                    options: getRequirejsOpts(true)
                }
            },
            connect: {
                server: {
                    options: {
                        port: cfg.port,
                        hostname: cfg.hostname,
                        protocol: cfg.protocol,
                        base: {
                            path: 'dist',
                            options: {
                                index: 'html/index.html',
                                maxAge: 1000 * 60 * 5
                            }
                        },
                        open: true,
                        livereload: true
                    }
                }
            },
            replace: {
                options: getReplaceOptions(),
                html: {
                    expand: true,
                    cwd: '<%=config.dest.html %>/',
                    src: ['**/*'],
                    dest: '<%=config.dest.html %>'
                },
                css: {
                    expand: true,
                    cwd: '<%=config.dest.css %>/',
                    src: ['**/*.css'],
                    dest: '<%=config.dest.css %>'
                },
                js: {
                    expand: true,
                    cwd: '<%=config.dest.js %>/',
                    src: ['**/*.js'],
                    dest: '<%=config.dest.js %>'
                }
            }
        }
    );

    grunt.registerTask('default', '开发环境构建......', function () {
        grunt.task.run([
            'clean',
            'imagemin',
            'copy',
            'less',
            'autoprefixer',
            'replace'
        ]);
    });

    grunt.registerTask('release', '生产环境构建......', function () {
        grunt.config('replace.options', getReplaceOptions(true));
        grunt.task.run([
            'clean',
            'imagemin',
            'copy',
            'htmlmin',
            'less',
            'autoprefixer',
            'cssmin',
            'clean:js',
            'requirejs:dist',
            'replace'
        ]);
    });

    grunt.registerTask('optimize', 'requirejs优化......', function () {
        grunt.task.run([
            'clean:js',
            'requirejs:build'
        ]);
    });

    grunt.registerTask('server', '启动服务......', function () {
        grunt.task.run([
            'connect',
            'watch'
        ]);
    });
};