var gulp = require('gulp'),
    transform = require('css-transform'),
    options = {
        src: './src',
        includePaths: ['./bower_components/bootstrap/scss']
    };

/*
There are few tasks added in your gulp:

compile-es6 : Compile all of the *.es6 files under the options.src and output to the same directory.
compile-sass：Compile all of the *.scss files under the options.src and output to the same directory.
compile : It's run compile-es6 and compile-sass parallel.
watch-es6-sass：Watch files changes and compile them instantly.
*/

require('gulp-es6-sass')(gulp, options);


var nodeSass = require('node-sass');
var path = require('path');
var fs = require('fs');
var map = require('map-stream');
var basePath = "src/";
var excludeDir = basePath+"bower_components/";
var ext = "**/*.html";

/**
 * We need to specify to nodeSass the include paths for Sass' @import
 * command. These are all the paths that it will look for it. 
 * 
 * Failing to specify this, will NOT Compile your scss and inject it to 
 * your .html file.
 * 
 */

var includePaths = [path.join('app', 'style/'), 'src/**/', 'bower_components/bootstrap/scss'];

gulp.task('watchSass', function(){
  gulp.watch(['src/**/*.scss', '!app/bower_components/**/*.scss'], ["injectSass"]);  
});




//This is currently not used. But you can enable by uncommenting 
// " //return gulp.src([basePath+ext,...excludeDirs])" above the return.
var excludeDirs = [`!${basePath}/bower_components/${ext}`,`!${basePath}/images/${ext}`]
/**
 * 
 * Enable for advanced use:
 * 
 * 
 */

gulp.task('injectSass', function () {
    /* Original creator: David Vega. I just modified
    * it to take advantage of the Polymer 1.1's shared styles. 
    * 
    * This will look all the files that are inside:
    * app/elements folder. You can change this to match 
    * your structure.  Note, this gulp script uses convention
    * over configuration. This means that if you have a file called
    * my-element-styles.html you should have a file called 
    * my-element-styles.scss
    * 
    * Note #2: 
    * We use "!" (Exclamation Mark) to exclude gulp from searching these paths. 
    * What I'm doing here, is that Polymer Starter Kit has inside its app folder
    * all the bower dependencies (bower_components). If we don't specify it to 
    * exclude this path, this will look inside bower_components and will take a long time
    * (around 7.4 seconds in my machine) to replace all the files. 
    */
    //Uncomment if you want to specify multiple exclude directories. Uses ES6 spread operator.
    //return gulp.src([basePath+ext,...excludeDirs])
    return gulp.src([basePath+ext, '!'+excludeDir+ext])
        .pipe(map(function (file, cb) {
        
            //This will match anything between the Start Style and End Style HTML comments. 
            var startStyle = "<!-- Start Style -->";
            var endStyle = "<!-- End Style -->";
            //Creates the regEx this ways so I can pass the variables. 
            var regEx = new RegExp(startStyle+"[\\s\\S]*"+endStyle, "g");
            
            // Converts file buffer into a string
            var contents = file.contents.toString();
            
            //Checks if the RegEx exists in the file. If not, 
            //don't do anything and return.
            
            //Rewrote the if for reduced nesting.
            if (!regEx.test(contents)) {
                //Return empty. if we return cb(null, file). It will add
                //the file that we do not want to the pipeline!!
                return cb();
            }
            /**
             * Getting scss
             * This will get the .html file that matches the current name
             * This means that if you have my-app.component.html 
             * this will match my-app.component.scss. Replace with .sass if you 
             * have .sass files instead. 
             */
                var scssFile = file.path.replace(/\.html$/i, '.scss');
                
                fs.readFile(scssFile, function (err, data) {
                    
                    //Rewrote the if for reduced nesting.
                    //If error or there is no Sass, return null.
                    if (err || !data) {
                      return cb();
                    }
                    nodeSass.render({
                            data: data.toString(),
                            includePaths: includePaths,
                            outputStyle: 'compressed'
                        }, function (err, compiledScss) {
                        
                        console.log(err);
                        
                            /*compiledScss = transform(compiledScss.css).mapSelectors(function (sel) {
                                console.log(sel);
                                if (sel.indexOf(' ') < 0 && sel.indexOf('card-') > -1) {
                                    sel = '::slotted(' + sel + '), ' + sel;
                                    console.log(sel);
                                    return sel;
                                }
                                return sel;
                            }).toString();*/
                            
                            //Rewrote the if for reduced nesting.
                            //If error or there is no Sass, return null.
                            if (err || !compiledScss)
                                return cb();
                                /**
                                 * What we are doing here is simple: 
                                 * We are re-creating the start and end placeholders
                                 * that we had and inject them back to the .html file
                                 * 
                                 * This will allow us to re-inject any changes that we 
                                 * do to our .scss or files. 
                                 * 
                                 */
                                var injectSassContent = startStyle +
                                    "<style>" +
                                    //compiledScss +
                                    compiledScss.css.toString() + 
                                    "</style>" +
                                    endStyle;

                                //This is going to replace everything that was between the <!-- Start Style --> and
                                // "<!-- End Style -->"
                                file.contents = new Buffer(contents.replace(regEx, injectSassContent), 'utf8');
                                //This return is necessary, or the modified map will not be modified!
                                return cb(null,file);
                     });
                });
            }))
        .pipe(gulp.dest(basePath));
}); //Ends 