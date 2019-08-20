<template>
  <div class="todo-footer">
    <label>
      <!--<input type="checkbox" v-model="isAllCheck"/>-->
      <slot name="checkAll"></slot>
    </label>
    <span>
      <!--<span>已完成{{completeSize}} / 全部{{todos.length}}</span>-->
      <slot name="count"></slot>
    </span>
    <!--<button class="btn btn-danger" v-show="completeSize" @click="delCompleteTodos">清除已完成任务</button>-->
    <slot name="delete"></slot>
  </div>
</template>

<script>
    export default {
        //父组件已经定义了插槽，所以子组件不需要再继续定义了
        /*props: {
            todos: Array,
            delCompleteTodos: Function,//清空完成任务
            selectAllTodos: Function // 全选/取消全选
        },*/

        /*computed: {
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
        }*/
    }
</script>

<style>
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>
