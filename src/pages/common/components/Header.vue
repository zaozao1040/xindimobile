<template>
	<div class="wrapper" >
		<div class="hTop-hock"></div>
		<div class="hTopBottom-hock">
			<div class="hTop">
				<div class="hLeft">
					<div class="logo-hock">
						<img class="logo" src='/static/img/header/logo.png'/>
					</div>
				</div>
				<div class="hRight">
					<transition enter-active-class="animated rubberBand">
						<span class="icon iconfont icon-zhankai" v-show="showIconFlag" @click="handleShowIcon()"></span>
					</transition>
					<transition enter-active-class="animated rubberBand">
						<span class="icon iconfont icon-zhankaianniuicon" v-show="!showIconFlag" @click="handleShowIcon()"></span>
					</transition>
				</div>
			</div>
			<transition 
				name="fade"
				enter-active-class="animated zoomInRight"
				leave-active-class="animated zoomOutLeft">
				<div class="hBottom" v-show="showIconFlag">
					<router-link to="/home/">
						<div class="title" @click="handleShowIcon()">
							<span class="iconfont icon-shouyedefuben"></span>&nbsp;&nbsp;首页
						</div>
					</router-link>
					<router-link to="/introduction/">
						<div class="title" @click="handleShowIcon()">
							<span class="iconfont icon-xuexiao"></span>&nbsp;&nbsp;学校简介
						</div>
					</router-link>
					<router-link to="/teacher/">
						<div class="title" @click="handleShowIcon()">
							<span class="iconfont icon-laoshi"></span>&nbsp;&nbsp;教师简介
						</div>
					</router-link>
					<router-link to="/works/">
						<div class="title" @click="handleShowIcon()">
							<span class="iconfont icon-shufa1"></span>&nbsp;&nbsp;作品欣赏
						</div>
					</router-link>
					<div class="title"><span class="iconfont icon-shouyedefuben"></span>&nbsp;&nbsp;课程培训</div>
					<div class="title"><span class="iconfont icon-xinwen"></span>&nbsp;&nbsp;新闻中心</div>
					<div class="title"><span class="iconfont icon-lianxi"></span>&nbsp;&nbsp;联系我们</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
export default {

  name: 'Header',

  data () {
    return {
    	showIconFlag: false
    }
  },
  methods: {
  	handleShowIcon: function () {
  		this.showIconFlag = !this.showIconFlag
  	}
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
	.hTop-hock
		width: 100%
		height: 60px
	.hTopBottom-hock
		z-index: 99
		position: absolute
		top: 0
		.hTop
			width: 100%
			height: 60px
			border-bottom 1px solid black
			display: flex
			justify-content: space-between
			overflow: hidden
			.hLeft
				flex: 0 0 70%
				.logo-hock
					width: 100%
					height: 0
					padding-bottom: 22.11%
					.logo
						width: 100%
			.hRight
				line-height: 60px
				margin-right: 15px
				text-align: center
				.icon
					display: inline-block
		.hBottom
			width: 100%
			padding: 10px 0
			background-color: rgba(255,255,255,0.5)
/*		&.fade-enter-active, &.fade-leave-active
			transition: all 2s     
		&.fade-enter, &.fade-leave-active
			opacity: 0 
			transform: translate(0,-265px)*/
			.title
				padding: 10px 15px
				font-size: 15px
				line-height: 15px
				color: black
			
</style>