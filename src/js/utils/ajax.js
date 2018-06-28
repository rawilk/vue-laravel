import axios from 'axios';

/**
 * Axios AJAX helpers. Goal of this file is to
 * make a unified api for making ajax requests
 * in the application.
 */

/**
 * Submit a `DELETE` request to the given endpoint.
 *
 * @param {string} endpoint
 * @param {object} payload
 * @param {object} config
 * @returns {Promise}
 */
export const deleteRequest = (endpoint, payload = {}, config = {}) => {
	return submitRequest('delete', endpoint, normalizePayload(payload, config));
};

/**
 * Submit a `GET` ajax request to the given endpoint.
 *
 * @param {string} endpoint
 * @param {object} payload
 * @param {object} config
 * @returns {Promise}
 */
export const getRequest = (endpoint, payload = {}, config = {}) => {
	return submitRequest('get', endpoint, normalizePayload(payload, config));
};

/**
 * Submit a `PATCH` request to the given endpoint.
 *
 * @param {string} endpoint
 * @param {object} payload
 * @param {object} config
 * @returns {Promise}
 */
export const patchRequest = (endpoint, payload = {}, config = {}) => {
	return submitRequest('patch', endpoint, payload, config);
};

/**
 * Submit a `POST` ajax request to the given endpoint.
 *
 * @param {string} endpoint
 * @param {object} payload
 * @param {object} config
 * @returns {Promise}
 */
export const postRequest = (endpoint, payload = {}, config = {}) => {
	return submitRequest('post', endpoint, payload, config);
};

/**
 * Submit a `PUT` request to the given endpoint.
 *
 * @param {string} endpoint
 * @param {object} payload
 * @param {object} config
 * @returns {Promise}
 */
export const putRequest = (endpoint, payload = {}, config = {}) => {
	return submitRequest('put', endpoint, payload, config);
};

/**
 * Submit an ajax request to the given endpoint.
 *
 * @param {string} type
 * @param {string} endpoint
 * @param {object} payload
 * @param {object} config
 * @returns {Promise}
 */
const submitRequest = (type, endpoint, payload = {}, config = {}) => {
	return new Promise((resolve, reject) => {
		axios[type](endpoint, payload, config)
			.then(({ data }) => {
				resolve(data);
			})
			.catch(error => {
				reject(normalizeErrorResponse(error));
			});
	});
};

/**
 * Normalize the payload and config together for
 * requests that only have one parameter, like `GET` requests.
 *
 * @param {object} payload
 * @param {object} config
 * @returns {object}
 */
const normalizePayload = (payload, config) => {
	return {
		params: payload,
		...config
	};
};

/**
 * Normalize the given error response.
 *
 * @param {object} error
 * @returns {object}
 */
const normalizeErrorResponse = error => {
	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		return {
			data: error.response.data,
			status: error.response.status,
			headers: error.response.headers
		};
	}

	if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance
		// of http.ClientRequest in node.js
		return { request: error.request };
	}

	// Something happened in setting up the request that triggered an error
	return { message: error.message };
};