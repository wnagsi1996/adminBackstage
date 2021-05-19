<template>
	<el-form ref="loss" :model="loss" :rules="lossRule" label-width="80px" label-position="top">
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="人员" prop="user">
					<el-select v-model="loss.user" placeholder="" @focus="handUserList">
						<el-option v-for="item in allUserList" :label="item.username" :value="item.userid" :key="item.userid"></el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="损失选择" prop="loss">
					<el-select v-model="loss.loss" placeholder="">
						<el-option label="损失金额" value="0"></el-option>
						<el-option label="追回损失" value="1"></el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="损失金额" prop="money">
					<el-input v-model="loss.money"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item label="备注" prop="remark">
					<el-input type="textarea" v-model="loss.remark"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="24" style="text-align: center;">
				<el-button type="primary" @click="submitForm('loss')" :loading="btnLoading">提交</el-button>
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
	import {
		Form,
		FormItem,
		Row,
		Col,
		Input,
		Select,
		Option
	} from 'element-ui'
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	export default ({
		name: 'AddLoss',
		components: {
			[Form.name]: Form,
			[FormItem.name]: FormItem,
			[Select.name]: Select,
			[Option.name]: Option,
			[Row.name]: Row,
			[Col.name]: Col,
			[Input.name]: Input
		},
		data() {
			return {
				loss: {
					user: '',
					loss: '',
					money: '',
					remark: ''
				},
				lossRule: {
					user: [{
						required: true,
						message: '请选择人员',
						trigger: 'change'
					}],
					loss: [{
						required: true,
						message: '请选择损失',
						trigger: 'change'
					}],
					money: [{
							required: true,
							message: '请输入损失金额',
							trigger: 'blur'
						},
						{
							pattern: /^\d+(\.\d+)?$/,
							message: '损失金额必须为数字'
						}
					]
				},
				btnLoading: false,
				newuserList: []
			}
		},
		computed: {
			...mapGetters([
				'allUserList'
			])
		},
		methods: {
			//提交
			submitForm(loss) {
				this.$refs[loss].validate((valid) => {
					if (valid) {
						this.btnLoading = true;
						let {
							user,
							money,
							remark,
							loss
						} = this.loss;
						this.$api.addUserOutMoney({
							"userid": user,
							"outmoney": money,
							"remark": remark,
							"outtype": loss
						}).then(res => {
							if (res > 0) {
								this.$message.success('添加成功')
								this.$emit('dialogToggle', true);
								this.resetForm();
							} else {
								this.$message.warning('添加失败')
							}
							this.btnLoading = false;
						}).catch(xhr => {
							console.log(xhr)
							this.btnLoading = false;
							this.$message.warning('添加失败')
						})
					}
				})
			},
			resetForm() {
				this.$refs.loss.resetFields();
			},
			handUserList() {
				if (this.allUserList.length == 0) {
					this.getAllUserList()
				}
			},
			...mapActions([
				'getAllUserList'
			])
		}
	})
</script>

<style>
</style>
