<template>
    <li :class="{ active: isOpen }" class="has-children">
        <a href="#" class="waves-effect waves-dark"
           @click.prevent="toggle"
        >
            <i v-if="icon && icon.length" :class="icon"></i>
            <span class="hide-menu">
                {{ name }}
                <i :class="arrowIconClass"></i>
            </span>
        </a>
        <b-collapse
            v-model="isOpen"
            :accordion="accordionName"
            :id="safeId()"
            tag="ul"
            ref="accordion"
            is-nav
        >
            <slot></slot>
        </b-collapse>
    </li>
</template>

<script>
    import idMixin from '../../../../mixins/id';
    import { isUrlActive } from '../../../../utils/url';
    import { selectAll } from '../../../../utils/dom';

    export default {
        mixins: [idMixin],

        props: {
            accordionId: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            topLevel: {
                type: Boolean,
                default: false
            },
            url: {
                type: String,
                default: ''
            }
        },

        computed: {
            accordionName () {
                return this.topLevel ? 'lara-nav' : this.accordionId;
            },

            arrowIconClass () {
                return [
                    'mdi',
                    this.isOpen ? 'mdi-chevron-down' : 'mdi-chevron-right'
                ];
            },
        },

        data () {
            return {
                isOpen: false
            };
        },

        mounted () {
            const links = selectAll('a.nav-link', this.$refs['accordion'].$el);

            links.some(link => {
                if (isUrlActive(link.getAttribute('href'))) {
                    this.isOpen = true;

                    return true;
                }
            });
        },

        methods: {
            toggle () {
                this.isOpen = ! this.isOpen;
            },
        },
    };
</script>