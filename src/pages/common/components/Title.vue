<template>
	<div class="titleWrapper">
		<h1 class="title">{{this.title}}</h1>
	</div>
</template>

<script>
export default {

  name: 'Title',
  props: {
		title: String
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="stylus" scoped>
.titleWrapper
	position: relative
	height: 50px
	margin: auto 20px
	border-bottom: 1px solid rgba(7,17,27,0.5)
	.title
		line-height: 50px
		font-size: 20px
</style>