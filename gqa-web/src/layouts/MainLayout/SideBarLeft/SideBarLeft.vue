<template>
    <q-list>
        <template v-for="(item, index) in addRoutes">
            <SideBarLeftItem :addRoutesItem="item" :key="index" :initLevel="0" />
        </template>
    </q-list>
</template>

<script>
import { mapGetters } from 'vuex'
import SideBarLeftItem from './SideBarLeftItem'

export default {
    name: 'SideBarLeft',
    components: {
        SideBarLeftItem,
    },
    computed: {
        ...mapGetters({
            addRoutes: 'session/addRoutes',
        }),
    },
}
</script>