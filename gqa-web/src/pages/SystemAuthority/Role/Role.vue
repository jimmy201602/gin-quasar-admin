<template>
    <q-page padding>
        <q-card>
            <q-card-section class="row">
                <div class="text-h6 col">角色管理</div>
                <q-btn class="col-2" color="primary" label="新增根角色" @click="addRole" />
            </q-card-section>
            <RoleTree ref="rolesTree" />
        </q-card>
    </q-page>
</template>

<script>
import RoleTree from './RoleTree'

export default {
    name: 'Roles',
    components: {
        RoleTree,
    },
    methods: {
        addRole() {
            this.$refs.rolesTree.addRole('0')
        },
    },
}
</script>
