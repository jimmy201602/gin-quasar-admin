<template>
    <q-page padding>
        <q-card>
            <q-card-section class="row">
                <div class="text-h6 col">用户管理</div>
                <q-btn class="col-2" color="primary" label="新增用户" @click="addUser" />
            </q-card-section>
            <q-table :data="tableData" :columns="columns" :pagination.sync="pagination"
                :rows-per-page-options="rowsOptions" row-key="ID" @request="getTableData" :loading="loading">
                <template v-slot:body-cell-headerImg="props">
                    <q-td :props="props">
                        <q-avatar>
                            <img :src="props.row.headerImg">
                        </q-avatar>
                    </q-td>
                </template>
                <template v-slot:body-cell-authorityId="props">
                    <q-td :props="props">
                        <q-icon name="edit" />
                        {{ props.row.authority.authorityName }}
                        <q-popup-edit v-model="props.row.authorityId" title="编辑角色">
                            <q-tree :nodes="roleOption" node-key="authorityId" label-key="authorityName"
                                :selected.sync="props.row.authority.authorityId" default-expand-all
                                @update:selected="changeRole(props.row)" selected-color="primary" />
                        </q-popup-edit>
                    </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <div class="q-gutter-xs">
                            <q-btn color="primary" @click="deleteUser(props.row)" label="删除" />
                        </div>
                    </q-td>
                </template>
            </q-table>
        </q-card>
        <q-dialog v-model="addUserDialogVisible" persistent>
            <q-card style="width: 500px;">
                <q-card-section>
                    <div class="text-h6">新增用户</div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                    <q-form @submit="addUserSubmit">
                        <div class="row q-gutter-md">
                            <template class="col">
                                <q-avatar v-if="userInfo.headerImg" @click="openHeaderChange">
                                    <img :src="userInfo.headerImg">
                                </q-avatar>
                                <q-avatar v-else color="primary" text-color="white" @click="openHeaderChange">
                                    GQA
                                </q-avatar>
                            </template>
                            <q-input class="col" outlined v-model="userInfo.username" label="用户名"
                                :rules="addUserRules.username" />
                        </div>
                        <q-input outlined v-model="userInfo.password" label="密码" :rules="addUserRules.password" />
                        <q-input outlined v-model="userInfo.nickName" label="昵称" :rules="addUserRules.nickName" />
                        <q-field outlined label="选择角色" stack-label>
                            <template v-slot:control>
                                <q-tree :nodes="roleOption" node-key="authorityId" label-key="authorityName"
                                    :selected.sync="userInfo.authorityId" default-expand-all selected-color="primary" />
                            </template>
                        </q-field>
                        <q-card-actions align="right">
                            <q-btn flat color="primary" label="取消" @click="closeAddUserDialog" />
                            <q-btn color="primary" label="确定" type="submit" />
                        </q-card-actions>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
        <AvatarDrawer ref="chooseImg" :target="userInfo" :targetKey="`headerImg`" />
    </q-page>
</template>

<script>
import { getUserListApi, setUserAuthorityApi, registerApi, deleteUserApi } from 'src/api/users'
import { getRoleListApi } from 'src/api/roles'
import table from 'src/mixins/table'
import AvatarDrawer from './AvatarDrawer'

export default {
    name: 'Users',
    mixins: [table],
    components: {
        AvatarDrawer,
    },
    data() {
        return {
            tableApi: getUserListApi,
            columns: [
                { name: 'headerImg', align: 'center', label: '头像', field: 'headerImg' },
                { name: 'uuid', align: 'center', label: 'UUID', field: 'uuid' },
                { name: 'userName', align: 'center', label: '用户名', field: 'userName' },
                { name: 'nickName', align: 'center', label: '昵称', field: 'nickName' },
                { name: 'authorityId', align: 'center', label: '用户角色', field: 'authorityId' },
                { name: 'actions', align: 'center', label: '操作', field: 'actions' },
            ],
            addUserRules: {
                username: [(val) => (val !== null && val !== '' && val.length >= 6) || '用户名为最低六位字符'],
                password: [(val) => (val !== null && val !== '' && val.length >= 6) || '密码为最低六位字符'],
                nickName: [(val) => (val !== null && val !== '') || '请输入昵称'],
                nickName: [(val) => (val !== null && val !== '') || '请选择用户角色'],
            },
            userInfo: {
                username: '',
                password: '',
                nickName: '',
                headerImg: '',
                authorityId: '',
            },
            addUserDialogVisible: false,
            roleOption: [],
        }
    },

    methods: {
        async changeRole(row) {
            const res = await setUserAuthorityApi({
                uuid: row.uuid,
                authorityId: row.authority.authorityId,
            })
            if (res.code === 0) {
                this.$q.notify({
                    type: 'positive',
                    message: '角色设置成功！',
                })
                this.getTableData({
                    pagination: this.pagination,
                })
            }
        },
        setOption(authData) {
            this.roleOption = []
            this.setRoleOption(authData, this.roleOption)
        },
        setRoleOption(authData, roleOption) {
            authData &&
                authData.map((item) => {
                    if (item.children && item.children.length) {
                        const option = {
                            authorityId: item.authorityId,
                            authorityName: item.authorityName,
                            children: [],
                        }
                        this.setRoleOption(item.children, option.children)
                        roleOption.push(option)
                    } else {
                        const option = {
                            authorityId: item.authorityId,
                            authorityName: item.authorityName,
                        }
                        roleOption.push(option)
                    }
                })
        },
        openHeaderChange() {
            this.$refs.chooseImg.open()
        },
        addUser() {
            this.addUserDialogVisible = true
        },
        deleteUser(row) {
            this.$q
                .dialog({
                    title: '删除确认',
                    message: '此操作将永久删除该用户',
                    cancel: true,
                    persistent: true,
                })
                .onOk(async () => {
                    const res = await deleteUserApi({
                        id: row.ID,
                    })
                    if (res.code === 0) {
                        this.$q.notify({
                            type: 'positive',
                            message: '用户删除成功！',
                        })
                        this.getTableData({
                            pagination: this.pagination,
                        })
                    }
                })
                .onCancel(() => {
                    this.$q.notify({
                        type: 'info',
                        message: '删除操作已取消！',
                    })
                })
        },
        async addUserSubmit() {
            const res = await registerApi(this.userInfo)
            if (res.code === 0) {
                this.$q.notify({
                    type: 'positive',
                    message: '新增用户成功！',
                })
                this.closeAddUserDialog()
                this.getTableData({
                    pagination: this.pagination,
                })
            }
        },
        closeAddUserDialog() {
            this.addUserDialogVisible = false
        },
    },
    async created() {
        const res = await getRoleListApi({ page: 1, pageSize: 999 })
        this.setOption(res.data.list)
    },
}
</script>
