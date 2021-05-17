<template>
	<div>
		<el-row :gutter="20" class="title">
			<el-col :span="12">关键字</el-col>
			<el-col :span="4">可放单数</el-col>
			<el-col :span="4">数量</el-col>
			<el-col :span="4">操作</el-col>
		</el-row>
		<el-row class="table-info" :gutter="20" v-for="(item,index) in dataObj" :key="index">
			<el-col :span="12">{{item.keyword | keywordNull}}</el-col>
			<el-col :span="4">{{item.canfdnum}}</el-col>
			<el-col :span="4">
				<el-input type="text" size="mini" v-model.number="item.num" onkeyup="value=value.replace(/[^\d]/g,'')" @input="onInput()"></el-input>
			</el-col>
			<el-col :span="4">
				<el-button type="primary" size="mini" @click="submit(item)">提交</el-button>
			</el-col>
		</el-row>
		<div class="tableMag">
			<el-button type="primary" @click="allSubmit()" :loading="btnLoading">全部提交</el-button>
		</div>
	</div>
</template>

<script>
	import {
		Row,
		Col,
		Input
	} from 'element-ui'
	let fdNum = 0; //放单数量
	let keywordfdnum = []; //关键词对应放单数量{keyword:num,fdnum:num}
	export default ({
		name: 'BatchSend',
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
			[Input.name]: Input
		},
		props: {
			orderno: {
				type: String,
				default: ''
			},
			dataObj: {
				type: Array,
				default: new Array()
			}
		},
		data() {
			return {
				number: '',
				btnLoading: false
			}
		},
		created() {
			this.assignment();
		},
		methods: {
			//格式化
			assignment() {
				this.dataObj.forEach(item => item.num = 0);
			},
			//单个提交
			submit(row) {
				if (row.num > row.canfdnum) {
					this.$message.warning('放单数量不能大于可放数量');
				} else {
					keywordfdnum = [{
						'keyword': row.keyword,
						'fdnum': row.num
					}];
					fdNum = Number(row.num);
					this.submitAjax();
				}
			},
			// 全部提交
			allSubmit() {
				let dataObj = this.dataObj;
				dataObj.forEach(item => {
					if (item.num > item.canfdnum) {
						this.$message.warning('关键词' + item.keyword + '的放单数量不能大于可放数量')
						return false;
					}
					keywordfdnum.push({
						'keyword': item.keyword,
						'fdnum': item.num
					});
					fdNum += Number(item.num);
				});
				if (dataObj.length == keywordfdnum.length) {
					this.submitAjax();
					this.btnLoading = true;
				}
			},
			//提交数据
			submitAjax() {
				this.$api.setKeyWordFDNum({
					orderno: this.orderno,
					keywordfdnum: JSON.stringify(keywordfdnum)
				}).then(res => {
					console.log(res);
					if (res.rescode > 0) {
						if (fdNum == res.resdesc) {
							this.$message.success('放单成功')
						} else {
							let num = Number(fdNum) - Number(res.resdesc);
							this.$message.success('成功放单' + res.resdesc + ',失败' + num)
						}
						if (keywordfdnum.length > 1) {
							this.$emit('dialogToggle', true);
						} else {
							this.dataObj.forEach((item, index) => {
								if (item.keyword == keywordfdnum[0].keyword) {
									this.dataObj[index].num = 0;
									this.onInput();
								}
							})
						}
						keywordfdnum = [];
						fdNum = 0;
					} else {
						this.$message.warning('提交失败')
					}
					this.btnLoading = false;
				}).catch(xhr => {
					console.log(xhr);
					this.btnLoading = false;
					this.$message.warning('提交失败')
				})
			},
			onInput() {
				this.$forceUpdate();
			}
		},
		watch: {
			dataObj(newVal, oldVal) {
				this.assignment();
			}
		},
		filters: {
			keywordNull(val) {
				return val==''?'无关键字':val;
			}
		}
	})
</script>

<style scoped>
	.title {
		font-weight: bold;
		height: 50px;
	}

	.table-info {
		height: 50px
	}
</style>
