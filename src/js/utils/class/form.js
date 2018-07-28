import Errors from './errors';
import Ajax from './ajax';
import { Notify } from './notification';
import cloneDeep from 'lodash.clonedeep';
import { isObject } from '../typeChecks';
import { isArray } from '../array';
import { hasFile, toFormData } from '../files';

/**
 * Private class methods
 */
const initModel = Symbol('initModel');
const mergeWithAppends = Symbol('mergeWithAppends');
const setClassVariables = Symbol('setClassVariables');

export default class Form {
    /**
     * Initialize the form.
     *
     * @param {object} model
     * @param {object} data
     */
    constructor (model, data = {}) {
        // Initialize the form's model
        this[initModel](model);

        // Setup class variables
        this[setClassVariables](data);

        // Initialize the error bag
        this.errors = new Errors();

        // Initialize the ajax helpers
        this.ajax = new Ajax();
    }

    /**
     * Initialize the form's model.
     *
     * @param {object} model
     */
    [initModel] (model) {
        this.model = model;

        this.originalData = cloneDeep(model);
    }

    /**
     * Merge the form's model data with any data that has been specified
     * to get appended to the request.
     *
     * @param {object} data
     * @param {boolean} transform
     * @returns {object|FormData|string}
     */
    [mergeWithAppends] (data, transform) {
        data = Object.assign(this.appends, data);

        if (transform) {
            if (hasFile(data)) {
                return toFormData(data);
            }

            if (this.stringify) {
                const qs = require('qs');

                return qs.stringify(data);
            }
        }

        return data;
    }

    /**
     * Set defaults for class variables.
     *
     * @param {object} data
     */
    [setClassVariables] (data = {}) {
        this.appends = {};
        this.attributes = null;
        this.busy = false;
        this.endpoint = null;
        this.destroyOnReset = false;
        this.stringify = false;
        this.notifySuccess = true;
        this.notifyError = true;
        this.successMessageKey = 'message';
        this.errorMessageKey = 'reason';
        this.notificationOptions = {};

        for (let property in data) {
            if (property in this) {
                this[property] = data[property];
            }
        }
    }

    /**
     * Get the data associated with the form.
     *
     * @param {boolean} transform
     * @returns {object|FormData|string}
     */
    data (transform = false) {
        let data = {};

        if (isArray(this.attributes) && this.attributes.length) {
            this.attributes.forEach(attribute => data[attribute] = this.model[attribute]);
        } else {
            for (let prop in this.model) {
                data[prop] = this.model[prop];
            }
        }

        return this[mergeWithAppends](data, transform);
    }

    /**
     * Add data to be appended to the form request.
     *
     * @param {object} data
     * @returns {Form}
     */
    appendData (data) {
        this.appends = Object.assign(this.appends, data);

        return this;
    }

    /**
     * Remove all appended data.
     *
     * @returns {Form}
     */
    clearAppendedData () {
        this.appends = {};

        return this;
    }

    /**
     * Customize the notification.
     *
     * @param {object} options
     * @returns {Form}
     */
    customizeNotification (options) {
        this.notificationOptions = options;

        return this;
    }

    /**
     * Prevent a notification from being shown when an error happens.
     *
     * @returns {Form}
     */
    hideErrorNotification () {
        this.notifyError = false;

        return this;
    }

    /**
     * Hide the success notification on a successful form submission.
     *
     * @returns {Form}
     */
    hideSuccessNotification () {
        this.notifySuccess = false;

        return this;
    }

    /**
     * Specify specific attributes to send from the model.
     *
     * @param {array|null} attributes
     * @returns {Form}
     */
    onlySend (attributes) {
        this.attributes = attributes;

        return this;
    }

    /**
     * Remove the given item from appended form data.
     *
     * @param {array|string} key
     * @returns {Form|*}
     */
    removeAppendedItem (key) {
        if (isArray(key)) {
            key.forEach(k => this.removeAppendedData(k));

            return;
        }

        if (key in this.appends) {
            delete this.appends[key];
        }

        return this;
    }

