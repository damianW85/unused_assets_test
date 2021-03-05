module.exports = function(grunt) {

	"use strict";

	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-unused");
	grunt.loadNpmTasks("grunt-inline");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-purifycss');

	grunt.initConfig({
		sass: {
			dist: {
				files: {
					'css/main.css': 'css/main.scss'
				}
			}
		},

		purifycss: {
			options: {},
			target: {
				src: ['*.html'],
				css: ['css/main.css'],
				dest: 'css/purestyles.css'
			},
		},

		autoprefixer: {
			options: {
				browsers: ['last 4 versions', 'ie 9', 'ie 8']
			},
			dist: { 
				files: {
					'css/main.css': 'css/*.css'
				}
			}
		},

		inline: {
			dist: {
				src: 'index.html',
			}
		},

		unused: {
			options: {
				reference: 'images/',
				directory: ['**/*.html', 'css/*.css'],
				days: 30,
				remove: false, // set to true to delete unused files from project
				reportOutput: 'report.txt', // set to false to disable file output
				fail: false // set to true to make the task fail when unused files are found
			}
		},

		watch: {
			css: {
					files: ["css/*.scss"],
					tasks: ["sass", "autoprefixer", "purifycss", "unused"]
			}
		}
	});

	grunt.registerTask("run", ["watch"]);
	grunt.registerTask("build", ["inline"]);
};