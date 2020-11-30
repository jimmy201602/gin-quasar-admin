<template>
    <q-layout view="hHh LpR lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn flat dense size="md" icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
                <!-- <q-btn flat dense size="md" icon="more_vert" @click="miniState = !miniState" /> -->
                <q-avatar class="q-logo">
                    <img src="gqa128.png" />
                </q-avatar>
                <q-toolbar-title shrink class="text-bold">
                    <span> Gin-Quasar-Admin </span>
                </q-toolbar-title>

                <q-breadcrumbs active-color="white" style="font-size: 13px; margin-left: 20px">
                    <q-breadcrumbs-el :label="item.meta.title" :icon="item.meta.icon"
                        v-for="item in matched.slice(1, matched.length)" :key="item.path" />
                </q-breadcrumbs>
                <!-- <div>Quasar v{{ $q.version }}</div> -->
                <q-space />
                <q-tabs align="right" indicator-color="transparent" outside-arrows>
                    <Notice />
                    <Github />
                    <UserMenu />
                    <!-- <q-language-switcher/> -->
                    <Setting />
                </q-tabs>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above elevated content-class="bg-grey-1"
            :mini="!leftDrawerOpen || miniState">
            <q-list>
                <q-item-label header class="text-grey-8 text-center">
                    欢迎使用 Gin-Quasar-Admin ！
                </q-item-label>
                <SideBarLeft />
            </q-list>
        </q-drawer>

        <q-page-container>
            <ChipMenu />
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import SideBarLeft from './SideBarLeft/SideBarLeft.vue'
import ChipMenu from './ChipMenu'
import Notice from './Notice'
import Github from './Github'
import UserMenu from './UserMenu'
import Setting from './Setting'

export default {
    name: 'MainLayout',
    components: {
        SideBarLeft,
        ChipMenu,
        Notice,
        Github,
        UserMenu,
        Setting,
    },
    computed: {
        matched() {
            return this.$route.matched
        },
    },
    data() {
        return {
            leftDrawerOpen: false,
            miniState: false,
        }
    },
}
</script>

<style lang="scss" scoped>
.q-logo {
    margin-left: 8px;
    box-shadow: 0px 0px 10px #ffffff;
    img {
        background-image: radial-gradient(#ffffff, #1976d2);
        background-color: rgba($color: #ffffff, $alpha: 1);
        transform: rotate(0deg);
        transition: transform 1s ease-in-out;
    }
    &:hover img {
        transform: rotate(-360deg);
    }
}
</style>
