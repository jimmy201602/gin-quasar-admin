<template>
    <q-page padding>
        <q-card>
            <q-card-section class="row">
                <div class="text-h6 col">API管理</div>
            </q-card-section>
            <q-card-section class="row">
                <q-form class="row q-gutter-md flex-center" style="width: 100%">
                    <q-input class="col" outlined v-model="searchInfo.path" label="路径" />
                    <q-input class="col" outlined v-model="searchInfo.description" label="描述" />
                    <q-input class="col" outlined v-model="searchInfo.apiGroup" label="api组" />
                    <q-select class="col" outlined v-model="searchInfo.method" :options="methodOptions" label="请求"
                        stack-label />
                    <div class="col q-gutter-xs">
                        <q-btn color="primary" @click="onSearch" label="查询" />
                        <q-btn color="primary" @click="openDialog('addApi')" label="新增API" />
                    </div>

                </q-form>
            </q-card-section>
            <q-table :data="tableData" :columns="columns" :pagination.sync="pagination"
                :rows-per-page-options="rowsOptions" row-key="ID" @request="getTableData" :loading="loading">
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <div class="q-gutter-xs">
                            <q-btn color="primary" @click="editApi(props.row)" label="编辑" />
                            <q-btn color="primary" @click="deleteApi(props.row)" label="删除" />
                        </div>
                    </q-td>
                </template>
            </q-table>
        </q-card>

        <q-dialog v-model="apiDialogVisible" persistent>
            <q-card style="width: 500px;">
                <q-card-section>
                    <div class="text-h6">{{apiDialogTitle}}</div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                    <q-form @submit="apiSubmit">
                        <q-input outlined v-model="apiDialogForm.path" label="路径" :rules="apiRules.path" />
                        <q-select outlined v-model="apiDialogForm.method" emit-value map-options
                            :options="methodOptions" label="请求" :rules="apiRules.method" />
                        <q-input outlined v-model="apiDialogForm.apiGroup" label="api分组" :rules="apiRules.apiGroup" />
                        <q-input outlined v-model="apiDialogForm.description" label="api简介"
                            :rules="apiRules.description" />
                        <q-card-actions align="right">
                            <q-btn flat color="primary" label="取消" @click="closeDialog" />
                            <q-btn color="primary" label="确定" type="submit" />
                        </q-card-actions>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import { getApiByIdApi, getApiListApi, createApi, updateApi, deleteApi } from 'src/api/api'
import table from 'src/mixins/table'

export default {
    name: 'Api',
    mixins: [table],
    data() {
        return {
            tableApi: getApiListApi,
            columns: [
                { name: 'ID', align: 'center', label: 'ID', field: 'ID' },
                { name: 'path', align: 'center', label: 'api路径', field: 'path' },
                { name: 'apiGroup', align: 'center', label: 'api分组', field: 'apiGroup' },
                { name: 'description', align: 'center', label: 'api简介', field: 'description' },
                { name: 'method', align: 'center', label: '请求', field: 'method' },
                { name: 'actions', align: 'center', label: '操作', field: 'actions' },
            ],
            methodOptions: [
                {
                    value: 'POST',
                    label: '创建（POST）',
                },
                {
                    value: 'GET',
                    label: '查看（GET）',
                },
                {
                    value: 'PUT',
                    label: '更新（PUT）',
                },
                {
                    value: 'DELETE',
                    label: '删除（DELETE）',
                },
            ],
            apiDialogVisible: false,
            apiDialogTitle: '',
            apiDialogForm: {
                path: '',
                apiGroup: '',
                method: '',
                description: '',
            },
            type: '',
            apiRules: {
                path: [(val) => (val !== null && val !== '') || '请输入api路径'],
                apiGroup: [(val) => (val !== null && val !== '') || '请输入组名称'],
                method: [(val) => (val !== null && val !== '') || '请选择请求方式'],
                description: [(val) => (val !== null && val !== '') || '请输入api介绍'],
            },
        }
    },
    methods: {
        initForm() {
            this.apiDialogForm = {
                path: '',
                apiGroup: '',
                method: '',
                description: '',
            }
        },
        onSearch() {
            this.getTableData({
                pagination: this.pagination,
                searchInfo: this.searchInfo,
            })
        },
        closeDialog() {
            this.initForm()
            this.apiDialogVisible = false
        },
        openDialog(type) {
            switch (type) {
                case 'addApi':
                    this.apiDialogTitle = '新增Api'
                    break
                case 'edit':
                    this.apiDialogTitle = '编辑Api'
                    break
                default:
                    break
            }
            this.type = type
            this.apiDialogVisible = true
        },
        async editApi(row) {
            const res = await getApiByIdApi({
                id: row.ID,
            })
            this.apiDialogForm = res.data.api
            this.openDialog('edit')
        },
        async deleteApi(row) {
            this.$q
                .dialog({
                    title: '删除确认',
                    message: '此操作将永久删除此API！',
                    cancel: true,
                    persistent: true,
                })
                .onOk(async () => {
                    const res = await deleteApi(row)
                    if (res.code === 0) {
                        this.$q.notify({
                            type: 'positive',
                            message: 'API删除成功！',
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
        async apiSubmit() {
            switch (this.type) {
                case 'addApi':
                    {
                        const res = await createApi(this.apiDialogForm)
                        if (res.code == 0) {
                            this.$q.notify({
                                type: 'positive',
                                message: '添加成功!',
                            })
                        }
                        this.getTableData({
                            pagination: this.pagination,
                        })
                        this.closeDialog()
                    }

                    break
                case 'edit':
                    {
                        const res = await updateApi(this.apiDialogForm)
                        if (res.code == 0) {
                            this.$q.notify({
                                type: 'positive',
                                message: '编辑成功',
                            })
                        }
                        this.getTableData({
                            pagination: this.pagination,
                        })
                        this.closeDialog()
                    }
                    break
                default:
                    {
                        this.$q.notify({
                            type: 'negative',
                            message: '未知操作',
                        })
                    }
                    break
            }
        },
    },
}
</script>