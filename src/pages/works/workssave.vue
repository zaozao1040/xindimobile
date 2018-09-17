<template>
	<div>
		<v-header></v-header>
		<v-tab :TabTitleArr="['成人书法','成人国画','少儿书法','少儿国画','素描水粉']"></v-tab>
		<div class="imgs">
			<img class="img" v-for="(item,index) of filterList" :key="index" :src="item.url">
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import Header from '@/pages/common/components/Header.vue'
import Tab from '@/pages/common/components/Tab.vue'
import BScroll from 'better-scroll'
export default {

  name: 'Works',
  components: {
		'v-header': Header,
		'v-tab': Tab
  },
  data () {
    return {
    	filterList: []
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
        this.works = data.works
        this.refreshFilterList()
      }
    },
    refreshFilterList: function () {
    	this.filterList = []
    	for(let i=0;i<this.works.length;i++){
    		if(this.works[i].type==this.$store.state.activeFlag){
    			this.filterList.push(this.works[i])
    		}
    	}
      console.log(this.filterList.length)
    }
  },
  computed: {
    activeFlag: function () {
      return this.$store.state.activeFlag
    }
  },
  watch: {
    activeFlag: function () {
      this.refreshFilterList()
    }
  },
  mounted: function () {
    this.getAjaxData()
  }
}
</script>

<style lang="stylus" scoped>
.imgs
  width: 100%
  .img
    box-sizing: border-box
    width: 100%
    padding: 10px
    border-radius: 30px
</style>