    /**
     * Reset the form's model to its original state.
     */
    reset () {
        if (! this.destroyOnReset) {
            for (let field in this.originalData) {
                this.model[field] = this.originalData[field];
            }

            return;
        }

        for (let field in this.model) {
            if (isArray(this.model[field])) {
                this.model[field] = [];
            } else if (isObject(this.model[field])) {
                this.model[field] = {};
            } else {
                this.model[field] = '';
            }

            // TODO: boolean check
        }
    }

    /**
     * Determines if the model data should be reset to its original state
     * or completely destroyed.
     *
     * @param {boolean} destroy
     * @returns {Form}
     */
    setDestroyOnReset (destroy = true) {
        this.destroyOnReset = destroy;

        return this;
    }

    /**
     * Set the endpoint of the form.
     *
     * @param {string} endpoint
     * @returns {Form}
     */
    setEndpoint (endpoint) {
        this.endpoint = endpoint;

        return this;
    }

    /**
     * Enable or disable JSON.stringify on data before sending to server.
     *
     * @param {boolean} stringify
     * @returns {Form}
     */
    setStringify (stringify = true) {
        this.stringify = stringify;

        return this;
    }

    /**
     * Update the given field on the model.
     *
     * @param {string} field
     * @param {*} value
     * @param {boolean} updateOriginal
     * @returns {Form}
     */
    updateField (field, value, updateOriginal = false) {
        this.model[field] = value;

        if (updateOriginal) {
            this.originalData[field] = value;
        }

        return this;
    }

    /**
     * Update the current model.
     *
     * @param {object} newModel
     * @returns {Form}
     */
    updateModel (newModel) {
        this[initModel](newModel);

        return this;
    }

    /**
     * Submit a GET request to the server.
     *
     * @param {string|null} endpoint
     * @returns {Promise}
     */
    get (endpoint = null) {
        return this.submit('get', this.normalizeEndpoint(endpoint));
    }

    /**
     * Submit a PATCH request to the server.
     *
     * @param {string|null} endpoint
     * @returns {Promise}
     */
    patch (endpoint = null) {
        return this.submit('patch', this.normalizeEndpoint(endpoint));
    }

    /**
     * Submit a POST request to the server.
     *
     * @param {string|null} endpoint
     * @returns {Promise}
     */
    post (endpoint = null) {
        return this.submit('post', this.normalizeEndpoint(endpoint));
    }

    /**
     * Submit a PUT request to the server.
     *
     * @param {string|null} endpoint
     * @returns {Promise}
     */
    put (endpoint = null) {
        return this.submit('put', this.normalizeEndpoint(endpoint));
    }

    /**
     * Determine the endpoint for the current request.
     *
     * @param {string|null} endpoint
     * @returns {string}
     */
    normalizeEndpoint (endpoint = null) {
        if (! endpoint || endpoint.toString().trim() === '') {
            endpoint = this.endpoint;
        }

        return endpoint;
    }

    submit (requestType, endpoint) {
        if (this.busy) {
            return;
        }

        this.busy = true;

        let data = this.data(true);

        // Clear any errors
        this.errors.clear();

        return new Promise((resolve, reject) => {
            this.ajax[requestType](endpoint, data)
                .then(data => {
                    if (this.notifySuccess && this.successMessageKey in data && data[this.successMessageKey].toString().length) {
                        this.notify(data[this.successMessageKey], 'success');
                    }

                    resolve(data);
                })
                .catch(error => {
                    if (error.data && error.data.errors && error.status === 422) {
                        // Validation errors have been returned from Laravel
                        this.errors.record(error.data.errors);
                    } else {
                        const message = this.getErrorMessage(error);

                        // Notify if error was returned
                        message && this.notify(message, 'error');
                    }

                    reject(error);
                })
                .then(() => this.busy = false);
        });
    }

    /**
     * Notify end-user of success or error.
     *
     * @param {string} message
     * @param {string} type
     */
    notify (message, type) {
        new Notify(this.notificationOptions)[type](message);
    }

    /**
     * Get an appropriate error message.
     *
     * @param {object} error
     * @returns {null|string}
     */
    getErrorMessage (error) {
        if (! this.notifyError) {
            return null;
        }

        return Ajax.getErrorMessage(error, this.errorMessageKey);
    }
}
