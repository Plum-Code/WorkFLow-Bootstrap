// HTML
import htmlmin from 'gulp-htmlmin'


// CSS
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'

// PUG
import pug from 'gulp-pug'

//SASS
import sass from 'gulp-sass'

// JS
import gulp from 'gulp'
import babel from 'gulp-babel'
import terser from 'gulp-terser'

// Common
import concat from 'gulp-concat'

//Clean CSS
import cleanCSS from 'gulp-purgecss'

// Caché Bust
import cacheBust from 'gulp-cache-bust'

// Optimización Imágenes
import imagemin from 'gulp-imagemin'

// Browser Sync
import {init as server, stream, reload } from 'browser-sync'

// Plumber
import plumber from 'gulp-plumber'

// Variables | Constantes
const cssPlugins = [
    cssnano(),
    autoprefixer()
]

//Variables files

const production = false

//Variables files
const paths = {
    bootstrapSass: './node_modules/bootstrap/scss',

    importJS: {
        src: [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './node_modules/@popperjs/core/dist/umd/popper.min.js'
        ]
    },
    js:{
        src:[
            './src/js/jquery.min.js',
            './src/js/bootstrap.min.js',
            './src/js/popper.min.js',
            './src/js/main.js'
        ]
    },
    publicDir: './public',
    nameSass: './src/scss/**/*.scss',
    nameJS: 'bundle.js'
}
// Tarea para HTML
gulp.task('html', () => {
    return gulp
        .src('./src/*.html')
        .pipe(plumber())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(cacheBust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest('./public'))
})

// Tarea para CSS
gulp.task('css', () => {
    return gulp
        .src('./src/css/*.css')
        .pipe(plumber())
        .pipe(concat('styles.css'))
        .pipe(postcss(cssPlugins))
        .pipe(gulp.dest('./public/css/'))
        .pipe(stream());
})

// Tarea para Pug
gulp.task('views', () => {
    return gulp 
        .src('src/views/pages/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty:  production ? false : true
        }))
        .pipe(cacheBust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest('./public'))
})

// Tarea para Sass
gulp.task('sass', () => {
    return gulp
        .src(paths.nameSass)
        .pipe(plumber())
        .pipe(sass({ includePaths: [paths.bootstrapSass] ,
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(stream());
})

// Tarea para Babel
gulp.task('babel', () => {
    return gulp
        .src(paths.js.src)
        .pipe(plumber())
        .pipe(concat(paths.nameJS))
        .pipe(babel())
        .pipe(terser())
        .pipe(gulp.dest('./public/js'))
})

/* Tarea para Limpiar css de clases, 
*  selctores  que no se usen en el html
*/
gulp.task('cleanCSS', () => {
    return gulp
        .src('./public/css/styles.css')
        .pipe(plumber())
        .pipe(cleanCSS({
            content: ['./public/*.html']
        }))
        .pipe(gulp.dest('./public/css'))
})

// Tarea para comprimir el peso de las imagenes
gulp.task('imgmin', () => {
    return gulp.src('./src/img/*')
        .pipe(plumber())
        .pipe(imagemin([
            // imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
        ]))
        .pipe(gulp.dest('./public/img'))
})

/* Tarea por default ejecuta el 
servidor, las tareas de arriba*/

// Imports
gulp.task('importJS', () => {
    return gulp.src(paths.importJS.src)
    .pipe(gulp.dest('./src/js'))
})

gulp.task('default', () => {
    // Servidor de desarrollo
    server({
        server: [paths.publicDir]
    })
    // esta tareas no se ejecunta ya que se esta usando PUG y SASS
    gulp.watch('./src/*.html', gulp.series('html')).on('change', reload)
    // gulp.watch('./src/css/*.css', gulp.series('css'))

    // gulp.watch('./src/views/**/*.pug', gulp.series('views')).on('change', reload)
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'))
    gulp.watch('./src/js/*.js', gulp.series('babel')).on('change', reload)
})