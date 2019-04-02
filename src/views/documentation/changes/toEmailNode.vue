<template>
  <el-dialog :visible.sync="dialogTevisible" :before-close="initDialog" title="添加规则节点" top="11vh" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top" class="demo-ruleForm" style="padding:20px;height:450px;overflow-y:auto;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="From Template" prop="fromTemp">
        <el-input type="textarea" :rows="2" placeholder="" v-model="ruleForm.fromTemp"></el-input><br>
        <span style="font-size:12px;">From address template, use ${metaKeyName} to substitute variables from metadata</span>
      </el-form-item>
      <el-form-item label="To Template" prop="toTemp">
        <el-input type="textarea" :rows="2" placeholder="" v-model="ruleForm.toTemp"></el-input><br>
        <span style="font-size:12px;">Comma separated address list, use ${metaKeyName} to substitute variables from metadata</span>
      </el-form-item>
      <el-form-item label="Cc Template" prop="ccTemp" >
        <el-input type="textarea" :rows="2" placeholder="" v-model="ruleForm.ccTemp"></el-input><br>
        <span style="font-size:12px;">Comma separated address list, use ${metaKeyName} to substitute variables from metadata</span>
      </el-form-item>
      <el-form-item label="Bcc Template" prop="bccTemp" >
        <el-input type="textarea" :rows="2" placeholder="" v-model="ruleForm.bccTemp"></el-input><br>
        <span style="font-size:12px;">Comma separated address list, use ${metaKeyName} to substitute variables from metadata</span>
      </el-form-item>
      <el-form-item label="Subject Template" prop="subjectTemp" >
        <el-input type="textarea" :rows="2" placeholder="" v-model="ruleForm.subjectTemp"></el-input><br>
        <span style="font-size:12px;">Mail subject template, use ${metaKeyName} to substitute variables from metadata</span>
      </el-form-item>
      <el-form-item label="Body Template" prop="bodyTemp" >
        <el-input type="textarea" :rows="5" placeholder="" v-model="ruleForm.bodyTemp"></el-input><br>
        <span style="font-size:12px;">Mail body template, use ${metaKeyName} to substitute variables from metadata</span>
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
  name: 'ToEmailNode',
  props: {
    dialogTevisible: {
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
        fromTemp: 'info@testmail.org',
        toTemp: '${userEmail}',
        ccTemp: '',
        bccTemp: '',
        subjectTemp: 'Device ${deviceType} temperature high',
        bodyTemp: 'Device ${deviceName} has high temperature ${temp}',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        fromTemp: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        toTemp: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        subjectTemp: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        bodyTemp: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    surechange() {
      this.$emit('onUpdateToEmailData', this.ruleForm.name)
      this.$emit('onDialogTEvisibleChange', false)
    },
    initDialog() {
      this.$emit('onDialogTEvisibleChange', false) // 关闭对话框
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