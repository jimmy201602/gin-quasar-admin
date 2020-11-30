<template>
    <q-expansion-item group="multiple" :default-opened="itemOpen">
        <template v-slot:header>
            <q-item-section avatar>
                <q-icon :name="addRoutesItem.meta.icon" color="primary" />
            </q-item-section>
            <q-item-section>{{ addRoutesItem.meta.title }}</q-item-section>
        </template>
        <slot></slot>
    </q-expansion-item>
</template>

<script>
export default {
    name: "AsyncSubmenu",
    props: {
        addRoutesItem: {
            default: function () {
                return null;
            },
            type: Object,
        },
        initLevel: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        itemOpen(){
            for(let item of this.addRoutesItem.children){
                if(item.name === this.$route.name){
                    return true
                }
            }
            return false
        }
    }
};
</script>
<style lang="scss">
</style>