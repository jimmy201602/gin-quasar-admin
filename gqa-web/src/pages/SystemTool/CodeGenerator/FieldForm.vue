<template>
    <q-form class="q-gutter-md" ref="fieldForm">
        <div class="row q-gutter-md">
            <q-input class="col" outlined v-model="dialogMiddle.fieldName" label="Field名称"
                :rules="fieldFormRules.fieldName" />
            <q-input class="col" outlined v-model="dialogMiddle.fieldDesc" label="Field中文名"
                :rules="fieldFormRules.fieldDesc" />
            <q-input class="col" outlined v-model="dialogMiddle.fieldJson" label="FieldJSON"
                :rules="fieldFormRules.fieldJson" />
        </div>
        <div class="row q-gutter-md">
            <q-input class="col" outlined v-model="dialogMiddle.columnName" label="数据库字段名"
                :rules="fieldFormRules.columnName" />
            <q-select class="col" outlined v-model="dialogMiddle.fieldType" emit-value map-options
                :options="typeOptions" label="Field数据类型" placeholder="请选择field数据类型" @input="getDbfdOptions"
                :rules="fieldFormRules.fieldType" />

        </div>
        <div class="row q-gutter-md">
            <q-input class="col" outlined v-model="dialogMiddle.comment" label="数据库字段描述"
                :rules="fieldFormRules.comment" />
            <q-input class="col" outlined v-model="dialogMiddle.dataTypeLong" label="数据库字段长度" placeholder="自定义类型必须指定长度"
                :rules="fieldFormRules.dataTypeLong" />
            <q-select class="col" outlined v-model="dialogMiddle.dataType" emit-value map-options :options="dbfdOptions"
                label="数据库字段类型" placeholder="请选择数据库字段类型" :disable="!dialogMiddle.fieldType"
                :rules="fieldFormRules.dataType" />
        </div>
        <div class="row q-gutter-md">
            <q-select class="col" outlined v-model="dialogMiddle.fieldSearchType" emit-value map-options
                :options="typeSearchOptions" label="Field查询条件" placeholder="请选择Field查询条件"
                :rules="fieldFormRules.fieldSearchType" />
            <q-select class="col" outlined v-model="dialogMiddle.dictType" emit-value map-options :options="tableData"
                label="关联字典" placeholder="请选择字典" :rules="fieldFormRules.dictType" :option-value="item=>item.type"
                :option-label="item=> item.name" />
        </div>
    </q-form>
</template>

<script>
import { getDictListApi } from 'src/api/dictionary'
import { getDict } from 'src/utils/DictGetter'
import table from 'src/mixins/table'

export default {
    name: 'FieldForm',
    mixins: [table],
    props: {
        dialogMiddle: {
            type: Object,
            default: function () {
                return {}
            },
        },
    },
    data() {
        return {
            tableApi: getDictListApi,
            dbfdOptions: [],
            dictOptions: [],
            typeSearchOptions: [
                {
                    label: '=',
                    value: '=',
                },
                {
                    label: '<>',
                    value: '<>',
                },
                {
                    label: '>',
                    value: '>',
                },
                {
                    label: '<',
                    value: '<',
                },
                {
                    label: 'LIKE',
                    value: 'LIKE',
                },
            ],
            typeOptions: [
                {
                    label: '字符串',
                    value: 'string',
                },
                {
                    label: '整型',
                    value: 'int',
                },
                {
                    label: '布尔值',
                    value: 'bool',
                },
                {
                    label: '浮点型',
                    value: 'float64',
                },
                {
                    label: '时间',
                    value: 'time.Time',
                },
            ],
            fieldFormRules: {
                fieldName: [(val) => (val !== null && val !== '') || '请输入field英文名'],
                fieldDesc: [(val) => (val !== null && val !== '') || '请输入field中文名'],
                fieldJson: [(val) => (val !== null && val !== '') || '请输入field格式化json'],
                columnName: [(val) => (val !== null && val !== '') || '请输入数据库字段'],
                fieldType: [(val) => (val !== null && val !== '') || '请选择field数据类型'],
            },
        }
    },
    methods: {
        async getDbfdOptions() {
            this.dialogMiddle.dataType = ''
            this.dialogMiddle.dataTypeLong = ''
            this.dialogMiddle.fieldSearchType = ''
            this.dialogMiddle.dictType = ''
            if (this.dialogMiddle.fieldType) {
                const res = await getDict(this.dialogMiddle.fieldType)
                this.dbfdOptions = res
            }
        },
    },
}
</script>