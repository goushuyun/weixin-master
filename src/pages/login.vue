<style lang="scss" scoped>
#login_box {
    background-color: white;
    text-align: center;
    width: 300px;
    margin: 0 auto;
    padding: 22px 24px 32px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);

    // logo
    img.logo {
        margin-bottom: 12px;
    }

    div.tabs {
        display: flex;
        justify-content: center;
        margin-bottom: 8px;
    }
}

.bottom_bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    height: 128px;
    color: #888;
    font-size: 13px;
    line-height: 128px;
}
</style>

<template lang="html">

<div class="container">
    <div style="height:20%;"></div>

    <div id="login_box">
        <img class="logo" src="http://image1.goushuyun.cn/goushuyun_logo.png" alt="logo">

        <div class="tabs">
            <el-tabs v-model="activeName">
                <el-tab-pane label="登录" name="sign_in">
                    <!-- 登录框 -->
                </el-tab-pane>
            </el-tabs>
        </div>

        <el-row type="flex" justify="center">
            <el-col :span="24">
                <el-form :model="sign" :rules="rules" ref="sign">
                    <div>
                      <el-form-item prop="mobile">
                          <el-input class="mobile" placeholder="手机号码" v-model="sign.mobile"></el-input>
                      </el-form-item>
                      <el-form-item prop="password" v-show="!forgetPwd">
                          <el-input placeholder="登录密码" type="password" v-model="sign.password" @keyup.enter.native="signIn('sign')"></el-input>
                      </el-form-item>
                      <el-form-item style="text-align:left">
                          <el-button style="width: 100%;" type="primary" :loading="btn_loading" @click="signIn('sign')">立即登录</el-button>
                      </el-form-item>
                    </div>
                </el-form>
            </el-col>
        </el-row>
    </div>
    <!-- 底部信息条 -->
    <el-row class="bottom_bar">
        <el-col :span="24">© 2019 购书云 版权所有 沪ICP备15022838号-2 </el-col>
    </el-row>
</div>

</template>

<script>
import {
    testMobile,
    testPassword
} from '../scripts/utils'
import axios from "../scripts/http"
export default {
    data() {
        var checkMobile = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号码不能为空'));
            }
            let telReg = /^1\d{10}$/
            if (!telReg.test(value)) {
              callback(new Error('请输正确的手机号码'));
            } else {
              callback();
            }
        };

        var checkPassword = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('密码不能为空'));
            }
            let pwdReg = /^[A-Za-z0-9]{6,20}$/
            if (!pwdReg.test(value)) {
              callback(new Error('请输入6-20英文字母或数字组合'));
            } else {
              callback();
            }
        };

        return {
            activeName: 'sign_in',
            btn_loading: false,

            /* 倒计时 */
            update_pwd_timer_second: 60,
            update_pwd_timer_disabled: false,

            sign: {
                mobile: '',
                password: ''
            },

            rules: {
                mobile: [{
                    validator: checkMobile,
                    trigger: 'blur'
                }],
                password: [{
                    validator: checkPassword,
                    trigger: 'blur'
                }]
            }
        }
    },
    mounted() {
        $('.mobile input').focus()
        localStorage.removeItem('token')
    },
    methods: {
        signIn(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.btn_loading = true
                    axios.post('/v1/master/login', {
                        mobile: this.sign.mobile,
                        password: this.sign.password
                    }).then(resp => {
                        if (resp.data.message == 'ok') {
                            this.$router.push({
                                name: 'home'
                            })
                        } else if (resp.data.message == 'notFound') {
                            this.$message.error("用户名或密码错误")
                            $('.mobile input').focus()
                        }
                        this.btn_loading = false
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>
