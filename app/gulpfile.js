var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function(){
	nodemon({
		script: 'server.js',
		ext: 'js',
		env: {
			POST:8000
		},
		ignore: ['.node_modules/**']
	})
	.on('restart', function(){
		console.log('Restarting');
	});
});