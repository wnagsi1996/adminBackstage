<template>
	<div class="headers">
		<div class="headers-left">
		    <div class="headers-left-box" :class="asideShow === false ? 'headers-left-active' : ''" @click="targetIcon">
		        <i class="el-icon-s-fold "></i>
		    </div>
		   <!-- <Breadcrumb /> -->
		</div>
		<div class="headers-right">
			<div class="headers-right-left">
				<el-tooltip class="item" effect="dark" :content="isFullscreen ? '取消全屏' : '全屏'" placement="bottom">
				    <i :class="isFullscreen ? 'el-icon-full-screen head-screen-news' : 'el-icon-rank head-screen'" @click="buttoncli"></i>
				</el-tooltip>
				<el-tooltip class="item" style="margin: 0 20px 0 10px; color: #171700" effect="dark" content="主题" placement="bottom">
					<i class="el-icon-picture-outline-round" @click="theme = true"></i>
				</el-tooltip>
			</div>
			<div class="headers-right-right">
			    <div class="block"><img :src="avatar" /></div>
			    <el-dropdown size="medium" @command="handleCommand">
			        <span class="el-dropdown-link">
			            {{account.length>0?account[0]:''}}({{userinfo}})<i class="el-icon-arrow-down el-icon--right"></i>
			        </span>
			        <el-dropdown-menu slot="dropdown">
			            <el-dropdown-item divided command="quit">退出登录</el-dropdown-item>
			        </el-dropdown-menu>
			    </el-dropdown>
			</div>
		</div>
		<el-drawer
		    :with-header="false"
		    :visible.sync="theme"
		    direction="rtl"
		    size='400px'
		    class="theme"
		    >
		    <div class="theme-title">配色方案</div>
		    <div class="theme-title-box">
		        <div class="theme-title-box-list" v-for="(item,index) in themeColor" :key="index" @click="targetThemeIndex(index)" :class="themeIndex === index ? 'theme-active' : ''">
		            <div class="theme-title-box-list-left" :style="item.aside"></div>
		            <div class="theme-title-box-list-right">
		                <div class="theme-title-box-list-right-top" :style="item.header"></div>
		                <div class="theme-title-box-list-right-bottom" :style="item.container"></div>
		            </div>
		        </div>
		    </div>
		</el-drawer>
	</div>
</template>

<script>
	const userItem=[
		{
			"id":"50",
			"name":"卖家端",
			"icon":require("../../assets/image/poho-01.png")
		},{
			"id":"51",
			"name":"买家端",
			"icon":require("../../assets/image/poho-02.png")
		},{
			"id":"52",
			"name":"财务",
			"icon":require("../../assets/image/poho-03.png")
		},{
			"id":"53",
			"name":"管理员",
			"icon":require("../../assets/image/poho-04.png")
		}
	];
	import {Dropdown,DropdownMenu,DropdownItem,Tooltip,Drawer} from 'element-ui'
	import { mapGetters } from "vuex";
	// 全屏组件
	import screenfull from 'screenfull'
	export default({
		name:'Headers',
		components:{
			[Dropdown.name]:Dropdown,
			[DropdownMenu.name]:DropdownMenu,
			[Tooltip.name]:Tooltip,
			[DropdownItem.name]:DropdownItem,
			[Drawer.name]:Drawer
		},
		props:{
		    asideShow: {
		        type: Boolean,
		        default: true
		    },
		    themeColor: {
		        type: Array,
		        default: new Array()
		    },
		    themeIndex: {
		        type: Number,
		        default: 0
		    }
		},
		computed:{
			...mapGetters(["account"]),
		},
		data(){
			return{
				setTime: null , //定时器
				theme: false ,// 主题 开关
				squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
				menuList:[],
				userinfo:'',
				avatar:'',
				isFullscreen:false  //全屏
			}
		},
		mounted() {
		    this.isFullscreen = document.body.scrollHeight === window.screen.height
			window.onresize = () => {
			  if(screenfull.isFullscreen==false){
				  this.isFullscreen=false
			  }
			}
		  this.userIdentity();
		},
		methods:{
			// 自定义 切换 侧边栏 事件
			targetIcon(){
				this.$emit('targetIcon',!this.asideShow)
			},
			 //用户身份
			 userIdentity(){
			   for(let i=0;i<userItem.length;i++){
				   if(userItem[i].id==this.account[1]){
					   this.userinfo=userItem[i].name
					   this.avatar=userItem[i].icon
				   }

				 }
			 },
			  // 退出登陆
			  handleCommand(){
				this.$store.dispatch('user/resetToken');
			  },
			  // 选取配色方案
			  targetThemeIndex(index){
				  this.$emit('targetThemeIndex',index)
			  },
			  // 全屏
			  buttoncli(){
				if (!screenfull.isEnabled) { // 如果不允许进入全屏，发出不允许提示
					  this.$message({
						  message: '不支持全屏',
						  type: 'warning'
					  })
					  return false
				  }
				  screenfull.toggle()
				  this.isFullscreen = !this.isFullscreen;
			  },
			  // 监控屏幕变化
			  checkFull() {
			      var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
			      // to fix : false || undefined == undefined
			      if (isFull === undefined) {
			          isFull = false;
			      }
			      return isFull;
			  }
		}
	})
