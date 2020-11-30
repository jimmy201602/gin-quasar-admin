<template>
    <q-card>
        <q-card-section>
            <q-btn label="更新角色资源" color="primary" @click="submit" />
        </q-card-section>
        <q-card-section style="max-height: 70vh" class="scroll">
            <q-option-group color="primary" type="checkbox" v-model="dataAuthorityId" :options="authoritys" />
        </q-card-section>
    </q-card>
</template>

<script>
import { setDataAuthorityApi } from 'src/api/roles'

export default {
    name: 'AuthData',
    data() {
        return {
            group: ['opt1'],
            authoritys: [], // 全部数据权限
            dataAuthorityId: [], // 当前拥有的数据权限
        }
    },
    props: {
        row: {
            default: function () {
                return {}
            },
            type: Object,
        },
        tableData: {
            default: function () {
                return {}
            },
            type: Array,
        },
    },
    methods: {
        roundAuthority(tableData) {
            tableData &&
                tableData.map((item) => {
                    const obj = {}
                    obj.authorityId = item.authorityId
                    obj.authorityName = item.authorityName
                    this.authoritys.push(obj)
                    if (item.children && item.children.length) {
                        this.roundAuthority(item.children)
                    }
                })
        },
        async submit() {
            this.row.dataAuthorityId = this.dataAuthorityId
            console.log(this.row)
            const res = await setDataAuthorityApi(this.row)
            if (res.code == 0) {
                this.$q.notify({
                    type: 'positive',
                    message: '角色数据权限更新成功！',
                })
            }
        },
    },
    created() {
        this.authoritys = []
        this.dataAuthorityId = []
        this.roundAuthority(this.tableData)
        this.row.dataAuthorityId &&
            this.row.dataAuthorityId.map((item) => {
                const obj = this.authoritys && this.authoritys.filter((au) => au.authorityId === item.authorityId) && this.authoritys.filter((au) => au.authorityId === item.authorityId)[0]
                this.dataAuthorityId.push(obj)
            })
        // 将全部数据权限的KEY名改掉，方便比对value
        this.authoritys = this.authoritys.map((item) => {
            return { label: item.authorityName, value: item }
        })
    },
}
</script>