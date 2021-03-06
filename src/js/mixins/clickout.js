export default {
	mounted () {
	    if (typeof document !== 'undefined') {
	    	document.documentElement.addEventListener('click', this._clickOutListener);
	    }
	},

	beforeDestroy () {
	    if (typeof document !== 'undefined') {
	    	document.documentElement.removeEventListener('click', this._clickOutListener);
	    }
	},

	methods: {
		/**
		 * Handle click out.
		 *
		 * @param {MouseEvent} e
		 * @private
		 */
	    _clickOutListener (e) {
	        if (! this.$el.contains(e.target)) {
	        	if (this.clickOutListener) {
	        		this.clickOutListener();
		        }
	        }
	    },
	},
};