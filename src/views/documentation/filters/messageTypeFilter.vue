<template>
  <el-dialog :visible.sync="dialogMfvisible" :before-close="initDialog" title="添加规则节点" top="11vh">
    <el-form :model="ruleForm" :rules="rules" label-position="top" ref="ruleForm" label-width="180px" style="padding:30px;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Message types filter" prop="messagetype">
        <el-select v-model="ruleForm.type" multiple placeholder="Message type" style="width:100%">
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
  name: 'MessageTypeFilterNode',
  props: {
    dialogMfvisible: {
      type: Boolean,
      default: function() {
        return
      }
    } // 控制对话框是否显
  },
  // watch: {
  // },
  data() {
    return {
      ruleForm: {
        name: '',
        type: [],
        desc: ''
      },
      options: [{
        value: 'Post attributes',
        label: 'Post attributes'
      }, {
        value: 'Post telemetry',
        label: 'Post telemetry'
      }, {
        value: 'RPC Request from Device',
        label: 'RPC Request from Device'
      }, {
        value: 'RPC Request to Device',
        label: 'RPC Request to Device'
      }, {
        value: 'Activity Event',
        label: 'Activity Event'
      }, {
        value: 'Inactivity Event',
        label: 'Inactivity Event'
      }, {
        value: 'Connect Event',
        label: 'Connect Event'
      }, {
        value: 'Disconnect Event',
        label: 'Disconnect Event'
      }, {
        value: 'Entity Created',
        label: 'Entity Created'
      }, {
        value: 'Entity Updated',
        label: 'Entity Updated'
      }, {
        value: 'Entity Deleted',
        label: 'Entity Deleted'
      }, {
        value: 'Entity Assigned',
        label: 'Entity Assigned'
      }, {
        value: 'Entity Unassigned',
        label: 'Entity Unassigned'
      }, {
        value: 'Attributes Updated',
        label: 'Attributes Updated'
      }, {
        value: 'Attributes Deleted',
        label: 'Attributes Deleted'
      }],
      rules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        messagetype: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    surechange() {
      this.$emit('onUpdateMessageTypeFilData', this.ruleForm.name)
      this.$emit('onDialogMfvisibleChange', false) // 关闭对话框
    },
    initDialog() {
      this.$emit('onDialogMfvisibleChange', false) // 关闭对话框
      this.$refs['ruleForm'].resetFields() // 清空form内容
    }
  }
}
</script>
<style>
</style>