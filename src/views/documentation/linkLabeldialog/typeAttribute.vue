<template>
  <el-dialog :visible.sync="dialogLabelavisible" :before-close="initDialog" title="添加链接" top="17vh" >
    <el-form :model="ruleForm" :rules="rules" label-position="top" ref="ruleForm" label-width="120px" style="padding:30px;">
      <el-form-item label="Link labels" prop="messagetype">
        <el-select v-model="ruleForm.type" multiple placeholder="链接标签" style="width:100%">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
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
  name: 'TypeAttributeLabel',
  props: {
    dialogLabelavisible: {
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
        type: []
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
      }, {
        value: 'Alarm Acknowledged',
        label: 'Alarm Acknowledged'
      }, {
        value: 'Alarm Cleared',
        label: 'Alarm Cleared'
      }, {
        value: 'Other',
        label: 'Other'
      }, {
        value: 'Failure',
        label: 'Failure'
      }],
      rules: {
        messagetype: [
          { required: true, message: '请选择', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    surechange() {
      this.$emit('onUpdateMessageTypeFilData', this.ruleForm.type)
      this.$emit('onDialoglabelavisibleChange', false) // 关闭对话框
    },
    initDialog() {
      this.$emit('onDialoglabelavisibleChange', false) // 关闭对话框
      this.$refs['ruleForm'].resetFields() // 清空form内容
    }
  }
}
</script>
<style>
</style>