export default {
	functional: true,

	props: {
		classes: {
			type: [String, Array],
			default: ''
		}
	},

	render (h, { props }) {
		let classes = props.classes;

		if (! classes) {
			classes = '';
		}

		return h(
			'li',
			{
				staticClass: 'divider',
				class: classes,
			}
		);
	}
};