<template>
    <div class="q-gutter-xs" style="margin: 0 14px">
        <q-chip :removable="chip.name !== 'dashboard'" clickable :color="activeColor(chip)" text-color="white"
            v-for="chip in chipMenu" :key="chip.fullPath" :icon="chip.meta.icon" :label="chip.meta.title"
            @click="toThisChip(chip)" @remove="removeThisChip(chip)" />
    </div>
</template>

<script>
export default {
    name: 'ChipMenu',
    data() {
        return {}
    },
    computed: {
        chipMenu() {
            return this.$store.getters['session/chipMenu']
        },
    },
    watch: {
        $route() {
            this.addChipMenu()
        },
    },
    created() {
        this.initChipMenu()
    },
    methods: {
        activeColor(chip) {
            if (chip.name === this.$route.name) {
                return 'green'
            } else {
                return 'primary'
            }
        },
        initChipMenu() {
            this.$store.dispatch('session/InitChipMenu', this.$route)
        },
        addChipMenu() {
            this.$store.dispatch('session/AddChipMenu', this.$route)
        },
        toThisChip(chip) {
            this.$router.push(chip.fullPath)
        },
        removeThisChip(chip) {
            this.$store.dispatch('session/RemoveChip', chip)
            this.toBeforeChip()
        },
        toBeforeChip() {
            const beforeChip = this.chipMenu.slice(-1)[0]
            if (beforeChip) {
                this.$router.push(beforeChip.fullPath)
            } else {
                this.$router.push('/')
            }
        },
    },
}
</script>