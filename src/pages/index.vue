<style lang="scss" scoped>@import "../common/_color.scss";
#page {
    height: 100%;
    // background-color: $bg_grey;
    font-size: 14px;
}

#left_bar {
    position: fixed;
    width: 180px;
    top: 0;
    left: 0;
    bottom: 0;
    // background-color: #324057;
    background-color: rgba(0, 0, 0, .85);

    .left_top {
        padding: 8px 0 8px 20px;
    }

    .shop_logo {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        box-shadow: 0 0 4px rgba(255, 255, 255, .4);
    }
    p.shop_name {
        font-size: 14px;
        color: white;
        text-align: left;
        line-height: 48px;
    }
    i.icon {
        color: white;
        font-size: 13px;
        padding: 0 8px;
    }
    i.fa {
        width: 14px;
        padding-right: 10px;
    }
}

#content {
    background-image: url("http://7xvl2k.com1.z0.glb.clouddn.com/bg_3.jpg");
    background-attachment: fixed;
    background-size: 100%, 100%;
    padding-left: 180px;
    min-height: 100%;
    min-width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
}
</style>

<template lang="html">

<div id="page">
    <div id="left_bar">
        <el-row class="left_top">
            <el-col :span="10">
                <router-link :to="{name:'home'}">
                    <img src="http://okxy9gsls.bkt.clouddn.com/cloudshoplogo1.png" class="shop_logo">
                </router-link>
            </el-col>

            <el-col :span="14">
                <p class="shop_name">英雄联盟
                    <router-link :to="{name:'login'}">
                        <i class="fa fa-power-off icon" aria-hidden="true"></i>
                    </router-link>
                </p>
            </el-col>
        </el-row>

        <el-menu theme="dark" mode="vertical" :router="true" unique-opened :default-active="menu_active">
            <el-submenu index="0">
              <template slot="title"><i class="el-icon-setting"></i>基础功能</template>
              <el-menu-item index="/master/withdraw">
                  <i class="fa fa-delicious" aria-hidden="true"></i>提现申请
              </el-menu-item>
              <el-menu-item index="/master/stores">
                  <i class="fa fa-life-ring" aria-hidden="true"></i>注册商家
              </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>

    <div id="content">
        <router-view></router-view>
    </div>

</div>

</template>

<script>
export default {
    data() {
        return {
            vertical: '0'
        }
    },
    mounted() {
        this.$router.push({
            name: 'home'
        })
    }
}
</script>
