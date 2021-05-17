<template>
	<el-form ref="seller" :model="seller" :rules="sellerRule" label-width="80px" label-position="top">
		<el-row :gutter="20">
			<el-col :span="24">
				<el-form-item label="客户名称" prop="username">
					<el-input v-model="seller.username"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item label="联系人" prop="name">
					<el-input v-model="seller.name"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item label="联系方式" prop="contact">
					<el-input v-model="seller.contact"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="24" style="text-align: center;">
				<el-form-item>
					<el-button type="primary" @click="submitForm('seller')" :loading="btnLoading" close-on-click-modal="false">{{sellerID==''?'立即创建':'提交'}}</el-button>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
	import {
		Form,
		Row,
		Col,
		FormItem,
		Input,
		Button
	} from 'element-ui'
	export default ({
		name: 'SellerInfo',
		props: {
			sellerID: {
				type: String,
				default: ''
			}
		},
		components: {
			[Form.name]: Form,
			[Row.name]: Row,
			[Col.name]: Col,
			[FormItem.name]: FormItem,
			[Input.name]: Input,
			[Button.name]: Button
		},
		data() {
			return {
				seller: {
					username: '',
					name: '',
					contact: ''
				},
				sellerRule: {
					username: [{
						required: true,
						message: '请输入客户名称',
						trigger: 'blur'
					}, ],
					name: [{
						required: true,
						message: '请输入联系人',
						trigger: 'blur'
					}, ],
					contact: [{
						required: true,
						message: '请输入联系方式',
						trigger: 'blur'
					}, ]
				},
				sellerdata: [],
				btnLoading: false
			}
		},
		created() {
			this.getSellerInfo(this.sellerID);
		},
		methods: {
			//提交
			submitForm(seller) {
				this.$refs[seller].validate((valid) => {
					if (valid) {
						this.btnLoading = true;
						let {
							username,
							contact,
							name
						} = this.seller;
						this.$api.addOrEditCPHzsj({
							"rid": this.sellerID,
							"sjname": username,
							"sjlxfs": contact,
							"sjlxr": name
						}).then(res => {
							if (res.rescode > 0) {
								this.$message.success(res.resdesc)
								this.resetForm();
								this.$emit('dialogSellerinfoToggle', true);
							} else {
								this.$message.warning(res.resdesc)
							}
							this.btnLoading = false;
						}).catch(err => {
							this.$message.warning('设置失败')
							this.btnLoading = false;
						})
					} else {
						console.log('error submit!!');
					}
				})
			},
			//获取编辑信息
			getSellerInfo(rid) {
				if (rid != '') {
					this.$api.getSellerInfo({
						rid
					}).then(res => {
						if (res != '') {
							this.seller = {
								username: res.SJName,
								name: res.SJLXR,
								contact: res.SJLXFS
							}
						}
					}).catch(err => {
						this.$message.warning('获取商家信息出错')
						console.log(err);
					})
				} else {
					this.resetForm();
				}
			},
			//重置
			resetForm() {
				this.$refs.seller.resetFields();
			}
		},
		watch: {
			sellerID(newVal, oldVal) {
				this.getSellerInfo(newVal)
			}
		}
	})
</script>

<style>
</style>
