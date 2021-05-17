<template>
	<div class="sidebar">
		<div class="sidebar-title">后台管理系统</div>
		<div class="sidebar-box">
			<el-menu
				class="el-menu-vertical-demo"
				:collapse="false"
				:unique-opened="true"
				
				:collapse-transition="false"
				:text-color="variables.menuText"
				:active-text-color="variables.menuActiveText"
				mode="vertical">
					 <el-submenu :index="item.name" v-for="(item, index) in newmenulist" :key="index">
						<template slot="title">
						  <i :class="'el-icon-' + item.icon"></i>
						  <span slot="title">{{ item.name }}</span>
						</template>
						<el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children"  v-show="subItem.meta.roles[0]!='m1181'" :key="subIndex" @click="clickMenu(subItem)">
							<i :class="'el-icon-' + subItem.icon"></i>
							<span slot="title">{{ subItem.name }}</span>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-menu>
		</div>
	</div>
</template>

<script>
	import {Submenu,MenuItem,Menu} from 'element-ui'
	import { mapGetters } from "vuex";
	export default({
		name:'Sidebar',
		components:{
			[Submenu.name]:Submenu,
			[MenuItem.name]:MenuItem,
			[Menu.name]:Menu
		},
		computed:{
			...mapGetters(['permission_routes','menulist']),
			variables() {
			  return {
			    menuText: "#ffffff",  // "#bfcbd9"
			    menuActiveText: "#ffffff",
			    menuBg:  "#001529"
			   
			  };
			}
		},
		data(){
			return{
				newmenulist:[]
			}
		},
		watch:{
		},
		mounted() {
			this.getmenudata();
			let routerPath=this.$route;
			this.permission_routes.forEach(item=>{
				if(item.path==routerPath.path){
					let paremt=''
					if(Object.keys(routerPath.query).length > 0){
						Object.keys(routerPath.query).forEach(key=>{
							if(paremt==''){
								paremt='?'+key+'='+routerPath.query[key]
							}else{
								paremt+='&'+key+'='+routerPath.query[key]
							}
						})
					}
					item.path+=paremt
					this.$store.commit('tagsView/selectMenu', item)
				}
			})
			
		},
		methods:{
			getmenudata(){
				// console.log(this.menuList);
				let newmenuList=[];
				if(this.menulist.length>0){
					for(let i=0;i<this.menulist.length;i++){
						//构造新的路由菜单
						newmenuList.push({"name":this.menulist[i].text,"path":"/clientorder"+i,children:[]});
						let items=this.menulist[i].items;
						for(let ii=0;ii<items.length;ii++){
							for(let n=0;n<this.permission_routes.length;n++){
								if(this.permission_routes[n].meta && this.permission_routes[n].meta.roles){
									if(items[ii].id==this.permission_routes[n].meta.roles[0]){
										newmenuList[i].children.push(this.permission_routes[n]);
									}
								}
							}
							
						}
						//console.log(newmenuList[i])
					}
				}
				//newmenuList.unshift(menudata[0]);
				this.newmenulist=newmenuList;
				//console.log(this.newmenulist);
			},
			hasOneShowingChild(children = [],parent){
			   
			    const showingChildren = children.filter(item =>{
			        if(item.hidden){
			            return false
			        } else {
			            // 如果只有一个子菜单时设置
			            this.onlyOneChild = item
			            return true
			        }
			    })
			   
			    // 当只有一个子路由,子路由默认展示
			    if(showingChildren.length === 1){
			        return true
			    }
			    // 没有子路由则显示父路由
			    if(showingChildren.length === 0){
			        this.onlyOneChild = {...parent, path: '', noShowingChildren: true }
			        return true
			    }
			    //  console.log(this.onlyOneChild)
			    return false
			},
			resolvePath(basePath,routePath){
			    return path.resolve(basePath, routePath)
			},
			//选择标签跳转路由
			clickMenu(item) {
			  this.$router.push({ path: item.path })
			  this.$store.commit('tagsView/selectMenu', item)
			}
		}
	})
</script>

<style>
	.el-menu-item.is-active {
	    background: #1A86EE !important;
	}
	.sidebar {
	  width: 100%;
	  height: 100%;
	}
	.sidebar-title {
	  width: 100%;
	  height: 50px;
	  border-bottom: 1px solid #dcdfe6;
	  color: #ffffff;
	  box-sizing: border-box;
	  text-align: center;
	  line-height: 50px;
	  font-size: 16px;
	}
	.sidebar-box {
	  width: 100%;
	  height: calc(100% - 64px);
	  overflow-x: hidden;
	  overflow-y: auto;
	  -ms-overflow-style: none;
	  overflow: "-moz-scrollbars-none";
	  scrollbar-width: none; /*  火狐   */
	}
	.sidebar-box::-webkit-scrollbar {
	  display: none; /*  Chrome  */
	  width: 0 !important ; /*  Chrome  */
	}
	.el-menu{
		background-color: transparent !important;
	}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
	    width: 200px;
	    min-height: 400px;
	  }
	  .el-menu-item,.el-submenu__title,.el-menu-item i{
		  color: #fff !important;
	  }
</style>
