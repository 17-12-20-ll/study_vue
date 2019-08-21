import Vue from 'vue'
import App from './App.vue'
import {Button} from 'mint-ui';
import 'mint-ui/lib/style.css'


// 注册成标签(全局注册，所有其他主键都可以使用)
Vue.component(Button.name, Button);  //每一个主键都有一个属性代表 'mt-button' Button.name
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
