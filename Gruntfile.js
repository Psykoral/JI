module.exports = function (grunt) {
	'use strict';
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-assemble');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		conf: grunt.file.readYAML('conf.yml'),
		concat: {
			options: {
				stripBanners: true,
				banner: '/*!\n<%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd, h:MM:ss TT") %>\n' .concat(grunt.file.read('LICENSE.txt')) + '*/\n\n'
			},
			'dist-js': {
				src: ['<%=conf.dist%>/js/<%=pkg.name%>.js'],
				dest: '<%=conf.dist%>/js/<%=pkg.name%>.js'
			},
			'dist-min-js': {
				src: ['<%=conf.dist%>/js/<%=pkg.name%>.min.js'],
				dest: '<%=conf.dist%>/js/<%=pkg.name%>.min.js'
			}
		},
		assemble: {
			options: {
				assets: '<%=conf.temp%>',
				flatten: true,
				partials: ['docs/src/include/**/*.hbs',
					'docs/src/template/layout/*.hbs'
				],
				data: ['docs/data/**/*.{json,yml}'],
				helpers: ['src/helpers/*.js'],
				layoutdir: 'docs/src/template/layout',
				layout: 'default.hbs'
			},
			docs: {
				options: {
					app: {
						name: 'FlippyUI grunt-starter-kit',
						icon: '<%=conf.temp%>/img/favicon.ico',
						keywords: 'FlippyUI grunt starter kit',
						description: 'FlippyUI Grunt Starter Kit'
					},
					images: 'img',
					styles: ['<%=pkg.name%>.css'],
					scripts: ['<%=pkg.name%>.js']
				},
				files: [
					{
						cwd: 'docs/src/template/doc',
						expand: true,
						src: ['*.hbs'],
						dest: '<%=conf.temp%>/'
					}
				]
			}
		},
		clean: {
			dist: {
				files: [
					{
						dot: true,
						src: [
							'<%=conf.dist%>'
						]
					}
				]
			},
			report: '<%=conf.report%>',
			runners: ['_*'],
			temp: {
				files: [
					{
						dot: true,
						src: [
							'<%=conf.temp%>'
						]
					}
				]
			}
		},
		concurrent: {
			options: {
				logConcurrentOutput: true,
				limit: 15
			},
			test: [
				'jshint',
				'jscs',
				'jasmine:spec'
			],
			main: [
				'concurrent:test',
				'less:dist',
				'less:min',
				'requirejs:combine',
				'requirejs:compile'
			],
			demo: [
				'concurrent:test',
				'requirejs:combine',
				'requirejs:compile'
			]
		},
		connect: {
			options: {
				port: grunt.option('connect-port') || '<%=conf.port%>',
				livereload: grunt.option('connect-livereload') || '<%=conf.livereload%>',
				hostname: grunt.option('connect-hostname') || '<%=conf.host%>',
				protocol: grunt.option('connect-protocol') || 'http'
			},
			livereload: {
				options: {
					open: true,
					base: '<%=conf.temp%>'
				}
			},
			livetests: {
				options: {
					open: true,
					base: {
						path: '<%=conf.temp%>',
						options: {
							index: 'tests.html'
						}
					}
				}
			}
		},
		'string-replace': {
			livetests: {
				files: [{
					expand: true,
					cwd: '<%=conf.temp%>',
					src: 'tests.html',
					dest: '<%=conf.temp%>'
				}],
				options: {
					replacements: [{
						pattern: '..\\.grunt\\',
						replacement: '../.grunt/'
					}]
				}
			},
			jsdoc: {
				files: [{
					expand: true,
					cwd: '<%=conf.temp%>/jsdoc',
					src: '*.html',
					dest: '<%=conf.temp%>/jsdoc'
				}],
				options: {
					replacements: [
						{
							pattern: /\\/g,
							replacement: '/'
						},
						{
							pattern: /(.*?)(\/Gruntfile.*|\/bower_components.*|\/src.*).*/gm,
							replacement: '$2'
						}
					]
				}
			}
		},
		copy: {
			temp: {
				files: [
					{
						cwd: '<%=conf.dist%>',
						dot: true,
						dest: '<%=conf.temp%>',
						expand: true,
						src: [
							'img/*',
							'css/*',
							'js/*'
						]
					},
					{
						cwd: '<%=conf.src%>/config',
						dot: true,
						dest: '<%=conf.temp%>',
						expand: true,
						src: [
							'.htaccess',
							'*.json'
						]
					},
					{
						cwd: 'docs/src/asset',
						expand: true,
						src: ['*.{png,jpg,webp,ico,svg}'],
						dest: '<%=conf.temp%>/<%=assemble.docs.options.images%>'
					},
					{
						expand: true,
						cwd: 'docs/src/data',
						src: ['*.*'],
						dest: '<%=conf.temp%>/data',
						filter: 'isFile'
					}
				]
			},
			livetests: {
				files: [
					{
						cwd: '<%=conf.dist%>',
						dot: true,
						dest: '<%=conf.temp%>',
						expand: true,
						src: ['css/*']
					},
					{
						expand: true,
						cwd: 'bower_components',
						src: ['**/*'],
						dest: '<%=conf.temp%>/bower_components'
					},
					{
						cwd: '.grunt',
						expand: true,
						src: ['**/*'],
						dest: '<%=conf.temp%>/.grunt'
					},
					{
						expand: true,
						cwd: 'src/js',
						src: ['**/*.js'],
						dest: '<%=conf.temp%>/src/js'
					},
					{
						expand: true,
						cwd: 'tests',
						src: ['**/*'],
						dest: '<%=conf.temp%>/tests'
					}
				]
			}
		},
		jasmine: {
			options: {
				amd: true,
				specs: 'tests/**/*Spec.js',
				template: require('grunt-template-jasmine-requirejs'),
				templateOptions: {
					requireConfigFile: ['<%=conf.src%>/js/config.js']
				}
			},
			spec: {
				src: '<%=conf.src%>/js/**/*.js',
				options: {
					keepRunner: true,
					outfile: 'tests.html'
				}
			},
			livetests: {
				src: '<%=conf.temp%>/src/js/**/*.js',
				cwd: '<%=conf.temp%>',
				options: {
					specs: '<%=conf.temp%>/tests/**/*Spec.js',
					keepRunner: true,
					outfile: '<%=conf.temp%>/tests.html',
					templateOptions: {
						requireConfigFile: ['<%=conf.temp%>/src/js/config.js']
					}
				}
			},
			report: {
				src: '<%=conf.src%>/js/**/*.js',
				options: {
					junit: {
						path: '<%=conf.report%>/junit'
					}
				}
			}
		},
		jscs: {
			main: [
				'src/js/**/*.js',
				'tests/**/*.js',
				'!**/*jquery*'
			],
			options: '<%=pkg.jscsConfig%>'
		},
		jsdoc: {
			dist: {
				src: [
					'Gruntfile.js',
					'<%=conf.src%>/js',
					'tests'
				],
				options: {
					destination: '<%=conf.temp%>/jsdoc',
					recurse: true,
					configure: '<%=conf.src%>/config/jsdoc.json',
					private: true
				}
			}
		},
		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			src: {
				options: {
					jshintrc: '<%=conf.src%>/js/.jshintrc'
				},
				files: {
					src: '<%=conf.src%>/js/**/*.js'
				}
			},
			spec: {
				options: {
					jshintrc: 'tests/.jshintrc'
				},
				files: {
					src: 'tests/**/*Spec.js'
				}
			}
		},
		less: {
			options: {
				plugins: [
					new (require('less-plugin-autoprefix'))({
						browsers: ['last 2 versions']
					}),
					new (require('less-plugin-clean-css'))({
						advanced: true,
						keepBreaks: true
					})
				]
			},
			dist: {
				files: {
					'<%=conf.dist%>/css/<%=pkg.name%>.css': '<%=conf.src%>/less/main.less'
				}
			},
			min: {
				options: {
					plugins: [
						new (require('less-plugin-autoprefix'))({
							browsers: ['last 2 versions']
						}),
						new (require('less-plugin-clean-css'))({
							advanced: true
						})
					]
				},
				files: {
					'<%=conf.dist%>/css/<%=pkg.name%>.min.css': '<%=conf.src%>/less/main.less'
				}
			}
		},
		requirejs: {
			options: {
				baseUrl: '<%=conf.src%>/js',
				include: ['main'],
				name: '../../bower_components/almond/almond',
				mainConfigFile: '<%=conf.src%>/js/config.js',
				wrap: true
			},
			compile: {
				options: {
					out: '<%=conf.dist%>/js/<%=pkg.name%>.min.js'
				}
			},
			combine: {
				options: {
					optimize: 'none',
					out: '<%=conf.dist%>/js/<%=pkg.name%>.js'
				}
			}
		},
		watch: {
			assemble: {
				files: ['docs/**/*.{hbs,json}', '*.md'],
				tasks: ['assemble', 'copy:temp']
			},
			scripts: {
				files: [
					'Gruntfile.js',
					'<%=conf.src%>/js/**/*.{js,mustache,hbs}'
				],
				tasks: [
					'jscs',
					'concurrent:demo',
					'copy:temp'
				]
			},
			spec: {
				files: [
					'spec/**/*.js'
				],
				tasks: [
					'concurrent:test'
				]
			},
			livetests: {
				files: [
					'tests/**/*.js'
				],
				tasks: [
					'jshint:spec',
					'jasmine:livetests',
					'string-replace:livetests'
				]
			},
			images: {
				files: [
					'<%=conf.src%>/img/**/*.{png,jpg,jpeg,gif,webp,svg}'
				],
				tasks: ['copy:temp']
			},
			less: {
				files: [
					'<%=conf.src%>/less/**/*.less'
				],
				tasks: [
					'less:dist',
					'copy:temp'
				]
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%=conf.temp%>/css/*',
					'<%=conf.temp%>/js/*',
					'<%=conf.temp%>/**/*.html'
				]
			}
		},
		bump: {
			options: {
				files: ['bower.json', 'package.json'],
				updateConfigs: [],
				commit: true,
				commitMessage: 'Release %VERSION%',
				commitFiles: ['-a'],
				createTag: true,
				tagName: '%VERSION%',
				tagMessage: 'See commits in https://github.com/Psykoral/grunt-starter-kit/milestones/%VERSION%',
				push: true,
				pushTo: 'upstream',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
				globalReplace: false,
				prereleaseName: false,
				metadata: '',
				regExp: false
			}
		}
	});

	grunt.registerTask('default', ['build']);

	grunt.registerTask('build', [
		'clean',
		'concurrent:main',
		'concat:dist-js',
		'concat:dist-min-js'
	]);

	grunt.registerTask('test', [
		'clean',
		'assemble:docs',
		'less:dist',
		'concurrent:main',
		'concat:dist-js',
		'concat:dist-min-js'
	]);

	grunt.registerTask('site', [
		'assemble:docs',
		'less:dist',
		'concurrent:demo',
		'copy:livetests',
		'jasmine:livetests',
		'string-replace',
		'copy:temp'
	]);

	grunt.registerTask('live', [
		'clean',
		'site',
		'concat:dist-js',
		'connect:livereload',
		'watch'
	]);

	grunt.registerTask('livetests', [
		'clean',
		'jsdoc',
		'less:dist',
		'copy:livetests',
		'jasmine:livetests',
		'string-replace',
		'connect:livetests',
		'watch:livetests'
	]);

	grunt.registerTask('docs', [
		'clean',
		'test',
		'jsdoc',
		'less:dist',
		'copy:livetests',
		'jasmine:livetests',
		'string-replace'
	]);
};
