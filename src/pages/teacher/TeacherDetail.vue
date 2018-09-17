<template>
	<div>
		<v-pagetitle :titleFont="titleFont"></v-pagetitle>
		<img class="teaImg" v-if="teaInfo" :src="teaInfo.img"/>
		<span class="titleName">{{this.$route.params.teaInfo.name}}</span>
		<span class="subjectDes" v-for="(item,index) of getSubjectTypeDes(teaInfo.subjectType)" :key="index">&nbsp;&nbsp;{{item}}</span>
		<div class="text" v-if="this.teaInfo.remark">{{this.teaInfo.remark}}</div>
		<div class="level" v-for="(item,index) of this.teaInfo.level" :key="item">
			<span class="iconfont icon-leaf-level"></span>{{item}}
		</div>
		<div class="interval"></div>
		<v-title :title="titleReview"></v-title>

		<div class="reviewHeader">
			<div class="reviewHeader-left">
				<div class="point">{{this.teaInfo.score}}</div>
				<div class="title">综合评分</div>
			</div>
			<div class="reviewHeader-right">
				<div class="reviewHeader-right-line1">
					<div class="attitude">教授水平</div>
					<div class="star">
						<v-star :size="3" :score="4.2"></v-star>
					</div>
					<div class="score">{{this.teaInfo.score}}</div>
				</div>
				<div class="reviewHeader-right-line2">
					<div class="attitude">授课态度</div>

					<div class="star">
						<v-star :score="4.2"></v-star>
					</div>
					<div class="score">{{this.teaInfo.score}}</div>
				</div>
				<div class="reviewHeader-right-line3">
					<div class="reviewTimeTitle">参与评分人数</div>
					<div class="reviewTime">{{this.teaInfo.ratings.length}}个</div>
				</div>
			</div>
		</div>

		<div class="ratingsWrapper">
			<ul>
				<li class="ratingWrapper" v-for="(item,index) of this.teaInfo.ratings" :key="index">
					<div class="ratingLeft">
						<div class="imgWrapper">
							<img class="img" :src="item.avatar" />
						</div>
					</div>
					<div class="ratingRight">
						<div class="line1">
							<div class="tmp-hock">
								<div class="userName">{{item.username}}</div>
							</div>
							<div class="time">{{ item.rateTime | formatDate}}</div>
						</div>
						<div class="line2">
							<div class="star">
								<v-star :score="4.5"></v-star>
							</div>
						</div>
						<div class="rating">{{item.text}}</div>
						<div class="line4">
							<span class="icon iconfont icon-dianzan3" v-show="item.reviewType == 0"></span>
							<span class="icon iconfont icon-z-nolike" v-show="item.reviewType == 1"></span>
							<div class="itemSubject" v-for="(itemSub,index) of getSubjectTypeDes(teaInfo.subjectType)">
								{{itemSub}}
							</div>
						</div>


		  <div class="ratingImgs">
		    <swiper :options="swiperOption" v-if="item.imgs">
		      <swiper-slide v-for="(itemImg,index) of item.imgs" :key="index">
		        <img class="ratingImg" :src="itemImg" />
		      </swiper-slide>
		    </swiper>
		  </div>



<!-- 						<div class="ratingImgs">
							<img class="ratingImg" v-for="(itemImg,index) of item.imgs" :src="itemImg" />
						</div> -->


					</div>
				</li>
			</ul>
		</div>





		<div class="interval"></div>
	</div>
</template>

