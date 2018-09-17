<template>
	<div>
		<v-header></v-header>
		<v-tab></v-tab>
		<div class="content" ref="teaScrolllWrapper" :style="heightStyle">
			<div class="teaScrolllWrapperContent">
	 			<div
	 				v-for="num of 2" 
	 				:class="{'contentLeft': num%2==1 ,'contentRight': num%2==0 }" >
	 				<router-link 
	 					tag="div"
	 					:to="{
	 								name: 'TeacherDetail',
	 								params: {
	 									teaInfo:item
	 								}
 								}"
						class="teaWrapper" 
						v-for="(item,index) of filterTeacher" 
						:key="index" v-if="getFilterResult(index,num)"
					>
						<img class="teaImg" :src="item.img" />
						<h1 class="name"><span class="titleDesc iconfont icon-mingzi"></span>:{{item.name}}</h1>
						<h2 class="subject"><span class="titleDesc iconfont icon-zhuanye"></span>:{{item.subject}}</h2>
						<div class="remark"><span class="titleDesc iconfont icon-yiyuanjianjie"></span>:{{item.remark}}</div>
						<div class="level" v-for="(itemSub,indexSub) of item.level" :key="indexSub">
							<span class="iconfont icon-leaf-level"></span>{{itemSub}}
						</div>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import Header from '@/pages/common/components/Header.vue'
import Tab from '@/pages/common/components/Tab.vue'
import BScroll from 'better-scroll'
export default {

  name: 'Teacher',
  components: {
		'v-header': Header,
		'v-tab': Tab
  },
  data () {
    return {
    	teacher: [],
    	filterTeacher: [],
    	heightStyle: {
    		height: window.screen.height-100+'px'
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
        this.teacher = data.teacher
        this.refreshFilterTeaList()
      }
    },
    getFilterResult: function (index,num) {
    	let tmp = (index%2==num-1)
    	return tmp
    },
    refreshFilterTeaList: function () {
    	this.filterTeacher = []
    	for(let i=0;i<this.teacher.length;i++){
    		for(let j=0;j<this.teacher[i].subjectType.length;j++){
	    		if(this.teacher[i].subjectType[j]==this.$store.state.activeFlag){
	    			this.filterTeacher.push(this.teacher[i])
	    			//console.log(this.teacher[i])
	    		}
    		}
    	}
    }
  },
  computed: {
		activeFlag: function () {
			return this.$store.state.activeFlag
		}
  },
  watch: {
  	activeFlag: function () {
  		this.refreshFilterTeaList()
  	}
  },
  mounted: function () {
    this.getAjaxData()
		this.$nextTick(() => {
			if (!this.teaScroll) {
				this.teaScroll = new BScroll(this.$refs.teaScrolllWrapper, {
					click: true
				})
			} else {
				this.teaScroll.refresh()
			}
		})
  }
}
</script>

<style lang="stylus" scoped>
.content >>> .name
	padding: 10px 10px 0 10px
	font-size: 15px
	line-height: 18px
.content >>> .subject
	padding: 8px 10px 0 10px 
	font-size: 15px
	line-height: 18px
.content >>> .remark
	margin: 8px 10px 4px 10px
	font-size: 15px
	line-height: 17px
	display: -webkit-box   
	-webkit-box-orient: vertical    
	-webkit-line-clamp: 3  
	overflow: hidden
.content >>> .level
	padding: 4px 10px 0 10px
	font-size: 15px
	line-height: 18px
.content >>> .titleDesc
	color: #2e2e6f
	font-weight: bold
.content >>> .icon-leaf-level
	color: #286d28
.content
	width: 100%
	overflow: hidden
	.teaScrolllWrapperContent
		display: flex
		width: 100%
		.contentLeft
			width: 100%
			flex: 1
			.teaWrapper
				margin-right: 8px
				margin-bottom: 15px
				padding-bottom: 10px
				background: white
				border-radius: 10px
				overflow: hidden
				box-shadow: 6px 8px 4px #888888
				&:last-child
					margin-bottom: 10px
				.teaImg
					width: 100%
		.contentRight
			width: 100%
			flex: 1
			.teaWrapper
				margin-right: 8px
				margin-bottom: 15px
				padding-bottom: 10px
				background: white
				border-radius: 10px
				overflow: hidden
				box-shadow: 8px 8px 6px #888888
				.teaImg
					width: 100%
</style>