<template>
	<div class="tabWrapper">
    <swiper :options="swiperOption" v-if="fontArr">
      <swiper-slide v-for="(item,index) of fontArr" :key="index">
        <h2 
        	class="fontH2" 
        	:class="{'active': $store.state.activeFlag==index}" @click="handleActiveFontH2(index)"
        	>{{item}}</h2>
      </swiper-slide>
    </swiper>
	</div>
</template>

<script>
import Vue from 'vue'
export default {

  name: 'Tab',
  props: {
  	TabTitleArr: {
  		type: Array,
  		default: function () {
  			return ['全部','推荐','硬笔书法','软笔书法','成人书画','少儿绘画']
			}
  	}
  },
  data () {
    return {
    	fontArr: this.TabTitleArr,
			swiperOption: {
				slidesPerView : 3,
				centeredSlides : false,
				slidesPerView :'auto'
      }
    }
  },
  methods: {
  	handleActiveFontH2: function (index) {
  		this.$store.dispatch('changeActiveFlag',index)
  	}
  }
}
</script>

<style lang="stylus" scoped>
.tabWrapper >>> .swiper-slide
  width: auto !important
  margin-left: 15px
  margin-right: 15px
.tabWrapper
  width: 100%
  height: 40px
  padding-bottom: 10px
  .fontH2
    box-sizing: border-box
    width: auto
    height: 40px
    font-size: 15px  
    font-weight: bold
    line-height: 40px
    &.active
      font-size: 20px
      border-bottom: 5px solid #55b938
</style>