import idMixin from '../../mixins/id';
import formOptionsMixin from '../../mixins/formOptions';
import formMixin from '../../mixins/form';
import formStateMixin from '../../mixins/formState';
import multiSelectMixin from './multiSelectMixin';
import { arrayFrom, isArray } from '../../utils/array';
import Multiselect from 'vue-multiselect';

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
        value: {},
    },

    computed: {
        /**
         * Generate the aria-invalid attribute.
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
                'form-control',
                this.stateClass
            ];
        },
    },

    data () {
        return {
            actualValue: this.value,
            localValue: null
        };
    },

    mounted () {
        // track-by is not working for some reason, so doing this as a work-around for now
        this.localValue = this.findOptionByValue(this.value);
    },

    render (h) {
        const $slots = this.$slots;
        // const options = this.formOptions.map((option, index) => {
        //    return h('option', {
        //        key: `option_${index}_opt`,
        //        attrs: { disabled: !! option.disabled },
        //        domProps: { innerHTML: option.text, value: option.value }
        //    });
        // });

        return h(
            'multiselect',
            {
                ref: 'input',
                // class: this.inputClass,
                // directives: [
                //     {
                //         name: 'model',
                //         rawName: 'v-model',
                //         value: this.localValue,
                //         expression: 'localValue'
                //     }
                // ],
                props: {
                    value: this.localValue,
                    options: this.formOptions,
                    id: this.safeId(),
                    name: this.name,
                    disabled: this.disabled,
                    required: this.required,
                    'aria-required': this.required ? 'true' : null,
                    'aria-invalid': this.computedAriaInvalid,
                    multiple: this.multiple,

                    // multiselect props
                    'label': this.textField,
                    // 'track-by': 'value',
                    'select-label': this.selectLabel,
                    'select-group-label': this.selectGroupLabel,
                    'selected-label': this.selectedLabel,
                    'deselect-label': this.deselectLabel,
                    'deselect-group-label': this.deselectGroupLabel,
                    'show-labels': this.showLabels,
                    'open-direction': this.openDirection,
                    'show-no-results': this.showNoResults,
                    'tabindex': this.tabIndex,
                    'searchable': this.searchable,
                    'allow-empty': this.allowEmpty,
                    'reset-after': this.resetAfter,
                    'close-on-select': this.closeOnSelect,
                    'max': this.max,
                    'preserve-search': this.preserveSearch,
                    'preselect-first': this.preselectFirst,
                    'placeholder': this.placeholder,
                    'hide-selected': this.hideSelected,
                },
                on: {
                    input: option => {
                        if (this.multiple) {
                            const values = arrayFrom(option)
                                .filter(o => o[this.valueField] !== null && o[this.valueField] !== '')
                                .map(o => o[this.valueField]);

                            this.actualValue = values;
                            this.localValue = this.findOptionByValue(values);
                        } else {
                            this.actualValue = option ? option[this.valueField] : null;
                            this.localValue = option;
                        }
                    },
                    remove: removedOption => {
                        if (! this.multiple) {
                            return;
                        }

                        const options = arrayFrom(this.localValue)
                            .filter(option => option[this.valueField] !== removedOption[this.valueField]);

                        const values = options.map(option => option[this.valueField]);

                        this.$nextTick(() => {
                            this.actualValue = values;
                            this.localValue = options;
                        });
                    }
                    // change: event => {
                    //     const target = event.target;
                    //     const selectedValue = arrayFrom(target.options)
                    //         .filter(option => option.selected)
                    //         .map(option => ('_value' in option ? option._value : option.value));
                    //
                    //     this.localValue = target.multiple ? selectedValue : selectedValue[0];
                    //
                    //     this.$emit('change', this.localValue);
                    // }
                }
            },
            // [$slots.first, options, $slots.default]
        );
    },

    methods: {
        findOptionByValue (value) {
            if (this.multiple) {
                if (! isArray(value)) {
                    value = [value];
                }

                return value.map(selection => this.formOptions.find(option => option[this.valueField] === selection));
            }

            return this.formOptions.find(option => option[this.valueField] === value);
        },
    },

    watch: {
        actualValue (newValue) {
            this.$emit('input', newValue);
        },

        // localValue () {
        //     this.$emit('input', this.localValue);
        // },

        value (newValue) {
            this.actualValue = newValue;
        }
    }
};
