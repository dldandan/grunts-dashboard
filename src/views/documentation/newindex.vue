<template>
  <div class="app-container">
      <el-container style="height: calc(88vh - 35px);border: 1px solid #bbbdc1">
        <el-aside width="267px">
          <el-menu :default-openeds="['1', '2', '3', '4', '5']" background-color="#e0e3e8">
            <el-submenu index="1" style="border-bottom: 1px solid #c5c9d2">
              <template slot="title">
                <i class="el-icon-location" style="color:#333"></i>滤波器
              </template>
              <el-menu-item-group id="myPaletteDiv1" style="background-color:#fff;height:400px;">
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2" style="border-bottom: 1px solid #c5c9d2">
              <template slot="title">
                <i class="el-icon-tickets" style="color:#333"></i>属性集
              </template>
              <el-menu-item-group id="myPaletteDiv2" style="background-color:#fff;height: 420px;">
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3" style="border-bottom: 1px solid #c5c9d2">
              <template slot="title">
                <i class="el-icon-edit" style="color:#333"></i>变换
              </template>
              <el-menu-item-group id="myPaletteDiv3" style="background-color:#fff;height:220px;">
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4" style="border-bottom: 1px solid #c5c9d2">
              <template slot="title">
                <i class="el-icon-rank" style="color:#333"></i>动作
              </template>
              <el-menu-item-group id="myPaletteDiv4" style="background-color:#fff;height:737px;">
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5" style="border-bottom: 1px solid #c5c9d2">
              <template slot="title">
                <i class="el-icon-goods" style="color:#333"></i>外部的
              </template>
              <el-menu-item-group id="myPaletteDiv5" style="background-color:#fff;height: 455px;">
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main style="position:relative;">
          <div id="myDiagramDiv" style="width:100%;height: calc(77vh - 35px);">
              
          </div>
          <div id="contextMenu">
            <ul>
              <li><a href="#" target="_self">详情/编辑</a></li>
              <li id="delete" @click="cxcommand($event)"><a href="#" target="_self">删除</a></li>
              <li id="copy" @click="cxcommand($event)"><a href="#" target="_self">复制</a></li>
              <li id="paste" @click="cxcommand($event)"><a href="#" target="_self">粘贴</a></li>
            </ul>
          </div>
          <div style="width:260px;height:60px;float:right;margin-right:10px;">
            <el-tooltip content="删除选定的节点或链接" effect="dark" placement="top">
              <el-button v-show="deleteSelectedNode" style="width:53px;height:53px;" type="danger" icon="el-icon-delete" circle @click="deletenode()"></el-button>
            </el-tooltip>
            <el-tooltip content="保存" effect="dark" placement="top">
              <el-button style="width:53px;height:53px;" type="danger" icon="el-icon-check" circle @click="save()"></el-button>
            </el-tooltip>
            <el-tooltip content="撤销更改" effect="dark" placement="top">
              <el-button style="width:53px;height:53px;" type="danger" icon="el-icon-close" circle @click="backout()"></el-button>
            </el-tooltip>
            <el-tooltip content="重新加载" effect="dark" placement="top">
              <el-button style="width:53px;height:53px;" type="success" icon="el-icon-refresh" circle @click="refresload()"></el-button>
            </el-tooltip>
          </div>
        </el-main>
      </el-container>
      <!--滤波器　1 Check Relation Filter Node的弹出框-->
      <check-relation-filter :dialog-visible="dialogCheckRelation" @onDialogVisibleChange="dialogCheckRelationChange" @onUpdateCheckRelationData="modifyCheckRelationData"/>
      <!--滤波器　2 Message Type Filter Node的弹出框-->
      <message-type-filter :dialog-mfvisible="dialogMessageFilter" @onDialogMfvisibleChange="dialogMessageFilterChange" @onUpdateMessageTypeFilData="modifyMessageTypeFilData"/>
      <!--滤波器　3 Message Type Switch Node-->
      <message-type-switch :dialog-msvisible="dialogMessageSwitch" @onDialogMSvisibleChange="dialogMessageSwitchChange" @onUpdateMessageTypeSwitData="modifyMessageTypeSwitData"/>
      <!--滤波器　4 Originator Type Filter Node-->
      <originator-type-filter :dialog-ofvisible="dialogOriginatorFilter" @onDialogOfvisibleChange="dialogOriginatorFilterChange" @onUpdateOriginatorFilterData="modifyOriginatorFilterData"></originator-type-filter>
  　　 <!--滤波器 ５ Originator Type Switch Node-->
  　　 <originator-type-switch :dialog-osvisible="dialogOriginatorSwitch" @onDialogOSvisibleChange="dialogOriginatorSwitchChange" @onUpdateOriginatorSwitchData="modifyOriginatorSwitchData"></originator-type-switch>
      <!--滤波器　6 Script Filter Node-->
      <script-filter-node :dialog-sfvisible="dialogScriptFilter" @onDialogSfvisibleChange="dialogScriptFilterChange" @onUpdateScriptFilterData="modifyScriptFilterData"></script-filter-node>
      <!--滤波器　7 Switch Node-->
      <switch-node :dialog-svisible="dialogSwitch" @onDialogSvisibleChange="dialogSwitchChange" @onUpdateSwitchData="modifySwitchData"></switch-node>
      <!--属性集　1 Customer attributes-->
      <customer-attributes :dialog-cavisible="dialogCustomerAttributes" @onDialogCAvisibleChange="dialogCustomerChange" @onUpdateCustomerData="modifyCustomerData"></customer-attributes>
      <!--属性集　2 Device attributes-->
      <device-attributes :dialog-davisible="dialogDeviceAttributes" @onDialogDAvisibleChange="dialogDeviceChange" @onUpdateDeviceData="modifyDeviceData"></device-attributes>
      <!--属性集　3 Originator attributes-->
      <originator-attributes :dialog-oavisible="dialogOriginatorAttributes" @onDialogOAvisibleChange="dialogOriginatorChange" @onUpdateOriginatorData="modifyOriginatorData"></originator-attributes>
      <!--属性集　4 Originator fields-->
      <originator-fields :dialog-ofivisible="dialogoriginatorFields" @onDialogOFIvisibleChange="dialogFieldsChange" @onUpdateFieldsData="modifyFieldsData"></originator-fields>
      <!--属性集　5 Related attributes-->
      <related-attributes :dialog-ravisible="dialogRelatedAttributes" @onDialogRAvisibleChange="dialogRelatedChange" @onUpdateRelatedData="modifyRelatedData"></related-attributes>
      <!--属性集　6 Tenant attributes-->
      <tenant-attributes :dialog-tavisible="dialogTenantAttributes" @onDialogTAvisibleChange="dialogTenantChange" @onUpdateTenantData="modifyTenantData"></tenant-attributes>
      <!--属性集　7 Originator telemetry-->
      <originator-telemetry :dialog-otvisible="dialogOriginatorTelemetry" @onDialogOTvisibleChange="dialogTelemetryChange" @onUpdateTelemetryData="modifyTelemetryData"></originator-telemetry>
      <!--变换　１ Change originator-->
      <change-originator :dialog-covisible="dialogChangeOriginator" @onDialogCOvisibleChange="dialogChangeChange" @onUpdateChangeData="modifyChangeData"></change-originator>
      <!--变换　2 Script Transformation Node-->
      <script-transformation :dialog-stvisible="dialogScriptTransformation" @onDialogSTvisibleChange="dialogTransformationChange" @onUpdateTransformationData="modifyTransformationData"></script-transformation>
      <!--变换　3 To Email Node的弹出框-->
      <toemail-node :dialog-tevisible="dialogToEmail" @onDialogTEvisibleChange="dialogToEmailChange" @onUpdateToEmailData="modifyToEmailData"></toemail-node>
      <!--链接标签 boolean-->
      <type-boolean :dialog-labelbvisible="dialogLabelBoolean" @onDialoglabelbvisibleChange="dialogTypeBooleanChange" @onUpdateTypeBooleanData="modifyTypeBooleanData"></type-boolean>
      <!--链接标签 attribute-->
      <type-attribute :dialog-labelavisible="dialogLabelAttribute" @onDialoglabelavisibleChange="dialogTypeAttributeChange"></type-attribute>
      <!--动作 1 Create Alarm Node-->
      <create-alarm-node :dialog-cranvisible="dialogCreateAlarm" @onDialogCANvisibleChange="dialogCreateAlarmChange" @onUpdateCreateAlarmData="modifyCreateAlarmData"></create-alarm-node>
      <!--动作 2 Clear Alarm Node-->
      <clear-alarm-node :dialog-clanvisible="dialogClearAlarm" @onDialogCLANvisibleChange="dialogClearAlarmChange" @onUpdateClearAlarmData="modifyClearAlarmData"></clear-alarm-node>
      <!--动作 3 Delay Node-->
      <delay-node :dialog-dnvisible="dialogDelay" @onDialogDNvisibleChange="dialogDelayChange" @onUpdateDelayData="modifyDelayData"></delay-node>
      <!--动作 4 Generator Node-->
      <generator-node :dialog-gnvisible="dialogGenerator" @onDialogGNvisibleChange="dialogGeneratorChange" @onUpdateGeneratorData="modifyGeneratorData"></generator-node>
      <!--动作 5 Log Node-->
      <log-node :dialog-lnvisible="dialogLog" @onDialogLNvisibleChange="dialogLogChange" @onUpdateLogData="modifyLogData"></log-node>
      <!--动作 6 RPC Call Reply Node-->
      <rpc-call-reply :dialog-repvisible="dialogRPCCallReply" @onDialogRepvisibleChange="dialogRpcReplyChange" @onUpdateRPCReplyData="modifyRPCReplyData"></rpc-call-reply>
      <!--动作 7 RPC Call Request Node-->
      <rpc-call-request :dialog-reqvisible="dialogRPCCallRequest" @onDialogReqvisibleChange="dialogRpcRequestChange" @onUpdateRPCRequestData="modifyRPCRequestData"></rpc-call-request>
      <!--动作 8 Save Attributes Node-->
      <save-attributes :dialog-savisible="dialogSaveAttributes" @onDialogSAvisibleChange="dialogSaveAttributesChange" @onUpdateSaveAttributesData="modifySaveAttributesData"></save-attributes>
      <!--动作 9 Save Timeseries Node-->
      <save-timeseries :dialog-stnvisible="dialogSaveTimeseries" @onDialogSTNvisibleChange="dialogSaveTimeseriesChange" @onUpdateSaveTimeseriesData="modifySaveTimeseriesData"></save-timeseries>
      <!--动作 10 Assign To Customer Node-->
      <assign-to-customer :dialog-atcvisible="dialogAssignToCustomer" @onDialogATCvisibleChange="dialogAssignToChange" @onUpdateAssignToCustomData="modifyAssignToCustomData"></assign-to-customer>
      <!--动作 11 Unassign From Customer Node-->
      <unassign-from-customer :dialog-ufcvisible="dialogUnassginFromCustomer" @onDialogUFCvisibleChange="dialogUnassignChange" @onUpdateUnassginFromData="modifyUnassginFromData"></unassign-from-customer>
      <!--动作 12 Create Relation Node-->
      <create-relation :dialog-crvisible="dialogCreateRelation" @onDialogCRvisibleChange="dialogCreateRelationChange" @onUpdateCreateRelationData="modifyCreateRelationData"></create-relation>
      <!--动作 13 Delete Relation Node-->
      <delete-relation :dialog-drvisible="dialogDeleteRelation" @onDialogDRvisibleChange="dialogDeleteRelationChange" @onUpdateDeleteRelationData="modifyDeleteRelationData"></delete-relation>
      <!--外部的 1 AWS SNS Node-->
      <awssns-node :dialog-snsvisible="dialogAwsSNS" @onDialogSNSvisibleChange="dialogAwsSNSChange" @onUpdateAWSSNSData="modifyAWSSNSData"></awssns-node>
      <!--外部的 2 AWS SQS Node-->
      <awssqs-node :dialog-sqsvisible="dialogAwsSQS" @onDialogSQSvisibleChange="dialogAwsSQSChange" @onUpdateAWSSQSData="modifyAWSSQSData"></awssqs-node>
      <!--外部的 3 Kafka Node-->
      <kafka-node :dialog-kvisible="dialogKafka" @onDialogKvisibleChange="dialogKafkaChange" @onUpdateKafkaData="modifyKafkaData"></kafka-node>
      <!--外部的 4 RabbitMQ Node-->
      <rabbit-mq-node :dialog-rmvisible="dialogRabbitMQ" @onDialogRMvisibleChange="dialogRabbitMQChange" @onUpdateRabbitMQData="modifyRabbitMQData"></rabbit-mq-node>
      <!--外部的 5 REST API Call Node-->
      <rest-api-call :dialog-racvisible="dialogRestAPICall" @onDialogRACvisibleChange="dialogRestAPICallChange" @onUpdateRestApiCallData="modifyRestAPICallData"></rest-api-call>
      <!--外部的 6 Send Email Node-->
      <send-email :dialog-sevisible="dialogSendEmail" @onDialogSEvisibleChange="dialogSendEmailChange" @onUpdateSendEmailData="modifySendEmailData"></send-email>
      <!--外部的 7 MQTT Node-->
      <mqtt-node :dialog-mvisible="dialogMQTT" @onDialogMvisibleChange="dialogMQTTChange"></mqtt-node>
  </div>
