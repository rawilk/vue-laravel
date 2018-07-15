<template>
    <div>
        <multiselect
            v-model="localValue"
            :options="formOptions"
            :id="safeId()"
            :name="name"
            :disabled="disabled"
            :multiple="multiple"

            :select-label="selectLabel"
            :select-group-label="selectGroupLabel"
            :selected-label="selectedLabel"
            :deselect-label="deselectLabel"
            :deselect-group-label="deselectGroupLabel"
            :show-labels="showLabels"
            :open-direction="openDirection"
            :show-no-results="showNoResults"
            :tabindex="tabIndex"
            :searchable="searchable"
        >
        </multiselect>
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect';
    import idMixin from '../../mixins/id';
    import formOptionsMixin from '../../mixins/formOptions';
    import formMixin from '../../mixins/form';
    import formStateMixin from '../../mixins/formState';
    import multiSelectMixin from './multiSelectMixin';

    export default {
        components: {
            Multiselect
        },

        mixins: [
            idMixin,
            formMixin,
            formStateMixin,
            formOptionsMixin,
            multiSelectMixin
        ],

        props: {
            ariaInvalid: {
                type: [Boolean, String],
                default: false
            },
            multiple: {
                type: Boolean,
                default: false
            },
            value: {}
        },

        computed: {
            /**
             * Generate the aria-invalid attribute value.
             *
             * @returns {string|null}
             */
            computedAriaInvalid () {
                if (this.ariaInvalid === true || this.ariaInvalid === 'true') {
                    return 'true';
                }

                return this.stateClass === 'is-invalid' ? 'true' : null;
            },

            /**
             * Generate the select CSS classes.
             *
             * @returns {array}
             */
            inputClass () {
                return [
                    'form-control'
                ];
            }
        },

        data () {
            return {
                localValue: this.value
            };
        },

        watch: {
            localValue (value) {
                this.$emit('input', value);
            },

            value (value) {
                this.localValue = value;
            },
        },
    };
</script>
