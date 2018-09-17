<template>
	<div>
		<v-header></v-header>
    <table class="table">
      <tr>
        <td rowspan="2" class="td_1">作品欣赏</td>
        <td class="td_2">
          <div class="tdDiv crsf" :class="{'current':this.numFlag == 0}"  @click="handleChangeNum(0)">
          </div>
          成人书法
        </td>
        <td class="td_2">
          <div class="tdDiv crgh" :class="{'current':this.numFlag == 1}"  @click="handleChangeNum(1)">
          </div>
          成人国画
        </td>
        <td class="td_2">
          <div class="tdDiv sesf" :class="{'current':this.numFlag == 2}"  @click="handleChangeNum(2)">
          </div>
          少儿书法
        </td>
      </tr>
      <tr>
        <td class="td_2">
          <div class="tdDiv segh" :class="{'current':this.numFlag == 3}"  @click="handleChangeNum(3)">
          </div>
          少儿国画
        </td>
        <td class="td_2">
          <div class="tdDiv smsf" :class="{'current':this.numFlag == 4}"  @click="handleChangeNum(4)">
          </div>
          素描水粉
        </td>
      </tr>
      <tr>
        <td rowspan="2" class="td_1">趣味活动</td>
        <td class="td_2">
          <div class="tdDiv pyx" :class="{'current':this.numFlag == 5}"  @click="handleChangeNum(5)">
          </div>
          皮影戏
        </td>
        <td class="td_2">
          <div class="tdDiv dwxn" :class="{'current':this.numFlag == 6}"  @click="handleChangeNum(6)">
          </div>
          端午香囊
        </td>
        <td class="td_2">
          <div class="tdDiv qwgj" :class="{'current':this.numFlag == 7}"  @click="handleChangeNum(7)">
          </div>
          趣味挂件
        </td>
      </tr>
      <tr>
        <td class="td_2">
          <div class="tdDiv bbhh" :class="{'current':this.numFlag == 8}"  @click="handleChangeNum(8)">
          </div>
          布包绘画
        </td>
        <td class="td_2">
          <div class="tdDiv sghb" :class="{'current':this.numFlag == 9}"  @click="handleChangeNum(9)">
          </div>
          手工绘本
        </td>
        <td class="td_2">
          <div class="tdDiv cl" :class="{'current':this.numFlag == 10}"  @click="handleChangeNum(10)">
          </div>
          春联
        </td>
      </tr>
    </table>


<!-- 
		<v-tab :TabTitleArr="['成人书法','成人国画','少儿书法','少儿国画','素描水粉']"></v-tab> -->
		<div class="imgs" ref="Scroll" :style="topStyle">
      <div>
        <img class="img" v-for="(item,index) of filterList" :key="index" :src="item.url" />
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

  name: 'Works',
  components: {
		'v-header': Header,
		'v-tab': Tab
  },
  data () {
    return {
    	filterList: [],
      numFlag: 0,
      topStyle: {}
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
    		if(this.works[i].type==this.numFlag){
    			this.filterList.push(this.works[i])
    		}
    	}
      //console.log(this.filterList.length)
    },
    handleChangeNum: function (num) {
      this.numFlag = num
      this.refreshFilterList()
    }
  },
  mounted: function () {
    console.log('mounted')
    this.getAjaxData()
    this.$nextTick(() => {
      if (!this.Scroll) {
        this.Scroll = new BScroll(this.$refs.Scroll, {
          click: true
        })
      } else {
        this.Scroll.refresh()
      }
    })
  },
  activated: function () {
    //console.log(document.body.offsetHeight)
    console.log('activated')
    this.topStyle.top = document.body.offsetHeight+ 10 + 'px'
  }
}
</script>

<style lang="stylus" scoped>
.table >>> .tdDiv
  margin: 5px auto 2px auto
  padding: 5px 0
  height: 30px
  width: 90px
  border-radius: 10px
  font-size: 15px
  font-weight: bold
  background-size: 100%
  &.current
    box-shadow: .12rem .15rem .1rem #888888
  &.crsf
    background-image: url('/static/img/works/tabImgs/crsf.jpg')
  &.crgh
    background-image: url('/static/img/works/tabImgs/crgh.jpg')
  &.sesf
    background-image: url('/static/img/works/tabImgs/sesf.jpg')
  &.segh
    background-image: url('/static/img/works/tabImgs/segh.jpg')
  &.smsf
    background-image: url('/static/img/works/tabImgs/smsf.jpg')
  &.pyx
    background-image: url('/static/img/works/tabImgs/pyx.jpg')
  &.dwxn
    background-image: url('/static/img/works/tabImgs/dwxn.jpg')
  &.qwgj
    background-image: url('/static/img/works/tabImgs/qwgj.jpg')
  &.bbhh
    background-image: url('/static/img/works/tabImgs/bbhh.jpg')
  &.sghb
    background-image: url('/static/img/works/tabImgs/sghb.jpg')
  &.cl
    background-image: url('/static/img/works/tabImgs/cl.jpg')
.table
  width: 100%
  border-collapse: collapse
  .td_1
    width: 20%
    text-align: center
    font-size: 17px
    font-weight: bold
  .td_2
    text-align: center
.imgs
  width: 100%
  position: fixed
  top: 300px
  bottom: 0
  overflow: hidden
  .img
    box-sizing: border-box
    width: 100%
    overflow: hidden
    padding: 10px
    border-radius: 30px
</style>