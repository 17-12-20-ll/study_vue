<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对Vue的评论</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <Add :addComment="addComment"/>
      <!--组件中传值-->
      <List :comments="comments" :delComment="delComment"/>
    </div>
  </div>
</template>

<script>
    import Add from './components/Add.vue'
    import List from './components/List.vue'

    export default {
        data() {
            return {
                comments: [//数据在哪个组件，更新数据的行为就应该定义在哪个组件
                    {
                        name: 'BOB',
                        content: 'Vue is good'
                    },
                    {
                        name: 'Cat',
                        content: 'python is good'
                    },
                    {
                        name: 'Tom',
                        content: 'Go is good'
                    }
                ]
            }
        },
        methods: {
            //添加评论
            addComment(comment) {//unshift数组头部插入
                this.comments.unshift(comment)
            },
            //删除指定下标的评论
            delComment(index) {
                this.comments.splice(index, 1)
            }
        },
        components: {
            Add,
            List
        }
    }
</script>

<style>

</style>
