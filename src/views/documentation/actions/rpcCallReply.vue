<template>
  <el-dialog :visible.sync="dialogRepvisible" :before-close="initDialog" title="添加规则节点" top="11vh">
    <el-form :model="ruleForm" :rules="rules" label-position="top" ref="ruleForm" label-width="120px" style="padding:30px;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Request Id Metadata attribute name" prop="">
        <el-input v-model="ruleForm.rimaName"></el-input>
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
  name: 'RPCCallReplyNode',
  props: {
    dialogRepvisible: {
      type: Boolean,
      default: function() {
        return
      }
    }
  },
  // watch: {
  // },
  data() {
    return {
      ruleForm: {
        name: '',
        rimaName: 'requestId',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    surechange() {
      this.$emit('onUpdateRPCReplyData', this.ruleForm.name)
      this.$emit('onDialogRepvisibleChange', false) // 关闭对话框
    },
    initDialog() {
      this.$emit('onDialogRepvisibleChange', false) // 关闭对话框
      this.$refs['ruleForm'].resetFields() // 清空form内容
    }
  }
}
</script>
<style>
</style>