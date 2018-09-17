<template>
	<div>
		<v-header></v-header>
		<v-bgswiper 
			:showImgBgFlag="showImgBgFlag"
			:bgImg="bgImg"
			@closeImgBg="handleShowImgBg()"
		>
		</v-bgswiper>

		<div class="swiperWrapper-hock">
		  <div class="swiperWrapper">
		    <swiper :options="swiperOption" v-if="bgImg">
		      <swiper-slide v-for="(item,index) of bgImg" :key="index">
		        <img class="swiper-img" :src="item" @click="handleShowImgBg()"/>
		      </swiper-slide>
		      <div class="swiper-pagination"  slot="pagination"></div>
		    </swiper>
		  </div>
		</div>

		<v-title :title="title"></v-title>

		<span class="text">{{introduction.desc}}</span>
	</div>
</template>

<script>
import axios from 'axios'
import Header from '@/pages/common/components/Header.vue'
import Bgswiper from '@/pages/common/components/Bgswiper.vue'
import Title from '@/pages/common/components/Title.vue'
export default {

  name: 'Introduction',
  components: {
		'v-header': Header,
		'v-bgswiper': Bgswiper,
		'v-title': Title
  },
  data () {
    return {
    	introduction: {},
			swiperOption: {
        pagination: '.swiper-pagination',
        loop:true,
				effect : 'cube',
				cube: {
				  slideShadows: true,
				  shadow: true,
				  shadowOffset: 100,
				  shadowScale: 0.6
				}
      },
    	bgImg: [
    		'/static/img/introduction/1.jpg',
    		'/static/img/introduction/2.jpg',
    		'/static/img/introduction/3.jpg',
    		'/static/img/introduction/4.jpg',
    		'/static/img/introduction/5.jpg'
    	],
    	showImgBgFlag: false,
    	title: '学校简介'
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
        this.introduction = data.introduction
      }
    },
  	handleShowImgBg: function () {
  		this.showImgBgFlag = !this.showImgBgFlag
  	}
  },
  mounted: function () {
    this.getAjaxData()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/pages/common/stylus/common.styl'
.swiperWrapper-hock
	width: 100%
	height: 0
	padding-bottom: 66.7%
	overflow: hidden
	.swiperWrapper >>> .swiper-pagination-bullets
		bottom: 25px
	.swiperWrapper
		width: 100%
		.swiper-img
			width: 100%
			height: 100%
.text
	text()
</style>