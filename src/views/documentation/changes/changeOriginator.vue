<template>
  <el-dialog :visible.sync="dialogCovisible" :before-close="initDialog" title="添加规则节点" top="11vh" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top" class="demo-ruleForm" style="padding:20px;height:450px;overflow-y:auto;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Originator source" prop="originsource">
        <el-select v-model="ruleForm.originsource" placeholder="请选择" style="width:100%;">
            <el-option
            v-for="item in allsource"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Relations query" prop="direction" v-show="ruleForm.originsource === 'Related'">
        <div style="display:flex">
            <div>
            <span>方向 *&nbsp;</span><br>
            <el-select v-model="ruleForm.direction" placeholder="请选择" style="width:105px;">
                <el-option label="从" value="start"></el-option>
                <el-option label="到" value="end"></el-option>
            </el-select>
            </div>
            <div style="margin-left:15px;">
            <span>Max relation level</span><br>
              <el-input-number v-model="ruleForm.level" controls-position="right" :min="1"></el-input-number>
            </div>
        </div>
      </el-form-item>
      <el-form-item label="关联滤波器" prop="associatype" v-show="ruleForm.originsource === 'Related'">
        <el-row>
          <el-col :span="11">
            <span>类型</span>
          </el-col>
          <el-col :span="11">
            <span>实体类型</span>
          </el-col>
        </el-row>
        <div v-for="(param, index) in filterParameters" :key="index" style="margin-bottom:10px;">
        <el-row>
          <el-col :span="10">
            <el-autocomplete
                class="inline-input" style="width:100%"
                v-model="param.parameter"
                :fetch-suggestions="querySearch"
                placeholder="任意类型"
                @select="handleSelect"
            ></el-autocomplete>
          </el-col>
          <el-col :span="10" style="margin-left:30px;">
            <el-select v-model="param.value" multiple placeholder="任意实体" style="width:100%">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-col>
          <el-button v-if="index === 0" icon="el-icon-plus" size="medium" style="padding: 10px 12px;margin-left:10px;background-color:#f5f7fa;" @click="FilterIncrementSettings()"/>
          <el-button v-if="index !== 0" icon="el-icon-minus" size="medium" style="padding: 10px 12px;margin-left:10px;background-color:#f5f7fa" @click="FilterdeleteIncreSettings(index)"/>
        </el-row>
        </div>
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
  name: 'ChangeOriginator',
  props: {
    dialogCovisible: {
      type: Boolean,
      default: function() {
        return
      }
    }
  },
  data() {
    return {
      ruleForm: {
        name: '',
        originsource: '',
        direction: '从',
        level: '1',
        desc: ''
      },
      allsource: [
        {
          label: 'Customer',
          value: 'Customer'
        }, {
          label: 'Tenant',
          value: 'Tenant'
        }, {
          label: 'Related',
          value: 'Related'
        }
      ],
      filterParameters: [
        { parameter: '', value: [] }
      ],
      restaurants: [
        {
          value: 'Contains'
        }, {
          value: 'Manages'
        }
      ],
      options: [{
        value: '设备',
        label: '设备'
      }, {
        value: '资产',
        label: '资产'
      }, {
        value: 'Entity View',
        label: 'Entity View'
      }, {
        value: '租户',
        label: '租户'
      }, {
        value: '客户',
        label: '客户'
      }, {
        value: '仪表板',
        label: '仪表板'
      }],
      rules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        originsource: [
          { required: true, message: '请选择', trigger: 'change' } //
        ],
        direction: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    surechange() {
      this.$emit('onUpdateChangeData', this.ruleForm.name)
      this.$emit('onDialogCOvisibleChange', false)
    },
    initDialog() {
      this.$emit('onDialogCOvisibleChange', false) // 关闭对话框
      this.$refs['ruleForm'].resetFields() // 清空form内容
    },
    FilterIncrementSettings() {
      var newParam = { parameter: '', value: [] }
      this.filterParameters.push(newParam)
    },
    FilterdeleteIncreSettings(index) {
      this.filterParameters.splice(index, 1)
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