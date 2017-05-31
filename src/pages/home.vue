<template lang="html">
  <div class="container">
    <div class="top_bar">
      <h2 class="title">首页</h2>
    </div>
    <div class="content_inner">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">团队成员</span>
        </div>
        <span v-for="(item, index) in summoners" :key="o" class="text item">
            {{item.name + (index + 1 == summoners.length ? ' ' : '、')}}
        </span>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            summoners: [{
                position: '中单',
                name: '李肖'
            }, {
                position: 'ADC',
                name: '王凯'
            }, {
                position: '辅助',
                name: '冯忠森'
            }, {
                position: '打野',
                name: '赵泳军'
            }, {
                position: '上单',
                name: '刘海超'
            }]
        }
    }
}
</script>

<style lang="scss" scoped>
.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}
.clearfix:after,
.clearfix:before {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both;
}

.box-card {
    width: 480px;
}
</style>
