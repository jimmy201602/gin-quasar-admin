<template>
    <q-btn-dropdown flat no-caps stretch auto-close>
        <template v-slot:label>
            <q-avatar size="26px">
                <img :src="avatar" />
            </q-avatar>
        </template>
        <div class="row no-wrap q-pa-md">
            <div class="column" style="min-width: 200px">
                <div class="text-h6 q-mb-md">Settings</div>
                <q-toggle dense v-model="mobileData" label="Use Mobile Data" />
                <q-toggle dense v-model="bluetooth" label="Bluetooth" class="q-mt-md" />
                <div class="q-mt-md">
                    <q-brand-color />
                </div>
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
                <q-avatar size="72px">
                    <img :src="avatar" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                    {{nickName}}
                </div>

                <q-btn color="primary" label="退出登录" push size="sm" v-close-popup @click="logout" />
            </div>
        </div>
    </q-btn-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'UserMenu',
    data() {
        return {
            mobileData: false,
            bluetooth: true,
        }
    },
    computed: {
        ...mapGetters('session', ['userInfo']),
        avatar() {
            return this.userInfo.headerImg ? this.userInfo.headerImg : this.$q.cookies.get('gqa_avatar')
        },
        nickName() {
            return this.userInfo.nickName
        },
    },
    methods: {
        logout() {
            this.$store.dispatch('session/LogOut').then(() => {
                this.$router.push({ path: '/login' })
            })
        },
    },
}
</script>