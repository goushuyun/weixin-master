<template lang="html">
  <div class="container">
    <div class="top_bar">
      <h2 class="title">注册商家</h2>
    </div>
    <div class="content_inner">
      <el-row type="flex">
        <el-col>
          <el-radio-group v-model="status1" size="small" @change="">
            <el-radio-button label="0">全部</el-radio-button>
            <el-radio-button label="1">未确认意愿</el-radio-button>
            <el-radio-button label="2">有购买意愿</el-radio-button>
            <el-radio-button label="3">无购买意愿</el-radio-button>
            <el-radio-button label="4">已购买</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col>
          <el-radio-group v-model="status2" size="small" @change="">
            <el-radio-button label="0">全部</el-radio-button>
            <el-radio-button label="1">即将到期</el-radio-button>
            <el-radio-button label="2">已到期</el-radio-button>
            <el-radio-button label="3">未到期</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col>
          <el-input placeholder="搜索值" v-model.trim="search_value" style="width:400px;float:right" size="small" icon="search" @keyup.enter.native="">
            <el-select v-model="search_type" style="width: 125px;" clearable slot="prepend" placeholder="筛选条件" size="small" @change="">
                <el-option label="云店名" value="store"></el-option>
                <el-option label="负责人手机" value="mobile"></el-option>
            </el-select>
          </el-input>
        </el-col>
      </el-row>

      <div style="margin-top:20px;">

      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            status1: '0',
            status2: '0',
            search_value: '',
            search_type: ''
        }
    }
}
</script>
