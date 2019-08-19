<template>
  <div class="col-md-8">
    <h3 class="reply">评论回复：</h3>
    <!--当数据不在时，直接显示字体，因为使用了热模型替换，只更新了对应的组件内容-->
    <h2 v-show="comments.length===0">暂无评论，点击左侧添加评论！！！</h2>
    <ul class="list-group">
      <Item v-for="(comment,index) in comments" :key="index" :comment="comment" :delComment="delComment"
            :index="index"/>
    </ul>
  </div>
</template>

<script>
    import Item from './Item.vue'

    export default {
        //声明接收属性：这个属性就会成为模板属性
        props: ['comments', 'delComment'], //只指定属性名
        components: {
            Item
        }
        /*data() {
          return {

          }
        }*/
    }
</script>

<style>
  .reply {
    margin-top: 0px;
  }
</style>
