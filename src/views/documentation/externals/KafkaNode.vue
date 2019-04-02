<template>
  <el-dialog :visible.sync="dialogKvisible" :before-close="initDialog" title="添加规则节点" top="10vh">
    <el-form :model="ruleForm" :rules="rules" label-position="top" ref="ruleForm" label-width="120px" style="padding:30px;height:450px;overflow-y:auto;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Topic pattern" prop="topicPat">
        <el-input v-model="ruleForm.topicPat"></el-input>
      </el-form-item>
      <el-form-item label="Bootstrap servers" prop="serverIp">
        <el-input v-model="ruleForm.serverIp"></el-input>
      </el-form-item>
      <el-form-item label="Automatically retry times if fails" prop="">
        <el-input-number v-model="ruleForm.retryTime" controls-position="right" :min="0" style="width:100%"></el-input-number>
      </el-form-item>
      <el-form-item label="Produces batch size in bytes" prop="">
        <el-input-number v-model="ruleForm.batchSize" controls-position="right" :min="0" style="width:100%"></el-input-number>
      </el-form-item>
      <el-form-item label="Time to buffer locally (ms)" prop="">
        <el-input-number v-model="ruleForm.bufferTime" controls-position="right" :min="0" style="width:100%"></el-input-number>
      </el-form-item>
      <el-form-item label="Client buffer max size in bytes" prop="">
        <el-input-number v-model="ruleForm.bufferMaxsize" controls-position="right" :min="0" style="width:100%"></el-input-number>
      </el-form-item>
      <el-form-item label="Number of acknowledgments" prop="">
        <el-select v-model="ruleForm.acknowNum" placeholder="请选择">
            <el-option
            v-for="item in allnum"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Key serializer" prop="keySeria">
        <el-input v-model="ruleForm.keySeria"></el-input>
      </el-form-item>
      <el-form-item label="Value serializer" prop="valueSeria">
        <el-input v-model="ruleForm.valueSeria"></el-input>
      </el-form-item>
      <el-form-item label="Other properties" prop="">
        <el-row>
          <el-col :span="11">
            <span>Key</span>
          </el-col>
          <el-col :span="11">
            <span>Value</span>
          </el-col>
        </el-row>
        <div v-for="(param, index) in Parameters" :key="index" style="margin-bottom:10px;">
        <el-row>
          <el-col :span="10">
            <el-input v-model="param.parameter" placeholder="Key"></el-input>
          </el-col>
          <el-col :span="10" style="margin-left:30px;">
            <el-input v-model="param.value" placeholder="Value"></el-input>
          </el-col>
          <el-button v-if="index === 0" icon="el-icon-plus" size="medium" style="padding: 10px 12px;margin-left:10px;background-color:#f5f7fa;" @click="IncrementSettings()"/>
          <el-button v-if="index !== 0" icon="el-icon-minus" size="medium" style="padding: 10px 12px;margin-left:10px;background-color:#f5f7fa" @click="deleteIncreSettings(index)"/>
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
  name: 'KafkaNode',
  props: {
    dialogKvisible: {
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
        topicPat: 'my-topic',
        serverIp: 'localhost:9092',
        retryTime: 0,
        batchSize: 16384,
        bufferTime: 0,
        bufferMaxsize: 33554432,
        acknowNum: '',
        keySeria: 'org.apache.kafka.common.serialization.StringSerializer',
        valueSeria: 'org.apache.kafka.common.serialization.StringSerializer',
        desc: ''
      },
      allnum: [
        {
          label: 'all',
          value: 'all'
        }, {
          label: '-1',
          value: '-1'
        }, {
          label: '0',
          value: '0'
        }, {
          label: '1',
          value: '1'
        }
      ],
      Parameters: [
        { parameter: '', value: '' }
      ],
      rules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' }
        ],
        topicPat: [
          { required: true, message: 'Topic pattern is required', trigger: 'blur' }
        ],
        serverIp: [
          { required: true, message: 'Bootstrap servers is required', trigger: 'blur' }
        ],
        keySeria: [
          { required: true, message: 'Key serializer is required', trigger: 'blur' }
        ],
        valueSeria: [
          { required: true, message: 'Value serializer is required', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    surechange() {
      this.$emit('onUpdateKafkaData', this.ruleForm.name)
      this.$emit('onDialogKvisibleChange', false) // 关闭对话框
    },
    initDialog() {
      this.$emit('onDialogKvisibleChange', false) // 关闭对话框
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