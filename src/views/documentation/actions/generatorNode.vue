<template>
  <el-dialog :visible.sync="dialogGnvisible" :before-close="initDialog" title="添加规则节点" top="11vh" >
    <el-form :model="ruleForm" :rules="rules" label-position="top" ref="ruleForm" label-width="180px" style="padding:20px;height:450px;overflow:auto;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Message count (0 - unlimited)" prop="messCount">
        <el-input-number v-model="ruleForm.messCount" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="Period in seconds" prop="period">
        <el-input-number v-model="ruleForm.period" controls-position="right" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="Originator" prop="">
        <el-select v-model="ruleForm.type" placeholder="类型">
          <el-option v-for="item in allOritypes" :key="item.value" :value="item.value"/>
        </el-select>
        <el-select v-model="ruleForm.typecontain" placeholder="请选择">
          <el-option v-for="con in alltypecontain" :key="con.value" :value="con.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="Generate" prop="">
        　<span>function Generate(prevMsg, prevMetadata, prevMsgType) { </span><br>
          <div class="codeditor">
            <codemirror ref="myCm" v-model="item.content" :options="cmOptions" class="code"></codemirror>
          </div>
          <span>}</span><br>
          <el-button type="primary" @click="innerVisible = true">TEST GENERATOR FUNCTION</el-button>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
    </el-form>
    <!-- 内层对话框 -->
    <el-dialog
      title="测试脚本功能"
      :visible.sync="innerVisible"
      append-to-body fullscreen>
      <el-row>
        <el-col :span="12">
          <el-card style="height:300px;">
            <div class="blue-vertical-bar">消息&nbsp;&nbsp;</div>
            <div style="float:right;margin-top:-20px;color:#00acc1;padding:4px;background:rgba(220, 220, 220, 0.35);border-radius: 5px;">消息</div>
            <!-- <hr class="black-line">-->
            <el-form :model="messageForm" :rules="messrules" ref="messageForm" label-width="120px" style="padding:5px;">
              <el-form-item label="消息类型" prop="messtype">
                <el-select v-model="messageForm.messtype" placeholder="请选择消息类型">
                    <el-option
                    v-for="item in alltypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="消息" prop="mess">
                <div class="codeditorJson">
                  <codemirror ref="myCm" v-model="item.contentjson" :options="cmOptionsJson" class="codeJson"></codemirror>
                </div>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card style="height:300px;margin-left:15px;">
            <div class="blue-vertical-bar">元数据&nbsp;&nbsp;</div>
            <div style="float:right;margin-top:-20px;color:#00acc1;padding:4px;background:rgba(220, 220, 220, 0.35);border-radius: 5px;">元数据</div>
            <el-form label-width="100px" style="padding:5px;height:180px;overflow-y:auto;">
              <div v-for="(param, index) in parameters" :key="index">
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="键名:" class="form-label">
                      <el-input v-model="param.parameter" placeholder="键名" class="form-rectangle"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="值:">
                      <el-input v-model="param.value" placeholder="值" class="form-rectangle"/>
                    </el-form-item>
                  </el-col>
                  <el-button v-if="index === 0" icon="el-icon-plus" size="medium" style="padding: 10px 12px;margin-left:10px;background-color:#f5f7fa" @click="IncrementSettings()"/>
                  <el-button v-if="index !== 0" icon="el-icon-minus" size="medium" style="padding: 10px 12px;margin-left:10px;background-color:#f5f7fa" @click="deleteIncreSettings(index)"/>
                </el-row>
              </div>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="margin-top:15px;">
        <el-col :span="12">
          <el-card style="height:400px;">
            <div style="float:right;color:#00acc1;padding:4px;background:rgba(220, 220, 220, 0.35);border-radius: 5px;">GENERATOR</div>
            <el-form label-width="110px" style="padding:20px;">
              <el-form-item label="" prop="">
                <span style="margin-left:-25px;">function Generate(prevMsg, prevMetadata, prevMsgType) { </span><br>
                <div class="codeditor" style="width:80%;">
                  <codemirror ref="myCm" v-model="item.content" :options="cmOptions" class="code"></codemirror>
                </div>
                <span style="margin-left:-25px;">}</span><br>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card style="height:400px;margin-left:15px;">
            <div class="blue-vertical-bar">输出&nbsp;&nbsp;</div>
            <div style="float:right;margin-top:-20px;color:#00acc1;padding:4px;background:rgba(220, 220, 220, 0.35);border-radius: 5px;">输出</div>
            <div class="codeditor" style="width:80%;margin-left:50px;margin-top:35px;">
              <codemirror ref="myCm" v-model="item.contentlog" :options="cmOptionslog" class="code"></codemirror>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save()">保存</el-button>
        <el-button @click="innerVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
    <el-button @click="initDialog">取消</el-button>
    <el-button type="primary" @click="surechange()">添加</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { codemirror } from 'vue-codemirror'
