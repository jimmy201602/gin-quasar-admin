<template>
    <q-page padding>
        <q-card>
            <q-card-section class="row">
                <div class="text-h6 col">操作日志</div>
            </q-card-section>
            <q-card-section class="row">
                <q-form class="row q-gutter-md flex-center" style="width: 100%">
                    <q-input class="col" outlined v-model="searchInfo.method" label="请求方法" />
                    <q-input class="col" outlined v-model="searchInfo.path" label="请求路径" />
                    <q-input class="col" outlined v-model="searchInfo.status" label="结果状态码" />
                    <div class="col q-gutter-xs">
                        <q-btn color="primary" @click="onSearch" label="查询" />
                        <q-btn color="primary" @click="deleteMultiple" label="批量删除" />
                    </div>
                </q-form>
            </q-card-section>
            <q-table :data="tableData" :columns="columns" :pagination.sync="pagination" :loading="loading"
                :rows-per-page-options="rowsOptions" row-key="ID" @request="getTableData" selection="multiple"
                :selected.sync="multipleSelection">
                <template v-slot:body-cell-userName="props">
                    <q-td :props="props">
                        {{props.row.user.userName}}({{props.row.user.nickName}})
                    </q-td>
                </template>
                <template v-slot:body-cell-body="props">
                    <q-td :props="props">
                        <q-icon name="remove_red_eye" @click="catDetail(props.row.body)" />
                    </q-td>
                </template>
                <template v-slot:body-cell-resp="props">
                    <q-td :props="props">
                        <q-icon name="remove_red_eye" @click="catDetail(props.row.resp)" />
                    </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <div class="q-gutter-xs">
                            <q-btn color="primary" @click="deleteSingle(props.row)" label="删除" />
                        </div>
                    </q-td>
                </template>
            </q-table>
        </q-card>
        <q-dialog v-model="dialogDetailVisible">
            <q-card>
                <q-card-section>
                    <pre>{{dialogDetail}}</pre>
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import { deleteOperationLogApi, getOperationLogListApi, deleteOperationLogByIdsApi } from 'src/api/logs'
import table from 'src/mixins/table'

export default {
    name: 'Operation',
    mixins: [table],
    data() {
        return {
            tableApi: getOperationLogListApi,
            columns: [
                { name: 'userName', align: 'center', label: '操作人', field: 'userName' },
                { name: 'CreatedAt', align: 'center', label: '日期', field: 'CreatedAt' },
                { name: 'status', align: 'center', label: '状态码', field: 'status' },
                { name: 'ip', align: 'center', label: '请求ip', field: 'ip' },
                { name: 'method', align: 'center', label: '请求方法', field: 'method' },
                { name: 'path', align: 'center', label: '请求路径', field: 'path' },
                { name: 'body', align: 'center', label: '请求', field: 'body' },
                { name: 'resp', align: 'center', label: '响应', field: 'resp' },
                { name: 'actions', align: 'center', label: '操作', field: 'actions' },
            ],
            dialogDetailVisible: false,
            dialogDetail: '',
            visible: false,
            type: '',
            formData: {
                ip: null,
                method: null,
                path: null,
                status: null,
                latency: null,
                agent: null,
                error_message: null,
                user_id: null,
            },
            multipleSelection: [],
        }
    },
    methods: {
        detailToJson(detail) {
            try {
                return JSON.parse(detail)
            } catch (err) {
                console.log(err)
                return detail
            }
        },
        catDetail(detail) {
            this.dialogDetail = detail ? this.detailToJson(detail) : '没有记录！'
            this.dialogDetailVisible = true
        },
        onSearch() {
            this.getTableData({
                pagination: this.pagination,
                searchInfo: this.searchInfo,
            })
        },
        async deleteMultiple() {
            this.visible = false
            this.$q
                .dialog({
                    title: '删除确认',
                    message: '此操作将永久删除已选操作记录！',
                    cancel: true,
                    persistent: true,
                })
                .onOk(async () => {
                    const ids = []
                    this.multipleSelection &&
                        this.multipleSelection.map((item) => {
                            ids.push(item.ID)
                        })
                    const res = await deleteOperationLogByIdsApi({ ids })
                    if (res.code === 0) {
                        this.$q.notify({
                            type: 'positive',
                            message: '已选操作记录删除成功！',
                        })
                        this.multipleSelection = []
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
        async deleteSingle(row) {
            this.visible = false
            this.$q
                .dialog({
                    title: '删除确认',
                    message: '此操作将永久删除此操作记录！',
                    cancel: true,
                    persistent: true,
                })
                .onOk(async () => {
                    const res = await deleteOperationLogApi({
                        ID: row.ID,
                    })
                    if (res.code === 0) {
                        this.$q.notify({
                            type: 'positive',
                            message: '操作记录删除成功！',
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
    },
}
</script>