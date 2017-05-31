var gulp = require("gulp"),
	htmlmin = require("gulp-htmlmin"),
	minifycss = require("gulp-minify-css"),
	uglify = require("gulp-uglify");

	//编写任务
	gulp.task("html", function(){
		var options = {
	        removeComments: true, // 移除注释
	        collapseWhitespace: true // 移除空白内容
	    };
	    gulp.src("index.html")
	    	.pipe(htmlmin(options))
	    	.pipe(gulp.dest("app"));
	    gulp.src("scripts/views/*/*.html")
	    	.pipe(htmlmin(options))
	    	.pipe(gulp.dest("app/scripts/views"));
	});
	gulp.task("css", function(){
		gulp.src("css/*.css")
			.pipe(minifycss())
			.pipe(gulp.dest("app/css"));
		gulp.src("scripts/css/*/*.css")
			.pipe(minifycss())
			.pipe(gulp.dest("app/scripts/css"));
	});
	gulp.task("js", function(){
		gulp.src("scripts/**/**/*.js")
			.pipe(uglify())
			.pipe(gulp.dest("app/scripts"));
	});
	gulp.task("copy", function(){
		gulp.src("imgs/*/*")
			.pipe(gulp.dest("app/imgs"));
		gulp.src("json/*")
			.pipe(gulp.dest("app/json"));
	});
	gulp.task("default", ["html", "css", "js", "copy"]);