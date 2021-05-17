<template>
  <div>
	 <el-upload drag
	       :limit=limitNum
	       :auto-upload="false"
	       accept=".xlsx,.xls,.csv"
	       :action="UploadUrl()"
		   :before-upload="beforeUploadFile"
	       :on-change="fileChange"
	       :on-exceed="exceedFile"
	       :on-success="handleSuccess"
	       :on-error="handleError"
	       :file-list="fileList">
	    <i class="el-icon-upload"></i>
	    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
	    <div class="el-upload__tip" slot="tip">只能上传xlsx,xls,csv文件</div>
  	</el-upload>
  <br/>
  <el-button size="small" type="primary" @click="uploadFile" :loading="btnLoading">立即上传</el-button>
  <div class="download">
	  下载文档:
	  <el-link type="primary" :href="`${path}order.xlsx`" download="order.xlsx">上传订单模板</el-link>
	  <el-link type="primary" :href="`${path}review.xlsx`" download="review.xlsx">上传留评模板</el-link>
  </div>
  </div>
</template>

<script>
	import {Upload,Link} from 'element-ui'
  export default {
	  props:{
		orderno:{
			type:String,
			default:''
		}  
	  },
	  components:{
		[Upload.name]:Upload,
		[Link.name]:Link
	  },
    data() {
      return {
        limitNum: 1,  // 上传excell时，同时允许上传的最大数
        fileList: [],   // excel文件列表
		newtype:'',
		url:'',
		btnLoading:false,
		path: process.env.BASE_URL  //解析下载路径
      }
    },
	created() {
		this.fileList=[];
	},
    methods:{
      // 文件超出个数限制时的钩子
      exceedFile(files, fileList) {
        this.$message.warning(`只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`);
      },
      // 文件状态改变时的钩子
      fileChange(file) {
		this.fileList.push(file.raw) ;
      },
      // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
      beforeUploadFile(file) {
        console.log('before upload');
        console.log(file);
        let extension = file.name.substring(file.name.lastIndexOf('.')+1);
        //let size = file.size / 1024 / 1024;
        if(extension !== 'xlsx') {
          this.$message.warning('只能上传后缀是.xlsx的文件');
        }
      },
      // 文件上传成功时的钩子
      handleSuccess() {
        this.$message.success('文件上传成功');
      },
      // 文件上传失败时的钩子
      handleError() {
        this.$message.error('文件上传失败');
      },
      UploadUrl:function(){
       // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
        return ""
      },
      async uploadFile() {
		  let fileList=this.fileList;
        if (fileList.length === 0){
          this.$message.warning('请上传文件');
        } else {
			this.btnLoading=true;
          let form = new FormData();
          form.append('file', fileList[0]);
		  let res='';
		  try{
		  	if(this.orderno=='order'){ //上传订单文件
		  		 res=await this.$api.uploadcporderexcel(form);
		  	}else{ //上传留评文件
		  		 res=await this.$api.uploadcpreviewexcel(form)
		  	}
			this.btnLoading=false;
			if(res.rescode>0){
				this.$message.success('文件上传成功');
				this.$emit('dialogToggle',true);
			}else{
				this.$alert(res.resdesc, '提示', {
				  dangerouslyUseHTMLString: true
				});
			}
		  }catch(e){
			  this.btnLoading=false;
			  this.$message.error('文件上传失败');
		  }
        }
      }
    }
  }
  
</script>

<style scoped>
	.download{margin-top: 10px;}
	.download a{padding-right: 10px;}
</style>

