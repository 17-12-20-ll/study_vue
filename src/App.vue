<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader :addTodo="addTodo"/>
      <TodoList :todos="todos"/>
      <!-- <TodoFooter :todos="todos" :delCompleteTodos="delCompleteTodos" :selectAllTodos="selectAllTodos"/>-->
      <!--      插槽 slot : 是在父组件中计算好，传递过去的-->
      <todo-footer>
        <input type="checkbox" v-model="isAllCheck" slot="checkAll"/>
        <span slot="count">已完成{{completeSize}} / 全部{{todos.length}}</span>
        <button class="btn btn-danger" v-show="completeSize" @click="delCompleteTodos" slot="delete">清除已完成任务</button>
      </todo-footer>
    </div>
  </div>

</template>

<!--
  绑定事件监听
  触发事件

  订阅消息-> 绑定事件监听
  发布消息-> 触发事件
-->

<script>
    import PubSub from 'pubsub-js'
    import TodoHeader from "./components/TodoHeader";
    import TodoList from "./components/TodoList";
    import TodoFooter from "./components/TodoFooter";
    import storageUtil from './util/storageUtil'

    export default {
        data() {
            return {
                // 从localStorage读取todos,存储的是文本，深度监视
                // todos: JSON.parse(window.localStorage.getItem('todos_key') || '[]')// 存了数据就解析，没有数据就解析后面的空列表
                todos: storageUtil.readTodos()
            }
        },
        computed: {
            completeSize() {
                // 数组的累计操作，类似于python的reduce,
                return this.todos.reduce((preTotal, todo) => preTotal + (todo.complete ? 1 : 0), 0)
            },
            isAllCheck: {
                get() {
                    return this.completeSize === this.todos.length && this.completeSize // 当全部删除时，数量也相等，所以需要判断大于0
                },
                set(value) { // value 是当前checkbox最新的值
                    this.selectAllTodos(value)
                }
            }
        },
        mounted() {
            //订阅消息
            PubSub.subscribe('delTodo', (msg, index) => {  //可以进行隔组件传递值或者方法
                this.delTodo(index)
            })

        }
        ,
        methods: {
            addTodo(todo) {
                this.todos.unshift(todo)
            }
            ,
            delTodo(index) {
                this.todos.splice(index, 1)
            }
            ,
            //删除所有选中的todo
            delCompleteTodos() {
                this.todos = this.todos.filter(todo => !todo.complete)
            }
            ,
            //全选/全不选
            selectAllTodos(check) {
                this.todos.forEach(todo => todo.complete = check)
            }
        }
        ,
        watch: {
            //深度监视
            todos: {
                deep: true,
                /*handler:
                    function (val) {
                        //将todos最新的值的json数据,保存到localStorage
                        // window.localStorage.setItem('todos_key', JSON.stringify(val))
                        storageUtil.saveTodos(val) // 调用对象
                    }*/
                handler: storageUtil.saveTodos  //简化，因为回调函数也是和对象的方法一样的传了一个函数名，实质上也是传递了该函数的方法，实质如下：与上面的回调函数结构一致
                /*
                * saveTodos(todos) {
                     window.localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
                  }*/
            }
        }
        ,
        components: {
            TodoFooter,
            TodoHeader,
            TodoList
        }
    }
</script>

<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }

  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
