<template>
  <el-dialog :visible.sync="dialogRmvisible" :before-close="initDialog" title="添加规则节点" top="10vh">
    <el-form :model="ruleForm" :rules="rules" label-position="top" ref="ruleForm" label-width="120px" style="padding:30px;height:450px;overflow-y:auto;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Exchange name pattern" prop="">
        <el-input v-model="ruleForm.exchangeName"></el-input>
      </el-form-item>
      <el-form-item label="Routing key pattern" prop="">
        <el-input v-model="ruleForm.routeKey"></el-input>
      </el-form-item>
      <el-form-item label="Message properties" prop="">
        <el-select v-model="ruleForm.messPropert" placeholder="请选择" style="width:100%;">
            <el-option
            v-for="item in allmesspropert"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="">
        <el-row>
          <el-col :span="11">
            <span>Host *</span>
          </el-col>
          <el-col :span="11">
            <span style="margin-left:10px;">Port *</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-input v-model="ruleForm.host"></el-input>
          </el-col>
          <el-col :span="11">
            <el-input-number v-model="ruleForm.port" controls-position="right" :min="0" :max="65535" style="width:100%;margin-left:10px;"></el-input-number>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="Virtual host" prop="">
        <el-input v-model="ruleForm.virtualHost"></el-input>
      </el-form-item>
      <el-form-item label="Username" prop="">
        <el-input name="username" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="">
        <el-input name="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="" prop="">
        <el-checkbox label=" Automatic recovery" name="type" v-model="ruleForm.autoRecovery"></el-checkbox>
      </el-form-item>
      <el-form-item label="Connection timeout (ms)" prop="">
        <el-input-number v-model="ruleForm.ConnectTimeout" controls-position="right" :min="0" style="width:90%;"></el-input-number>
      </el-form-item>
      <el-form-item label="Handshake timeout (ms)" prop="">
        <el-input-number v-model="ruleForm.HandshakeTimemout" controls-position="right" :min="0" style="width:90%;"></el-input-number>
      </el-form-item>
      <el-form-item label="Client properties" prop="">
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
  name: 'RabbitMQNode',
  props: {
    dialogRmvisible: {
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
        exchangeName: '',
        routeKey: '',
        messPropert: '',
        host: 'localhost',
        port: '5672',
        virtualHost: '/',
        username: '',
        password: '',
        autoRecovery: false,
        ConnectTimeout: 60000,
        HandshakeTimemout: 10000,
        desc: ''
      },
      allmesspropert: [
        {
          label: 'BASIC',
          value: 'BASIC'
        }, {
          label: 'TEXT_PLAIN',
          value: 'TEXT_PLAIN'
        }, {
          label: 'MINIMAL_BASIC',
          value: 'MINIMAL_BASIC'
        }, {
          label: 'MINIMAL_PERSISTENT_BASIC',
          value: 'MINIMAL_PERSISTENT_BASIC'
        }, {
          label: 'PERSISTENT_BASIC',
          value: 'PERSISTENT_BASIC'
        }, {
          label: 'PERSISTENT_TEXT_PLAIN',
          value: 'PERSISTENT_TEXT_PLAIN'
        }
      ],
      Parameters: [
        { parameter: '', value: '' }
      ],
      rules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    surechange() {
      this.$emit('onUpdateRabbitMQData', this.ruleForm.name)
      this.$emit('onDialogRMvisibleChange', false) // 关闭对话框
    },
    initDialog() {
      this.$emit('onDialogRMvisibleChange', false) // 关闭对话框
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