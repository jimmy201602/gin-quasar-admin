<template>
    <q-page padding>
        <q-card>
            <q-card-section>
                <div class="row items-center no-wrap">
                    <div class="col text-h6">系统配置（此页暂时只是都堆在这里）</div>
                    <q-btn class="col-2" color="primary" @click="update" label="立即更新" />
                </div>
            </q-card-section>
            <q-card-section>
                <q-form class="row justify-around q-gutter-y-md">
                    <q-card style="width: 30%">
                        <q-card-section>
                            <div class="text-h6 col">系统配置</div>
                        </q-card-section>
                        <q-card-section>
                            <q-input outlined v-model="config.system.env" label="环境值" />
                            <q-input outlined v-model="config.system.addr" label="端口值" />
                            <q-select class="col" outlined v-model="config.system.dbType" :options="[
                        {value: 'mysql', label: 'mysql'},{value: 'sqlite', label: 'sqlite'},{value: 'sqlserver', label: 'sqlserver'},{value: 'postgresql', label: 'postgresql'},
                        ]" label="数据库类型" stack-label />
                            <q-select class="col" outlined v-model="config.system.ossType" :options="[
                        {value: 'local', label: 'local'},{value: 'qiniu', label: 'qiniu'}]" label="Oss类型"
                                stack-label />
                            <q-input outlined v-model="config.system.configEnv" label="配置文件环境变量名" />
                            <q-checkbox v-model="config.system.needInitData" label="数据初始化" />
                            <q-checkbox v-model="config.system.useMultipoint" label="多点登录拦截" />
                        </q-card-section>
                    </q-card>
                    <q-card style="width: 30%">
                        <q-card-section>
                            <div class="text-h6 col">系统配置</div>
                        </q-card-section>
                        <q-card-section>
                            <q-input outlined v-model="config.jwt.signingKey" label="jwt签名" />

                            <q-input outlined v-model="config.zap.level" label="级别" />
                            <q-input outlined v-model="config.zap.format" label="输出" />
                            <q-input outlined v-model="config.zap.prefix" label="日志前缀" />
                            <q-input outlined v-model="config.zap.director" label="日志文件夹" />
                            <q-input outlined v-model="config.zap.linkName" label="软链接名称" />
                            <q-input outlined v-model="config.zap.encodeLevel" label="编码级" />
                            <q-input outlined v-model="config.zap.stacktraceKey" label="栈名" />
                            <q-checkbox v-model="config.zap.showLine" label="显示行" />
                            <q-checkbox v-model="config.zap.logInConsole" label="输出控制台" />
                        </q-card-section>
                    </q-card>
                    <q-card style="width: 30%">
                        <q-card-section>
                            <div class="text-h6 col">系统配置</div>
                        </q-card-section>
                        <q-card-section>
                            <q-input outlined v-model="config.redis.db" label="db" />
                            <q-input outlined v-model="config.redis.addr" label="addr" />
                            <q-input outlined v-model="config.redis.password" label="password" />

                            <q-input outlined v-model="config.email.to" label="接收者邮箱" />
                            <q-input outlined v-model="config.email.port" label="端口" />
                            <q-input outlined v-model="config.email.from" label="发送者邮箱" />
                            <q-input outlined v-model="config.email.host" label="host" />
                            <q-input outlined v-model="config.email.isSSL" label="是否为ssl" />
                            <q-input outlined v-model="config.email.secret" label="secret" />
                            <q-input outlined v-model="config.email.from" label="测试邮件" />
                        </q-card-section>
                    </q-card>
                    <q-card style="width: 30%">
                        <q-card-section>
                            <div class="text-h6 col">系统配置</div>
                        </q-card-section>
                        <q-card-section>
                            <q-input outlined v-model="config.casbin.modelPath" label="模型地址" />

                            <q-input outlined v-model="config.captcha.keyLong" label="keyLong" />
                            <q-input outlined v-model="config.captcha.imgWidth" label="imgWidth" />
                            <q-input outlined v-model="config.captcha.imgHeight" label="imgHeight" />

                            <q-input outlined v-model="config.mysql.username" label="username" />
                            <q-input outlined v-model="config.mysql.password" label="password" />
                            <q-input outlined v-model="config.mysql.path" label="path" />
                            <q-input outlined v-model="config.mysql.dbname" label="dbname" />
                            <q-input outlined v-model="config.mysql.maxIdleConns" label="maxIdleConns" />
                            <q-input outlined v-model="config.mysql.maxOpenConns" label="maxOpenConns" />
                            <q-input outlined v-model="config.mysql.logMode" label="logMode" />

                            <q-input outlined v-model="config.local.path" label="本地文件路径" />
                        </q-card-section>
                    </q-card>

                </q-form>
            </q-card-section>

        </q-card>
    </q-page>
</template>

<script>
import { getSystemConfigApi, setSystemConfigApi } from 'src/api/config'

export default {
    name: 'SystemConfig',
    data() {
        return {
            config: {
                system: {},
                jwt: {},
                casbin: {},
                mysql: {},
                sqlite: {},
                redis: {},
                qiniu: {},
                captcha: {},
                zap: {},
                local: {},
                email: {},
            },
        }
    },
    async created() {
        await this.initForm()
    },
    methods: {
        async initForm() {
            const res = await getSystemConfigApi()
            if (res.code == 0) {
                this.config = res.data.config
            }
        },
        async update() {
            const res = await setSystemConfigApi({ config: this.config })
            if (res.code == 0) {
                this.$q.notify({
                    type: 'positive',
                    message: '配置更新成功！',
                })
                await this.initForm()
            }
        },
        async email() {
            const res = await emailTestApi()
            if (res.code == 0) {
                this.$q.notify({
                    type: 'positive',
                    message: '邮件发送成功！',
                })
                await this.initForm()
            } else {
                this.$q.notify({
                    type: 'negative',
                    message: '邮件发送失败',
                })
            }
        },
    },
}
</script>