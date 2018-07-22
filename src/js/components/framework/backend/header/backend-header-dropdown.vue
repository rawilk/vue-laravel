<template>
    <b-dropdown tag="li" no-caret class="nav-item"
                variant="link" :animation="animation"
                :class="dropdownClass"
                toggle-class="nav-link text-white"
                :right="right"
    >
        <template slot="button-content">
            <slot name="button-content"></slot>
        </template>
        <slot></slot>
    </b-dropdown>
</template>

<script>
    export default {
        name: 'backend-header-dropdown',

        props: {
            animation: {
                type: String,
                default: null
            },
            dropdownClass: {
                type: [String, Array],
                default: null
            },
            right: {
                type: Boolean,
                default: false
            },
        }
    };
</script>