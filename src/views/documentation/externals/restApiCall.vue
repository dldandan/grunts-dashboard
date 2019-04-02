<template>
  <el-dialog :visible.sync="dialogRacvisible" :before-close="initDialog" title="添加规则节点" top="10vh">
    <el-form :model="ruleForm" :rules="rules" label-position="top" ref="ruleForm" label-width="120px" style="padding:30px;height:450px;overflow-y:auto;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Endpoint URL pattern" prop="endpointUrl">
        <el-input v-model="ruleForm.endpointUrl"></el-input>
        <span style="font-size:12px;">HTTP URL address pattern, use ${metaKeyName} to substitute variables from metadata</span>
      </el-form-item>
      <el-form-item label="Request method" prop="">
        <el-select v-model="ruleForm.requestMethod" placeholder="请选择" style="width:100%;">
            <el-option
            v-for="item in allmethods"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="">
        <el-checkbox label=" Use simple client HTTP factory" name="type" v-model="ruleForm.uschf"></el-checkbox>
      </el-form-item>
      <el-form-item label="Headers" prop="">
        <span style="font-size:12px;">Use ${metaKeyName} in header/value fields to substitute variables from metadata</span>
        <el-row>
          <el-col :span="11">
            <span style="color:#606266;">Header</span>
          </el-col>
          <el-col :span="11">
            <span style="color:#606266;">Value</span>
          </el-col>
        </el-row>
        <div v-for="(param, index) in Parameters" :key="index" style="margin-bottom:10px;">
        <el-row>
          <el-col :span="10">
            <el-input v-model="param.parameter" placeholder="Header"></el-input>
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
  name: 'RESTAPICallNode',
  props: {
    dialogRacvisible: {
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
        endpointUrl: 'http://localhost/api',
        requestMethod: 'POST',
        uschf: false,
        desc: ''
      },
      Parameters: [
        { parameter: '', value: '' }
      ],
      allmethods: [
        {
          label: 'GET',
          value: 'GET'
        }, {
          label: 'POST',
          value: 'POST'
        }, {
          label: 'PUT',
          value: 'PUT'
        }, {
          label: 'DELETE',
          value: 'DELETE'
        }
      ],
      rules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' }
        ],
        endpointUrl: [
          { required: true, message: 'Endpoint URL pattern is required', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    surechange() {
      this.$emit('onUpdateRestApiCallData', this.ruleForm.name)
      this.$emit('onDialogRACvisibleChange', false) // 关闭对话框
    },
    initDialog() {
      this.$emit('onDialogRACvisibleChange', false) // 关闭对话框
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