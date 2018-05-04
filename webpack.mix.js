const path = require('path')
const glob = require('glob-all')
const { mix } = require('laravel-mix')
const PurgecssPlugin = require('purgecss-webpack-plugin')

const isProduction = (process.env.NODE_ENV === 'production' || process.argv.includes('-p'))

/**
 * Custom PurgeCSS Extractor
 * https://github.com/FullHuman/purgecss
 * https://github.com/FullHuman/purgecss-webpack-plugin
 */
class BootstrapExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g);
  }
}
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix
  .setResourceRoot('public')
  .webpackConfig({devtool: 'source-map'})
  .autoload({
    jquery: ['$', 'window.jQuery', 'jQuery', 'jquery'],
  })
  .setPublicPath('public')
  .js('assets/scripts/main.js', '/scripts')
  .sass('assets/styles/main.scss', '/styles')
  .extract(['jquery', 'lodash', 'simple-pjax', 'bootstrap-sass'])

if (isProduction) {
  mix.webpackConfig({
    plugins: [
      new PurgecssPlugin({
        paths: glob.sync([
          // Modify the below paths to point to where your view files are located (and their extension)
          path.join(__dirname, 'views', '**/*.pug'),
          path.join(__dirname, 'resources', 'assets', 'scripts', '**/*.js')
        ]),
        extractors: [{
          extractor: BootstrapExtractor,
          extensions: ['html', 'js', 'edge', 'blade.php', 'pug']
        }]
      })
    ]
  })
  mix.version()
}
// Full API
// mix.js(src, output)
// mix.react(src, output) <-- Identical to mix.js(), but registers React Babel compilation.
// mix.extract(vendorLibs)
// mix.sass(src, output)
// mix.less(src, output)
// mix.stylus(src, output)
// mix.browserSync('my-site.dev')
// mix.combine(files, destination)
// mix.babel(files, destination) <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to)
// mix.minify(file)
// mix.sourceMaps() // Enable sourcemaps
// mix.version() // Enable versioning.
// mix.disableNotifications()
// mix.setPublicPath('path/to/public')
// mix.setResourceRoot('prefix/for/resource/locators')
// mix.autoload({}) <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}) <-- Override webpack.config.js, without editing the file directly.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// })