</template>
<script>
import go from 'gojs'
const MAKE = go.GraphObject.make
// 3.1 滤波器
import checkRelationFilter from './filters/checkRelationFilter'
import messageTypeFilter from './filters/messageTypeFilter'
import messageTypeSwitch from './filters/messageTypeSwitch'
import originatorTypeFilter from './filters/originatorTypeFilter'
import originatorTypeSwitch from './filters/originatorTypeSwitch'
import scriptFilterNode from './filters/scriptFilterNode'
import switchNode from './filters/switchNode'
// 3.2 属性集
import customerAttributes from './attributes/customerAttributes'
import deviceAttributes from './attributes/deviceAttributes'
import originatorAttributes from './attributes/originatorAttributes'
import originatorFields from './attributes/originatorFields'
import relatedAttributes from './attributes/relatedAttributes'
import tenantAttributes from './attributes/tenantAttributes'
import originatorTelemetry from './attributes/originatorTelemetry'
// 3.3 变换
import changeOriginator from './changes/changeOriginator'
import scriptTransformation from './changes/scriptTransformation'
import toemailNode from './changes/toEmailNode'
// 链接标签
import typeBoolean from './linkLabeldialog/typeBoolean'
import typeAttribute from './linkLabeldialog/typeAttribute'
// 3.4 动作
import createAlarmNode from './actions/createAlarmNode'
import clearAlarmNode from './actions/clearAlarmNode'
import delayNode from './actions/delayNode'
import generatorNode from './actions/generatorNode'
import logNode from './actions/logNode'
import rpcCallReply from './actions/rpcCallReply'
import rpcCallRequest from './actions/rpcCallRequest'
import saveAttributes from './actions/saveAttributesNode'
import saveTimeseries from './actions/saveTimeseriesNode'
import assignToCustomer from './actions/assignToCustomer'
import unassignFromCustomer from './actions/unassignFromCustomer'
import createRelation from './actions/createRelationNode'
import deleteRelation from './actions/deleteRelationNode'
// 3.5 外部的
import awssnsNode from './externals/awsSNSNode'
import awssqsNode from './externals/awsSQSNode'
import KafkaNode from './externals/KafkaNode'
import rabbitMqNode from './externals/rabbitMQNode'
import restApiCall from './externals/restApiCall'
import sendEmail from './externals/sendEmailNode'
import mqttNode from './externals/mqttNode'

