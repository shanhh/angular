# Gulp



### 简介

自动化构建工具（项目文件压缩）

*   易于使用
*   构建快速
*   插件高质
*   易于学习




### 安装与使用

1.  全局安装

    ```
    $ npm install --global gulp
    ```

2. 项目中使用进行安装

    ```
    $ npm install --save-dev gulp
    ```

3. 创建文件，并编写代码

    ```javascript
    var gulp = require('gulp');
    gulp.task('default', function() {
        // 将你的默认的任务代码放在这
    });
    gulp.task('minihtml', function () {
        
    });
    gulp.task('minicss', function () {
        
    });
    gulp.task('minijs', function () {
        
    });
    ```

4. 运行gulp，进行压缩

    ```
    $ gulp 
    ```

    gulp 命名，自动执行default任务，可以执行指定的任务

    ```
    使用任务名称，单独执行
    $ gulp minihtml
    $ gulp minicss
    $ gulp minijs
    ```

    ```
    // 执行gulp命令，一次性执行后续所有的任务
    gulp.task('default', ['minihtml', 'minicss', 'minijs']);
    ```

    ​

### 插件的使用

1.  插件安装

    ```
    npm install --save-dev gulp-minify-css
    ```

2. 插件引入

    ```javascript
    var minifycss = require('gulp-minify-css');
    ```

3. 使用插件压缩代码

    ```javascript
    gulp.task('minicss', function () {
        gulp.src('scripts/css/*/*.css') // 对哪些文件进行CSS压缩
        	.pipe(minifycss())
        	.pipe(gulp.dest('dist/scripts/css'))
    })
    ```

4. 执行任务

    ```
    $ gulp minicss
    ```



### 常用插件

*   gulp-htmlmin 压缩HTML
*   gulp-minify-css 压缩CSS
*   gulp-uglify 压缩JavaScript
*   …...




### 爱鲜蜂压缩代码

```javascript
// 引入对应的文件
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'), // 压缩CSS
    uglify = require('gulp-uglify'), // 压缩JavaScript
    htmlmin = require('gulp-htmlmin'); // 压缩HTML

// 压缩HTML
gulp.task('minihtml', function () {
    var options = {
        removeComments: true, // 移除注释
        collapseWhitespace: true // 移除空白内容
    };
    gulp.src('scripts/views/**/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/scripts/views'));

    gulp.src('index.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));
});

// 压缩所有CSS
gulp.task('minicss', function () {
    gulp.src('scripts/css/**/*.css')  // 压缩的文件
        .pipe(minifycss())
        .pipe(gulp.dest('dist/scripts/css')) // 输出文件夹
});

// 压缩所有JS代码
gulp.task('minijs', function () {
    gulp.src('scripts/**/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
});

// copy 将静态资源统一拷贝到dist相对目录
gulp.task('copy', function() {
    // 拷贝CSS
    gulp.src("css/*")
        .pipe(minifycss()) // 并压缩
        .pipe(gulp.dest("dist/css"));

    gulp.src("json/*")
        .pipe(gulp.dest("dist/json"));

    gulp.src("imgs/**/*")
        .pipe(gulp.dest("dist/imgs"));
})

// 执行任务
gulp.task('default', ['minihtml', 'minicss', 'minijs', 'copy']);
```