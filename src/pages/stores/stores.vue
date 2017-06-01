<template lang="html">
  <div class="container">
    <div class="top_bar">
      <h2 class="title">注册商家</h2>
    </div>
    <div class="content_inner">
      <el-row type="flex">
        <el-col>
          <el-radio-group v-model="intention" size="small" @change="getStores">
            <el-radio-button label="0">全部</el-radio-button>
            <el-radio-button label="1">未确认意愿</el-radio-button>
            <el-radio-button label="2">有购买意愿</el-radio-button>
            <el-radio-button label="3">无购买意愿</el-radio-button>
            <el-radio-button label="4">已购买</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col>
          <el-radio-group v-model="find_status" size="small" @change="getStores">
            <el-radio-button label="0">全部</el-radio-button>
            <el-radio-button label="3">即将到期</el-radio-button>
            <el-radio-button label="2">已到期</el-radio-button>
            <el-radio-button label="1">未到期</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col>
          <el-input placeholder="搜索值" v-model.trim="search_value" style="width:400px;float:right" size="small" icon="search" @input="inputSearchValue" :on-icon-click="getStores" @keyup.enter.native="getStores">
            <el-select v-model="search_type" style="width: 125px;" clearable slot="prepend" placeholder="筛选条件" size="small" @change="handleSearchValue">
                <el-option label="云店名" value="store"></el-option>
                <el-option label="负责人手机" value="mobile"></el-option>
            </el-select>
          </el-input>
        </el-col>
      </el-row>

      <div style="margin:20px 0;">
        <el-table :data="stores" border style="width: 100%" @sort-change="sortChange">
          <el-table-column type="index" width="60"></el-table-column>
          <el-table-column prop="store_id" label="云店 ID" width="150"></el-table-column>
          <el-table-column prop="store_name" label="云店名" width="160"></el-table-column>
          <el-table-column prop="total_sales" sortable="custom" label="总销售额（元）" width="100"></el-table-column>
          <el-table-column prop="total_goods" label="上架书籍种类数" width="100"></el-table-column>
          <el-table-column label="经营学校（后续添加按学校模糊搜索功能）" width="310">
            <template scope="scope">
              <el-tooltip v-if="scope.row.schools" placement="top" effect="dark" :enterable="false">
                <div slot="content">{{scope.row.schools}}</div>
                <div class="ellipsis">{{scope.row.schools}}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="admin_name" label="负责人姓名" width="150"></el-table-column>
          <el-table-column prop="admin_mobile" label="负责人手机" width="150"></el-table-column>
          <el-table-column prop="store_create_at" label="创建日期" width="150"></el-table-column>
          <el-table-column prop="store_expire_at" label="截止日期" width="150">
            <template scope="scope">
              <span v-if="!scope.row.update_flag">{{scope.row.store_expire_at}}</span>
              <el-date-picker v-else v-model="scope.row.update_expire_at" type="date" size="small" style="width:110px" placeholder="选择日期"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="charges" label="收费金额（元/年）" width="100">
            <template scope="scope">
              <span v-if="!scope.row.update_flag">{{scope.row.charges}}</span>
              <el-input v-else v-model="scope.row.update_charges" size="small" style="width:60px"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="poundage" label="手续费（%）"  width="100">
            <template scope="scope">
              <span v-if="!scope.row.update_flag">{{scope.row.poundage}}</span>
              <el-input v-else v-model="scope.row.update_poundage" size="small" type="number" min="0" max="10" style="width:60px"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="intention" label="标记" width="120">
            <template scope="scope">
              <div v-if="!scope.row.update_flag">
                <el-tag v-if="scope.row.intention == 1" type="gray">未确认意愿</el-tag>
                <el-tag v-if="scope.row.intention == 2" type="danger">有购买意愿</el-tag>
                <el-tag v-if="scope.row.intention == 3" type="primary">无购买意愿</el-tag>
                <el-tag v-if="scope.row.intention == 4" type="success">已购买</el-tag>
              </div>
              <div v-else>
                <el-select v-model="scope.row.update_intention" size="small" style="width:80px" placeholder="请选择">
                  <el-option label="未确认意愿" value="1"></el-option>
                  <el-option label="有购买意愿" value="2"></el-option>
                  <el-option label="无购买意愿" value="3"></el-option>
                  <el-option label="已购买" value="4"></el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="180">
            <template scope="scope">
              <el-row type="flex">
                <el-tooltip v-if="scope.row.remark" placement="top" effect="dark" :enterable="false">
                  <div slot="content">{{scope.row.remark}}</div>
                  <div class="ellipsis">{{scope.row.remark}}</div>
                </el-tooltip>
                <el-button style="margin-left:10px" type="text" size="mini" icon="edit" @click="openRemarkDialog(scope.$index)"></el-button>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="140">
            <template scope="scope">
              <el-button v-if="!scope.row.update_flag" type="danger" size="small" @click="changeInfo(scope.$index)">修改</el-button>
              <el-button v-if="scope.row.update_flag" type="primary" size="small" @click="scope.row.update_flag = false">取消</el-button>
              <el-button v-if="scope.row.update_flag" type="success" size="small" @click="updateStoreExtraInfo(scope.$index)">确认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination :current-page="page" :total="total_count" :page-sizes="[10, 20, 50, 100]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>

      <el-dialog :title="'备注信息-' + remark_dialog.store_name" :visible.sync="remark_dialog.visible" size="tiny" :close-on-click-modal="false">
        <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 15 }" placeholder="请输入内容" v-model="remark_dialog.update_remark"></el-input>
        <div style="margin-top:20px">
          <el-button size="small" @click="remark_dialog.visible = false">取消</el-button>
          <el-button size="small" type="primary" @click="comfirmUpdateRemark">确定</el-button>
        </div>
      </el-dialog>
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
            intention: '0',
            find_status: '0',
            search_value: '',
            search_type: '',

            admin_mobile: '',
            store_name: '',

            stores: [],

            remark_dialog: {
                visible:false,
                index: 0,
                store_name: '',
                update_remark: ''
            },

            page: 0,
            size: 10,
            sort: 0,
            total_count: 0
        }
    },
    mounted() {
        this.getStores()
    },
    methods: {
        getStores() {
            axios.post('/v1/master/stores', {
                "find_status": this.find_status, //0 全部 1 未过期 2 过期 3 即将15天到期
                "admin_mobile": this.admin_mobile,
                "store_name": this.store_name,
                "intention": this.intention, //0 全部 1未确认意愿 2有购买意愿 3无购买意愿 4已购买
                "page": this.page,
                "size": this.size,
                "sort": this.sort
            }).then(resp => {
                if (resp.data.message == 'ok') {
                    this.total_count = resp.data.total_count
                    this.stores = resp.data.data.map(el => {
                        el.store_create_at = moment(el.store_create_at * 1000).format('L')
                        el.store_expire_at = moment(el.store_expire_at * 1000).format('L')
                        el.update_expire_at = el.store_expire_at
                        el.charges = priceFloat(el.charges)
                        el.total_sales = priceFloat(el.total_sales)
                        el.poundage = parseFloat(el.poundage / 10).toFixed(1)
                        el.update_intention = el.intention + ''
                        el.update_flag = false
                        return el
                    })
                }
            })
        },
        handleSizeChange(size) {
            this.size = size
            this.getStores()
        },
        handleCurrentChange(page) {
            this.page = page
            this.getStores()
        },
        sortChange() {
            this.sort = (this.sort + 1) % 3
            this.getStores()
        },
        handleSearchValue(type) {
            this.admin_mobile = ''
            this.store_name = ''
            if (this.search_value.trim() != '') {
                this.inputSearchValue(0, type)
            }
        },
        // 第一个参数为input事件的参数，在此需要使用的是自己传入的参数，即第二个参数
        inputSearchValue(val, type) {
            var search_type = this.search_type
            if (type) {
                search_type = type
            }
            switch (search_type) {
                case 'store':
                    this.store_name = this.search_value
                    break;
                case 'mobile':
                    this.admin_mobile = this.search_value
                    break;
            }
        },
        // 修改按钮
        changeInfo(index) {
            this.stores[index].update_expire_at = this.stores[index].store_expire_at
            this.stores[index].update_charges = this.stores[index].charges
            this.stores[index].update_poundage = this.stores[index].poundage
            this.stores[index].update_intention = this.stores[index].intention + ''
            this.stores[index].update_flag = true
        },
        updateStoreExtraInfo(index) {
            var store = this.stores[index]
            if (!(store.update_expire_at && store.update_charges && store.update_poundage)) {
                this.$message.warning('请先完善信息')
                return
            }
            let withdrawFeeReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
            if (!withdrawFeeReg.test(store.update_charges)) {
                this.$message.warning('金额格式不正确')
                return
            }
            var data = {
                "id": store.id
            }
            if (moment(store.update_expire_at).format('L') != store.store_expire_at) {
                data.store_expire_at = moment(store.update_expire_at).unix()
            }
            if (store.update_charges != store.charges) {
                data.charges = store.update_charges * 100
            }
            if (store.update_poundage != store.poundage) {
                data.poundage = store.update_poundage * 10
            }
            if (store.update_intention != store.intention) {
                data.intention = store.update_intention
            }
            console.log('>>>>>----- data ----->');
            console.log(data);
            axios.post('/v1/master/update_store_extra_info',data).then(resp => {
                if (resp.data.message == 'ok') {
                    this.$message.success('店铺“' + store.store_name + '”的信息修改成功')
                    if (moment(store.update_expire_at).format('L') != store.store_expire_at) {
                        this.stores[index].store_expire_at = moment(store.update_expire_at).format('L')
                    }
                    if (store.update_charges != store.charges) {
                        this.stores[index].charges = parseFloat(store.update_charges).toFixed(2)
                    }
                    if (store.update_poundage != store.poundage) {
                        this.stores[index].poundage = parseFloat(store.update_poundage).toFixed(1)
                    }
                    if (store.update_intention != store.intention) {
                        this.stores[index].intention = store.update_intention
                    }
                    this.stores[index].update_flag = false
                }
            })
        },
        // 编辑店铺的备注
        openRemarkDialog(index) {
            this.remark_dialog.index = index
            this.remark_dialog.update_remark = this.stores[index].remark
            this.remark_dialog.store_name = this.stores[index].store_name
            this.remark_dialog.visible = true
        },
        comfirmUpdateRemark() {
            var index = this.remark_dialog.index
            var store = this.stores[index]
            if (this.remark_dialog.update_remark == store.remark) {
                this.$message.warning('您没有做任何改动')
                return
            }
            axios.post('/v1/master/update_store_extra_info',{
                "id": store.id,
                "remark": this.remark_dialog.update_remark
            }).then(resp => {
                if (resp.data.message == 'ok') {
                    this.$message.success('店铺“' + store.store_name + '”的备注修改成功')
                    this.stores[index].remark = this.remark_dialog.update_remark
                    this.remark_dialog.visible = false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.ellipsis {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
