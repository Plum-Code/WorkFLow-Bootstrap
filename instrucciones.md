
#### Requisitos
Tener instalado
1. [NodeJS](https://github.com/nvm-sh/nvm)
2. [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start)

#### Instrucciones
Ejecutar los siguientes comandos
1. `npm install`
2. `gulp importJS`
---------------------------------------
### Tutorial de Gulp 4
[**Video Tutorial**](https://www.youtube.com/watch?v=xE45euIRDr8&list=PLROIqh_5RZeDf1LgliebPZ_0TAX-QA_xm&index=1)

#### Instalaciones únicas
1.	npm install --global gulp-cli
    Este comando lo teneis que ejecutar una sola vez. Sirve para instalar gulp de forma global en el equipo para tenerlo disponible en todos los proyectos

Instalaciones que se han de ejecutar en cada proyecto en el que querais incluir gulp

2.	npm init
3.	npm install --save-dev gulp
4.	npm install --save-dev @babel/core @babel/register @babel/preset-env

#### El proyecto debe contener:
- Un archivo .babelrc donde pondremos la configuración de babel
- Un archivo gulpfile.babel.js donde pondremos la configuración de gulp (en el caso de usar babel 6 el archivo deberá llamarse gulpfile.js)

Transpilar JavaScript
#### gulp-babel:
Este el módulo que usará gulp para convertir el código a es5
`npm install --save-dev gulp-babel`

#### gulp-terser:
Es la nueva versión de uglify, sirve para ofuscar el código
`npm install --save-dev gulp-terser`

#### gulp-concat:
Une todos nuestros archivos js en uno solo
`npm install --save-dev gulp-concat`

#### HTML.
`npm install --save gulp-htmlmin`
Minifica y limpia nuestro HTML
[html-minifier](https://github.com/kangax/html-minifier)

#### CSS.
`npm install --save-dev gulp-postcss cssnano autoprefixer`

Para utilizar autoprefixer hay dos opciones, o añadir los navegadores a los que quieres dar soporte al package.json o hacerlo en un archivo separado.
.browserslistrc
[PostCSS](https://github.com/postcss/postcss/blob/master/docs/plugins.md)


#### PUG.
`npm install --save-dev gulp-pug`

#### SASS.
`npm install --save-dev gulp-sass`

#### purgar/limpiar CSS.
`npm install --save-dev gulp-purgecss`

#### Limpiar caché.
`npm install --save-dev gulp-cache-bust`

#### Comprimir imágenes.
`npm install --save-dev gulp-imagemin`

#### Browser Sync.
`npm install --save-dev browser-sync`

#### Gulp Plumber.
`npm install --save-dev gulp-plumber`