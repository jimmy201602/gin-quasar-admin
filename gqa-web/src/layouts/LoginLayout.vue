<template>
    <q-layout class="layout-user-container">
        <q-page-container>
            <router-view />
        </q-page-container>
        <q-login-footer />
    </q-layout>
</template>

<script>
export default {
    name: 'UserLayout',
}
</script>

<style lang="scss" scoped>
.layout-user-container {
    // background-image: url('../statics/index.svg');
    // background: scale-color($primary, $lightness: 70%);
    background-image: url('~assets/sky.jpg');
    background-repeat: no-repeat;
    background-position: center 0px;
    background-size: 100% 100%;
}
</style>
