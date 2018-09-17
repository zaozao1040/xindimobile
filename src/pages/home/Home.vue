<template>
	<div>
		<v-header></v-header>
	  <div class="swiperWrapper">
	    <swiper :options="swiperOption" v-if="bgImg">
	      <swiper-slide v-for="(item,index) of bgImg" :key="index">
	        <img class="swiper-img" :src="item" :style="heightStyle" />
	        <transition enter-active-class="animated fadeInDown">
		        <div class="fontWrapper" v-show="showFontFlag==0">
		        	<span class="fontDesc" v-if="home.title[index]">{{home.title[index][0]}}<br /><br />{{home.title[index][1]}}</span>
		        	<div class="btnWrapper">
			        	<span class="btn">了解更多</span>
			        	<span class="btn">作品展示</span>
		        	</div>
		        </div>
	        </transition>
	        <transition enter-active-class="animated fadeInDown">
		        <div class="fontWrapper" v-show="showFontFlag==1">
		        	<span class="fontDesc"  v-if="home.title[index]">{{home.title[index][0]}}<br /><br />{{home.title[index][1]}}</span>
		        	<div class="btnWrapper">
			        	<span class="btn">了解更多</span>
			        	<span class="btn">作品展示</span>
		        	</div>
		        </div>
	        </transition>
	      </swiper-slide>
	      <div class="swiper-pagination"  slot="pagination"></div>
	    </swiper>
	  </div>
	</div>
</template>

<script>
import axios from 'axios'
import Header from '@/pages/common/components/Header.vue'
export default {

  name: 'Home',
  components: {
		'v-header': Header
  },
  data () {
  	const self = this
    return {
    	home: {
	      "title": []
    	},
    	showFontFlag: -1,
      swiperOption: {
        pagination: '.swiper-pagination',
        loop:true,
        initialSlide: 0,
        autoplay:5000,
        speed: 1000,
				observer:true,
				effect : 'coverflow',
				slidesPerView: 1,
				centeredSlides: true,
				coverflow: {
            rotate: 30,
            stretch: 10,
            depth: 60,
            modifier: 2,
            slideShadows : true
        },
				//swiper从一个slide过渡到另一个slide结束时执行
				onSlideChangeEnd: function( swiper ){
					//console.log(swiper.realIndex)
					self.showFontFlag = swiper.realIndex
				},
				//swiper中所有img元素加载完成时执行
				onImagesReady: function( swiper ){
					self.showFontFlag = 0
				}
      },
    	bgImg: [
    		'/static/img/home/1.jpg',
    		'/static/img/home/2.jpg',
    		'/static/img/home/3.jpg'
    	],
    	heightStyle: {
    		height: window.screen.height-60+'px'
    	}
    }
  },
  methods: {
    getAjaxData: function () {
      axios.get('/api/xindi.json').then(this.handleGetDataSucc)
    },
    handleGetDataSucc: function (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.home = data.home
      }
    }
  },
  mounted: function () {
    this.getAjaxData()
  }
}
</script>

<style lang="stylus" scoped>
.swiperWrapper
	position: fixed
	flex-direction: column
	justify-content: center
	top: 60px
	left: 0
	right: 0
	bottom: 0
	overflow: hidden
	.swiper-img
		width: 100%
	.fontWrapper
		position: absolute
		left: 0
		bottom: 25%
		width: 100%
		display: flex
		flex-direction: column
		text-align: center
		.fontDesc
			font-size: 10px
			line-height: 15px
			color: #ffffffc7
			margin: 0 36px 20px 36px
		.btnWrapper
			display: flex
			justify-content: center
			height: 15px
			.btn
				display: inline-block
				padding: 0 25px
				margin: 0 5px
				border: 1px solid white
				border-radius: 2px
				height: 100%
				font-size: 15px
				line-height: 15px
				color: white
</style>