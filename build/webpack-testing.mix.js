const { mix } = require('laravel-mix');

mix
	.setPublicPath('testing/js/dist')
	.js('testing/js/app.js', 'app.js')
	.sourceMaps();