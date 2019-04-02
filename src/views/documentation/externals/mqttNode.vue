<template>
  <el-dialog :visible.sync="dialogMvisible" :before-close="initDialog" title="添加规则节点" top="10vh">
    <el-form :model="ruleForm" :rules="rules" label-position="top" ref="ruleForm" label-width="120px" style="padding:20px;height:450px;overflow-y:auto;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Topic pattern" prop="topicPatt">
        <el-input v-model="ruleForm.topicPatt"></el-input>
        <span style="font-size:12px;">MQTT topic pattern, use ${metaKeyName} to substitute variables from metadata</span>
      </el-form-item>
      <el-form-item label="" prop="">
        <el-row>
          <el-col :span="7">
            <span style="color:#606266;font-weight: bold;">Host *</span>
          </el-col>
          <el-col :span="7">
            <span style="color:#606266;font-weight: bold;margin-left:10px;">Port *</span>
          </el-col>
          <el-col :span="7">
            <span style="color:#606266;font-weight: bold;margin-left:15px;">Connection timeout(sec) *</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-input v-model="ruleForm.host" style=width:98%;></el-input>
          </el-col>
          <el-col :span="7">
            <el-input-number v-model="ruleForm.port" controls-position="right" :min="1" :max="65535" style="width:100%;margin-left:10px;"></el-input-number>
          </el-col>
          <el-col :span="7">
            <el-input-number v-model="ruleForm.timeout" controls-position="right" :min="1" :max="200" style="width:100%;margin-left:20px;"></el-input-number>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="Client ID" prop="">
        <el-input v-model="ruleForm.clientId"></el-input>
      </el-form-item>
      <el-form-item label="" prop="">
        <el-checkbox label=" Clean session" name="type" v-model="ruleForm.cleanSession"></el-checkbox><br>
        <el-checkbox label=" Enable SSL" name="type" v-model="ruleForm.enableSSL"></el-checkbox>
      </el-form-item>
      <el-card>
        <div slot="header" class="clearfix">
          <span style="font-size:16px;">Credentials</span>
          <span style="margin-left: 100px;">不一定是什么</span>
          <span style="margin-left: 100px;">不一定是什么</span>
          <span style="margin-left: 100px;">不一定是什么</span>
        </div>
        <div>
        </div>
      </el-card>
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
  name: 'MQTTNode',
  props: {
    dialogMvisible: {
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
        topicPatt: 'my-topic',
        host: 'localhost',
        port: 1883,
        timeout: 10,
        clientId: '',
        cleanSession: true,
        enableSSL: false,
        desc: ''
      },
      activeName: '1',
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
        topicPatt: [
          { required: true, message: 'Topic pattern is required', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    surechange() {
      this.$emit('onUpdateSendEmailData', this.ruleForm.name)
      this.$emit('onDialogMvisibleChange', false) // 关闭对话框
    },
    initDialog() {
      this.$emit('onDialogMvisibleChange', false) // 关闭对话框
      this.$refs['ruleForm'].resetFields() // 清空form内容
    }
  }
}
</script>
<style>
</style>