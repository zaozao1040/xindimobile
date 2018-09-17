<template>
	<div class="imgBg" v-show="showImgBgFlag">
	  <div class="imgWrapper">
	    <swiper :options="swiperOption" v-if="bgImg">
	      <swiper-slide v-for="(item,index) of bgImg" :key="index">
	        <img class="swiper-img" :src="item" @click="handleShowImgBg()"/>
	      </swiper-slide>
	      <div class="swiper-pagination"  slot="pagination"></div>
	    </swiper>
	  </div>
	</div>
</template>

<script>
export default {

  name: 'Bgswiper',
  props: {
		showImgBgFlag: Boolean,
		bgImg: Array
  },
  data () {
    return {
			swiperOption: {
        pagination: '.swiper-pagination',
        loop:true,
        paginationType: 'fraction'
      }
    }
  },
  methods: {
  	handleShowImgBg: function () {
  		this.$emit('closeImgBg')
  	}
  }
}
</script>

<style lang="stylus" scoped>
.imgBg
	z-index: 99
	position: fixed
	top: 0
	left: 0
	right: 0
	bottom: 0
	background: black
	display: flex
	flex-direction: column
	justify-content: center
	.imgWrapper
		width: 100%
		height: 0
		padding-bottom: 66.87%
		overflow: hidden
		.swiper-img
			width: 100%
</style>