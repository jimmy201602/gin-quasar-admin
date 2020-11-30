<template>
    <q-page class="row items-center justify-center">
        <q-card class="login-wrapper shadow-24" bordered>
            <q-card-section horizontal>
                <q-img class="col-6" :src="randomImg" v-if="$q.screen.gt.xs" />
                <q-card-section :class="`${
                        $q.screen.gt.xs ? 'col-6' : 'col'
                    } q-mt-xs q-pa-xl`">

                    <div class="text-center">
                        <q-icon name="img:icons/favicon-32x32.png" style="font-size: 3em;" />
                    </div>
                    <div class="text-h4 text-center text-primary q-mb-xs">Gin-Quasar-Admin</div>
                    <div class="text-h6 text-center text-primary q-mt-md q-mb-xs">
                        好久不见，欢迎回来！
                    </div>
                    <q-form @submit="onSubmit" class="login-form q-mt-lg">
                        <q-input outlined dense no-error-icon v-model.trim="form.username" placeholder="账号" :rules="[
                                (val) =>
                                    (val && val.length > 0) || '请输入用户账号',
                            ]" />
                        <q-input outlined dense no-error-icon type="password" v-model.trim="form.password"
                            placeholder="密码" :rules="[
                                (val) =>
                                    (val && val.length > 0) || '请输入登录密码',
                            ]" />
                        <q-input outlined dense no-error-icon v-model.trim="form.captcha" placeholder="验证码" :rules="[
                                (val) =>
                                    (val && val.length > 0) || '请输入验证码',
                            ]">
                            <template v-slot:after>
                                <q-btn style="width: 120px; height: 100%" @click="getCaptcha">
                                    <q-img :src="captchaUrl" style="width: 100%; height: 100%"></q-img>
                                </q-btn>
                            </template>
                        </q-input>
                        <div class="column q-gutter-y-md q-mt-none">
                            <q-checkbox v-model="form.rememberMe" label="记住账号" dense />
                        </div>
                        <div class="q-mt-md column items-center">
                            <q-btn label="登录" type="submit" color="primary" class="full-width" />
                        </div>
                    </q-form>
                </q-card-section>
            </q-card-section>
            <q-separator />

            <q-card-actions v-if="$q.screen.gt.sm">
                <q-brand-color />
                <q-space />
                <div class="text-subtitle2 text-center text-primary">
                    Quasar版本：{{ $q.version }}
                </div>
            </q-card-actions>
            <q-inner-loading :showing="loading">
                <q-spinner-gears size="sm" color="primary" />
            </q-inner-loading>
        </q-card>
    </q-page>
</template>

<script>
import { getCodeApi } from 'src/api/login'

export default {
    name: 'UserLogin',
    data() {
        return {
            randomImg: 'https://api.ixiaowai.cn/api/api.php',
            form: {
                username: '',
                password: '',
                captcha: '',
                captchaId: '',
                rememberMe: false,
            },
            captchaUrl: '',
            loading: false,
        }
    },
    created() {
        this.getCaptcha()
    },
    methods: {
        getCaptcha() {
            getCodeApi().then((res) => {
                this.captchaUrl = res.data.picPath
                this.form.captchaId = res.data.captchaId
            })
        },
        onSubmit() {
            this.loading = true
            this.$store
                .dispatch('session/Login', this.form)
                .then((code) => {
                    this.loading = false
                    if (code === 0) {
                        const params = {
                            redirect: this.$route.query.redirect || '/',
                        }
                        this.$router.push({ path: params.redirect })
                    } else {
                        this.getCaptcha()
                    }
                })
                .catch((error) => {
                    console.log(error)
                    this.loading = false
                    this.getCaptcha()
                })
        },
    },
}
</script>

<style lang="scss" scoped>
.login-wrapper,
login-form {
    width: 850px;
}
@media (max-width: 1023px) {
    .login-wrapper,
    login-form {
        width: 98%;
    }
}
@media (max-width: 599px) {
    .q-pa-xl {
        padding: 15px;
    }
}
</style>
