<template>
    <q-item :to="{ name: addRoutesItem.name }" :inset-level="initLevel" active-class="text-primary item-background">
        <q-item-section avatar>
            <q-icon :name="addRoutesItem.meta.icon" color="primary" />
        </q-item-section>
        <q-item-section >{{ addRoutesItem.meta.title }}</q-item-section>
    </q-item>
</template>

<script>
export default {
    name: "MenuItem",
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
};
</script>
<style lang="scss" scoped>
.item-active-class{
    background: scale-color($primary, $lightness: 90%);
    color: $primary;
}
</style>