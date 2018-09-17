<template>
	<div>
		<router-link tag="div" class="header-abs" to="/teacher/" v-show="showHeaderFlag">
			<span class="iconfont icon-return"></span>
		</router-link>
		<div class="header"
			v-show="!showHeaderFlag"
			:style="opacityStyle">
			<router-link to="/teacher/">
				<span class="iconfont icon-return"></span>
			</router-link>
			<div class="header-titleWarpper">
				{{this.titleFont}}
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {

  name: 'PageTitle',
  props: {
  	titleFont: String
  },
  data () {
    return {
    	showHeaderFlag: true,
			opacityStyle: {
				opacity: 0
			}
    }
  },
	methods: {
		handleScroll: function () {
			const top = document.documentElement.scrollTop
			//console.log(top)
			if (top > 60){
				/*opacity不能大于一，这里取一个160的值为透明度为1的临界点*/
				let opacity = top / 200
				opacity = opacity > 1 ? 1 : opacity
				this.opacityStyle = {
					opacity: opacity
				}
				this.showHeaderFlag = false
			} else {
				this.showHeaderFlag = true
			}
		}
	},
 	mounted: function () {
		window.addEventListener('scroll',this.handleScroll,true)
  }
}
</script>

<style lang="stylus" scoped>
.header-abs
	position: absolute
	left: 10px
	top: 10px
	width: 40px
	weight: 40px
	text-align: center
	border-radius: 40px
	background: rgba(0,0,0,.8)
	.icon-return
		color: #fff
		font-size: 30px
		line-height: 40px
.header
	z-index: 51
	position: fixed
	top: 0
	left: 0
	width: 100%
	height: 60px
	text-align: center
	background: #33a014
	.icon-return
		position: absolute
		left: 10px
		top: 10px
		width: 40px
		weight: 40px
		text-align: center
		color: #fff
		font-size: 30px
		line-height: 40px
	.header-titleWarpper
		font-size: .4rem
		line-height: 1.2rem
		color: #fff
	
</style>