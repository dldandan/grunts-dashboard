<template>
  <el-dialog :visible.sync="dialogDnvisible" :before-close="initDialog" title="添加规则节点" top="11vh" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top" class="demo-ruleForm" style="padding:20px;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Period in seconds" prop="period">
        <el-input-number v-model="ruleForm.period" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="Maximum pending messages" prop="maxnummess">
        <el-input-number v-model="ruleForm.maxnummess" controls-position="right" :min="1" :max="100000"></el-input-number>
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
  name: 'DelayNode',
  props: {
    dialogDnvisible: {
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
        period: 60,
        maxnummess: 1000,
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        period: [
          { required: true, message: 'Period is required.', trigger: 'blur' }
        ],
        maxnummess: [
          { required: true, message: 'Maximum pending messages should be in a range from 1 to 100000 and required', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    surechange() {
      this.$emit('onUpdateDelayData', this.ruleForm.name)
      this.$emit('onDialogDNvisibleChange', false)
    },
    initDialog() {
      this.$emit('onDialogDNvisibleChange', false) // 关闭对话框
      this.$refs['ruleForm'].resetFields() // 清空form内容
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