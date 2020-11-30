<template>
    <q-card>
        <q-card-section>
            <q-btn label="更新角色菜单" color="primary" @click="submit" />
        </q-card-section>
        <q-card-section style="max-height: 70vh" class="scroll">
            <q-tree :nodes="menuTreeData" node-key="ID" tick-strategy="strict" :ticked.sync="menuTreeId"
                default-expand-all v-if="menuTreeData.length">
                <template v-slot:default-header="prop">
                    <q-icon :name="prop.node.meta.icon" color="primary" class="q-mr-sm q-ml-sm" />
                    <div>{{ prop.node.meta.title }}</div>
                </template>
            </q-tree>
        </q-card-section>
    </q-card>
</template>

<script>
import { getMenuTreeApi, getAuthorityApi, addAuthorityApi } from 'src/api/menu'

export default {
    name: 'AuthMenu',
    props: {
        row: {
            default: function () {
                return {}
            },
            type: Object,
        },
    },
    methods: {
        changeAuthMenu(menu, auth) {
            menu.map((item) => {
                if (auth.indexOf(item.ID) !== -1) {
                    this.changeAuthMenuList.push(item)
                }
                if (item.children && item.children.length !== 0) {
                    this.changeAuthMenu(item.children, auth)
                }
            })
            return this.changeAuthMenuList
        },
        async submit() {
            const res = await addAuthorityApi({
                menus: this.finalMenu,
                authorityId: this.row.authorityId,
            })
            if (res.code === 0) {
                this.$q.notify({
                    type: 'positive',
                    message: '角色菜单更新成功！',
                })
            }
        },
    },
    computed: {
        finalMenu() {
            this.changeAuthMenuList = []
            return this.changeAuthMenu(this.menuTreeData, this.menuTreeId)
        },
    },
    data() {
        return {
            menuTreeData: [],
            menuTreeAuth: [],
            menuTreeId: [],
            changeAuthMenuList: [],
        }
    },
    async created() {
        const res = await getMenuTreeApi()
        this.menuTreeData = res.data.menus
        const res1 = await getAuthorityApi({ authorityId: this.row.authorityId })
        const menus = res1.data.menus
        const arr = []
        menus.map((item) => {
            arr.push(Number(item.ID))
        })
        this.menuTreeId = arr
    },
}
</script>