</script>

<style scoped>
	.headers{
	    width: 100%;
	    height: 100%;
	    display: flex;
	    justify-content: space-between;
	}
	.headers-left{
	    display: flex;
	    justify-content: flex-start;
	}
	.headers-left-box{
	    transition: all 0.5s;
	    transform-origin: center center;
	    width: 20px;
	    height: 100%;
	    margin-right: 15px;
	}
	.headers-left-active{
	    transform: rotate(180deg);
	}
	.el-icon-s-fold{
	    width: 20px;
	    height: 100%;
	    line-height: 50px;
	    font-size: 20px;
	    cursor: pointer;
	    
	}
	.el-breadcrumb{
	    line-height: 50px;
	}
	.headers-right{
	    /* width: 200px; */
	    height: 100%;
	    /* background: orchid; */
	    display: flex;
	    justify-content: space-around;
	}
	.headers-right-left{
	    display: flex;
	    justify-content: space-around;
	    align-items: center;
	    margin-right: 30px;
	    font-size: 22px;
	    cursor: pointer;
	    position: relative;
	}
	.headers-right-left-screenIcon{
	    width: 18px;
	    height: 18px;
	    margin-right: 10px;
	    fill: currentColor; 
	    color: #413A3F;
	}
	.headers-right-left-githubIcon{
	    width: 20px;
	    height: 20px;
	    margin-right: 20px;
	    fill: currentColor; 
	    color: #413A3F;
	}
	.header-right-dropdown{
	    width: 300px;
	    height: auto;
	    position: absolute;
	    right: 0;
	    top: 60px;
	    z-index: 2;
	    background: #ffffff;
	    /* padding: 5px 0; */
	    box-sizing: border-box;
	    border-radius: 4px;
	    box-shadow: 0 1px 6px rgba(0,0,0,.2);
	    overflow: hidden;
	}
	/* .head-news-icon{
	    
	} */
	.head-screen{
	    margin-right: 15px;
	    transform: rotate(45deg);
	}
	.head-screen-news{
	    margin-right: 15px;
	}
	.headers-right-right{
	    display: flex;
	    justify-content: space-around;
	    align-items: center;
	    color: #666666;
	}
	.block{
	    margin-right: 15px;
	}
	.block img{
		width:40px;
	}
	.el-dropdown-link{
	    cursor: pointer;
	}
	.focusing{
	    border: none !important;
	}
	/* 主题 */
	.theme{
	    height: 100vh;
	    overflow: hidden;
	}
	.el-drawer__body{
	    height: 100vh !important;
	    overflow: hidden;
	}
	.theme-title{
	    width: 100%;
	    height: 50px;
	    line-height: 50px;
	    font-size: 16px;
	    font-weight: bold;
	    padding: 0 15px;
	    border-bottom: 1px solid #dcdfe6;
	}
	.theme-title-box{
	    padding: 10px;
	    box-sizing: border-box;
	    width: 100%;
	    display: flex;
	    justify-content: space-between;
	    flex-wrap: wrap;
	    height: calc(100vh - 51px);
	    overflow-x: hidden;
	    overflow-y: auto;
	    -ms-overflow-style: none; 
	    overflow: '-moz-scrollbars-none';
	    scrollbar-width: none;  /*  火狐   */
	    background: #F5F7F9;
	}
	.theme-title-box::-webkit-scrollbar {
	    display: none;  /*  Chrome  */
	    width: 0 !important ; /*  Chrome  */
	}
	.theme-title-box-list{
	    width: 180px;
	    height: 150px;
	    display: flex;
	    padding: 10px;
	    box-sizing: border-box;
	    background: #999999;
	    border-radius: 5px;
	    cursor: pointer;
	    margin-bottom: 10px;
	    border: 5px solid transparent;
	}
	.theme-title-box-list-left{
	    width: 30px;
	    height: 120px;
	}
	.theme-title-box-list-right{
	    flex: 1;
	    height: 160px;
	}
	.theme-title-box-list-right-top{
	    width: 100%;
	    height: 20px;
	    background: #ffffff;
	}
	.theme-title-box-list-right-bottom{
	    width: 100%;
	    height: 100px;
	}
	.theme-active{
	    border: 5px solid #05DA89;
	}
</style>
