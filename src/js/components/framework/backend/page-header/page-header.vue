<template>
    <b-affix :enabled="fixed" :offset-top="offsetTop" :minimum-offset="minimumOffset">
        <b-row class="page-titles">
            <b-col md="5" cols="8" align-self="center">
                <h3 class="mb-0 mt-0"><slot></slot></h3>
                <ol class="breadcrumb" v-if="!! $slots['breadcrumbs']">
                    <slot name="breadcrumbs"></slot>
                </ol>
            </b-col>
            <b-col md="7" cols="4" align-self="center">
                <div class="d-flex m-t-10 justify-content-end">
                    <slot name="header-right"></slot>
                </div>
            </b-col>
        </b-row>
    </b-affix>
</template>

<script>
    import { getElHeight } from '../../../../utils/dom';

    export default {
        name: 'page-header',

        props: {
            fixed: {
                type: Boolean,
                default: false
            }
        },

        data () {
            return {
                offsetTop: 0,
                minimumOffset: 1
            };
        },

        mounted () {
            if (this.fixed) {
                this.determineOffsets();
            }
        },

        methods: {
            /**
             * Determine the offsets needed to fix the header.
             */
            determineOffsets () {
                const topbarHeight = getElHeight('header.topbar');

                if (topbarHeight > 0) {
                    this.offsetTop = topbarHeight - 2;
                    this.minimumOffset = topbarHeight + 5;
                }
            }
        },

        watch: {
            fixed (fixed) {
                if (fixed) {
                    this.determineOffsets();
                }
            }
        }
    };
</script>