<template>
	<div class="star-wrapper">
		<div class="starImg-wrapper" v-for="index of 5" :key="index">
			<img class="starImg" :src="handleShowStars(index)" />
		</div>
	</div>
</template>

<script>
export default {

  name: 'Star',
  props: {
  	score: Number
  },
  data () {
    return {

    }
  },
  methods: {
		handleShowStars: function (index) {
			let url = ''
			if( this.score <= index-1){
				url = "static/img/star/star24_off@2x.png"
			} else if ( this.score > index-1 && this.score < index ) {
				url = "static/img/star/star24_half@2x.png"
			} else if ( this.score >= index ){
				url = "static/img/star/star24_on@2x.png"
			}
			return url
  	}
  }
}
</script>

<style lang="stylus" scoped>
.star-wrapper
	width: 100%
	height: 0
	padding-bottom: 15%
	display: flex
	.starImg-wrapper
		flex: 1
		text-align: center
		.starImg
			width: 71.42%
</style>