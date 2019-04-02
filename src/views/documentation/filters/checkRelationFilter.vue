<template>
  <el-dialog :visible.sync="dialogVisible" :before-close="initDialog" title="添加规则节点" top="11vh" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="" prop="">
        <el-checkbox label=" Check relation to specific entity" name="type" v-model="ruleForm.delivery"></el-checkbox><br>
        <span stye="font-size:12px;">Checks existence of relation to specific entity or to any entity based on direction and relation type.</span>
      </el-form-item>
      <el-form-item label="方向" prop="direction">
        <el-select v-model="ruleForm.direction" placeholder="请选择">
          <el-option label="从" value="start"></el-option>
          <el-option label="到" value="end"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="ruleForm.delivery === true" label="类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择类型">
          <el-option v-for="item in alltypes" :key="item.value" :value="item.value"/>
        </el-select>
        <el-select v-model="ruleForm.typecontain" placeholder="请选择">
          <el-option v-for="con in alltypecontain" :key="con.value" :value="con.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="关联类型" prop="associatype">
        <el-autocomplete
      class="inline-input" style="width:100%"
      v-model="ruleForm.associatype"
      :fetch-suggestions="querySearch"
      placeholder=""
      @select="handleSelect"
    ></el-autocomplete>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="initDialog">取消</el-button>
      <el-button type="primary" @click="surechange()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'CheckRelationFilterNode',
  props: {
    dialogVisible: {
      type: Boolean,
      default: function() {
        return
      }
    } // 控制对话框是否显示
  },
  // watch: {
  // },
  data() {
    return {
      ruleForm: {
        name: '',
        direction: '',
        delivery: false,
        type: '',
        typecontain: '',
        associatype: '',
        desc: ''
      },
      alltypes: [
        {
          value: '设备',
          contains: []
        }, {
          value: '资产',
          contains: [
            {
              label: '1元',
              value: '1元'
            }, {
              label: '2元',
              value: '2元'
            }
          ]
        }, {
          value: '用户',
          contains: []
        }, {
          value: 'Entity View',
          contains: []
        }, {
          value: '仪表盘',
          contains: []
        }
      ],
      restaurants: [
        {
          value: 'Contains'
        }, {
          value: 'Manages'
        }
      ],
      rules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' }
        ],
        direction: [
          { required: true, message: '请选择方向', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        associatype: [
          { required: true, message: '请输入关联类型', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    alltypecontain() {
      for (var i = 0; i < this.alltypes.length; i++) {
        if (this.alltypes[i].value === this.ruleForm.type) {
          return this.alltypes[i].contains
        }
      }
    }
  },
  mounted() {
  },
  methods: {
    surechange() {
      this.$emit('onUpdateCheckRelationData', this.ruleForm.name)
      this.$emit('onDialogVisibleChange', false) // 关闭对话框
    },
    initDialog() {
      this.$emit('onDialogVisibleChange', false) // 关闭对话框
      this.$refs['ruleForm'].resetFields() // 清空form内容
    },
    handleSelect(item) {
      console.log(item)
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    }
  }
}
</script>
<style>
  .el-checkbox__inner {
    width: 18px;
    height: 18px;
    border: 2px solid #7d7a7a;
  }
  .el-checkbox__label {
    font-size: 18px;
  }
</style>