export default {
  name: 'GeneratorNode',
  components: {
    codemirror
  },
  props: {
    dialogGnvisible: {
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
        messCount: 0,
        period: 1,
        type: '',
        typecontain: '',
        desc: ''
      },
      allOritypes: [
        {
          value: '设备',
          contains: [
            {
              label: 'device1',
              value: 'device1'
            }, {
              label: 'device2',
              value: 'device2'
            }
          ]
        }, {
          value: '资产',
          contains: [
            {
              label: '1元',
              value: '1元'
            }, {
              label: '2元',
              value: '2元'
            }
          ]
        }, {
          value: '租户',
          contains: []
        }, {
          value: '客户',
          contains: []
        }, {
          value: 'Entity View',
          contains: []
        }, {
          value: '仪表盘',
          contains: []
        }
      ],
      messageForm: {
        messtype: ''
      },
      parameters: [
        { parameter: 'deviceType', value: 'default' },
        { parameter: 'deviceName', value: 'lalala' }
      ],
      alltypes: [{
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
      innerVisible: false,
      item: {
        content: 'var msg = { temp: 42, humidity: 77 };var metadata = { data: 40 };var msgType = "POST_TELEMETRY_REQUEST";return { msg: msg, metadata: metadata, msgType: msgType };',
        contentjson: '{"temperature": 22.4, "humidity": 78}',
        contentlog: ''
      },
      // myCm: '',
      cmOptions: {
        value: '',
        mode: 'text/html', // application/json
        them: 'foo bar',
        indentUnit: 2,
        smartIndent: true,
        tabSize: 4,
        readOnly: false,
        showCursorWhenSelecting: true,
        // lineWrapping: true,
        lineNumbers: true,
        firstLineNumber: 1,
        cursorHeight: 1,
        hintOptions: {
          // 代码提示功能  根据Mode设置
        }
      },
      cmOptionsJson: {
        value: '',
        mode: 'application/json',
        them: 'foo bar',
        indentUnit: 2,
        smartIndent: true,
        tabSize: 4,
        readOnly: false,
        showCursorWhenSelecting: true,
        lineNumbers: true,
        firstLineNumber: 1,
        cursorHeight: 1
      },
      cmOptionslog: {
        value: '',
        mode: '',
        them: 'foo bar',
        indentUnit: 2,
        smartIndent: true,
        tabSize: 4,
        readOnly: true,
        // showCursorWhenSelecting: true,
        cursorBlinkRate: 0,
        lineNumbers: true,
        firstLineNumber: 1,
        cursorHeight: 1
      },
      rules: {
        name: [
          { required: true, message: '名称必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        messCount: [
          { required: true, message: 'Message count is required.', trigger: 'blur' }
        ],
        period: [
          { required: true, message: 'Period is required.', trigger: 'blur' }
        ]
      },
      messrules: {
        messtype: [
          { required: true, message: '消息类型必选', trigger: 'change' }
        ],
        mess: [
          { required: true }
        ]
      }
    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    },
    alltypecontain() {
      for (var i = 0; i < this.allOritypes.length; i++) {
        if (this.allOritypes[i].value === this.ruleForm.type) {
          return this.allOritypes[i].contains
        }
      }
    }
  },
  mounted() {
  },
  methods: {
    surechange() {
      this.$emit('onUpdateGeneratorData', this.ruleForm.name)
      this.$emit('onDialogGNvisibleChange', false) // 关闭对话框
    },
    initDialog() {
      this.$emit('onDialogGNvisibleChange', false) // 关闭对话框
      this.$refs['ruleForm'].resetFields() // 清空form内容
    },
    IncrementSettings() {
      var newParam = { parameter: '', value: '' }
      this.parameters.push(newParam)
    },
    deleteIncreSettings(index) {
      this.parameters.splice(index, 1)
    },
    save() {
    // 保存之后第一个dialog会显示出来对应的content
    }
  }
}
</script>
<style>
 .codeditor{
    width: 70%;
    /* display: inline-block; */
    box-shadow: 0px 2px 8px #8888;
    -webkit-box-shadow: 0px 2px 8px #8888;
 }
 .codeditor .code {
    /* width: 60%; */
    height:240px;
    text-align: left;
    border: 1px solid #8888
 }
 .codeditorJson {
    width: 80%;
    /* display: inline-block; */
    box-shadow: 0px 2px 8px #8888;
    -webkit-box-shadow: 0px 2px 8px #8888; 
 }
 .codeditorJson .codeJson {
   height:160px;
   text-align: left;
   border: 1px solid #8888
 }
 .codeditor .CodeMirror {
    height: 235px !important;
 }
 .codeditor .CodeMirror-scroll {
    height: 235px !important;
 }
 .codeditorJson .CodeMirror {
    height: 155px !important;
 }
 .codeditorJson .CodeMirror-scroll {
    height: 155px !important;
 }
 .CodeMirror-line {
   height: 24px;
  }
 .CodeMirror-line span {
    color: #505050;
    font-family: '微软雅黑';
 }
 /* 蓝色竖条 */
.blue-vertical-bar { 
  padding-left: 10px;
  border-left:3px solid #66b1ff;
  margin-bottom: 20px;
}

/* 分割线 */
.black-line {
  height:3px;
  border: none;
  border-top:1px solid #d9dee4;
}
</style>