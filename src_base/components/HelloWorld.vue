<template>
	<div>
		<p class="msg">{{msg}}</p>
	</div>
</template>

<script>
	export default { //配置对象(与Vue一致)
		data() { //在组件里面必须写函数
			return {
				msg: 'hello vue component'
			}
		}
	}
</script>

<style>
	.msg {
		color: red;
		font-size: 30px;
	}
</style>