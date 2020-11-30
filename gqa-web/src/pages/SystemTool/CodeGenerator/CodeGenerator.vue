<template>
    <q-page padding>
        <q-card>
            <q-banner inline-actions rounded class="bg-red text-white">
                前端代码暂未适配 Quasar
            </q-banner>
            <q-card-section class="row">
                <div class="col">
                    <span class="text-h6">代码生成器</span>
                    <span class="text-red text-h7">前端代码暂未适配 Quasar</span>
                </div>
                <q-btn class="col-2" color="primary" label="从数据库表填写此页面" @click="fromDb" />
            </q-card-section>
            <q-card-section class="row">
                <q-form class="row q-gutter-md flex-center" style="width: 100%">
                    <q-input class="col" outlined v-model="form.structName" label="Struct名称" placeholder="首字母自动转换大写" />
                    <q-input class="col" outlined v-model="form.abbreviation" label="Struct简称"
                        placeholder="入参对象名和路由group" />
                    <q-input class="col" outlined v-model="form.description" label="Struct中文名称"
                        placeholder="中文描述作为自动api描述" />
                    <q-input class="col" outlined v-model="form.tableName" label="表名" placeholder="指定表名（非必填）" />
                    <q-input class="col" outlined v-model="form.packageName" label="文件名称" />
                    <q-checkbox v-model="form.autoCreateApiToSql" label="自动创建api" />
                    <q-checkbox v-model="form.autoMoveFile" label="自动移动文件" />
                </q-form>
            </q-card-section>
            <q-separator />
            <q-table :data="form.fields" :columns="columns" hide-bottom>
                <template v-slot:top>
                    <div class="col-2 q-table__title">Field表</div>
                    <q-space />
                    <div class="text-red" style="margin-right: 20px">
                        <q-icon name="warning" style="font-size: 2rem;" />
                        <span>
                            id，created_at，updated_at，deleted_at 字段会自动生成，请勿重复创建！
                        </span>
                    </div>
                    <div class="row q-gutter-md">
                        <q-btn color="primary" @click="toDetail()" label="新建Field" />
                        <q-btn color="primary" @click="startGenerator" label="生成代码" />
                    </div>
                </template>
                <template v-slot:body-cell-index="props">
                    <q-td :props="props">
                        {{props.rowIndex}}
                    </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <div class="q-gutter-xs">
                            <q-btn color="primary" @click="toDetail(props.row)" label="编辑" />
                            <q-btn flat color="primary" @click="toDetail(props.row)" label="上移" />
                            <q-btn flat color="primary" @click="updateDictionary(props.row)" label="下移" />
                            <q-btn color="primary" @click="deleteField(props.row)" label="删除" />
                        </div>
                    </q-td>
                </template>
            </q-table>
        </q-card>
        <q-dialog v-model="dialogFlag" persistent>
            <q-card style="width: 700px">
                <q-card-section>
                    <div class="text-h6">新建Field</div>
                </q-card-section>
                <q-card-section class="row items-center">
                    <FieldForm v-if="dialogFlag" :dialogMiddle="dialogMiddle" ref="fieldDialog" />
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="取 消" color="primary" @click="closeDialog" />
                    <q-btn label="确 定" color="primary" @click="enterDialog" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="formDbVisible" persistent>
            <q-card style="width: 500px">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">从数据库表填写</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
                <q-card-section>
                    <q-form class="q-gutter-y-md">
                        <q-select outlined v-model="dbform.dbName" emit-value map-options :options="dbOptions"
                            :option-value="item=>item.database" :option-label="item=> item.database" @input="getTable"
                            label="数据库名" placeholder="当前连接的数据库" />
                        <q-select outlined v-model="dbform.tableName" emit-value map-options :options="tableOptions"
                            :option-value="item=>item.tableName" :option-label="item=> item.tableName"
                            :disable="!dbform.dbName" label="表名" placeholder="已选数据库的表" />
                    </q-form>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn label="确 定" color="primary" @click="getColumn" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import { createTempApi, getDBApi, getTableApi, getColumnApi } from 'src/api/codeGenerator.js'
import { toUpperCase, toHump } from 'src/utils/StringChanger'
import { getDict } from 'src/utils/DictGetter'
import FieldForm from './FieldForm'

