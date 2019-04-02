<template>
  <el-dialog :visible.sync="dialogOfvisible" :before-close="initDialog" title="添加规则节点" top="11vh" >
    <el-form :model="ruleForm" :rules="rules" label-position="top" ref="ruleForm" label-width="180px" style="padding:30px;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Originator types filter" prop="Originatortype">
        <el-select v-model="ruleForm.type" multiple placeholder="请输入实体类型" style="width:100%">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
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
  name: 'OriginatorTypeFilterNode',
  props: {
    dialogOfvisible: {
      type: Boolean,
      default: function() {
        return
      }
    } // 控制对话框是否显
  },
  // watch: {
  // },
  data() {
    return {
      ruleForm: {
        name: '',
        type: [],
        desc: ''
      },
      options: [{
        value: '设备',
        label: '设备'
      }, {
        value: '资产',
        label: '资产'
      }, {
        value: '租户',
        label: '租户'
      }, {
        value: '客户',
        label: '客户'
      }, {
        value: '用户',
        label: '用户'
      }, {
        value: '仪表盘',
        label: '仪表盘'
      }, {
        value: '规则链',
        label: '规则链'
      }, {
        value: 'Rule node',
        label: 'Rule node'
      }],
      rules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        Originatortype: [
          { required: true, message: '', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    surechange() {
      this.$emit('onUpdateOriginatorFilterData', this.ruleForm.name)
      this.$emit('onDialogOfvisibleChange', false) // 关闭对话框
    },
    initDialog() {
      this.$emit('onDialogOfvisibleChange', false) // 关闭对话框
      this.$refs['ruleForm'].resetFields() // 清空form内容
    }
  }
}
</script>
<style>
</style>