<template>
    <q-page padding>
        <q-card>
            <q-card-section class="row">
                <div class="text-h6 col">字典管理</div>
            </q-card-section>
            <q-card-section class="row">
                <q-form class="row q-gutter-md flex-center" style="width: 100%">
                    <q-input class="col" outlined v-model="searchInfo.name" label="字典名（中）" />
                    <q-input class="col" outlined v-model="searchInfo.type" label="字典名（英）" />
                    <q-select class="col" outlined v-model="searchInfo.status" :options="statusOptions" label="状态"
                        stack-label />
                    <q-input class="col" outlined v-model="searchInfo.desc" label="描述" />
                    <div class="col q-gutter-xs">
                        <q-btn color="primary" @click="onSearch" label="查询" />
                        <q-btn color="primary" @click="openDialog" label="新增字典" />
                    </div>
                </q-form>
            </q-card-section>
            <q-table :data="tableData" :columns="columns" :pagination.sync="pagination"
                :rows-per-page-options="rowsOptions" row-key="ID" @request="getTableData" :loading="loading">
                <template v-slot:body-cell-status="props">
                    <q-td :props="props">
                        {{props.row.status? '启用':'停用'}}
                    </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <div class="q-gutter-xs">
                            <q-btn color="primary" @click="toDetail(props.row)" label="详情" />
                            <q-btn color="primary" @click="updateDict(props.row)" label="变更" />
                            <q-btn color="primary" @click="deleteDict(props.row)" label="删除" />
                        </div>
                    </q-td>
                </template>
            </q-table>
        </q-card>
        <q-dialog v-model="dialogFormVisible" persistent>
            <q-card style="width: 500px;">
                <q-card-section>
                    <div class="text-h6">{{dictDialogTitle}}</div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                    <q-form @submit="dictSubmit">
                        <q-input outlined v-model="formData.name" label="字典名（中）" :rules="dictRules.name" />
                        <q-input outlined v-model="formData.type" label="字典名（英）" :rules="dictRules.type" />
                        <q-select outlined v-model="formData.status" emit-value map-options :options="statusOptions"
                            label="状态" :rules="dictRules.status" />
                        <q-input outlined v-model="formData.desc" label="描述" :rules="dictRules.desc" />
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
import { createDictApi, deleteDictApi, updateDictApi, getDictApi, getDictListApi } from 'src/api/dictionary'
import table from 'src/mixins/table'

export default {
    name: 'Dict',
    mixins: [table],
    data() {
        return {
            tableApi: getDictListApi,
            columns: [
                { name: 'CreatedAt', align: 'center', label: '日期', field: 'CreatedAt' },
                { name: 'name', align: 'center', label: '字典名（中）', field: 'name' },
                { name: 'type', align: 'center', label: '字典名（英）', field: 'type' },
                { name: 'status', align: 'center', label: '启停状态', field: 'status' },
                { name: 'desc', align: 'center', label: '描述', field: 'desc' },
                { name: 'actions', align: 'center', label: '操作', field: 'actions' },
            ],
            type: '',
            dialogFormVisible: false,
            dictDialogTitle: '',
            visible: false,
            formData: {
                name: null,
                type: null,
                status: true,
                desc: null,
            },
            statusOptions: [
                {
                    value: true,
                    label: '启用',
                },
                {
                    value: false,
                    label: '停用',
                },
            ],
            dictRules: {
                name: [(val) => (val !== null && val !== '') || '请输入字典名（中）'],
                type: [(val) => (val !== null && val !== '') || '请输入字典名（英）'],
                status: [(val) => (val !== null && val !== '') || '请选择状态'],
                desc: [(val) => (val !== null && val !== '') || '请输入描述'],
            },
        }
    },
    methods: {
        toDetail(row) {
            this.$router.push({
                name: 'dictDetail',
                params: {
                    id: row.ID,
                    dictName: row.name + '（' + row.type + '）',
                },
            })
        },
        onSearch() {
            if (this.searchInfo.status == '') {
                this.searchInfo.status = null
            }
            this.getTableData({
                pagination: this.pagination,
                searchInfo: this.searchInfo,
            })
        },
        closeDialog() {
            this.dialogFormVisible = false
            this.formData = {
                name: null,
                type: null,
                status: true,
                desc: null,
            }
        },
        openDialog() {
            this.type = 'create'
            this.dictDialogTitle = '新增字典'
            this.dialogFormVisible = true
        },
        async updateDict(row) {
            const res = await getDictApi({
                ID: row.ID,
            })
            this.type = 'update'
            if (res.code === 0) {
                this.formData = res.data.resysDictionary
                this.dictDialogTitle = '变更字典'
                this.dialogFormVisible = true
            }
        },
        async deleteDict(row) {
            this.visible = false
            this.$q
                .dialog({
                    title: '删除确认',
                    message: '此操作将永久删除此字典！',
                    cancel: true,
                    persistent: true,
                })
                .onOk(async () => {
                    const res = await deleteDictApi({
                        ID: row.ID,
                    })
                    if (res.code === 0) {
                        this.$q.notify({
                            type: 'positive',
                            message: '字典删除成功！',
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
        async dictSubmit() {
            let res
            switch (this.type) {
                case 'create':
                    res = await createDictApi(this.formData)
                    break
                case 'update':
                    res = await updateDictApi(this.formData)
                    break
                default:
                    res = await createDictApi(this.formData)
                    break
            }
            if (res.code === 0) {
                this.$q.notify({
                    type: 'positive',
                    message: '字典（创建/变更）成功！',
                })
                this.closeDialog()
                this.getTableData({
                    pagination: this.pagination,
                })
            }
        },
    },
}
</script>