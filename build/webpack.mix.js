const { mix } = require('laravel-mix');
const { name } = require('../package.json');

const inProduction = mix.inProduction();

mix
	.setPublicPath('dist')
    .setResourceRoot('../')

	// scripts
	.js('src/js/index.js', 'js/' + name + '.js')

	// styles
	.sass('src/scss/backend/index.scss', 'css/backend-' + name + '.css')
	.sass('src/scss/vendor.scss', 'css/' + name + '-vendor.css')
    .sass('src/scss/auth/auth.scss', 'css')

	// colors
	.sass('src/scss/colors/blue-dark.scss', 'css/colors/blue-dark.css')
	.sass('src/scss/colors/blue.scss', 'css/colors/blue.css')
	.sass('src/scss/colors/default-dark.scss', 'css/colors/default-dark.css')
	.sass('src/scss/colors/default.scss', 'css/colors/default.css')
	.sass('src/scss/colors/green-dark.scss', 'css/colors/green-dark.css')
	.sass('src/scss/colors/green.scss', 'css/colors/green.css')
	.sass('src/scss/colors/megna-dark.scss', 'css/colors/megna-dark.css')
	.sass('src/scss/colors/megna.scss', 'css/colors/megna.css')
	.sass('src/scss/colors/purple-dark.scss', 'css/colors/purple-dark.css')
	.sass('src/scss/colors/purple.scss', 'css/colors/purple.css')
	.sass('src/scss/colors/red-dark.scss', 'css/colors/red-dark.css')
	.sass('src/scss/colors/red.scss', 'css/colors/red.css')

	.sourceMaps(! inProduction);