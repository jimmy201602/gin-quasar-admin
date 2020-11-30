<template>
    <div>
        <q-tree :nodes="tableData" node-key="ID" selected>
            <template v-slot:default-header="prop">
                <q-card style="width: 100%">
                    <q-card-section class="row items-center no-wrap justify-between">
                        <div class="col items-center column">
                            <q-icon :name="prop.node.meta.icon" size="sm" color="primary" />
                        </div>
                        <div class="col items-center column">
                            <q-chip size="xs" color="primary" text-color="white" label="展示名称" />
                            {{ prop.node.meta.title }}
                        </div>
                        <div class="col items-center column">
                            <q-chip size="xs" color="primary" text-color="white" label="排序" />
                            {{ prop.node.sort }}
                        </div>
                        <div class="col items-center column">
                            <q-chip size="xs" color="primary" text-color="white" label="ID" />
                            {{ prop.node.ID }}
                        </div>
                        <div class="col items-center column">
                            <q-chip size="xs" color="primary" text-color="white" label="父节点" />
                            {{ prop.node.parentId }}
                        </div>
                        <div class="col items-center column">
                            <q-chip size="xs" color="primary" text-color="white" label="路由Name" />
                            {{ prop.node.name }}
                        </div>
                        <div class="col items-center column">
                            <q-chip size="xs" color="primary" text-color="white" label="路由Path" />
                            {{ prop.node.path }}
                        </div>
                        <div class="col col-2 items-center column">
                            <q-chip size="xs" color="primary" text-color="white" label="文件路径" />
                            {{ prop.node.component }}
                        </div>
                        <div class="col items-center column">
                            <q-chip size="xs" color="primary" text-color="white" label="是否隐藏" />
                            {{ prop.node.hidden }}
                        </div>

                        <q-space></q-space>
                        <div class="col-auto q-gutter-xs  items-center ">
                            <q-btn color="primary" label="添加子菜单" @click="addMenu(prop.node.ID)" />
                            <q-btn color="primary" label="编辑" @click="editMenu(prop.node.ID)" />
                            <q-btn color="primary" label="删除" @click="deleteMenu(prop.node.ID)" />
                        </div>
                    </q-card-section>
                </q-card>
            </template>
        </q-tree>
        <q-dialog v-model="menuDialogVisible" persistent>
            <q-card style="width: 900px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">{{menuDialogTitle}}</div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                    <q-form @submit="menuSubmit">
                        <div class="row q-col-gutter-md">
                            <div class="col-12 col-lg-4">
                                <q-scroll-area style="height: 70vh">
                                    <q-field outlined label="父节点ID" stack-label :disable="!isEdit"
                                        v-model="menuDialogForm.parentId">
                                        <template v-slot:control>
                                            <q-tree :nodes="menuOption" node-key="ID" label-key="title"
                                                :selected.sync="menuDialogForm.parentId" default-expand-all />
                                        </template>
                                    </q-field>
                                </q-scroll-area>
                            </div>
                            <div class="col-12 col-lg-8 q-col-gutter-md">
                                <div class="row q-col-gutter-md">
                                    <div class="col-12 col-lg-6">
                                        <q-input outlined v-model="menuDialogForm.meta.title" label="展示名称"
                                            :rules="menuRules.title" />
                                    </div>
                                    <div class="col-12 col-lg-6">
                                        <q-input outlined v-model="menuDialogForm.name" label="路由name"
                                            :rules="menuRules.name" placeholder="唯一英文字符串" />
                                    </div>

                                    <div class="col-12 col-lg-12">
                                        <q-input outlined v-model="menuDialogForm.component" label="文件路径"
                                            :rules="menuRules.component" />
                                    </div>
                                    <div class="col-12 col-lg-6">
                                        <q-select outlined v-model="menuDialogForm.meta.icon" label="图标"
                                            behavior="dialog" :options="iconList" stack-label>
                                            <template v-slot:selected v-if="menuDialogForm.meta.icon">
                                                <q-avatar size="xs" color="primary" text-color="white"
                                                    :icon="menuDialogForm.meta.icon" style="margin-right: 5px" />
                                                {{ menuDialogForm.meta.icon }}
                                            </template>
                                            <template v-slot:option="scope">
                                                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                                                    <q-item-section avatar>
                                                        <q-icon :name="scope.opt" />
                                                    </q-item-section>
                                                    <q-item-section>
                                                        <q-item-label v-html="scope.opt" />
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-12 col-lg-6">
                                        <q-input outlined v-model="menuDialogForm.sort" type="number" label="排序标记" />
                                    </div>
                                    <div class="col-12 col-lg-6">
                                        <q-select outlined v-model="menuDialogForm.meta.keepAlive" emit-value
                                            map-options
                                            :options="[{value: false, label: '否'}, {value: true, label: '是'}]"
                                            label="是否keepAlive" />
                                    </div>
                                    <div class="col-12 col-lg-6">
                                        <q-select outlined v-model="menuDialogForm.hidden" emit-value map-options
                                            :options="[{value: false, label: '否'}, {value: true, label: '是'}]"
                                            label="是否隐藏" />
                                    </div>
                                    <div class="col-12 col-lg-12">
                                        <q-input outlined v-model="menuDialogForm.path" label="路由path"
                                            placeholder="建议只在后方拼接参数" :disable="!checkFlag">
                                            <template v-slot:after>
                                                <!-- <q-icon name="mail" /> -->
                                                <q-checkbox v-model="checkFlag" label="添加参数" />
                                            </template>
                                        </q-input>
                                    </div>
                                </div>
                                <div class="row q-col-gutter-md">
                                    <div class="col-12 col-lg-12">
                                        新增菜单需要在角色管理内配置权限才可使用
                                    </div>
                                    <div class="col-12 col-lg-12">
                                        <q-btn color="primary" label="新增菜单参数" @click="addParameter(menuDialogForm)" />
                                        <q-table :data="menuDialogForm.parameters" :columns="columns" row-key="name"
                                            hide-bottom>
                                            <template v-slot:body="props">
                                                <q-tr :props="props">
                                                    <q-td key="type" :props="props">
                                                        <q-select outlined v-model="props.row.type" emit-value
                                                            map-options
                                                            :options="[{value: 'query', label: 'query'}, {value: 'params', label: 'params'}]"
                                                            label="参数类型" />
                                                    </q-td>
                                                    <q-td key="key" :props="props">
                                                        <q-input outlined v-model="props.row.key" label="参数key" />
                                                    </q-td>
                                                    <q-td key="value" :props="props">
                                                        <q-input outlined v-model="props.row.value" label="参数值" />
                                                    </q-td>
                                                    <q-td key="actions" :props="props">
                                                        {{ props.row.actions }}
                                                        <q-btn color="primary" label="删除"
                                                            @click="deleteParameter(menuDialogForm.parameters, props.rowIndex)" />
                                                    </q-td>
                                                </q-tr>
                                            </template>
                                        </q-table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <q-card-actions align="right">
                            <q-btn flat color="primary" label="取消" @click="closeDialog" />
                            <q-btn color="primary" label="确定" type="submit" />
                        </q-card-actions>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import { getMenuListApi, updateBaseMenuApi, addBaseMenuApi, deleteBaseMenuApi, getBaseMenuByIdApi } from 'src/api/menu'
