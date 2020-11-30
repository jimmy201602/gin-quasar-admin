<template>
    <div>
        <q-tree :nodes="tableData" node-key="authorityId" default-expand-all v-if="tableData.length" selected>
            <template v-slot:default-header="prop">
                <q-card style="width: 100%">
                    <q-card-section class="row items-center no-wrap">
                        <div class="col">
                            <q-chip color="primary" text-color="white" label="角色ID：" />
                            {{ prop.node.authorityId }}
                        </div>
                        <div class="col">
                            <q-chip color="primary" text-color="white" label="角色名称：" />
                            {{ prop.node.authorityName }}
                        </div>
                        <div class="col-auto q-gutter-xs">
                            <q-btn color="primary" label="设置权限" @click="setAuth(prop.node)" />
                            <q-btn color="primary" label="新增子角色" @click="addRole(prop.node.authorityId)" />
                            <q-btn color="primary" label="拷贝" @click="copyRole(prop.node)" />
                            <q-btn color="primary" label="编辑" @click="editRole(prop.node)" />
                            <q-btn color="primary" label="删除" @click="deleteRole(prop.node.authorityId)" />
                        </div>
                    </q-card-section>
                </q-card>
            </template>
        </q-tree>
        <q-dialog v-model="roleDialogVisible" persistent>
            <q-card style="width: 700px">
                <q-card-section>
                    <div class=" text-h6">{{roleDialogTitle}}</div>
                </q-card-section>
                <q-card-section>
                    <q-form @submit="roleSubmit" class="q-gutter-md">
                        <q-field outlined label="父级角色" stack-label :disable="openType === 'add'"
                            :rules="roleRules.parentId" v-model="roleDialogForm.parentId">
                            <template v-slot:control>
                                <q-tree :nodes="roleOption" node-key="authorityId" label-key="authorityName"
                                    :selected.sync="roleDialogForm.parentId" default-expand-all />
                            </template>
                        </q-field>
                        <q-input outlined type="number" :disable="openType=='edit'" v-model="roleDialogForm.authorityId"
                            label="角色ID（数字）" :rules="roleRules.authorityId" />
                        <q-input outlined v-model="roleDialogForm.authorityName" label="角色姓名"
                            :rules="roleRules.authorityName" />
                        <div>
                            <q-btn label="提交" type="submit" color="primary" />
                            <q-btn label="取消" @click="closeRoleDialog" color="primary" flat class="q-ml-sm" />
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-dialog v-model="authDialogVisible" persistent position="right">
            <q-card style="height: 100%">
                <q-card-section class="row items-center q-pb-none">
                    <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary"
                        align="justify" narrow-indicator>
                        <q-tab name="mails" label="角色菜单" />
                        <q-tab name="alarms" label="角色api" />
                        <q-tab name="movies" label="资源权限" />
                    </q-tabs>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
                <q-card-section>
                    <q-tab-panels v-model="tab" animated>
                        <q-tab-panel name="mails">
                            <AuthMenu :row="currentRow" />
                        </q-tab-panel>

                        <q-tab-panel name="alarms">
                            <AuthApi :row="currentRow" />
                        </q-tab-panel>

                        <q-tab-panel name="movies">
                            <AuthData :tableData="tableData" :row="currentRow" />
                        </q-tab-panel>
                    </q-tab-panels>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import { getRoleListApi, createRoleApi, updateRoleApi, copyRoleApi, deleteRoleApi } from 'src/api/roles'
import AuthMenu from './AuthMenu'
import AuthApi from './AuthApi'
import AuthData from './AuthData'
import table from 'src/mixins/table'

