import PopOver from '../../utils/class/popover.class';
import { warn } from '../../utils/warn';
import toolpopMixin from '../../mixins/toolpop';

export default {
	mixins: [toolpopMixin],

	props: {
		title: {
			type: String,
			default: ''
		},
		content: {
			type: String,
			default: ''
		},
		triggers: {
			type: [String, Array],
			default: 'click'
		},
		placement: {
			type: String,
			default: 'right'
		}
	},

	render (h) {
		return h(
			'div',
			{
				class: ['d-none'],
				style: { display: 'none' },
				attrs: { 'aria-hidden': true }
			},
			[
				h('div', { ref: 'title' }, this.$slots.title),
				h('div', { ref: 'content' }, this.$slots.default)
			]
		);
	},

	methods: {
		/**
		 * Create the popover.
		 *
		 * @returns {PopOver|null}
		 */
		createToolpop () {
			// getTarget is in toolpop mixin
			const target = this.getTarget();

			if (target) {
				this._toolpop = new PopOver(target, this.getConfig(), this.$root);
			} else {
				this._toolpop = null;
				warn('b-popover: \'target\' element not found!');
			}
			
			return this._toolpop;
		}
	}
};