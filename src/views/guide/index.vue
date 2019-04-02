<template>
  <div class="app-container">
    <div style="display:flex;height;justify-content:space-between;height:750px;">
      <div class="sidebar node-palette" style="width:100px;margin-right:2px;background-color:whitesmoke;border:solid 1px black">
        <div data-node-type="question" title="Drag to add new" class="sidebar-item jtk-surface-droppable-node jtk-draggable"><i class="icon-tablet"></i>Question</div>
        <div data-node-type="action" title="Drag to add new" class="sidebar-item jtk-surface-droppable-node jtk-draggable"><i class="icon-eye-open"></i>Action</div>
        <div data-node-type="output" title="Drag to add new" class="sidebar-item jtk-surface-droppable-node jtk-draggable"><i class="icon-eye-open"></i>Output</div>
      </div>
      <div class="flowchart-demo" id="flowchart-demo" style="flex-grow:1;height:750px;border:solid 1px black">
      <div class="window" id="flowchartWindow1">1
            </div>
            <div class="window" id="flowchartWindow2">2
            </div>
            <div class="window" id="flowchartWindow3">3
            </div>
            <div class="window" id="flowchartWindow4">4
            </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'guide',
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    this.initJSplumb()
  },
  methods: {
    initJSplumb() {
      this.$jsPlumb.getInstance({ // 不行 说getInstance not a function
        PaintStyle: { //
          strokeWidth: 3,
          stroke: '#567567',
          outlineStroke: 'black',
          outlineWidth: 1
        },
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        Connector: ['Bezier', { curviness: 30 }],
        // Connector: ["Flowchart",{curviness:70}],
        ConnectionOverlays: [
          ['Arrow', { location: 1 }],
          ['Label', {
            location: 0.5,
            label: 'hehe',
            id: 'label',
            cssClass: 'aLabel'
          }]
        ],
        Container: 'flowchart-demo',
        Endpoint: ['Dot', { radius: 5 }],
        EndpointStyle: { fill: '#567567' },
        Anchor: [0.5, 0.5, 1, 1]
      })
      this.$jsPlumb.addEndpoint('flowchartWindow1', { uuid: 1, anchor: 'TopCenter', isSource: true })
    }
  }
}
</script>

<style>
  .flowchart-demo .window {
    border: 1px solid #346789;
    box-shadow: 2px 2px 19px #aaa;
    -o-box-shadow: 2px 2px 19px #aaa;
    -webkit-box-shadow: 2px 2px 19px #aaa;
    -moz-box-shadow: 2px 2px 19px #aaa;
    -moz-border-radius: 0.5em;
    border-radius: 0.5em;
    opacity: 0.8;
    filter: alpha(opacity=80);
    text-align: center;
    position: absolute;
    background-color: #eeeeef;
    color: black;
    font-family: helvetica;
    font-size: 0.9em;
    line-height: 60px;
    width: 60px;
    height: 60px;
}
.flowchart-demo .window:hover {
    box-shadow: 2px 2px 19px #444;
    -o-box-shadow: 2px 2px 19px #444;
    -webkit-box-shadow: 2px 2px 19px #444;
    -moz-box-shadow: 2px 2px 19px #444;
    opacity: 0.6;
    filter: alpha(opacity=60);
}
</style>