export default {
    name: 'RoleTree',
    mixins: [table],
    components: {
        AuthMenu,
        AuthApi,
        AuthData,
    },
    data() {
        return {
            tableApi: getRoleListApi,
            roleDialogTitle: '',
            roleDialogVisible: false,
            roleOption: [
                {
                    authorityId: '0',
                    authorityName: '根角色',
                },
            ],
            roleDialogForm: {
                parentId: '',
                authorityId: '',
                authorityName: '',
            },
            copyRoleForm: {},
            openType: 'add',
            roleRules: {
                authorityId: [(val) => (val !== null && val !== '') || '请输入角色ID'],
                authorityName: [(val) => (val !== null && val !== '') || '请输入角色名称'],
                parentId: [(val) => (val !== null && val !== '') || '请选择父级角色(唯一)'],
            },
            authDialogVisible: false,
            currentRow: {},
            tab: 'mails',
        }
    },
    methods: {
        initAddRoleForm() {
            this.roleDialogForm = {
                parentId: '',
                authorityId: '',
                authorityName: '',
            }
        },
        closeRoleDialog() {
            this.initAddRoleForm()
            this.roleDialogVisible = false
            this.getTableData({
                pagination: this.pagination,
            })
        },
        setOption() {
            this.roleOption = [
                {
                    authorityId: '0',
                    authorityName: '根角色',
                },
            ]
            this.setRoleOption(this.tableData, this.roleOption, false)
        },
        setRoleOption(tableData, roleOption, disabled) {
            this.roleDialogForm.authorityId = String(this.roleDialogForm.authorityId)
            tableData &&
                tableData.map((item) => {
                    if (item.children && item.children.length) {
                        const option = {
                            authorityId: item.authorityId,
                            authorityName: item.authorityName,
                            disabled: disabled || item.authorityId == this.roleDialogForm.authorityId,
                            children: [],
                        }
                        this.setRoleOption(item.children, option.children, disabled || item.authorityId == this.roleDialogForm.authorityId)
                        roleOption.push(option)
                    } else {
                        const option = {
                            authorityId: item.authorityId,
                            authorityName: item.authorityName,
                            disabled: disabled || item.authorityId == this.roleDialogForm.authorityId,
                        }
                        roleOption.push(option)
                    }
                })
        },
        addRole(parentId) {
            this.initAddRoleForm()
            this.roleDialogTitle = '新增角色'
            this.openType = 'add'
            this.roleDialogForm.parentId = parentId
            this.setOption()
            this.roleDialogVisible = true
        },
        editRole(node) {
            this.setOption()
            this.roleDialogTitle = '编辑角色'
            this.openType = 'edit'
            for (let key in this.roleDialogForm) {
                this.roleDialogForm[key] = node[key]
            }
            this.setOption()
            this.roleDialogVisible = true
        },
        copyRole(node) {
            this.setOption()
            this.roleDialogTitle = '复制角色'
            this.openType = 'copy'
            for (let key in this.roleDialogForm) {
                this.roleDialogForm[key] = node[key]
            }
            this.copyRoleForm = node
            this.roleDialogVisible = true
        },
        deleteRole(authorityId) {
            this.$q
                .dialog({
                    title: '删除确认',
                    message: '此操作将永久删除该角色',
                    cancel: true,
                    persistent: true,
                })
                .onOk(async () => {
                    const res = await deleteRoleApi({
                        authorityId: authorityId,
                    })
                    if (res.code === 0) {
                        this.$q.notify({
                            type: 'positive',
                            message: '角色删除成功！',
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
        async roleSubmit() {
            if (this.roleDialogForm.authorityId === '0') {
                this.$q.notify({
                    type: 'warning',
                    message: '角色ID不能为 0 ！',
                })
            }
            switch (this.openType) {
                case 'add':
                    {
                        const res = await createRoleApi(this.roleDialogForm)
                        if (res.code === 0) {
                            this.$q.notify({
                                type: 'positive',
                                message: '角色添加成功！',
                            })
                            this.closeRoleDialog()
                        }
                    }
                    break
                case 'edit':
                    {
                        const res = await updateRoleApi(this.roleDialogForm)
                        if (res.code === 0) {
                            this.$q.notify({
                                type: 'positive',
                                message: '角色编辑成功！',
                            })
                            this.closeRoleDialog()
                        }
                    }
                    break
                case 'copy': {
                    const data = {
                        authority: {
                            authorityId: 'string',
                            authorityName: 'string',
                            dataAuthorityId: [],
                            parentId: 'string',
                        },
                        oldAuthorityId: 0,
                    }
                    data.authority.authorityId = this.roleDialogForm.authorityId
                    data.authority.authorityName = this.roleDialogForm.authorityName
                    data.authority.parentId = this.roleDialogForm.parentId
                    data.authority.dataAuthorityId = this.copyRoleForm.dataAuthorityId
                    data.oldAuthorityId = this.copyRoleForm.authorityId
                    const res = await copyRoleApi(data)
                    if (res.code == 0) {
                        this.$q.notify({
                            type: 'positive',
                            message: '角色复制成功！',
                        })
                        this.closeRoleDialog()
                    }
                }
            }
            this.initAddRoleForm()
            this.roleDialogVisible = false
        },
        setAuth(row) {
            this.authDialogVisible = true
            this.currentRow = row
        },
    },
}
</script>