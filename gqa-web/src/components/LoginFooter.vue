<template>
    <q-footer class="flex items-center justify-around footer" v-if="$q.screen.gt.xs">
        <div>
            <span class="q-ml-sm text-primary">
                欢迎使用 Gin-Quasar-Admin ！
            </span>
        </div>
        <div class="flex q-gutter-xs q-mt-none text-primary">
            <span class="q-ml-sm">
                <a>Junvary</a>
                {{ currentYear }}
            </span>
        </div>
    </q-footer>
</template>

<script>
export default {
    name: 'LoginFooter',
    data() {
        return {
            currentYear: '',
        }
    },
    created() {
        this.currentYear = new Date().getFullYear()
    },
}
</script>

<style lang="scss" scoped>
.footer {
    font-size: 13px;
    letter-spacing: 0.3px;
    padding: 15px 25px;
    background-color: rgba($color: #000000, $alpha: 0.15);
    color: #637388;
    // text-transform: uppercase
}
</style>