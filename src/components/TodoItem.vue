<template>
  <!--

  -->
  <li @mouseenter="handleShow(true)" @mouseleave="handleShow(false)" :style="{background:bgColor}">
    <!-- onmouseover="" onmouseout=""-->
    <label>
      <input type="checkbox" v-model="todo.complete"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="delItem">删除</button>
  </li>
</template>

<script>
    import Pubsub from 'pubsub-js'

    export default {
        props: {
            todo: Object,
            index: Number,
        },
        data() {
            return {
                bgColor: 'white',//默认背景颜色
                isShow: false // 标识按钮是否默认显示
            }
        },
        methods: {
            handleShow(isEnter) {
                if (isEnter) {
                    this.bgColor = 'gray'
                    this.isShow = true
                } else {
                    this.bgColor = 'white'//默认背景颜色
                    this.isShow = false // 标识按钮是否默认显示
                }
            },
            delItem() {
                const {todo, index, delTodo} = this;
                if (window.confirm(`确认删除${todo.title}`)) {
                    // delTodo(index),改为订阅消息
                    // 发布消息
                    Pubsub.publish('delTodo', index)
                }
            }
        }

    }
</script>

<style>

  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    display: none;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
</style>
