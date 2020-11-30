<template>
    <q-card>
        <q-card-section>
            <q-btn label="更新角色API" color="primary" @click="submit" />
        </q-card-section>
        <q-card-section style="max-height: 70vh" class="scroll">
            <q-tree :nodes="apiTreeData" node-key="onlyId" tick-strategy="leaf" :ticked.sync="apiTreeId"
                default-expand-all v-if="apiTreeData.length">
                <template v-slot:default-header="prop">
                    <div class="q-mr-sm q-ml-sm">{{ prop.node.description }}</div>
                </template>
            </q-tree>
        </q-card-section>
    </q-card>
</template>

<script>
import { getAllApi } from 'src/api/api'
import { updateCasbinApi, getPolicyPathByAuthorityIdApi } from 'src/api/casbin'

export default {
    name: 'AuthApi',
    props: {
        row: {
            default: function () {
                return {}
            },
            type: Object,
        },
    },
    methods: {
        buildApiTree(apis) {
            const apiObj = new Object()
            apis &&
                apis.map((item) => {
                    item.onlyId = 'p:' + item.path + 'm:' + item.method
                    if (Object.prototype.hasOwnProperty.call(apiObj, item.apiGroup)) {
                        apiObj[item.apiGroup].push(item)
                    } else {
                        Object.assign(apiObj, { [item.apiGroup]: [item] })
                    }
                })
            const apiTree = []
            for (const key in apiObj) {
                const treeNode = {
                    onlyId: key,
                    description: key + '组',
                    children: apiObj[key],
                }
                apiTree.push(treeNode)
            }
            return apiTree
        },
        async submit() {
            const res = await updateCasbinApi({
                authorityId: this.activeUserId,
                casbinInfos: this.finalApi,
            })
            if (res.code === 0) {
                this.$q.notify({
                    type: 'positive',
                    message: '角色API更新成功！',
                })
            }
        },
    },
    computed: {
        finalApi() {
            const apiList = []
            this.apiData.map((item) => {
                if (this.apiTreeId.indexOf(item.onlyId) !== -1) {
                    apiList.push({
                        path: item.path,
                        method: item.method,
                    })
                }
            })
            return apiList
        },
    },
    data() {
        return {
            apiTreeData: [],
            apiData: [],
            apiTreeId: [],
        }
    },
    async created() {
        const res2 = await getAllApi()
        const apis = res2.data.apis
        // apiData是最后提交时和apiTreeId做对比用的
        this.apiData = apis
        this.apiData.map((item) => {
            item.onlyId = 'p:' + item.path + 'm:' + item.method
        })
        // apiData是最后提交时和apiTreeId做对比用的
        this.apiTreeData = this.buildApiTree(apis)
        const res = await getPolicyPathByAuthorityIdApi({
            authorityId: this.row.authorityId,
        })
        this.activeUserId = this.row.authorityId
        const arr = []
        res.data.paths &&
            res.data.paths.map((item) => {
                arr.push('p:' + item.path + 'm:' + item.method)
            })
        this.apiTreeId = arr
    },
}
</script>