<template>
  <div class="app-container">
    <title>规则链(thingsboard)所有功能</title>
    <div>
       导航左侧（用拖拽drag）
       1、各个方框静态由div创建出来。                                                                               
       2、每个鼠标hover上时背景颜色变暗（灰透明），挨着右侧显示个div框(节点名字及介绍)                                   
       3、从左侧拖拽到右侧过程中用个事件，显示弹窗，根据什么判断每一个对应一个框                                           
       4、弹窗中点击取消或X时,就不显示节点，意思就不能drop。点击确定才能drop                                             
    </div>
    <div>
      右面canvas
      1、从左面拖过来的节点名 付给json 绑定nodeArray model                                                           
      2、鼠标hover上背景颜色变暗（灰透明），挨着右侧也有个div框（显示从弹窗输入的名字和节点名）                            
      3、相同节点拖拽过来时 弹窗输入的名字不能相同                                                                       
      4、点中节点背景颜色变，右上角出现编辑（再点出现弹框：tab页详情、事件、帮助）和删除（此节点，如果连带线，一起删没）icon；        
      5、节点右键（详情、复制、删除）                                                                                   
      6、选中节点后也能右键？??（选择副本等，这个好复杂）                                                                  
      7、链接标签有几种形式（例如属性、true/false，还有什么东西）,怎么判断哪两个节点之间用哪个                                                 
      8、从一个节点开始连，出现选择标签的弹框，点击取消不连，点击确定，连上并把选择的标签显示在链接线上                            
      9、点中链接，线的颜色变，标签的右上交出现编辑(可编辑标签)和删除（此线，不能删节点）icon                                    
      10、右下角有三个大圆按钮删除（选中节点或链接时出来）、保存更改、撤销更改                                                
      11、右键点击空白有选择全部（点击右下角出现删除按钮，能全部删除）、保存更改、撤销更改                                
      12、
    </div>
  </div>
</template>
<script>

export default {
  name: 'newFile',
  data() {
    return {
      articleList: [],
      show: false
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
