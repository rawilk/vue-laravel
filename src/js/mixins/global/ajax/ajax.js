import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from '../../../utils/ajax';

/**
 * Global ajax mixin available to every component in the Vue instance.
 */

export default {
	methods: {
		/**
		 * Submit a `DELETE` request to the given endpoint.
		 *
		 * @param {string} endpoint
		 * @param {object} payload
		 * @param {object} config
		 * @returns {Promise}
		 */
	    deleteRequest (endpoint, payload = {}, config = {}) {
	        return deleteRequest(endpoint, payload, config);
	    },

		/**
		 * Submit a `GET` request to the given endpoint.
		 *
		 * @param {string} endpoint
		 * @param {object} payload
		 * @param {object} config
		 * @returns {Promise}
		 */
		getRequest (endpoint, payload = {}, config = {}) {
		    return getRequest(endpoint, payload, config);
		},

		/**
		 * Submit a `PATCH` request to the given endpoint.
		 *
		 * @param {string} endpoint
		 * @param {object} payload
		 * @param {object} config
		 * @returns {Promise}
		 */
		patchRequest (endpoint, payload = {}, config = {}) {
		    return patchRequest(endpoint, payload, config);
		},

		/**
		 * Submit a `POST` request to the given endpoint.
		 *
		 * @param {string} endpoint
		 * @param {object} payload
		 * @param {object} config
		 * @returns {Promise}
		 */
		postRequest (endpoint, payload = {}, config = {}) {
		    return postRequest(endpoint, payload, config);
		},

		/**
		 * Submit a `PUT` request to the given endpoint.
		 *
		 * @param {string} endpoint
		 * @param {object} payload
		 * @param {object} config
		 * @returns {Promise}
		 */
		putRequest (endpoint, payload = {}, config = {}) {
		    return putRequest(endpoint, payload, config);
		},
	},
};