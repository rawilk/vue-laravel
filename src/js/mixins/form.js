export default {
	props: {
	    name: String,
		id: String,
		disabled: {
	        type: Boolean,
			default: false
		},
		required: {
		    type: Boolean,
			default: false
		}
	},
};