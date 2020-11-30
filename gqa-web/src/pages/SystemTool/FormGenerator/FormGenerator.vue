<template>
    <q-page padding>
        <q-card>
            <q-card-section>
                <div class="text-h6 col">表单生成器</div>
            </q-card-section>
            <q-card-section style="height: 80vh">
                <iframe width="100%" height="100%" :src="path + '/form-generator/#/'" frameborder="0"></iframe>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
export default {
    name: 'FormGenerator',
    data() {
        return {
            path: process.env.API_HOST,
        }
    },
}
</script>