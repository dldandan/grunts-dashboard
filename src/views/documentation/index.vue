<template>
  <div class="app-container">
      <div style="display:flex;justify-content:space-between;height:750px;">
        <div id="myPaletteDiv" style="width:100px;margin-right:2px;background-color:whitesmoke;border:solid 1px black"></div>
        <div id="myDiagramDiv" style="flex-grow:1;height:750px;border:solid 1px black">
          <div v-if="show">haha</div>
        </div>
      </div>
  </div>
</template>
<script>
import go from 'gojs'
export default {
  name: 'documentation',
  data() {
    return {
      articleList: [
      ],
      show: false
    }
  },
  mounted() {
    var mySelf = this
    var MAKE = go.GraphObject.make
    mySelf.myDiagram = MAKE(go.Diagram, 'myDiagramDiv', {
      // initialContentAlignment: go.Spot.Center, // 居中显示
      'undoManager.isEnabled': true, // 支持 Ctrl-Z 和 Ctrl-Y 操作
      'toolManager.hoverDelay': 100, // tooltip提示显示延时
      'toolManager.toolTipDuration': 10000, // tooltip持续显示时间
      'grid.visible': true, // 显示网格
      allowMove: true, // 允许拖动
      allowDelete: true, // 允许删除选中按backspace
      allowCopy: false,
      allowClipboard: false, // 允许剪切
      'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom, // 有鼠标滚轮事件放大和缩小，而不是向上和向下滚动
      'clickCreatingTool.archetypeNodeData': { text: 'Node', color: 'white' }, // 允许双击出现个新的框框
      layout: MAKE(go.TreeLayout, {
        angle: 0,
        layerSpacing: 60
      })
    })
    console.log(mySelf.myDiagram)
    mySelf.myDiagram.addDiagramListener('ObjectSingleClicked', function(e) { // 单击一个节点(一个框框)
      console.log(e.subject.part)
    })
    mySelf.myDiagram.addDiagramListener('BackgroundSingleClicked', function(e) { // 双击网格背景
      console.log('Double-clicked at' + e.diagram.lastInput.documentPoint)
    })
    mySelf.myDiagram.addDiagramListener('ClipboardPasted', function(e) {
      console.log('Pasted' + e.diagram.selection.count + 'parts')
    })
    // 方框节点的构造
    mySelf.myDiagram.nodeTemplate =
    MAKE(go.Node,
      new go.Binding('location', 'loc', go.Point.parse),
      MAKE(go.Shape, 'RoundedRectangle', { fill: '#44CCFF', stroke: 'grey', strokeWidth: 2, angle: 0 }),
      'Auto', // Vertical,Auto,Horizontal
      MAKE(go.Panel, 'Horizontal', { padding: 5 },
        MAKE(go.Panel, 'Vertical',
          MAKE(go.Picture,
            { margin: 10, width: 50, height: 50, background: 'red' },
            new go.Binding('source', 'img')
          )
        ),
        MAKE(go.Panel, 'Vertical',
          MAKE(go.TextBlock, 'Default Text', { margin: 12, stroke: 'white', font: 'bold 16px sans-serif' }, new go.Binding('text', 'name1')),
          MAKE(go.TextBlock, { stroke: 'red' }, { margin: 5 }, new go.Binding('text', 'name2'))
        ),
      ),
      {
        mouseEnter: function(e, node, prev) {
          console.log('mouseEnter')
        },
        mouseLeave: function(e, node, prev) {
          mySelf.detailShow = false
        }
      },
      {
        toolTip: MAKE(go.Adornment, 'Spot', // 鼠标移动上面浮动时显示name1
          // {background:"transparent" },
          MAKE(go.Shape, 'RoundedRectangle', {
            // fill: "blue" ,
            height: 30,
            fill: MAKE(go.Brush, 'Linear', { 0.0: 'blue', 1.0: 'red', start: go.Spot.Bottom, end: go.Spot.Top })
          }),
          MAKE(go.TextBlock,
          // {alignment:go.Spot.Top,alignmentFocus:go.Spot.Bottom,stroke:"red" },
            { margin: 4, stroke: 'white' }, new go.Binding('text', 'name1'))
        )
      }
    )
    // 线的定义构造
    mySelf.myDiagram.linkTemplate = MAKE(go.Link,
      // { curve: go.Link.Bezier }, // 贝塞尔曲线
      { routing: go.Link.Orthogonal, corner: 5 },
      MAKE(go.Shape, { strokeWidth: 2, stroke: '#e4393c' }),
      MAKE(go.Shape, { toArrow: 'Standard', fill: '#000000', stroke: null }), // 箭头
      MAKE(go.TextBlock,
        {
          // margin: 20,
          stroke: 'blue',
          editable: true // 可编辑内容
          // font: "14px sans-serif",
          // width:50,
          // wrap: go.TextBlock.WrapDesiredSize // 自适应
        },
        new go.Binding('text', 'linktext')),
      {
        toolTip: MAKE(go.Adornment, 'Auto',
          MAKE(go.Shape, { fill: '#FFFFCC' }),
          MAKE(go.TextBlock, { margin: 4 }, new go.Binding('text', 'name1'))
        ) // end of Adornment
      }
    )// the link shape
    var myModel = MAKE(go.TreeModel)
    myModel.nodeDataArray =
    [ // note that each node data object holds whatever properties it needs;
      // for this app we add the "name" and "source" properties
      { key: '1', name1: '董事长', name2: '秘书1', name3: '秘书2' },
      { key: '2', parent: '1', name1: '秘书', name2: '秘书1', linktext: 'link' },
      { key: '3', parent: '1', name1: 'CEO', name2: '秘书1', linktext: 'link' },
      { key: '4', parent: '3', name1: '总经理', name2: '秘书1', linktext: 'link' },
      { key: '5', parent: '4', name1: '二狗子', name2: '秘书1', linktext: 'link' }
    ]
    mySelf.myDiagram.model = myModel
  },
  methods: {
    // nodeStyle() {
    //   return [
    //     new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    //     {
    //       locationSpot: go.Spot.Center
    //     }
    //   ]
    // },
    // makePort(name, align, spot, output, input) {
    //   var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom)
    //   var MAKE = go.GraphObject.make
    //   return MAKE(go.Shape,
    //     {
    //       fill: 'transparent',
    //       strokeWidth: 0,
    //       width: horizontal ? NaN : 8,
    //       height: !horizontal ? NaN : 8,
    //       alignment: align,
    //       stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
    //       portId: name,
    //       fromSpot: spot,
    //       fromLinkable: output,
    //       toSpot: spot,
    //       toLinkable: input,
    //       cursor: 'pointer',
    //       mouseEnter: function(e, port) {
    //         if (!e.diagram.isReadOnly) port.fill = 'rgba(255,0,255,0.5)'
    //       },
    //       mouseLeave: function(e, port) {
    //         port.fill = 'transparent'
    //       }
    //     })
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