<script>
import axios from 'axios'
import Header from '@/pages/common/components/Header.vue'
import Pagetitle from '@/pages/common/components/PageTitle.vue'
import Title from '@/pages/common/components/Title.vue'
import Star from '@/pages/common/components/Star.vue'
import {formatDate} from '@/pages/common/js/date.js'
export default {

  name: 'TeacherDetail', 
  components: {
		'v-header': Header,
		'v-pagetitle': Pagetitle,
		'v-title': Title,
		'v-star': Star
  },
  data () {
    return {
    	teaInfo: this.$route.params.teaInfo,
    	titleFont: "导师详情",
    	titleReview: "留言&评论",
			swiperOption: {
        pagination: '.swiper-pagination',
        effect : 'coverflow',
				slidesPerView: 2,
				centeredSlides: true,
				coverflow: {
            rotate: 30,
            stretch: 10,
            depth: 50,
            modifier: 2,
            slideShadows : true
        }
      },
    }
  },
  methods: {
  	getSubjectTypeDes: function (typeArr) {
  		let tmpArr = []
  		for(let i=0;i<typeArr.length;i++){
  			if(typeArr[i]==2){
  				tmpArr.push("硬笔书法")
  			}else if(typeArr[i]==3){
  				tmpArr.push("软笔书法")
  			}else if(typeArr[i]==4){
  				tmpArr.push("成人国画")
  			}else if(typeArr[i]==5){
  				tmpArr.push("少儿绘画")
  			}
  		}
  		return tmpArr
  	}
  },
  mounted: function() {

  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/pages/common/stylus/common.styl'
.teaImg
	width: 100%
.titleName
	display: inline-block
	line-height: 50px
	font-size: 20px
	padding-left: 20px
.subjectDes
	display: inline-block
.text
	text()
	padding-top: 0
.level
	text()
	padding-top: 0
	padding-bottom: 10px
.icon-leaf-level
	color: #286d28
.reviewHeader
	margin-left: 20px
	margin-right: 20px
	display: flex
	border-bottom: .02rem solid rgba(7,17,27,0.1)
	.reviewHeader-left
		flex: 1
		margin: .36rem 0
		border-right: .02rem solid rgba(7,17,27,0.1)
		text-align: center
		.point
			padding-top: .18rem
			padding-bottom: .12rem
			font-size: .48rem
			color: rgb(255,153,0)
			line-height: .56rem
		.title
			padding-bottom: .16rem
			font-size: .24rem
			color: rgb(7,17,27)
			line-height: .4rem
	.reviewHeader-right
		flex: 1.7
		padding: .36rem .48rem .48rem .48rem
		.reviewHeader-right-line1, .reviewHeader-right-line2 
			padding-bottom: .16rem
			height: .36rem
			font-size: 0
			.attitude
				vertical-align: middle
				display: inline-block
				padding-right: .24rem
				font-size: .2rem
				color: rgb(7,17,27)
				line-height: .36rem
			.star
				vertical-align: middle
				display: inline-block
				padding-right: .24rem
				margin: 0 auto
				width: 110px
			.score
				vertical-align: middle
				display: inline-block
				font-size: .24rem
				color: rgb(255,153,0)
				line-height: .36rem
		.reviewHeader-right-line3
			.reviewTimeTitle
				display: inline-block
				padding-right: .24rem
				font-size: .2rem
				color: rgb(7,17,27)
				line-height: .36rem
			.reviewTime
				display: inline-block
				font-size: .24rem
				color: rgb(147,153,159)
				line-height: .36rem
.ratingsWrapper
	box-sizing: border-box
	width: 100%
	padding: .36rem
	.ratingWrapper
		padding-top: 10px
		padding-bottom: 10px
		border-bottom: .02rem solid rgba(7,17,27,0.1)
		display: flex
		width: 100%
		&:last-child
			border-bottom: none
		.ratingLeft
			box-sizing: border-box
			width: 10%
			.imgWrapper
				width: .56rem
				height: .56rem
				.img
					width: 100%
		.ratingRight
			box-sizing: border-box
			width: 90%
			.line1
				display: flex
				justify-content: space-between
				padding-bottom: .08rem
				.tmp-hock
					display: inline-block
					.userName
						display: inline-block
						font-size: .2rem
						color: rgb(147, 153, 159)
						line-height: .24rem	
				.time
					display: inline-block
					font-size: .24rem
					color: rgb(147, 153, 159)
					line-height: .24rem
					.userImgWrapper
						display: inline-block
						padding-left: .12rem
						width: .24rem
						height: .24rem
						.userImg
							width: 100%
			.line2
				padding-bottom: .12rem
				font-size: 0
				.star
					display: inline-block
					width: 100px
					vertical-align: middle
				.line2deliverTime
					display: inline-block
					font-size: .2rem
					font-weight: 200
					color: rgb(147, 153, 159)
					line-height: .24rem	
					vertical-align: middle
			.rating
				padding-bottom: .16rem
				font-size: .24rem
				color: rgb(7, 17, 27)
				line-height: .36rem	
			.line4
				font-size: 0
				.icon-dianzan3
					color: #0077fffa
					vertical-align: middle
				.icon-z-nolike
					color: #000
					vertical-align: middle
				.itemSubject
					display: inline-block
					margin-left: .16rem
					text-align: center
					padding-left: .12rem
					padding-right: .12rem
					border-radius: .1rem
					width: 1rem
					height: .32rem
					border: .01rem solid rgba(7, 17, 27,0.1)
					font-size: .18rem
					color: rgb(147, 153, 159)
					line-height: .32rem	
					overflow: hidden
					white-space: nowrap
					text-overflow: ellipsis
					vertical-align: middle
			.ratingImgs
				width: 100%
				margin-top: 10px
				.ratingImg
					width: 100%
					height: 100%

						
.interval
	interval()
</style>