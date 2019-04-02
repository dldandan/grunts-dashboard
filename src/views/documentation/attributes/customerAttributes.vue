<template>
  <el-dialog :visible.sync="dialogCavisible" :before-close="initDialog" title="添加规则节点" top="11vh" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" label-width="180px" class="demo-ruleForm" style="padding:20px;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Attributes mapping *" prop="">
        <el-checkbox label=" Latest telemetry" name="type" v-model="ruleForm.delivery"></el-checkbox><br>
      </el-form-item>
    </el-form>
    <el-form label-width="140px" style="height:160px;overflow-y:auto;">
      <div v-for="(param, index) in parameters" :key="index">
        <el-row>
          <el-col :span="11">
            <el-form-item v-if="ruleForm.delivery === false" label="Source attribute">
              <el-input v-model="param.parameter" placeholder="Source attribute"/>
            </el-form-item>
            <el-form-item v-else label="Source telemetry">
              <el-input v-model="param.parameter" placeholder="Source telemetry"/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="Target attribute" style="margin-left:15px;">
              <el-input v-model="param.value" placeholder="Target attribute"/>
            </el-form-item>
          </el-col>
          <el-button v-if="index === 0" icon="el-icon-plus" size="medium" style="padding: 10px 12px;margin-left:10px;background-color:#f5f7fa;" @click="IncrementSettings()"/>
            <el-button v-if="index !== 0" icon="el-icon-minus" size="medium" style="padding: 10px 12px;margin-left:10px;background-color:#f5f7fa" @click="deleteIncreSettings(index)"/>
        </el-row>
      </div> 
    </el-form>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" label-width="180px" class="demo-ruleForm" style="padding:20px;">
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
  name: 'CustomerAttributes',
  props: {
    dialogCavisible: {
      type: Boolean,
      default: function() {
        return
      }
    } // 控制对话框是否显示
  },
  // watch: {
  // },
  data() {
    return {
      ruleForm: {
        name: '',
        delivery: false,
        type: '',
        typecontain: '',
        associatype: '',
        desc: ''
      },
      parameters: [
        { parameter: 'deviceType', value: 'default' },
        { parameter: '', value: '' }
      ],
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
      this.$emit('onUpdateCustomerData', this.ruleForm.name)
      this.$emit('onDialogCAvisibleChange', false)
    },
    initDialog() {
      this.$emit('onDialogCAvisibleChange', false) // 关闭对话框
      this.$refs['ruleForm'].resetFields() // 清空form内容
    },
    IncrementSettings() {
      var newParam = { parameter: '', value: '' }
      this.parameters.push(newParam)
    },
    deleteIncreSettings(index) {
      this.parameters.splice(index, 1)
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