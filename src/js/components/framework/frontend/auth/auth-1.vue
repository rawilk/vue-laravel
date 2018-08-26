<template>
    <section id="auth-1">
        <div class="auth-left"></div>
        <b-card class="auth-style-1">
            <div class="auth-form">
                <div class="auth-form-content">
                    <h1 class="login-title"><slot name="title">Login</slot></h1>
                    <slot></slot>
                </div>
                <div class="auth-form-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </b-card>
    </section>
</template>

<script>
    export default {
        name: 'auth-1'
    };
</script>