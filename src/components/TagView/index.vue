<template>
  <div class="tabs">
    <!--closable这里说明home是不能关闭的-->
    <el-tag
      :key="tag.name"
      v-for="(tag, index) in tags"
      :closable="tag.name !== '首页'"
      :disable-transitions="false"
      @close="handleClose(tag, index)"
      @click="changeMenu(tag)"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
    >
      {{ tag.name }}
    </el-tag>
  </div>
</template>

<script>
//import { mapState, mapMutations } from 'vuex'
import {Tag} from 'element-ui'
export default {
	data(){
		return{
			tags:[]
		}
	},
	components:{
		[Tag.name]:Tag
	},
  computed: {
    // ...mapState({
    //   tags: state => state.tabsList
    // })
	
  },
  mounted() {
  	this.tags=this.$store.state.tagsView.tabsList;
	
  },
  methods: {
    // ...mapMutations({
    //   close: 'closeTab'
    // }),
    //关闭标签
    handleClose(tag, index) {
      let length = this.tags.length - 1
      //vuex调方法的另一种写法
	  this.$store.commit("tagsView/closeTab",tag)
      //this.close(tag)
      // 如果关闭的标签不是当前路由的话，就不跳转
      if (tag.name !== this.$route.name) {
        return
      }
      // 关闭的标签是最右边的话，往左边跳转一个
      if (index === length) {
        this.$router.push({ name: this.tags[index - 1].name })
      } else {
        // 否则往右边跳转
        this.$router.push({ name: this.tags[index].name })
      }
    },

    //选择标签跳转路由
    changeMenu(item) {
      this.$router.push({ path: item.path })
      this.$store.commit('tagsView/selectMenu', item)
    }
  }
}
</script>

<style scoped>
.tabs {
  padding: 10px;
  box-shadow: 0 1px 0 #e1f0ff;
  }
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }

</style>
