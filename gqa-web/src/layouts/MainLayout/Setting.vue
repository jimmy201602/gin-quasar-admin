<template>
    <div>
        <q-tab
            name="menu"
            :icon="`${!right ? 'menu' : 'close'}`"
            v-if="$q.screen.gt.xs"
            @click="right = !right"
        >
        </q-tab>
        <q-drawer v-model="right" side="right" overlay bordered>
            <q-settings />
        </q-drawer>
    </div>
</template>

<script>
export default {
    name: "Setting",
    data(){
        return{
            right: false,
        }
    }
};
</script>