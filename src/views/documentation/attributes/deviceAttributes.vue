<template>
  <el-dialog :visible.sync="dialogDavisible" :before-close="initDialog" title="添加规则节点" top="11vh" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top" class="demo-ruleForm" style="padding:20px;height:450px;overflow-y:auto;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Device relations query" prop="query">
        <div style="display:flex">
            <div>
            <span>方向 *&nbsp;</span><br>
            <el-select v-model="ruleForm.direction" placeholder="请选择" style="width:105px;">
                <el-option label="从" value="start"></el-option>
                <el-option label="到" value="end"></el-option>
            </el-select>
            </div>
            <div style="margin-left:15px;">
            <span>Max relation level</span><br>
              <el-input-number v-model="ruleForm.level" controls-position="right" :min="1"></el-input-number>
            </div>
        </div>
      </el-form-item>
      <el-form-item label="关联类型" prop="associatype">
        <el-autocomplete
            class="inline-input" style="width:100%"
            v-model="ruleForm.associatype"
            :fetch-suggestions="querySearch"
            placeholder="任意类型"
            @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="设备类型" prop="devicetype">
        <el-select
            v-model="ruleForm.devicetype"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请输入设备类型"
            style="width:100%">
                <el-option
                v-for="item in deviceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
        </el-select>
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
  name: 'DeviceAttributes',
  props: {
    dialogDavisible: {
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
        direction: '从',
        level: '1',
        associatype: '',
        devicetype: [],
        Clientattributes: [],
        Sharedattributes: [],
        Serverattributes: [],
        Latesttimeseries: [],
        desc: ''
      },
      restaurants: [
        {
          value: 'Contains'
        }, {
          value: 'Manages'
        }
      ],
      deviceOptions: [
        {
          value: 'default',
          label: 'default'
        }
      ],
      ClientOptions: [],
      SharedOptions: [],
      ServerdOptions: [],
      LatestOptions: [],
      rules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        associatype: [
          { required: true, message: '请输入关联类型', trigger: 'change' }
        ],
        devicetype: [
          { required: true, message: '请输入设备类型', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    surechange() {
      this.$emit('onUpdateDeviceData', this.ruleForm.name)
      this.$emit('onDialogDAvisibleChange', false)
    },
    initDialog() {
      this.$emit('onDialogDAvisibleChange', false) // 关闭对话框
      this.$refs['ruleForm'].resetFields() // 清空form内容
    },
    handleSelect(item) {
      console.log(item)
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
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