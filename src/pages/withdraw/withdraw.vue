<template lang="html">
  <div class="container">
    <div class="top_bar">
      <h2 class="title">提现申请</h2>
    </div>
    <div class="content_inner">
      <el-row type="flex">
        <el-col>
          <el-radio-group v-model="status" size="small" @change="withdrawList">
            <el-radio-button label="1">待处理</el-radio-button>
            <el-radio-button label="2">处理中</el-radio-button>
            <el-radio-button label="3">已处理</el-radio-button>
            <el-radio-button label="0">全部</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col>
          <el-input placeholder="搜索值" v-model.trim="search_id" style="width:400px;float:right"
            size="small" icon="search" :on-icon-click="searchById" @keyup.enter.native="searchById">
            <template slot="prepend">交易号</template>
          </el-input>
        </el-col>
      </el-row>
      <div style="margin-top:20px;">
        <el-table :data="withdraw_list" border style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="id" label="交易号" width="160"></el-table-column>
          <el-table-column prop="apply_at" label="申请时间" width="180"></el-table-column>
          <el-table-column prop="store_name" label="云店" width="160"></el-table-column>
          <el-table-column prop="balance" label="可提现金额" width="120"></el-table-column>
          <el-table-column prop="withdraw_fee" label="提现金额" width="120"></el-table-column>
          <el-table-column prop="card_no" label="银行卡号" width="200"></el-table-column>
          <el-table-column prop="username" label="开卡人"  width="160"></el-table-column>
          <el-table-column prop="apply_phone" label="申请人手机" width="140"></el-table-column>
          <el-table-column prop="status_at" label="处理时间/完成时间" width="180"></el-table-column>
          <el-table-column fixed="right" label="处理情况" min-width="100">
            <template scope="scope">
              <el-button v-if="scope.row.status == 1" type="danger" size="small" @click="withdrawHandle(scope.$index)">待处理</el-button>
              <el-button v-if="scope.row.status == 2" type="primary" size="small" @click="withdrawComplete(scope.$index)">处理中</el-button>
              <el-button v-if="scope.row.status == 3" type="primary" disabled size="small">已处理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {
    priceFloat
} from "../../scripts/utils"
import axios from "../../scripts/http"
export default {
    data() {
        return {
            status: '0',
            search_id: '',

            withdraw_list: []
        }
    },
    mounted() {
        this.withdrawList()
    },
    methods: {
        withdrawList() {
            axios.post('/v1/master/withdraw_list', {
                "id": this.search_id, // not required
                "status": this.status // not required 0:all 1:pendding be accepted 2: in process 3:success(complted)
            }).then(resp => {
                if (resp.data.message == 'ok') {
                    this.withdraw_list = resp.data.data.map(el => {
                        el.apply_at = moment(el.apply_at * 1000).format('YYYY-MM-DD hh:mm:ss')
                        el.balance = priceFloat(el.balance)
                        el.withdraw_fee = priceFloat(el.withdraw_fee)
                        if (el.status == 2) {
                            el.status_at = moment(el.accept_at * 1000).format('YYYY-MM-DD hh:mm:ss')
                        } else if (el.status == 3) {
                            el.status_at = moment(el.complete_at * 1000).format('YYYY-MM-DD hh:mm:ss')
                        } else {
                            el.status_at = ''
                        }
                        return el
                    })
                }
            })
        },
        searchById() {
            this.status = '0'
            this.withdrawList()
        },
        clearSearchId() {
            this.search_id = ''
            this.withdrawList()
        },
        // 接受提现申请
        withdrawHandle(index) {
            var id = this.withdraw_list[index].id
            axios.post('/v1/master/withdraw_handle', {
                "id": id
            }).then(resp => {
                if (resp.data.message == 'ok') {
                    this.withdraw_list[index].status = 2  // 已处理
                    this.withdraw_list[index].status_at = moment().format('YYYY-MM-DD hh:mm:ss')
                }
            })
        },
        // 完成提现申请
        withdrawComplete(index) {
            var id = this.withdraw_list[index].id
            axios.post('/v1/master/withdraw_complete', {
                "id": id
            }).then(resp => {
                if (resp.data.message == 'ok') {
                    this.withdraw_list[index].status = 3  // 已完成
                    this.withdraw_list[index].status_at = moment().format('YYYY-MM-DD hh:mm:ss')
                }
            })
        }
    }
}
</script>
