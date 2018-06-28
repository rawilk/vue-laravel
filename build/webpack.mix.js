const { mix } = require('laravel-mix');
const { name } = require('../package.json');

const inProduction = mix.inProduction();

mix
	.setPublicPath('dist')

	// scripts
	.js('src/js/index.js', 'dist/js/' + name + '.js')

	// styles
	.sass('src/scss/backend/index.scss', 'dist/css/backend-' + name + '.css')
	.sass('src/scss/vendor.scss', 'dist/css/' + name + '-vendor.css')

	// test stuff
	.js('testing/js/app.js', 'dist/js/tests')

	// colors
	// .sass('src/scss/colors/blue-dark.scss', 'dist/css/colors/blue-dark.css')
	// .sass('src/scss/colors/blue.scss', 'dist/css/colors/blue.css')
	// .sass('src/scss/colors/default-dark.scss', 'dist/css/colors/default-dark.css')
	// .sass('src/scss/colors/default.scss', 'dist/css/colors/default.css')
	// .sass('src/scss/colors/green-dark.scss', 'dist/css/colors/green-dark.css')
	// .sass('src/scss/colors/green.scss', 'dist/css/colors/green.css')
	// .sass('src/scss/colors/megna-dark.scss', 'dist/css/colors/megna-dark.css')
	// .sass('src/scss/colors/megna.scss', 'dist/css/colors/megna.css')
	// .sass('src/scss/colors/purple-dark.scss', 'dist/css/colors/purple-dark.css')
	// .sass('src/scss/colors/purple.scss', 'dist/css/colors/purple.css')
	// .sass('src/scss/colors/red-dark.scss', 'dist/css/colors/red-dark.css')
	// .sass('src/scss/colors/red.scss', 'dist/css/colors/red.css')

	.sourceMaps(! inProduction);