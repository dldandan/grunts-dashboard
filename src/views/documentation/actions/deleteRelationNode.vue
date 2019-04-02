<template>
  <el-dialog :visible.sync="dialogDrvisible" :before-close="initDialog" title="添加规则节点" top="10vh">
    <el-form :model="ruleForm" :rules="rules" label-position="top" ref="ruleForm" label-width="120px" style="padding:20px;height:450px;overflow-y:auto;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="" prop="">
        <el-checkbox label=" Delete relation to specific entity" name="type" v-model="ruleForm.delRelation"></el-checkbox><br>
        <span style="font-size:12px;">Deletes relation from the originator of the incoming message to the specified entity or list of entities based on direction and type.</span>
      </el-form-item>
      <el-form-item label="方向" prop="direction">
        <el-select v-model="ruleForm.direction" placeholder="请选择" style="width:100%;">
          <el-option label="从" value="start"></el-option>
          <el-option label="到" value="end"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="type" v-if="ruleForm.delRelation === true">
        <el-select v-model="ruleForm.type" placeholder="请选择类型">
          <el-option v-for="item in alltypes" :key="item.value" :value="item.value" :label="item.label"/>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="" v-if="ruleForm.delRelation === true">
        <el-row>
          <el-col :span="11">
            <span>Name pattern *</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-input v-model="ruleForm.patternName"></el-input>
            <span style="font-size:12px;">Name pattern, use ${metaKeyName} to substitute variables from metadata</span>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="Relation type pattern" prop="relationType">
        <el-input v-model="ruleForm.relationType"></el-input>
        <span style="font-size:12px;">Relation type pattern, use ${metaKeyName} to substitute variables from metadata</span>
      </el-form-item>
      <el-form-item label="Entities cache expiration time (sec)" prop="entitycetime">
        <el-input-number v-model="ruleForm.entitycetime" controls-position="right" :min="0"></el-input-number><br>
        <span style="font-size:12px;">Specifies maximum time interval allowed to store found entity records. 0 value means that records will never expire.</span>
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
  name: 'DeleteRelationNode',
  props: {
    dialogDrvisible: {
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
        delRelation: false,
        direction: '',
        type: '',
        patternName: '',
        relationType: 'Contains',
        entitycetime: 300,
        desc: ''
      },
      alltypes: [
        {
          label: '设备',
          value: '设备'
        }, {
          label: '资产',
          value: '资产'
        }, {
          label: 'Entity View',
          value: 'Entity View'
        }, {
          label: '租户',
          value: '租户'
        }, {
          label: '客户',
          value: '客户'
        }, {
          label: '仪表板',
          value: '仪表板'
        }
      ],
      rules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' }
        ],
        direction: [
          { required: true, message: '请选择方向', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        relationType: [
          { required: true, message: 'Relation type pattern is required.', trigger: 'blur' }
        ],
        entitycetime: [
          { required: true, message: 'Entities cache expiration time is required.', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    surechange() {
      this.$emit('onUpdateDeleteRelationData', this.ruleForm.name)
      this.$emit('onDialogDRvisibleChange', false) // 关闭对话框
    },
    initDialog() {
      this.$emit('onDialogDRvisibleChange', false) // 关闭对话框
      this.$refs['ruleForm'].resetFields() // 清空form内容
    }
  }
}
</script>
<style>
</style>