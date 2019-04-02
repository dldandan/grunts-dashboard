<template>
  <el-dialog :visible.sync="dialogOtvisible" :before-close="initDialog" title="添加规则节点" top="11vh" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top" class="demo-ruleForm" style="padding:20px;height:450px;overflow-y:auto;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Latest timeseries" prop="timeseries">
        <el-input v-model="ruleForm.latesttime" placeholder="Latest timeseries"></el-input>
      </el-form-item>
      <el-form-item label="Fetch mode" prop="fetchmode">
        <el-select v-model="ruleForm.fetchmode" placeholder="请选择" style="width:100%;">
            <el-option
            v-for="item in allmode"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="">
        <el-checkbox label=" Use metadata interval patterns" name="type" v-model="ruleForm.delivery"></el-checkbox><br>
        <span style="font-size:12px;">If selected, rule node use start and end interval patterns from message metadata assuming that intervals are in the milliseconds</span>
      </el-form-item>
      <el-form-item label="" prop="" v-if="ruleForm.delivery === false">
        <el-row>
          <el-col :span="12">
            <span>Start Interval *</span>
          </el-col>
          <el-col :span="12">
            <span>Start Interval Time Unit *</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-input-number v-model="ruleForm.startlevel" controls-position="right" :min="1" style="width:90%"></el-input-number>
          </el-col>
          <el-col :span="12">
            <el-select v-model="ruleForm.startUnit" placeholder="请选择" style="width:90%">
                <el-option
                v-for="item in allUnit"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="" prop="" v-if="ruleForm.delivery === false">
        <el-row>
          <el-col :span="12">
            <span>End Interval *</span>
          </el-col>
          <el-col :span="12">
            <span>End Interval Time Unit *</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-input-number v-model="ruleForm.endlevel" controls-position="right" :min="1" style="width:90%"></el-input-number>
          </el-col>
          <el-col :span="12">
            <el-select v-model="ruleForm.endUnit" placeholder="请选择" style="width:90%">
                <el-option
                v-for="item in allUnit"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="Start interval pattern" prop="startpattern" v-if="ruleForm.delivery === true">
        <el-input v-model="ruleForm.startpattern"></el-input><br>
        <span style="font-size:12px;">Start interval pattern, use ${metaKeyName} to substitute variables from metadata</span>
      </el-form-item>
      <el-form-item label="End interval pattern" prop="endpattern" v-if="ruleForm.delivery === true">
        <el-input v-model="ruleForm.endpattern"></el-input><br>
        <span style="font-size:12px;">End interval pattern, use ${metaKeyName} to substitute variables from metadata</span>
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
  name: 'OriginatorTelemetry',
  props: {
    dialogOtvisible: {
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
        latesttime: '',
        fetchmode: '',
        delivery: false,
        startlevel: 1,
        startUnit: '',
        endlevel: 1,
        endUnit: '',
        startpattern: '',
        endpattern: '',
        desc: ''
      },
      allmode: [
        {
          label: 'FIRST',
          value: 'FIRST'
        }, {
          label: 'LAST',
          value: 'LAST'
        }, {
          label: 'ALL',
          value: 'ALL'
        }
      ],
      allUnit: [
        {
          label: 'Milliseconds',
          value: 'Milliseconds'
        }, {
          label: 'Seconds',
          value: 'Seconds'
        }, {
          label: 'Minutes',
          value: 'Minutes'
        }, {
          label: 'Hours',
          value: 'Hours'
        }, {
          label: 'Days',
          value: 'Days'
        }
      ],
      rules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        fetchmode: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        startpattern: [
          { required: true, message: 'Start interval pattern is required', trigger: 'blur' }
        ],
        endpattern: [
          { required: true, message: 'End interval pattern is required', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    surechange() {
      this.$emit('onUpdateTelemetryData', this.ruleForm.name)
      this.$emit('onDialogOTvisibleChange', false)
    },
    initDialog() {
      this.$emit('onDialogOTvisibleChange', false) // 关闭对话框
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