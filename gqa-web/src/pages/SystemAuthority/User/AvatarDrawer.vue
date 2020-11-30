<template>
    <q-dialog v-model="drawer" persistent position="right">
        <q-card style="height: 100%; width: 500px">
            <q-card-section class="row">
                <div class="text-h6 col">媒体库</div>
            </q-card-section>
            <q-card-section class="row">
                <q-img v-for="(item,key) in picList" :key="key" :src="item.url" spinner-color="white"
                    style="height: 140px; max-width: 150px" @click.native="chooseImg(item.url,target,targetKey)" />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
// import { getFileListApi } from 'src/api/fileUploadAndDownload'

export default {
    name: 'AvatarDrawer',
    props: {
        target: [Object],
        targetKey: [String],
    },
    data() {
        return {
            drawer: false,
            picList: [],
        }
    },
    methods: {
        chooseImg(url, target, targetKey) {
            if (target && targetKey) {
                target[targetKey] = url
            }
            this.$emit('enter-img', url)
            this.drawer = false
        },
        async open() {
            const res = await getFileListApi({ page: 1, pageSize: 9999 })
            this.picList = res.data.list
            this.drawer = true
        },
    },
}
</script>