export default {
  name: 'Ruleceshi',
  components: {
    checkRelationFilter,
    messageTypeFilter,
    messageTypeSwitch,
    originatorTypeFilter,
    originatorTypeSwitch,
    scriptFilterNode,
    switchNode,
    customerAttributes,
    deviceAttributes,
    originatorAttributes,
    originatorFields,
    relatedAttributes,
    tenantAttributes,
    originatorTelemetry,
    changeOriginator,
    scriptTransformation,
    toemailNode,
    typeBoolean,
    typeAttribute,
    createAlarmNode,
    clearAlarmNode,
    delayNode,
    generatorNode,
    logNode,
    rpcCallReply,
    rpcCallRequest,
    saveAttributes,
    saveTimeseries,
    assignToCustomer,
    unassignFromCustomer,
    createRelation,
    deleteRelation,
    awssnsNode,
    awssqsNode,
    KafkaNode,
    rabbitMqNode,
    restApiCall,
    sendEmail,
    mqttNode
  },
  data() {
    return {
      myDiagram: null,
      myPalette: null,
      Select_Port: null,
      type: '',
      deleteSelectedNode: false,
      dialogCheckRelation: false,
      dialogMessageFilter: false,
      dialogMessageSwitch: false,
      dialogOriginatorFilter: false,
      dialogOriginatorSwitch: false,
      dialogScriptFilter: false,
      dialogSwitch: false,
      dialogCustomerAttributes: false,
      dialogDeviceAttributes: false,
      dialogOriginatorAttributes: false,
      dialogoriginatorFields: false,
      dialogRelatedAttributes: false,
      dialogTenantAttributes: false,
      dialogOriginatorTelemetry: false,
      dialogChangeOriginator: false,
      dialogScriptTransformation: false,
      dialogToEmail: false,
      dialogLabelBoolean: false,
      dialogLabelAttribute: false,
      dialogCreateAlarm: false,
      dialogClearAlarm: false,
      dialogDelay: false,
      dialogGenerator: false,
      dialogLog: false,
      dialogRPCCallReply: false,
      dialogRPCCallRequest: false,
      dialogSaveAttributes: false,
      dialogSaveTimeseries: false,
      dialogAssignToCustomer: false,
      dialogUnassginFromCustomer: false,
      dialogCreateRelation: false,
      dialogDeleteRelation: false,
      dialogAwsSNS: false,
      dialogAwsSQS: false,
      dialogKafka: false,
      dialogRabbitMQ: false,
      dialogRestAPICall: false,
      dialogSendEmail: false,
      dialogMQTT: false,
      nodeDataArray: [
        { key: 0, text: 'input', loc: '-170 0', category: 'Start' },
        { key: 1, filtername: 'Originator Type Filter Node', loc: '34 45', category: 'One', filterZiname: '' }
      ],
      linkDataArray: [
        { from: 0, to: 1, labelname: ['Post attributes'], visible: true }
      ],
      xiaoshi: '',
      fromtokey: {}
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.init()
    },
    init() {
      var that = this
      this.myDiagram = MAKE(go.Diagram, 'myDiagramDiv', {
        // isReadOnly: true,
        // initialContentAlignment: go.Spot.Center, // 居中显示
        // hoverDelay: 200,
        'undoManager.isEnabled': true, // 支持 Ctrl-Z 和 Ctrl-Y 操作
        'toolManager.hoverDelay': 200, // tooltip提示显示延时
        'toolManager.toolTipDuration': 10000, // tooltip持续显示时间
        // 'grid.visible': true, // 显示网格
        allowDrop: true,
        allowDragOut: true
        // allowMove: true, // 允许拖动
        // allowDelete: false // 允许删除选中按backspace
        // allowCopy: false,
        // allowClipboard: false,
        // 'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom, // 有鼠标滚轮事件放大和缩小，而不是向上和向下滚动
        // 'clickCreatingTool.archetypeNodeData': { text: 'Node', color: 'white' }, // 允许双击出现个新的框
        // layout: MAKE(go.TreeLayout, {
        //   angle: 0,
        //   layerSpacing: 60,
        //   nodeSpacing: 3
        // })
      })
      // 监听拖拽过来的的事件
      this.myDiagram.addDiagramListener('ExternalObjectsDropped', function(e) {
        // 写个switch case哪个节点 就让哪个模态窗出来 但是有点麻烦，有什么简单点方法嘛？改动规则引擎
        e.subject.each(function(n) {
          // 得到从Palette拖过来的节点
          that.xiaoshi = n.data.filtername
          console.log(n.data.filtername)
          var type = n.data.filtername
          switch (type) {
            case 'Check Relation Filter Node':
              that.dialogCheckRelation = true
              break
            case 'Message Type Filter Node':
              that.dialogMessageFilter = true
              break
            case 'Message Type Switch Node':
              that.dialogMessageSwitch = true
              break
            case 'Originator Type Filter Node':
              that.dialogOriginatorFilter = true
              break
            case 'Originator Type Switch Node':
              that.dialogOriginatorSwitch = true
              break
            case 'Script Filter Node':
              that.dialogScriptFilter = true
              break
            case 'Switch Node':
              that.dialogSwitch = true
              break
            case 'Customer attributes':
              that.dialogCustomerAttributes = true
              break
            case 'Device attributes':
              that.dialogDeviceAttributes = true
              break
            case 'Originator attributes':
              that.dialogOriginatorAttributes = true
              break
            case 'Originator fields':
              that.dialogoriginatorFields = true
              break
            case 'Related attributes':
              that.dialogRelatedAttributes = true
              break
            case 'Tenant attributes':
              that.dialogTenantAttributes = true
              break
            case 'Originator telemetry':
              that.dialogOriginatorTelemetry = true
              break
            case 'Change originator':
              that.dialogChangeOriginator = true
              break
            case 'Script Transformation Node':
              that.dialogScriptTransformation = true
              break
            case 'To Email Node':
              that.dialogToEmail = true
              break
            case 'Create Alarm Node':
              that.dialogCreateAlarm = true
              break
            case 'Clear Alarm Node':
              that.dialogClearAlarm = true
              break
            case 'Delay Node':
              that.dialogDelay = true
              break
            case 'Generator Node':
              that.dialogGenerator = true
              break
            case 'Log Node':
              that.dialogLog = true
              break
            case 'RPC Call Reply Node':
              that.dialogRPCCallReply = true
              break
            case 'RPC Call Request Node':
              that.dialogRPCCallRequest = true
              break
            case 'Save Attributes Node':
              that.dialogSaveAttributes = true
              break
            case 'Save Timeseries Node':
              that.dialogSaveTimeseries = true
              break
            case 'Assign To Customer Node':
              that.dialogAssignToCustomer = true
              break
            case 'Unassign From Customer':
              that.dialogUnassginFromCustomer = true
              break
            case 'Create Relation Node':
              that.dialogCreateRelation = true
              break
            case 'Delete Relation Node':
              that.dialogDeleteRelation = true
              break
            case 'AWS SNS Node':
              that.dialogAwsSNS = true
              break
            case 'AWS SQS Node':
              that.dialogAwsSQS = true
              break
            case 'Kafka Node':
              that.dialogKafka = true
              break
            case 'RabbitMQ Node':
              that.dialogRabbitMQ = true
              break
            case 'REST API Call Node':
              that.dialogRestAPICall = true
              break
            case 'Send Email Node':
              that.dialogSendEmail = true
              break
            case 'MQTT Node':
              that.dialogMQTT = true
              break
            default:
              console.log('switch error')
              break
          }
        })
      })
      // 监听选中的节点然后进行删除
      this.myDiagram.addDiagramListener('ObjectSingleClicked', function(e) {
        that.Select_Port = e.subject.part
        console.log(e.subject.part)
        console.log(e.subject.part.data)
        that.deleteSelectedNode = true
      })
      // 监听画线
      this.myDiagram.addDiagramListener('LinkDrawn', function(e) {
        // console.log(e.subject.fromNode.data)
        // console.log(e.subject.toNode.data)
        var fromNoName = e.subject.fromNode.data.filtername
        var toNoName = e.subject.toNode.data.filtername
        // console.log(e.subject.data)
        that.fromtokey = e.subject.data
        if (fromNoName === 'Check Relation Filter Node' && toNoName === 'Message Type Filter Node') {
          that.dialogLabelBoolean = true
        }
        if (fromNoName === 'Message Type Filter Node' && toNoName === 'Check Relation Filter Node') {
          that.dialogLabelBoolean = true
        }
        // 还有许多许多许多许多判断没写  n(n-1)/2*2 个没写
      })
      this.myDiagram.nodeTemplateMap.add('Start',
        MAKE(go.Node, 'Spot', this.nodestyle(), {
          selectionAdorned: false
        },
        MAKE(go.Panel, 'Auto',
          MAKE(go.Shape, 'RoundedRectangle',
            { width: 155, height: 45, fill: '#a3eaa9', strokeWidth: 0.5 }),
          MAKE(go.TextBlock, 'Start', this.textStyle(),
            new go.Binding('text'))
        ),
        MAKE(go.Panel, 'Auto',
          { alignment: go.Spot.Right, portId: 'to', fromLinkable: true },
          MAKE(go.Shape, 'RoundedRectangle',
            { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
        ),
        ))
      var myContextMenu = MAKE(go.HTMLInfo, {
        show: this.showContextMenu,
        mainElement: document.getElementById('contextMenu')
      })
      // 点击出现编辑和删除按钮 (还差把“删”字换成icon)
      var nodeClickAdornment = MAKE(go.Adornment, 'Spot',
        MAKE(go.Panel, 'Auto',
          MAKE(go.Shape, { stroke: null, fill: null }),
          MAKE(go.Placeholder)
        ),
        MAKE(go.Panel, 'Position',
          { alignment: go.Spot.Top, alignmentFocus: go.Spot.Bottom },
          MAKE('Button',
            { position: new go.Point(100, 50) },
            { '_buttonFillOver': '#f83e05', 'ButtonBorder.fill': '#f83e05', 'ButtonBorder.stroke': '#fff', 'ButtonBorder.strokeWidth': 1.5,
              '_buttonStrokeOver': '#fff', '_buttonFillPressed': '#f83e05', 'ButtonBorder.figure': 'Circle' },
            { click: function(e, node) {
              console.log(e)
              console.log(node.part.adornedPart)
            }
            },
            MAKE(go.TextBlock, '编',
              { font: '8pt sans-serif', textAlign: 'center', margin: new go.Margin(3, 3, 3, 3), stroke: '#fff' }
            )
          ),
          MAKE('Button',
            { position: new go.Point(130, 50) },
            { '_buttonFillOver': '#f83e05', 'ButtonBorder.fill': '#f83e05', 'ButtonBorder.stroke': '#fff', 'ButtonBorder.strokeWidth': 1.5,
              '_buttonStrokeOver': '#fff', '_buttonFillPressed': '#f83e05', 'ButtonBorder.figure': 'Circle' },
            { click: function(e, node) {
              console.log(e)
              console.log(node.part.adornedPart)
            }
            },
            MAKE(go.TextBlock, '删',
              { font: '8pt sans-serif', textAlign: 'center', margin: new go.Margin(3, 3, 3, 3), stroke: '#fff' }
            )
          )
        )
      )
      // filter(滤波器)
      this.myDiagram.nodeTemplateMap.add('One',
        MAKE(go.Node, 'Spot', this.nodestyle(), {
          // selectionAdorned: false,
          contextMenu: myContextMenu,
          selectionAdornmentTemplate: nodeClickAdornment
        },
        MAKE(go.Panel, 'Auto',
          MAKE(go.Shape, 'RoundedRectangle',
            { width: 155, height: 45, fill: '#f1e861', strokeWidth: 0.5, name: 'FILTER' },
          ),
          MAKE(go.TextBlock, this.textStyle(),
            new go.Binding('text', 'filtername')),
        ),
          // 两边端口的样式
        MAKE(go.Panel, 'Auto',
          { alignment: go.Spot.Left, portId: 'to', fromLinkable: false, toLinkable: true },
          MAKE(go.Shape, 'RoundedRectangle',
            { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
        ),
        MAKE(go.Panel, 'Auto',
          { alignment: go.Spot.Right, portId: 'to', fromLinkable: true, toLinkable: false },
          MAKE(go.Shape, 'RoundedRectangle',
            { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
        ),
        {
          mouseEnter: function(e, node, prev) {
            node.findObject('FILTER').fill = 'rgb(250,250,102,1)'
          },
          mouseLeave: function(e, node, prev) {
            node.findObject('FILTER').fill = '#f1e861'
          }
        },
        {
          toolTip: MAKE(go.Adornment, 'Spot',
            { background: 'transparent' },
            MAKE(go.Placeholder,
              {
                background: 'transparent'
              }),
            MAKE(go.Panel, 'Vertical',
              { width: 180, height: 48, background: '#ffffee', defaultStretch: go.GraphObject.Horizontal, alignment: go.Spot.BottomRight, alignmentFocus: go.Spot.BottomLeft },
              MAKE(go.TextBlock, new go.Binding('text', 'filterZiname'), { margin: 2, textAlign: 'left', font: '8pt Helvetica, Arial, sans-serif', stroke: '#000' }),
              MAKE(go.TextBlock, new go.Binding('text', 'filterallName'), { margin: 2, textAlign: 'left', font: '8pt Helvetica, Arial, sans-serif', stroke: 'gray' })
            )
          )
        }
        ))
      // Attribute(属性集)
      this.myDiagram.nodeTemplateMap.add('Two',
        MAKE(go.Node, 'Spot', this.nodestyle(), {
          // selectionAdorned: false,
          contextMenu: myContextMenu,
          selectionAdornmentTemplate: nodeClickAdornment
        },
        MAKE(go.Panel, 'Auto',
          MAKE(go.Shape, 'RoundedRectangle',
            { width: 155, height: 45, fill: '#cdf14e', strokeWidth: 0.5, name: 'Attribute' }),
          MAKE(go.TextBlock, this.textStyle(),
            new go.Binding('text', 'filtername'))
        ),
        MAKE(go.Panel, 'Auto',
          { alignment: go.Spot.Left, portId: 'to', fromLinkable: true, toLinkable: true },
          MAKE(go.Shape, 'RoundedRectangle',
            { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
        ),
        MAKE(go.Panel, 'Auto',
          { alignment: go.Spot.Right, portId: 'to', fromLinkable: true, toLinkable: true },
          MAKE(go.Shape, 'RoundedRectangle',
            { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
        ),
        {
          mouseEnter: function(e, node, prev) {
            node.findObject('Attribute').fill = 'RGB(216,255,82)'
          },
          mouseLeave: function(e, node, prev) {
            node.findObject('Attribute').fill = '#cdf14e'
          }
        },
        {
          toolTip: MAKE(go.Adornment, 'Spot',
            { background: 'transparent' },
            MAKE(go.Placeholder,
              {
                background: 'transparent'
              }),
            MAKE(go.Panel, 'Vertical',
              { width: 180, height: 48, background: '#ffffee', defaultStretch: go.GraphObject.Horizontal, alignment: go.Spot.BottomRight, alignmentFocus: go.Spot.BottomLeft },
              MAKE(go.TextBlock, new go.Binding('text', 'filterZiname'), { margin: 4, textAlign: 'left', font: '8pt Helvetica, Arial, sans-serif', stroke: '#000' }),
              MAKE(go.TextBlock, new go.Binding('text', 'filterallName'), { margin: 4, textAlign: 'left', font: '8pt Helvetica, Arial, sans-serif', stroke: 'gray' })
            )
          )
        }
        ))
      // Change变换
      this.myDiagram.nodeTemplateMap.add('Three',
        MAKE(go.Node, 'Spot', this.nodestyle(), {
          // selectionAdorned: false,
          contextMenu: myContextMenu,
          selectionAdornmentTemplate: nodeClickAdornment
        },
        MAKE(go.Panel, 'Auto',
          MAKE(go.Shape, 'RoundedRectangle',
            { width: 155, height: 45, fill: '#79cef1', strokeWidth: 0.5, name: 'change' }),
          MAKE(go.TextBlock, this.textStyle(),
            new go.Binding('text', 'filtername'))
        ),
        MAKE(go.Panel, 'Auto',
          { alignment: go.Spot.Left, portId: 'to', fromLinkable: true, toLinkable: true },
          MAKE(go.Shape, 'RoundedRectangle',
            { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
        ),
        MAKE(go.Panel, 'Auto',
          { alignment: go.Spot.Right, portId: 'to', fromLinkable: true, toLinkable: true },
          MAKE(go.Shape, 'RoundedRectangle',
            { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
        ),
        {
          mouseEnter: function(e, node, prev) {
            node.findObject('change').fill = 'RGB(128,218,253)'
          },
          mouseLeave: function(e, node, prev) {
            node.findObject('change').fill = '#79cef1'
          }
        },
        {
          toolTip: MAKE(go.Adornment, 'Spot',
            { background: 'transparent' },
            MAKE(go.Placeholder,
              {
                background: 'transparent'
              }),
            MAKE(go.Panel, 'Vertical',
              { width: 180, height: 48, background: '#ffffee', defaultStretch: go.GraphObject.Horizontal, alignment: go.Spot.BottomRight, alignmentFocus: go.Spot.BottomLeft },
              MAKE(go.TextBlock, new go.Binding('text', 'filterZiname'), { margin: 2, textAlign: 'left', font: '8pt Helvetica, Arial, sans-serif', stroke: '#000' }),
              MAKE(go.TextBlock, new go.Binding('text', 'filterallName'), { margin: 2, textAlign: 'left', font: '8pt Helvetica, Arial, sans-serif', stroke: 'gray' })
            )
          )
        }
        ))
      // actions动作
      this.myDiagram.nodeTemplateMap.add('Four',
        MAKE(go.Node, 'Spot', this.nodestyle(), {
          // selectionAdorned: false,
          contextMenu: myContextMenu,
          selectionAdornmentTemplate: nodeClickAdornment
        },
        MAKE(go.Panel, 'Auto',
          MAKE(go.Shape, 'RoundedRectangle',
            { width: 155, height: 45, fill: '#f1928f', strokeWidth: 0.5, name: 'actions' }),
          MAKE(go.TextBlock, this.textStyle(),
            new go.Binding('text', 'filtername'))
        ),
        MAKE(go.Panel, 'Auto',
          { alignment: go.Spot.Left, portId: 'to', fromLinkable: true, toLinkable: true },
          MAKE(go.Shape, 'RoundedRectangle',
            { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
        ),
        MAKE(go.Panel, 'Auto',
          { alignment: go.Spot.Right, portId: 'to', fromLinkable: true, toLinkable: true },
          MAKE(go.Shape, 'RoundedRectangle',
            { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
        ),
        {
          mouseEnter: function(e, node, prev) {
            node.findObject('actions').fill = 'RGB(241,104,100,0.9)'
          },
          mouseLeave: function(e, node, prev) {
            node.findObject('actions').fill = '#f1928f'
          }
        },
        {
          toolTip: MAKE(go.Adornment, 'Spot',
            { background: 'transparent' },
            MAKE(go.Placeholder,
              {
                background: 'transparent'
              }),
            MAKE(go.Panel, 'Vertical',
              { width: 180, height: 48, background: '#ffffee', defaultStretch: go.GraphObject.Horizontal, alignment: go.Spot.BottomRight, alignmentFocus: go.Spot.BottomLeft },
              MAKE(go.TextBlock, new go.Binding('text', 'filterZiname'), { margin: 2, textAlign: 'left', font: '8pt Helvetica, Arial, sans-serif', stroke: '#000' }),
              MAKE(go.TextBlock, new go.Binding('text', 'filterallName'), { margin: 2, textAlign: 'left', font: '8pt Helvetica, Arial, sans-serif', stroke: 'gray' })
            )
          )
        }
        ))
      // External外部的
      this.myDiagram.nodeTemplateMap.add('Five',
        MAKE(go.Node, 'Spot', this.nodestyle(), {
          // selectionAdorned: false,
          contextMenu: myContextMenu,
          selectionAdornmentTemplate: nodeClickAdornment
        },
        MAKE(go.Panel, 'Auto',
          MAKE(go.Shape, 'RoundedRectangle',
            { width: 155, height: 45, fill: '#fbc766', strokeWidth: 0.5, name: 'External' }),
          MAKE(go.TextBlock, this.textStyle(),
            new go.Binding('text', 'filtername'))
        ),
        MAKE(go.Panel, 'Auto',
          { alignment: go.Spot.Left, portId: 'to', fromLinkable: true, toLinkable: true },
          MAKE(go.Shape, 'RoundedRectangle',
            { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
        ),
        MAKE(go.Panel, 'Auto',
          { alignment: go.Spot.Right, portId: 'to', fromLinkable: true, toLinkable: true },
          MAKE(go.Shape, 'RoundedRectangle',
            { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
        ),
        {
          mouseEnter: function(e, node, prev) {
            node.findObject('External').fill = 'RGB(251,199,42,0.9)'
          },
          mouseLeave: function(e, node, prev) {
            node.findObject('External').fill = '#fbc766'
          }
        },
        {
          toolTip: MAKE(go.Adornment, 'Spot',
            { background: 'transparent' },
            MAKE(go.Placeholder,
              {
                background: 'transparent'
              }),
            MAKE(go.Panel, 'Vertical',
              { width: 180, height: 48, background: '#ffffee', defaultStretch: go.GraphObject.Horizontal, alignment: go.Spot.BottomRight, alignmentFocus: go.Spot.BottomLeft },
              MAKE(go.TextBlock, new go.Binding('text', 'filterZiname'), { margin: 4, textAlign: 'left', font: '8pt Helvetica, Arial, sans-serif', stroke: '#000' }),
              MAKE(go.TextBlock, new go.Binding('text', 'filterallName'), { margin: 4, textAlign: 'left', font: '8pt Helvetica, Arial, sans-serif', stroke: 'gray' })
            )
          )
        }
        ))
      // 链接线的构造
      this.myDiagram.linkTemplate = MAKE(go.Link,
        go.Link.Bezier, // 贝塞尔曲线
        {
          toShortLength: 15,
          fromSpot: go.Spot.Right,
          toSpot: go.Spot.Left
        },
        MAKE(go.Shape,
          { strokeWidth: 2, stroke: '#808080' }),
        MAKE(go.Shape, // 箭头
          { toArrow: 'Standard', fill: '#808080', stroke: '#808080' }),
        MAKE(go.Panel, 'Auto',
          new go.Binding('visible', 'visible'),
          MAKE(go.Shape, 'RoundedRectangle',
            { fill: '#FFF', strokeWidth: 2, stroke: '#003a79' }),
          MAKE(go.TextBlock,
            {
              margin: 4,
              textAlign: 'center',
              font: '10pt helvetica, arial, sans-serif',
              stroke: '#003a79'
              // editable: true
            },
            new go.Binding('text', 'labelname'))
        )
      )
      var jsonFilter = [
        {
          text: 'Check Relation Filter Node',
          type: 'Check Relation Filter Node'
        }, {
          text: 'Message Type Filter Node'
        }, {
          text: 'Message Type Switch Node'
        }, {
          text: 'Originator Type Filter Node'
        }, {
          text: 'Originator Type Switch Node'
        }, {
          text: 'Script Filter Node'
        }, {
          text: 'Switch Node'
        }
      ]
      var palettearrayFilter = []
      for (var i = 0; i < jsonFilter.length; i++) {
        var palettobject = {
          category: 'One',
          filtername: jsonFilter[i].text,
          filterallName: '滤波器— ' + jsonFilter[i].text
        }
        palettearrayFilter.push(palettobject)
      }
      var jsonAttribute = [
        {
          text: 'Customer attributes'
        }, {
          text: 'Device attributes'
        }, {
          text: 'Originator attributes'
        }, {
          text: 'Originator fields'
        }, {
          text: 'Related attributes'
        }, {
          text: 'Tenant attributes'
        }, {
          text: 'Originator telemetry'
        }
      ]
      var palettearrayAttribute = []
      for (var j = 0; j < jsonAttribute.length; j++) {
        var palettobjecta = {
          category: 'Two',
          filtername: jsonAttribute[j].text,
          filterallName: '属性集— ' + jsonAttribute[j].text
        }
        palettearrayAttribute.push(palettobjecta)
      }
      var jsonChange = [
        {
          text: 'Change originator'
        }, {
          text: 'Script Transformation Node'
        }, {
          text: 'To Email Node'
        }
      ]
      var palettearrayChange = []
      for (var k = 0; k < jsonChange.length; k++) {
        var objectchange = {
          category: 'Three',
          filtername: jsonChange[k].text,
          filterallName: '变换— ' + jsonChange[k].text
        }
        palettearrayChange.push(objectchange)
      }
      var jsonAction = [
        {
          text: 'Create Alarm Node'
        }, {
          text: 'Clear Alarm Node'
        }, {
          text: 'Delay Node'
        }, {
          text: 'Generator Node'
        }, {
          text: 'Log Node'
        }, {
          text: 'RPC Call Reply Node'
        }, {
          text: 'RPC Call Request Node'
        }, {
          text: 'Save Attributes Node'
        }, {
          text: 'Save Timeseries Node'
        }, {
          text: 'Assign To Customer Node'
        }, {
          text: 'Unassign From Customer'
        }, {
          text: 'Create Relation Node'
        }, {
          text: 'Delete Relation Node'
        }
      ]
      var palettearrayAction = []
      for (var m = 0; m < jsonAction.length; m++) {
        var objectaction = {
          category: 'Four',
          filtername: jsonAction[m].text,
          filterallName: '动作— ' + jsonAction[m].text
        }
        palettearrayAction.push(objectaction)
      }
      var jsonExternal = [
        {
          text: 'AWS SNS Node'
        }, {
          text: 'AWS SQS Node'
        }, {
          text: 'Kafka Node'
        }, {
          text: 'MQTT Node'
        }, {
          text: 'RabbitMQ Node'
        }, {
          text: 'REST API Call Node'
        }, {
          text: 'Send Email Node'
        }, {
          text: 'Twilio SMS Node'
        }
      ]
      var palettearrayExternal = []
      for (var n = 0; n < jsonExternal.length; n++) {
        var objectexternal = {
          category: 'Five',
          filtername: jsonExternal[n].text,
          filterallName: '外部的— ' + jsonExternal[n].text
        }
        palettearrayExternal.push(objectexternal)
      }
      // 初始化页面左侧的调色板
      // this.myPalette = MAKE(go.Palette, 'myPaletteDiv1',
      //   {
      //     nodeTemplateMap: this.myDiagram.nodeTemplateMap,
      //     model: new go.GraphLinksModel(palettearrayFilter)
      //   })
      var myPalette1 = MAKE(go.Palette, 'myPaletteDiv1')
      myPalette1.nodeTemplate =
      MAKE(go.Node, 'Spot', this.nodestyle(), {
        selectionAdorned: false
      },
      MAKE(go.Panel, 'Auto',
        MAKE(go.Shape, 'RoundedRectangle',
          { width: 155, height: 45, fill: '#f1e861', strokeWidth: 0.5 }),
        MAKE(go.TextBlock, this.textStyle(),
          new go.Binding('text', 'filtername'))
      ),
      MAKE(go.Panel, 'Auto',
        { alignment: go.Spot.Left, portId: 'to', fromLinkable: true, toLinkable: true },
        MAKE(go.Shape, 'RoundedRectangle',
          { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
      ),
      MAKE(go.Panel, 'Auto',
        { alignment: go.Spot.Right, portId: 'to', fromLinkable: true, toLinkable: true },
        MAKE(go.Shape, 'RoundedRectangle',
          { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
      )
      )
      myPalette1.model.nodeDataArray = palettearrayFilter
      // this.myPalette = MAKE(go.Palette, 'myPaletteDiv2',
      //   {
      //     nodeTemplateMap: this.myDiagram.nodeTemplateMap,
      //     model: new go.GraphLinksModel(palettearrayAttribute)
      //   })
      var myPalette2 = MAKE(go.Palette, 'myPaletteDiv2')
      myPalette2.nodeTemplate =
      MAKE(go.Node, 'Spot', this.nodestyle(), {
        selectionAdorned: false
      },
      MAKE(go.Panel, 'Auto',
        MAKE(go.Shape, 'RoundedRectangle',
          { width: 155, height: 45, fill: '#cdf14e', strokeWidth: 0.5 }),
        MAKE(go.TextBlock, this.textStyle(),
          new go.Binding('text', 'filtername'))
      ),
      MAKE(go.Panel, 'Auto',
        { alignment: go.Spot.Left, portId: 'to', fromLinkable: true, toLinkable: true },
        MAKE(go.Shape, 'RoundedRectangle',
          { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
      ),
      MAKE(go.Panel, 'Auto',
        { alignment: go.Spot.Right, portId: 'to', fromLinkable: true, toLinkable: true },
        MAKE(go.Shape, 'RoundedRectangle',
          { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
      )
      )
      myPalette2.model.nodeDataArray = palettearrayAttribute
      // this.myPalette = MAKE(go.Palette, 'myPaletteDiv3',
      //   {
      //     nodeTemplateMap: this.myDiagram.nodeTemplateMap,
      //     model: new go.GraphLinksModel(palettearrayChange)
      //   })
      var myPalette3 = MAKE(go.Palette, 'myPaletteDiv3')
      myPalette3.nodeTemplate =
      MAKE(go.Node, 'Spot', this.nodestyle(), {
        selectionAdorned: false
      },
      MAKE(go.Panel, 'Auto',
        MAKE(go.Shape, 'RoundedRectangle',
          { width: 155, height: 45, fill: '#79cef1', strokeWidth: 0.5 }),
        MAKE(go.TextBlock, this.textStyle(),
          new go.Binding('text', 'filtername'))
      ),
      MAKE(go.Panel, 'Auto',
        { alignment: go.Spot.Left, portId: 'to', fromLinkable: true, toLinkable: true },
        MAKE(go.Shape, 'RoundedRectangle',
          { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
      ),
      MAKE(go.Panel, 'Auto',
        { alignment: go.Spot.Right, portId: 'to', fromLinkable: true, toLinkable: true },
        MAKE(go.Shape, 'RoundedRectangle',
          { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
      )
      )
      myPalette3.model.nodeDataArray = palettearrayChange
      // this.myPalette = MAKE(go.Palette, 'myPaletteDiv4',
      //   {
      //     nodeTemplateMap: this.myDiagram.nodeTemplateMap,
      //     model: new go.GraphLinksModel(palettearrayAction)
      //   })
      var myPalette4 = MAKE(go.Palette, 'myPaletteDiv4')
      myPalette4.nodeTemplate =
      MAKE(go.Node, 'Spot', this.nodestyle(), {
        selectionAdorned: false
      },
      MAKE(go.Panel, 'Auto',
        MAKE(go.Shape, 'RoundedRectangle',
          { width: 155, height: 45, fill: '#f1928f', strokeWidth: 0.5 }),
        MAKE(go.TextBlock, this.textStyle(),
          new go.Binding('text', 'filtername'))
      ),
      MAKE(go.Panel, 'Auto',
        { alignment: go.Spot.Left, portId: 'to', fromLinkable: true, toLinkable: true },
        MAKE(go.Shape, 'RoundedRectangle',
          { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
      ),
      MAKE(go.Panel, 'Auto',
        { alignment: go.Spot.Right, portId: 'to', fromLinkable: true, toLinkable: true },
        MAKE(go.Shape, 'RoundedRectangle',
          { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
      )
      )
      myPalette4.model.nodeDataArray = palettearrayAction
      // this.myPalette = MAKE(go.Palette, 'myPaletteDiv5',
      //   {
      //     nodeTemplateMap: this.myDiagram.nodeTemplateMap,
      //     model: new go.GraphLinksModel(palettearrayExternal)
      //   })
      var myPalette5 = MAKE(go.Palette, 'myPaletteDiv5')
      myPalette5.nodeTemplate =
      MAKE(go.Node, 'Spot', this.nodestyle(), {
        selectionAdorned: false
      },
      MAKE(go.Panel, 'Auto',
        MAKE(go.Shape, 'RoundedRectangle',
          { width: 155, height: 45, fill: '#fbc766', strokeWidth: 0.5 }),
        MAKE(go.TextBlock, this.textStyle(),
          new go.Binding('text', 'filtername'))
      ),
      MAKE(go.Panel, 'Auto',
        { alignment: go.Spot.Left, portId: 'to', fromLinkable: true, toLinkable: true },
        MAKE(go.Shape, 'RoundedRectangle',
          { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
      ),
      MAKE(go.Panel, 'Auto',
        { alignment: go.Spot.Right, portId: 'to', fromLinkable: true, toLinkable: true },
        MAKE(go.Shape, 'RoundedRectangle',
          { width: 17, height: 17, fill: '#ccc', stroke: 'gray' })
      )
      )
      myPalette5.model.nodeDataArray = palettearrayExternal
      this.myDiagram.model = new go.GraphLinksModel(this.nodeDataArray, this.linkDataArray)
      this.myDiagram.contextMenu = myContextMenu
      document.getElementById('contextMenu').addEventListener('contextmenu', function(e) {
        e.preventDefault()
        return false
      }, false)
    },
    nodestyle() {
      return [
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify)
      ]
    },
    textStyle() {
      return {
        font: '8pt Helvetica, Arial, sans-serif',
        stroke: '#606269',
        wrap: go.TextBlock.WrapFit,
        textAlign: 'center'
      }
    },
    showContextMenu() {
      // 键盘命令：
      var cmd = this.myDiagram.commandHandler
      document.getElementById('copy').style.display = cmd.canCopySelection() ? 'block' : 'none'
      document.getElementById('paste').style.display = cmd.canPasteSelection() ? 'block' : 'none'
      document.getElementById('delete').style.display = cmd.canDeleteSelection() ? 'block' : 'none'
      document.getElementById('contextMenu').style.display = 'block'
      var mousePt = this.myDiagram.lastInput.viewPoint
      document.getElementById('contextMenu').style.left = mousePt.x + 'px'
      document.getElementById('contextMenu').style.top = mousePt.y + 'px'
    },
    cxcommand(event, val) {
      if (val === undefined) val = event.currentTarget.id
      var diagram = this.myDiagram
      switch (val) {
        case 'copy': diagram.commandHandler.copySelection(); break
        case 'paste': diagram.commandHandler.pasteSelection(diagram.lastInput.documentPoint); break
        case 'delete': diagram.commandHandler.deleteSelection(); break
      }
      diagram.currentTool.stopTool()
    },
    dialogCheckRelationChange(val) {
      this.dialogCheckRelation = val
    },
    modifyCheckRelationData(data) {
      console.log(data)
      // 这样写每次拖拽过来check relation filter的tootip都相同啊
      // for (var i = 0; i < this.nodeDataArray.length; i++) {
      //   if (this.nodeDataArray[i].filtername === 'Check Relation Filter Node') {
      //     this.nodeDataArray[i].filterZiname = data
      //   }
      // }
    },
    dialogMessageFilterChange(val) {
      this.dialogMessageFilter = val
    },
    modifyMessageTypeFilData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Message Type Filter Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogMessageSwitchChange(val) {
      this.dialogMessageSwitch = val
    },
    modifyMessageTypeSwitData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Message Type Switch Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogOriginatorFilterChange(val) {
      this.dialogOriginatorFilter = val
    },
    modifyOriginatorFilterData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Originator Type Filter Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogOriginatorSwitchChange(val) {
      this.dialogOriginatorSwitch = val
    },
    modifyOriginatorSwitchData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Originator Type Switch Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogScriptFilterChange(val) {
      this.dialogScriptFilter = val
    },
    modifyScriptFilterData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Script Filter Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogSwitchChange(val) {
      this.dialogSwitch = val
    },
    modifySwitchData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Switch Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogCustomerChange(val) {
      this.dialogCustomerAttributes = val
    },
    modifyCustomerData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Customer attributes') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogDeviceChange(val) {
      this.dialogDeviceAttributes = val
    },
    modifyDeviceData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Device attributes') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogOriginatorChange(val) {
      this.dialogOriginatorAttributes = val
    },
    modifyOriginatorData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Originator attributes') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogFieldsChange(val) {
      this.dialogoriginatorFields = val
    },
    modifyFieldsData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Originator fields') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogRelatedChange(val) {
      this.dialogRelatedAttributes = val
    },
    modifyRelatedData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Related attributes') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogTenantChange(val) {
      this.dialogTenantAttributes = val
    },
    modifyTenantData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Tenant attributes') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogTelemetryChange(val) {
      this.dialogOriginatorTelemetry = val
    },
    modifyTelemetryData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Originator telemetry') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogChangeChange(val) {
      this.dialogChangeOriginator = val
    },
    modifyChangeData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Change originator') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogTransformationChange(val) {
      this.dialogScriptTransformation = val
    },
    modifyTransformationData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Script Transformation Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogToEmailChange(val) {
      this.dialogToEmail = val
    },
    modifyToEmailData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'To Email Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogCreateAlarmChange(val) {
      this.dialogCreateAlarm = val
    },
    modifyCreateAlarmData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Create Alarm Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogClearAlarmChange(val) {
      this.dialogClearAlarm = val
    },
    modifyClearAlarmData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Clear Alarm Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogDelayChange(val) {
      this.dialogDelay = val
    },
    modifyDelayData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Delay Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogGeneratorChange(val) {
      this.dialogGenerator = val
    },
    modifyGeneratorData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Generator Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogLogChange(val) {
      this.dialogLog = val
    },
    modifyLogData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Log Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogRpcReplyChange(val) {
      this.dialogRPCCallReply = val
    },
    modifyRPCReplyData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'RPC Call Reply Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogRpcRequestChange(val) {
      this.dialogRPCCallRequest = val
    },
    modifyRPCRequestData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'RPC Call Request Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogSaveAttributesChange(val) {
      this.dialogSaveAttributes = val
    },
    modifySaveAttributesData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Save Attributes Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogSaveTimeseriesChange(val) {
      this.dialogSaveTimeseries = val
    },
    modifySaveTimeseriesData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Save Timeseries Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogAssignToChange(val) {
      this.dialogAssignToCustomer = val
    },
    modifyAssignToCustomData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Assign To Customer Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogUnassignChange(val) {
      this.dialogUnassginFromCustomer = val
    },
    modifyUnassginFromData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Unassign From Customer') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogCreateRelationChange(val) {
      this.dialogCreateRelation = val
    },
    modifyCreateRelationData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Create Relation Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogDeleteRelationChange(val) {
      this.dialogDeleteRelation = val
    },
    modifyDeleteRelationData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Delete Relation Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogAwsSNSChange(val) {
      this.dialogAwsSNS = val
    },
    modifyAWSSNSData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'AWS SNS Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogAwsSQSChange(val) {
      this.dialogAwsSQS = val
    },
    modifyAWSSQSData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'AWS SQS Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogKafkaChange(val) {
      this.dialogKafka = val
    },
    modifyKafkaData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Kafka Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogRabbitMQChange(val) {
      this.dialogRabbitMQ = val
    },
    modifyRabbitMQData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'RabbitMQ Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogRestAPICallChange(val) {
      this.dialogRestAPICall = val
    },
    modifyRestAPICallData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'REST API Call Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogSendEmailChange(val) {
      this.dialogSendEmail = val
    },
    modifySendEmailData(data) {
      for (var i = 0; i < this.nodeDataArray.length; i++) {
        if (this.nodeDataArray[i].filtername === 'Send Email Node') {
          this.nodeDataArray[i].filterZiname = data
        }
      }
    },
    dialogMQTTChange(val) {
      this.dialogMQTT = val
    },
    dialogTypeBooleanChange(val) {
      this.dialogLabelBoolean = val
    },
    modifyTypeBooleanData(data) {
      for (var i = 0; i < this.linkDataArray.length; i++) {
        if (this.linkDataArray[i].from === this.fromtokey.from && this.linkDataArray[i].to === this.fromtokey.to) {
          this.linkDataArray[i].labelname = data
          this.linkDataArray[i].visible = true
        }
      }
      this.myDiagram.model = new go.GraphLinksModel(this.nodeDataArray, this.linkDataArray)
    },
    dialogTypeAttributeChange(val) {
      this.dialogLabelAttribute = val
    },
    save() {
      var model = this.myDiagram.model.toJson()
      console.log(model)
      var newnodeData = JSON.parse(model)
      this.nodeDataArray = newnodeData.nodeDataArray
    },
    // 重新加载
    refresload() {
      this.myDiagram.model = new go.GraphLinksModel(this.nodeDataArray, this.linkDataArray)
    },
    // 撤销更改
    backout() {
      //  一直点击它 只能一步一步的撤销
      this.myDiagram.undoManager.undo()
    },
    // 删除选定的节点或链接
    deletenode() {
      this.myDiagram.remove(this.Select_Port)
      this.deleteSelectedNode = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  canvas {
    outline: none;
  }
  .el-aside {
    color: #333;
  }
  .el-main {
    background-color: #e4e6e833;
  }
  #contextMenu {
    z-index: 10002;
    position: absolute;
    left: 295.5px;
    top: 201px;
    /* left: 5px; */
    // border: 1px solid #444;
    background-color: #F5F5F5;
    display: none;
    box-shadow: 0 0 8px rgba( 0, 0, 0, .4 );
    font-size: 16px;
    font-family: sans-serif;
    // font-weight: bold;
  }
  #contextMenu ul {
    list-style: none;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
  }
  #contextMenu li a {
    position: relative;
    min-width: 96px;
    color: #444;
    display: inline-block;
    padding: 10px;
    text-decoration: none;
    cursor: pointer;
  }
  // #contextMenu li a:hover {
  //   background: rgba(192, 196, 199, 0.4)
  // }
  #contextMenu li:hover {
    background: #CEDFF2;
    color: #EEE;
  }
  #contextMenu li ul li {
    display: none;
  }
  #contextMenu li ul li a {
    position: relative;
    min-width: 60px;
    padding: 6px;
    text-decoration: none;
    cursor: pointer;
  }
  #contextMenu li:hover ul li {
    display: block;
    margin-left: 0px;
    margin-top: 0px;
}
</style>
