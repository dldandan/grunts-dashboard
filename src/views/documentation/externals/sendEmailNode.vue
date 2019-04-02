<template>
  <el-dialog :visible.sync="dialogSevisible" :before-close="initDialog" title="添加规则节点" top="10vh">
    <el-form :model="ruleForm" :rules="rules" label-position="top" ref="ruleForm" label-width="120px" style="padding:30px;height:450px;overflow-y:auto;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="" prop="">
        <el-checkbox label=" Use system SMTP settings" name="type" v-model="ruleForm.useSysSMTP"></el-checkbox>
      </el-form-item>
      <el-form-item label="Protocol" prop="" v-if="ruleForm.useSysSMTP === false">
        <el-select v-model="ruleForm.protocol" placeholder="请选择" style="width:100%;">
            <el-option
            v-for="item in allprotocol"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="" v-if="ruleForm.useSysSMTP === false">
        <el-row>
          <el-col :span="11">
            <span style="color:#606266;font-weight: bold;">SMTP host *</span>
          </el-col>
          <el-col :span="11">
            <span style="color:#606266;font-weight: bold;margin-left:10px;">SMTP port *</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-input v-model="ruleForm.smtpHost"></el-input>
          </el-col>
          <el-col :span="11">
            <el-input-number v-model="ruleForm.smtpPort" controls-position="right" :min="1" :max="65535" style="width:100%;margin-left:10px;"></el-input-number>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="Timeout (ms)" prop="timeout" v-if="ruleForm.useSysSMTP === false">
        <el-input-number v-model="ruleForm.timeout" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="" prop="" v-if="ruleForm.useSysSMTP === false">
        <el-checkbox label=" Enable TLS" name="type" v-model="ruleForm.enableTLS"></el-checkbox>
      </el-form-item>
      <el-form-item label="Username" prop="" v-if="ruleForm.useSysSMTP === false">
        <el-input v-model="ruleForm.username" placeholder="Enter Username"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="" v-if="ruleForm.useSysSMTP === false">
        <el-input v-model="ruleForm.password" placeholder="Enter Password"></el-input>
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
  name: 'SendEmailNode',
  props: {
    dialogSevisible: {
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
        useSysSMTP: true,
        protocol: '',
        smtpHost: 'localhost',
        smtpPort: 25,
        timeout: 10000,
        enableTLS: false,
        username: '',
        password: '',
        desc: ''
      },
      allprotocol: [
        {
          label: 'SMTP',
          value: 'SMTP'
        }, {
          label: 'SMTPS',
          value: 'SMTPS'
        }
      ],
      rules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' }
        ],
        timeout: [
          { required: true, message: 'Timeout is required', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    surechange() {
      this.$emit('onUpdateSendEmailData', this.ruleForm.name)
      this.$emit('onDialogSEvisibleChange', false) // 关闭对话框
    },
    initDialog() {
      this.$emit('onDialogSEvisibleChange', false) // 关闭对话框
      this.$refs['ruleForm'].resetFields() // 清空form内容
    }
  }
}
</script>
<style>
</style>