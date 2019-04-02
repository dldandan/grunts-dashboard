<template>
  <el-dialog :visible.sync="dialogSnsvisible" :before-close="initDialog" title="添加规则节点" top="10vh">
    <el-form :model="ruleForm" :rules="rules" label-position="top" ref="ruleForm" label-width="120px" style="padding:30px;height:450px;overflow-y:auto;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Topic ARN pattern" prop="topicARN">
        <el-input v-model="ruleForm.topicARN"></el-input>
        <span style="font-size:12px;">Topic ARN pattern, use ${metaKeyName} to substitute variables from metadata</span>
      </el-form-item>
      <el-form-item label="AWS Access Key ID" prop="aaKeID">
        <el-input v-model="ruleForm.aaKeID"></el-input>
      </el-form-item>
      <el-form-item label="AWS Secret Access Key" prop="asecretAK">
        <el-input v-model="ruleForm.asecretAK"></el-input>
      </el-form-item>
      <el-form-item label="AWS Region" prop="awsRegion">
        <el-input v-model="ruleForm.awsRegion"></el-input>
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
  name: 'AWSSNSNode',
  props: {
    dialogSnsvisible: {
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
        topicARN: 'arn:aws:sns:us-east-1:123456789012:MyNewTopic',
        aaKeID: '',
        asecretAK: '',
        awsRegion: 'us-east-1',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' }
        ],
        topicARN: [
          { required: true, message: 'Topic ARN pattern is required.', trigger: 'blur' }
        ],
        aaKeID: [
          { required: true, message: 'AWS Access Key ID is required', trigger: 'blur' }
        ],
        asecretAK: [
          { required: true, message: 'AWS Secret Access Key is required', trigger: 'blur' }
        ],
        awsRegion: [
          { required: true, message: 'AWS Region is required', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    surechange() {
      this.$emit('onUpdateAWSSNSData', this.ruleForm.name)
      this.$emit('onDialogSNSvisibleChange', false) // 关闭对话框
    },
    initDialog() {
      this.$emit('onDialogSNSvisibleChange', false) // 关闭对话框
      this.$refs['ruleForm'].resetFields() // 清空form内容
    }
  }
}
</script>
<style>
</style>