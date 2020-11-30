<template>
    <q-page padding>
        <q-card>
            <q-card-section class="row">
                <div class="text-h6 col">{{dictDetailName}}</div>
            </q-card-section>
            <q-card-section class="row">
                <q-form class="row q-gutter-md flex-center" style="width: 100%">
                    <q-input class="col" outlined v-model="searchInfo.label" label="展示值" />
                    <q-input class="col" outlined v-model="searchInfo.value" label="字典值" />
                    <q-select class="col" outlined v-model="searchInfo.status" :options="statusOptions" label="启用状态"
                        stack-label />
                    <div class="col q-gutter-xs">
                        <q-btn color="primary" @click="onSearch" label="查询" />
                        <q-btn color="primary" @click="openDialog" label="新增字典项" />
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
                            <q-btn color="primary" @click="updateDictDetail(props.row)" label="变更" />
                            <q-btn color="primary" @click="deleteDictDetail(props.row)" label="删除" />
                        </div>
                    </q-td>
                </template>
            </q-table>
        </q-card>
        <q-dialog v-model="dialogFormVisible" persistent>
            <q-card style="width: 500px;">
                <q-card-section>
                    <div class="text-h6">{{dictDetailDialogTitle}}</div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                    <q-form @submit="dictDetailSubmit">
                        <q-input outlined v-model="formData.label" label="展示值" :rules="dictDetailRules.name" />
                        <q-input outlined v-model="formData.value" label="字典值" :rules="dictDetailRules.type" />
                        <q-select outlined v-model="formData.status" emit-value map-options :options="statusOptions"
                            label="启停状态" :rules="dictDetailRules.status" />
                        <q-input outlined v-model="formData.sort" label="排序标记" :rules="dictDetailRules.sort" />
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
import { createDictDetailApi, deleteDictDetailApi, updateDictDetailApi, getDictDetailApi, getDictDetailListApi } from 'src/api/dictionary'
import table from 'src/mixins/table'

export default {
    name: 'DictDetail',
    mixins: [table],
    created() {
        this.searchInfo.sysDictionaryID = this.$route.params.id
        this.dictDetailName += this.$route.params.dictName
    },
    data() {
        return {
            tableApi: getDictDetailListApi,
            columns: [
                { name: 'CreatedAt', align: 'center', label: '日期', field: 'CreatedAt' },
                { name: 'label', align: 'center', label: '展示值', field: 'label' },
                { name: 'value', align: 'center', label: '字典值', field: 'value' },
                { name: 'status', align: 'center', label: '启用状态', field: 'status' },
                { name: 'sort', align: 'center', label: '排序标记', field: 'sort' },
                { name: 'actions', align: 'center', label: '操作', field: 'actions' },
            ],
            dialogFormVisible: false,
            dictDetailName: '字典详情：',
            dictDetailDialogTitle: '',
            visible: false,
            type: '',
            formData: {
                label: null,
                value: null,
                status: true,
                sort: null,
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
            dictDetailRules: {
                name: [(val) => (val !== null && val !== '') || '请输入展示值'],
                type: [(val) => (val !== null && val !== '') || '请输入字典值'],
                status: [(val) => (val !== null && val !== '') || '请选择状态'],
                sort: [(val) => (val !== null && val !== '') || '请输入排序'],
            },
        }
    },
    methods: {
        onSearch() {
            if (this.searchInfo.status == '') {
                this.searchInfo.status = null
            }
            this.getTableData({
                pagination: this.pagination,
                searchInfo: this.searchInfo,
            })
        },
        openDialog() {
            this.type = 'create'
            this.dictDetailDialogTitle = '新增字典项'
            this.dialogFormVisible = true
        },
        async updateDictDetail(row) {
            const res = await getDictDetailApi({
                ID: row.ID,
            })
            this.type = 'update'
            if (res.code === 0) {
                this.formData = res.data.resysDictionaryDetail
                this.dictDetailDialogTitle = '变更字典项'
                this.dialogFormVisible = true
            }
        },
        closeDialog() {
            this.dialogFormVisible = false
            this.formData = {
                label: null,
                value: null,
                status: true,
                sort: null,
                sysDictID: '',
            }
        },
        async deleteDictDetail(row) {
            this.visible = false
            this.$q
                .dialog({
                    title: '删除确认',
                    message: '此操作将永久删除此字典项！',
                    cancel: true,
                    persistent: true,
                })
                .onOk(async () => {
                    const res = await deleteDictDetailApi({
                        ID: row.ID,
                    })
                    if (res.code === 0) {
                        this.$q.notify({
                            type: 'positive',
                            message: '字典项删除成功！',
                        })
                        this.getTableData({
                            pagination: this.pagination,
                            searchInfo: this.searchInfo,
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
        async dictDetailSubmit() {
            this.formData.sysDictID = Number(this.$route.params.id)
            let res
            switch (this.type) {
                case 'create':
                    res = await createDictDetailApi(this.formData)
                    break
                case 'update':
                    res = await updateDictDetailApi(this.formData)
                    break
                default:
                    res = await createDictDetailApi(this.formData)
                    break
            }
            if (res.code === 0) {
                this.$q.notify({
                    type: 'positive',
                    message: '字典项（创建/变更）成功！',
                })
                this.closeDialog()
                this.getTableData({
                    pagination: this.pagination,
                    searchInfo: this.searchInfo,
                })
            }
        },
    },
}
</script>