export default {
	props: {
	    field: String,
		serverField: String,
		serverErrors: {
			default: null
		},
		validation: {
		    default: null
		}
	},

	data () {
	    return {
	        localField: this.field,
		    localServerField: this.serverField
	    };
	},

	computed: {
		/**
		 * Determine the state of the form field.
		 *
		 * @returns {boolean}
		 */
	    computedState () {
	        return ! Boolean(this.hasClientError || this.hasServerError);
	    },

		/**
		 * Determine if there is a client side validation error.
		 *
		 * @returns {boolean}
		 */
		hasClientError () {
		    if (this.hasValidation) {
		    	return this.validation.hasError(this.localField);
		    }

		    return false;
		},

		/**
		 * Determine if there is a server side validation error.
		 *
		 * @returns {boolean}
		 */
		hasServerError () {
		    if (this.hasServerValidation) {
		    	return this.serverErrors.hasOwnProperty(this.localServerField);
		    }

		    return false;
		},

		/**
		 * Determine if there is server side validation.
		 *
		 * @returns {boolean}
		 */
		hasServerValidation () {
		    return !! this.serverErrors;
		},

		/**
		 * Determine if the client side validation exists (using SimpleVueValidator)
		 *
		 * @returns {boolean}
		 */
		hasValidation () {
		    return !! this.validation;
		},

		/**
		 * Generate the validation CSS class.
		 *
		 * @returns {string|null}
		 */
		stateClass () {
		    const state = this.computedState;

		    if (state === true) {
		    	return 'is-valid';
		    }

		    if (state === false) {
		    	return 'has-error';
		    }

		    return null;
		},

		/**
		 * Attempt to retrieve the first validation error.
		 *
		 * @returns {string|null}
		 */
		validationError () {
		    if (this.hasClientError) {
		    	return this.validation.firstError(this.localField);
		    }

		    if (this.hasServerError) {
		    	try {
		    	    return this.serverErrors.errors[this.localServerField][0];
		    	} catch (e) {}
		    }

		    return null;
		}
	},

	created () {
	    if (! this.localServerField || String(this.localServerField).trim() === '') {
	    	try {
	    	    let arr = this.localField.split('.');

	    	    arr.shift();

	    	    this.localServerField = arr.join('.');
	    	} catch (e) {}
	    }
	}
};