import iconList from './icons'
import table from 'src/mixins/table'

export default {
    name: 'MenuTree',
    mixins: [table],
    data() {
        return {
            tableApi: getMenuListApi,
            iconList,
            checkFlag: false,
            isEdit: false,
            menuDialogTitle: '',
            menuDialogVisible: false,
            menuOption: [
                {
                    ID: '0',
                    title: '根菜单',
                },
            ],
            menuRules: {
                name: [(val) => (val !== null && val !== '') || '请输入菜单name'],
                component: [(val) => (val !== null && val !== '') || '请输入文件路径'],
                title: [(val) => (val !== null && val !== '') || '请输入菜单展示名称'],
            },
            menuDialogForm: {
                ID: 0,
                path: '',
                name: '',
                hidden: '',
                parentId: '',
                component: '',
                sort: 0,
                meta: {
                    title: '',
                    icon: '',
                    defaultMenu: false,
                    keepAlive: false,
                },
                parameters: [],
            },
            columns: [
                { name: 'type', label: '参数类型', align: 'center' },
                { name: 'key', label: '参数key', align: 'center' },
                { name: 'value', label: '参数值', align: 'center' },
                { name: 'actions', label: '操作', align: 'center' },
            ],
        }
    },
    methods: {
        initMenuDialogForm() {
            this.checkFlag = false
            this.menuDialogForm = {
                ID: 0,
                path: '',
                name: '',
                hidden: '',
                parentId: '',
                component: '',
                sort: 0,
                meta: {
                    title: '',
                    icon: '',
                    defaultMenu: false,
                    keepAlive: '',
                },
            }
        },
        addParameter(form) {
            if (!form.parameters) {
                form.parameters = []
            }
            form.parameters.push({
                type: 'query',
                key: '',
                value: '',
            })
        },
        deleteParameter(parameters, index) {
            parameters.splice(index, 1)
        },
        closeDialog() {
            this.initMenuDialogForm()
            this.menuDialogVisible = false
        },
        async menuSubmit() {
            let res
            if (this.isEdit) {
                res = await updateBaseMenuApi({
                    ID: this.menuDialogForm.ID,
                    path: this.menuDialogForm.path ? this.menuDialogForm.path : this.menuDialogForm.name,
                    name: this.menuDialogForm.name,
                    hidden: this.menuDialogForm.hidden,
                    parentId: this.menuDialogForm.parentId,
                    component: this.menuDialogForm.component,
                    meta: this.menuDialogForm.meta,
                    parameters: this.menuDialogForm.parameters,
                    sort: Number(this.menuDialogForm.sort),
                })
            } else {
                res = await addBaseMenuApi({
                    ID: this.menuDialogForm.ID,
                    path: this.menuDialogForm.path ? this.menuDialogForm.path : this.menuDialogForm.name,
                    name: this.menuDialogForm.name,
                    hidden: this.menuDialogForm.hidden,
                    parentId: this.menuDialogForm.parentId,
                    component: this.menuDialogForm.component,
                    meta: this.menuDialogForm.meta,
                    parameters: this.menuDialogForm.parameters,
                    sort: Number(this.menuDialogForm.sort),
                })
            }
            if (res.code === 0) {
                this.$q.notify({
                    type: 'positive',
                    message: this.isEdit ? '编辑成功' : '添加成功!',
                })
                this.getTableData({
                    pagination: this.pagination,
                })
            }
            this.initMenuDialogForm()
            this.menuDialogVisible = false
        },
        setOptions() {
            this.menuOption = [
                {
                    ID: '0',
                    title: '根目录',
                },
            ]
            this.setMenuOptions(this.tableData, this.menuOption, false)
        },
        setMenuOptions(tableData, menuOption, disabled) {
            tableData &&
                tableData.map((item) => {
                    if (item.children && item.children.length) {
                        const option = {
                            title: item.meta.title,
                            ID: String(item.ID),
                            disabled: disabled || item.ID == this.menuDialogForm.ID,
                            children: [],
                        }
                        this.setMenuOptions(item.children, option.children, disabled || item.ID == this.menuDialogForm.ID)
                        menuOption.push(option)
                    } else {
                        const option = {
                            title: item.meta.title,
                            ID: String(item.ID),
                            disabled: disabled || item.ID == this.menuDialogForm.ID,
                        }
                        menuOption.push(option)
                    }
                })
        },
        addMenu(id) {
            this.menuDialogTitle = '新增菜单'
            this.menuDialogForm.parentId = String(id)
            this.isEdit = false
            this.setOptions()
            this.menuDialogVisible = true
        },
        async editMenu(id) {
            this.menuDialogTitle = '编辑菜单'
            const res = await getBaseMenuByIdApi({ id })
            this.menuDialogForm = res.data.menu
            this.isEdit = true
            this.setOptions()
            this.menuDialogVisible = true
        },
        deleteMenu(ID) {
            this.$q
                .dialog({
                    title: '删除确认',
                    message: '此操作将永久删除所有角色下该菜单！',
                    cancel: true,
                    persistent: true,
                })
                .onOk(async () => {
                    const res = await deleteBaseMenuApi({ ID })
                    if (res.code === 0) {
                        this.$q.notify({
                            type: 'positive',
                            message: '菜单删除成功！',
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