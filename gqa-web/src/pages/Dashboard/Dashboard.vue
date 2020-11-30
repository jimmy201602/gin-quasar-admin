<template>
    <q-page padding>
        <!-- <div class="row q-col-gutter-x-md q-col-gutter-y-md">
            <div class="col-12 col-xs-12 col-sm-12 col-lg-4">
                <q-card style="height: 340px">
                    <q-card-section>
                        <raddar-chart />
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12 col-xs-12 col-sm-12 col-lg-4">
                <q-card style="height: 340px">
                    <q-card-section>
                        <stackMap />
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12 col-xs-12 col-sm-12 col-lg-4">
                <q-card style="height: 340px">
                    <q-card-section>
                        <Sunburst />
                    </q-card-section>
                </q-card>
            </div>
        </div> -->
        <div class="row q-col-gutter-x-md q-col-gutter-y-md">
            <div class="col-12 col-xs-12 col-sm-12 col-lg-6">
                <q-card style="height: 270px">
                    <q-card-section>
                        <ToDoList />
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12 col-xs-12 col-sm-12 col-lg-6">
                <q-card style="height: 270px">
                    <q-card-section>
                        <q-music-player />
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script>
import RaddarChart from './Charts/RaddarChart'
import stackMap from './Charts/stackMap'
import Sunburst from './Charts/Sunburst'
import ToDoList from './ToDoList'
export default {
    name: 'Dashboard',
    components: {
        RaddarChart,
        stackMap,
        Sunburst,
        ToDoList,
    },
}
</script>

<style lang="scss" scoped>
.row + .row {
    margin-top: 5px;
}
</style>
