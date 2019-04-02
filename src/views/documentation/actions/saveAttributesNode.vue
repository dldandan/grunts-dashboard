<template>
  <el-dialog :visible.sync="dialogSavisible" :before-close="initDialog" title="添加规则节点" top="11vh">
    <el-form :model="ruleForm" :rules="rules" label-position="top" ref="ruleForm" label-width="120px" style="padding:30px;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="设备属性范围" prop="attrange">
        <el-select v-model="ruleForm.attrange" placeholder="请选择" style="width:100%;">
            <el-option
            v-for="item in options"
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
  name: 'SaveAttributesNode',
  props: {
    dialogSavisible: {
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
        attrange: '',
        desc: ''
      },
      options: [
        {
          value: '客户端属性',
          label: '客户端属性'
        }, {
          value: '服务端属性',
          label: '服务端属性'
        }, {
          value: '共享属性',
          label: '共享属性'
        }
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
      this.$emit('onUpdateSaveAttributesData', this.ruleForm.name)
      this.$emit('onDialogSAvisibleChange', false) // 关闭对话框
    },
    initDialog() {
      this.$emit('onDialogSAvisibleChange', false) // 关闭对话框
      this.$refs['ruleForm'].resetFields() // 清空form内容
    }
  }
}
</script>
<style>
</style>