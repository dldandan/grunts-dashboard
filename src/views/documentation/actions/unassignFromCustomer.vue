<template>
  <el-dialog :visible.sync="dialogUfcvisible" :before-close="initDialog" title="添加规则节点" top="10vh">
    <el-form :model="ruleForm" :rules="rules" label-position="top" ref="ruleForm" label-width="120px" style="padding:30px;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Customer name pattern" prop="customerName">
        <el-input v-model="ruleForm.customerName"></el-input>
        <span style="font-size:12px;">Customer name pattern, use ${metaKeyName} to substitute variables from metadata</span>
      </el-form-item>
      <el-form-item label="Customers cache expiration time (sec)" prop="expirationTime">
        <el-input-number v-model="ruleForm.expirationTime" controls-position="right" :min="0"></el-input-number><br>
        <span style="font-size:12px;">Specifies maximum time interval allowed to store found customer records. 0 value means that records will never expire.</span>
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
  name: 'UnassignFromCustomer',
  props: {
    dialogUfcvisible: {
      type: Boolean,
      default: function() {
        return
      }
    }
  },
  // watch: {}
  // },
  data() {
    return {
      ruleForm: {
        name: '',
        customerName: '',
        expirationTime: 300,
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' }
        ],
        customerName: [
          { required: true, message: 'Customer name pattern is required', trigger: 'blur' }
        ],
        expirationTime: [
          { required: true, message: 'Customers cache expiration time is required.', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    surechange() {
      this.$emit('onUpdateUnassginFromData', this.ruleForm.name)
      this.$emit('onDialogUFCvisibleChange', false) // 关闭对话框
    },
    initDialog() {
      this.$emit('onDialogUFCvisibleChange', false) // 关闭对话框
      this.$refs['ruleForm'].resetFields() // 清空form内容
    }
  }
}
</script>
<style>
</style>