<template>
  <el-dialog :visible.sync="dialogSqsvisible" :before-close="initDialog" title="添加规则节点" top="10vh">
    <el-form :model="ruleForm" :rules="rules" label-position="top" ref="ruleForm" label-width="120px" style="padding:30px;height:450px;overflow-y:auto;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Queue type" prop="">
        <el-select v-model="ruleForm.queueType" placeholder="请选择" style="width:100%;">
          <el-option label="Standard" value="Standard"></el-option>
          <el-option label="FIFO" value="FIFO"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Queue URL pattern" prop="queueUrl">
        <el-input v-model="ruleForm.queueUrl"></el-input>
        <span style="font-size:12px;">Queue URL pattern, use ${metaKeyName} to substitute variables from metadata</span>
      </el-form-item>
      <el-form-item label="Delay (seconds)" prop="" v-if="ruleForm.queueType === 'Standard'">
        <el-input-number v-model="ruleForm.delayTime" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="Message attributes" prop="">
         <span style="font-size:12px;">Use ${metaKeyName} in name/value fields to substitute variables from metadata</span>
         <el-row>
          <el-col :span="11">
            <span style="color:#606266;font-weight:600;">Name</span>
          </el-col>
          <el-col :span="11">
            <span style="color:#606266;font-weight:600;">Value</span>
          </el-col>
        </el-row>
        <div v-for="(param, index) in Parameters" :key="index" style="margin-bottom:10px;">
        <el-row>
          <el-col :span="10">
            <el-input v-model="param.parameter" placeholder="Name"></el-input>
          </el-col>
          <el-col :span="10" style="margin-left:30px;">
            <el-input v-model="param.value" placeholder="Value"></el-input>
          </el-col>
          <el-button v-if="index === 0" icon="el-icon-plus" size="medium" style="padding: 10px 12px;margin-left:10px;background-color:#f5f7fa;" @click="IncrementSettings()"/>
          <el-button v-if="index !== 0" icon="el-icon-minus" size="medium" style="padding: 10px 12px;margin-left:10px;background-color:#f5f7fa" @click="deleteIncreSettings(index)"/>
        </el-row>
        </div>
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
  name: 'AWSSQSNode',
  props: {
    dialogSqsvisible: {
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
        queueType: 'Standard',
        queueUrl: 'https://sqs.us-east-1.amazonaws.com/123456789012/my-queue-name',
        delayTime: 0,
        aaKeID: '',
        asecretAK: '',
        awsRegion: 'us-east-1',
        desc: ''
      },
      Parameters: [
        { parameter: '', value: '' }
      ],
      rules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' }
        ],
        queueUrl: [
          { required: true, message: 'Queue URL pattern is required', trigger: 'blur' }
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
      this.$emit('onUpdateAWSSQSData', this.ruleForm.name)
      this.$emit('onDialogSQSvisibleChange', false) // 关闭对话框
    },
    initDialog() {
      this.$emit('onDialogSQSvisibleChange', false) // 关闭对话框
      this.$refs['ruleForm'].resetFields() // 清空form内容
    },
    IncrementSettings() {
      var newParam = { parameter: '', value: '' }
      this.Parameters.push(newParam)
    },
    deleteIncreSettings(index) {
      this.Parameters.splice(index, 1)
    }
  }
}
</script>
<style>
</style>