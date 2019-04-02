<template>
  <el-dialog :visible.sync="dialogOavisible" :before-close="initDialog" title="添加规则节点" top="11vh" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top" class="demo-ruleForm" style="padding:20px;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Client attributes" prop="Clientattributes">
        <el-select
            v-model="ruleForm.Clientattributes"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Client attributes"
            style="width:100%">
                <el-option
                v-for="item in ClientOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Shared attributes" prop="Sharedattributes">
        <el-select
            v-model="ruleForm.Sharedattributes"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Shared attributes"
            style="width:100%">
                <el-option
                v-for="item in SharedOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Server attributes" prop="Serverattributes">
        <el-select
            v-model="ruleForm.Serverattributes"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Server attributes"
            style="width:100%">
                <el-option
                v-for="item in ServerdOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Latest timeseries" prop="Latesttimeseries">
        <el-select
            v-model="ruleForm.Latesttimeseries"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Latest timeseries"
            style="width:100%">
                <el-option
                v-for="item in LatestOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
        </el-select>
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
  name: 'OriginatorAttributes',
  props: {
    dialogOavisible: {
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
        Clientattributes: [],
        Sharedattributes: [],
        Serverattributes: [],
        Latesttimeseries: [],
        desc: ''
      },
      ClientOptions: [],
      SharedOptions: [],
      ServerdOptions: [],
      LatestOptions: [],
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
      this.$emit('onUpdateOriginatorData', this.ruleForm.name)
      this.$emit('onDialogOAvisibleChange', false)
    },
    initDialog() {
      this.$emit('onDialogOAvisibleChange', false) // 关闭对话框
      this.$refs['ruleForm'].resetFields() // 清空form内容
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