export default {
    name: 'CodeGenerator',
    components: {
        FieldForm,
    },
    created() {
        this.getDb()
        this.setFdMap()
    },
    data() {
        return {
            formDbVisible: false,
            dbform: {
                dbName: '',
                tableName: '',
            },
            dbOptions: [],
            tableOptions: [],
            dialogFlag: false,
            addFlag: '',
            fdMap: {},
            bk: {},
            dialogMiddle: {},
            form: {
                structName: '',
                tableName: '',
                packageName: '',
                abbreviation: '',
                description: '',
                autoCreateApiToSql: false,
                autoMoveFile: false,
                fields: [],
            },
            fieldTemplate: {
                fieldName: '',
                fieldDesc: '',
                fieldType: '',
                dataType: '',
                fieldJson: '',
                columnName: '',
                dataTypeLong: '',
                comment: '',
                fieldSearchType: '',
                dictType: '',
            },
            columns: [
                { name: 'index', align: 'center', label: '#', field: 'index' },
                { name: 'fieldName', align: 'center', label: 'Field名', field: 'fieldName' },
                { name: 'fieldDesc', align: 'center', label: '中文名', field: 'fieldDesc' },
                { name: 'fieldJson', align: 'center', label: 'FieldJson', field: 'fieldJson' },
                { name: 'fieldType', align: 'center', label: 'Field数据类型', field: 'fieldType' },
                { name: 'dataType', align: 'center', label: '数据库字段类型', field: 'dataType' },
                { name: 'dataTypeLong', align: 'center', label: '数据库字段长度', field: 'dataTypeLong' },
                { name: 'columnName', align: 'center', label: '数据库字段', field: 'columnName' },
                { name: 'comment', align: 'center', label: '数据库字段描述', field: 'comment' },
                { name: 'fieldSearchType', align: 'center', label: '搜索条件', field: 'fieldSearchType' },
                { name: 'dictType', align: 'center', label: '字典', field: 'dictType' },
                { name: 'actions', align: 'center', label: '操作', field: 'actions' },
            ],
            fieldRules: {
                structName: [(val) => (val !== null && val !== '') || '请输入结构体名称'],
                abbreviation: [(val) => (val !== null && val !== '') || '请输入结构体简称'],
                description: [(val) => (val !== null && val !== '') || '请输入结构体描述'],
                packageName: [(val) => (val !== null && val !== '') || '文件名称：sys_xxxx_xxxx'],
            },
        }
    },
    methods: {
        async setFdMap() {
            const fdTypes = ['string', 'int', 'bool', 'float64', 'time.Time']
            fdTypes.map(async (fdtype) => {
                const res = await getDict(fdtype)
                res.map((item) => {
                    this.fdMap[item.label] = fdtype
                })
            })
        },
        fromDb() {
            this.formDbVisible = true
        },
        async getDb() {
            const res = await getDBApi()
            if (res.code === 0) {
                this.dbOptions = res.data.dbs
            }
        },
        async getTable() {
            const res = await getTableApi({ dbName: this.dbform.dbName })
            if (res.code == 0) {
                this.tableOptions = res.data.tables
            }
            this.dbform.tableName = ''
        },
        async getColumn() {
            const gormModelList = ['id', 'created_at', 'updated_at', 'deleted_at']
            const res = await getColumnApi(this.dbform)
            if (res.code == 0) {
                const tbHump = toHump(this.dbform.tableName)
                this.form.structName = toUpperCase(tbHump)
                this.form.tableName = this.dbform.tableName
                this.form.packageName = tbHump
                this.form.abbreviation = tbHump
                this.form.description = tbHump + '表'
                this.form.autoCreateApiToSql = true
                this.form.fields = []
                res.data.columns &&
                    res.data.columns.map((item) => {
                        if (!gormModelList.some((gormfd) => gormfd == item.columnName)) {
                            const fbHump = toHump(item.columnName)
                            this.form.fields.push({
                                fieldName: toUpperCase(fbHump),
                                fieldDesc: item.columnComment || fbHump + '字段',
                                fieldType: this.fdMap[item.dataType],
                                dataType: item.dataType,
                                fieldJson: fbHump,
                                dataTypeLong: item.dataTypeLong,
                                columnName: item.columnName,
                                comment: item.columnComment,
                                fieldSearchType: '',
                                dictType: '',
                            })
                        }
                    })
                this.formDbVisible = false
                this.dbform = {
                    dbName: '',
                    tableName: '',
                }
            }
        },
        toDetail(item) {
            this.dialogFlag = true
            if (item) {
                this.addFlag = 'edit'
                this.bk = JSON.parse(JSON.stringify(item))
                this.dialogMiddle = item
            } else {
                this.addFlag = 'add'
                this.dialogMiddle = JSON.parse(JSON.stringify(this.fieldTemplate))
            }
        },
        deleteField(index) {
            this.form.fields.splice(index, 1)
        },
        closeDialog() {
            if (this.addFlag == 'edit') {
                this.dialogMiddle = this.bk
            }
            this.dialogFlag = false
        },
        enterDialog() {
            this.$refs.fieldDialog.$refs.fieldForm.validate().then((outcome) => {
                if (outcome) {
                    this.dialogMiddle.fieldName = toUpperCase(this.dialogMiddle.fieldName)
                    if (this.addFlag == 'add') {
                        this.form.fields.push(this.dialogMiddle)
                    }
                    this.dialogFlag = false
                } else {
                    return false
                }
            })
        },
        async startGenerator() {
            if (this.form.fields.length <= 0) {
                this.$q.notify({
                    type: 'negative',
                    message: '请填写至少一个field',
                })
                return false
            }
            if (this.form.fields.some((item) => item.fieldName == this.form.structName)) {
                this.$q.notify({
                    type: 'negative',
                    message: '存在与结构体同名的字段',
                })
                return false
            }
            this.form.structName = toUpperCase(this.form.structName)
            if (this.form.structName == this.form.abbreviation) {
                this.$q.notify({
                    type: 'negative',
                    message: 'structName和struct简称不能相同',
                })
                return false
            }
            const data = await createTempApi(this.form)
            if (data.headers?.success == 'false') {
                return
            } else {
                this.$q.notify({
                    type: 'positive',
                    message: '自动化代码创建成功，正在下载！',
                })
            }
            const blob = new Blob([data])
            const fileName = 'GQA-Generated-Code.zip'
            if ('download' in document.createElement('a')) {
                // 不是IE浏览器
                let url = window.URL.createObjectURL(blob)
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', fileName)
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link) // 下载完成移除元素
                window.URL.revokeObjectURL(url) // 释放掉blob对象
            } else {
                // IE 10+
                window.navigator.msSaveBlob(blob, fileName)
            }
        },
    },
}
</script>