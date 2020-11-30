<template>
    <q-page padding>
        <q-card>
            <q-card-section class="row">
                <div class="text-h6 col">菜单管理</div>
                <q-btn class="col-2" color="primary" label="新增根菜单" @click="addMenu('0')" />
            </q-card-section>
            <MenuTree ref="menusTree" />
        </q-card>
    </q-page>
</template>

<script>
import MenuTree from './MenuTree'

export default {
    name: 'Menus',
    components: {
        MenuTree,
    },
    methods: {
        addMenu() {
            this.$refs.menusTree.addMenu('0')
        },
    },
}
</script>