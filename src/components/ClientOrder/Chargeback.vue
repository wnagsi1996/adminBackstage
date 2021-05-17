<template>
	<el-form ref="chargeback" :model="chargeback" :rules="chargebackRule" label-width="80px" label-position="top">
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="退款金额(人民币)" prop="money">
					<el-input v-model="chargeback.money"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="退款渠道" prop="channel">
					<el-select v-model="chargeback.channel" placeholder="请选择退款渠道">
						<el-option label="微信" value="0"></el-option>
						<el-option label="支付宝" value="1"></el-option>
						<el-option label="银行转账" value="2"></el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="退款账号" prop="account">
					<el-input v-model="chargeback.account"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="备注" prop="remark">
					<el-input v-model="chargeback.remark"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item label="收款二维码" prop="imgsrc">
					<PaseImage :imgsrc="chargeback.imgsrc" @getImgSrc="getImgSrc" />
				</el-form-item>
			</el-col>
			<el-col :span="24" style="text-align: center;">
				<el-form-item>
					<el-button type="primary" @click="submitForm('chargeback')" :loading="btnloading">立即提交</el-button>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
	import PaseImage from "@/components/PaseImage"
	import {
		Form,
		Row,
		Col,
		FormItem,
		Input,
		Select,
		Option
	} from 'element-ui'
	export default ({
		name: 'Chargeback',
		components: {
			PaseImage,
			[Form.name]: Form,
			[Row.name]: Row,
			[Col.name]: Col,
			[FormItem.name]: FormItem,
			[Input.name]: Input,
			[Select.name]: Select,
			[Option.name]: Option
		},
		props: {
			orderno: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				chargeback: {
					money: '',
					channel: '',
					account: '',
					remark: '',
					imgsrc: ''
				},
				chargebackRule: {
					money: [{
							required: true,
							message: '请输入返款金额',
							trigger: 'blur'
						},
						{
							pattern: /^\d+(\.\d+)?$/,
							message: '返款金额必须为数字',
							trigger: 'blur'
						}
					],
					channel: [{
						required: true,
						message: '请选择收款渠道',
						trigger: 'change'
					}]
				},
				btnLoading: false
			}
		},
		methods: {
			//提交
			submitForm(agent) {
				this.$refs[agent].validate((valid) => {
					if (valid) {
						let {
							account,
							imgsrc,
							remark,
							money,
							channel
						} = this.chargeback;
						if (account == "" && imgsrc == "") {
							this.$message({
								type: 'warning',
								message: '收款账户或二维码不能都为空!'
							});
						} else {
							this.btnLoading = true;
							this.$api.comitOrderGoBack({
								"orderno": this.orderno,
								"ordertype": 2,
								"remark": remark,
								"yskmoney_product": 0,
								"yskmoney_yj": 0,
								"tkmoney": money,
								"sktype": channel,
								skaccount: account,
								"mpnum": 0,
								"lpnum": 0,
								"_img64": imgsrc
							}).then(res => {
								console.log(res);
								if (res.rescode > 0) {
									this.$message.success('退单已提交给财务返款')
									this.$emit('dialogToggle', true);
									this.resetForm();
								} else {
									this.$message.warning(res.resdesc)
								}
								this.btnLoading = false;
							}).catch(xhr => {
								this.$message.warning('提交失败')
								console.log(xhr)
							})
						}
					}
				})
			},
			getImgSrc(val) {
				this.chargeback.imgsrc = val;
			},
			// 重置
			resetForm() {
				this.$refs.chargeback.resetFields();
			}
		}
	})
</script>

<style>
</style>
