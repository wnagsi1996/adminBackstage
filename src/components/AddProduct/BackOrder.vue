<template>
	<el-form ref="product" :model="product" :rules="productRule" label-width="80px" label-position="top">
		<el-row :gutter="20">
			<template v-if="isorder">
				<el-col :span="8">
					<el-form-item label="留评单数量" prop="lpnum">
						<el-input v-model.number="product.lpnum" :placeholder="attrplaceholder.lp"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="免评单数量" prop="mpnum">
						<el-input v-model.number="product.mpnum" :placeholder="attrplaceholder.mp"></el-input>
					</el-form-item>
				</el-col>
			</template>
			<el-col :span="8">
				<el-form-item label="应退总产品费" prop="ytproductprice">
					<el-input v-model="product.ytproductprice"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="应退总佣金" prop="commission">
					<el-input v-model="product.commission"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="实退金额" prop="stmoney">
					<el-input v-model="product.stmoney"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="退款渠道" prop="channel">
					<el-select v-model="product.channel" placeholder="请选择退款渠道">
						<el-option v-for="item in paymentType" :key="item.value" :label="item.text" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="退款账号" prop="account">
					<el-input v-model="product.account"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="备注" prop="remark">
					<el-input v-model="product.remark"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span='12'>
				<el-form-item label="收款二维码" prop="imgsrc">
					<PaseImage :imgsrc="product.imgurl" @getImgSrc="getImgSrc" />
				</el-form-item>
			</el-col>
			<el-col :span="24" style="text-align: center;">
				<el-form-item>
					<el-button type="primary" @click="submitForm('product')" :loading="btnLoading">提交</el-button>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
	import {
		Form,
		FormItem,
		Input,
		Select,
		Option,
		Row,
		Col
	} from 'element-ui'
	import PaseImage from '@/components/PaseImage'
	import {paymentType} from '@/assets/js/orderState.js'
	export default ({
		name: 'BackOrder',
		components: {
			PaseImage,
			[Form.name]: Form,
			[FormItem.name]: FormItem,
			[Input.name]: Input,
			[Select.name]: Select,
			[Row.name]: Row,
			[Col.name]: Col,
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
				product: {
					lpnum: '',
					mpnum: '',
					ytproductprice: '',
					commission: '',
					stmoney: '',
					channel: '',
					account: '',
					remark: '',
					imgurl: ''
				},
				productRule: {
					lpnum: [{
							required: true,
							message: '请输入留评单数',
							trigger: 'blur'
						},
						{
							type: 'number',
							message: '留评单数必须为数字'
						}
					],
					mpnum: [{
							required: true,
							message: '请输入免评单数',
							trigger: 'blur'
						},
						{
							type: 'number',
							message: '免评单数必须为数字'
						}
					],
					ytproductprice: [{
							required: true,
							message: '请输入应退产品费金额',
							trigger: 'blur'
						},
						{
							pattern: /^\d+(\.\d+)?$/,
							message: '应退产品费金额必须为数字'
						}
					],
					commission: [{
							required: true,
							message: '请输入佣金金额',
							trigger: 'blur'
						},
						{
							pattern: /^\d+(\.\d+)?$/,
							message: '佣金金额必须为数字'
						}
					],
					stmoney: [{
							required: true,
							message: '请输入实退金额，没有则填写0',
							trigger: 'blur'
						},
						{
							pattern: /^\d+(\.\d+)?$/,
							message: '实退金额必须为数字'
						}
					],
					channel: [{
						required: true,
						message: '请选择收款渠道',
						trigger: 'change'
					}]
				},
				attrplaceholder: {
					lp: '1',
					mp: '1'
				},
				btnLoading: false,
				isorder: false, //是否是子单
				ordertype: 0,
				paymentType
			}
		},
		created() {
			this.isorderfun();
		},
		methods: {
			getordernonum() {
				this.$api.getCPOrderCanBackNum({
					orderno: this.orderno
				}).then(res => {
					//console.log(res)
					if (res != '') {
						this.attrplaceholder = {
							lp: `最多可退${res.lpnum}单`,
							mp: `最多可退${res.mpnum}单`
						}
					}
				}).catch(xhr => {
					console.log(xhr)
				})
			},
			//提交
			submitForm(product) {
				this.$refs[product].validate((valid) => {
					if (valid) {
						let {
							remark,
							ytproductprice,
							commission,
							stmoney,
							channel,
							account,
							mpnum,
							lpnum,
							imgurl
						} = this.product;
						if (account == "" && imgurl == "") {
							this.$message.warning('收款账户或二维码不能都为空')
						} else {
							this.btnLoading = true;
							this.$api.comitOrderGoBack({
								"orderno": this.orderno,
								"ordertype": this.ordertype,
								remark,
								"yskmoney_product": ytproductprice,
								"yskmoney_yj": commission,
								"tkmoney": stmoney,
								"sktype": channel,
								"skaccount": account,
								mpnum,
								lpnum,
								"_img64": imgurl
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
								console.log(xhr)
							})
						}
					}
				})
			},
			resetForm() {
				this.$refs.product.resetFields();
			},
			getImgSrc(val) {
				this.product.imgurl = val
			},
			isorderfun() {
				if (this.orderno.startsWith('D')) { //判断子单还是产品单
					this.isorder = false
					Object.assign(this.product, {
						mpnum: 0,
						lpnum: 0
					});
					Object.assign(this.attrplaceholder, {
						lp: '',
						mp: ''
					});
					this.ordertype = 1
				} else {
					this.isorder = true
					this.getordernonum();
					Object.assign(this.product, {
						mpnum: '',
						lpnum: ''
					});
					this.ordertype = 0
				}
			}
		},
		watch: {
			orderno(newVal, oldVal) {
				this.isorderfun();
			}
		}
	})
</script>

<style>
</style>
