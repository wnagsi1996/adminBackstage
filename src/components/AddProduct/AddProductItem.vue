<template>
	<el-form ref="product" :model="product" :rules="productRule" label-width="80px" label-position="top">
		<el-row :gutter="20">
			<el-col :span="24">
				<el-form-item label="商品标题" prop="title">
					<el-input v-model="product.title"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="店铺名称" prop="stornName">
					<el-input v-model="product.stornName"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="品牌" prop="brand">
					<el-input v-model="product.brand"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="ASIN" prop="asin">
					<el-input v-model="product.asin"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="产品URL链接" prop="url">
					<el-input v-model="product.url"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="产品图片链接" prop="imgUrl">
					<el-input v-model="product.imgUrl"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="关键词" prop="keyword">
					<el-input v-model="product.keyword"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="关键词大概在第几页" prop="keywordPage">
					<el-input v-model.number="product.keywordPage"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="折扣码" prop="code">
					<el-input v-model="product.code"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="客单价(单位:美金)" prop="price">
					<el-input v-model="product.price"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="留评单数量" prop="lpnum">
					<el-input v-model.number="product.lpnum"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="免评单数量" prop="mpnum">
					<el-input v-model.number="product.mpnum"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="客单费加PP费（单位：美金)" prop="pp">
					<el-input v-model="product.pp"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="佣金(单位：人民币)" prop="commission">
					<el-input v-model="product.commission"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="应收款总金额(单位：人民币)" prop="ytotalPrice">
					<el-input v-model="totalMoney" readonly></el-input>
				</el-form-item>
			</el-col>
			<template v-if="dataObj.orderState==0">
				<el-col :span="6">
					<el-form-item label.number="实收款总金额(单位：人民币)" prop="stotalPrice">
						<el-input v-model="product.stotalPrice"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="支付选择" prop="channel">
						<el-select v-model="product.channel" placeholder="请选择支付选择">
							<el-option v-for="item in paymentType" :key="item.value" :label="item.text" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</template>
			<el-col :span="6">
				<el-form-item label="点赞（评论URL)" prop="reviewUrl">
					<el-input v-model="product.reviewUrl"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="下单要求" placeholder="此备注是卖家下单的要求,给放单人员看" prop="xdReamrk">
					<el-input type="textarea" v-model="product.xdReamrk"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="备注" prop="remark" placeholder="此备注是该产品录入自己的备注,给自己看">
					<el-input type="textarea" v-model="product.remark"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8" v-if="dataObj.orderState==0">
				<el-form-item label="财务备注" prop="cwRemark" placeholder="此备注给审核财务看的">
					<el-input type="textarea" v-model="product.cwRemark"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="24" style="text-align: center;">
				<el-form-item>
					<el-button type="primary" @click="submitForm('product')" :loading="btnLoading">立即创建</el-button>
					<el-button @click="resetForm('product')">重置</el-button>
				</el-form-item>
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
	import {paymentType} from '@/assets/js/orderState.js'
	export default ({
		name: 'AddProductItem',
		components: {
			[Form.name]: Form,
			[FormItem.name]: FormItem,
			[Row.name]: Row,
			[Col.name]: Col,
			[Input.name]: Input,
			[Select.name]: Select,
			[Option.name]: Option
		},
		props: {
			orderno: String,
			dataObj: {
				type: Object,
				default: new Object
			}
		},
		data() {
			return {
				paymentType,
				product: {
					title: '',
					stornName: '',
					brand: '',
					asin: '',
					url: '',
					imgUrl: '',
					keyword: '',
					keywordPage: '',
					code: '',
					price: '',
					lpnum: '',
					mpnum: '',
					pp: '',
					commission: '',
					ytotalPrice: '',
					stotalPrice: '',
					channel: '',
					reviewUrl: '',
					xdReamrk: '',
					remark: '',
					cwRemark: ''
				},
				productRule: {
					title: [{
						required: true,
						message: '请输入产品标题',
						trigger: 'blur'
					}],
					stornName: [{
						required: true,
						message: '请输入店铺名称',
						trigger: 'blur'
					}],
					brand: [{
						required: true,
						message: '请输入品牌名称',
						trigger: 'blur'
					}],
					asin: [{
						required: true,
						message: '请输入ASIN',
						trigger: 'blur'
					}],
					url: [{
						required: true,
						message: '请输入产品链接',
						trigger: 'blur'
					}],
					imgUrl: [{
							required: true,
							message: '请输入产品图片链接',
							trigger: 'blur'
						},
						{
							pattern: /\.(png|jpg|gif|jpeg)$/,
							message: '图片格式不正确'
						}
					],
					keywordPage: [{
						type: 'number',
						message: '关键词行数必须为数字值'
					}],
					price: [{
							required: true,
							message: '请输入产品客单价',
							trigger: 'blur'
						},
						{
							pattern: /^\d+(\.\d+)?$/,
							message: '请产品客单价必须为数字'
						}
					],
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
					pp: [{
							required: true,
							message: '请输入商品费+PP费',
							trigger: 'blur'
						},
						{
							pattern: /^\d+(\.\d+)?$/,
							message: '商品费+PP费输入必须为数字'
						}
					],
					commission: [{
							required: true,
							message: '请输入佣金',
							trigger: 'blur'
						},
						{
							pattern: /^\d+(\.\d+)?$/,
							message: '佣金必须为数字'
						}
					],
					ytotalPrice: [{
							required: true,
							message: '请输入应收款金额',
							trigger: 'blur'
						},
						{
							pattern: /^\d+(\.\d+)?$/,
							message: '应收款金额必须为数字'
						}
					],
					stotalPrice: [{
							required: true,
							message: '请输入实收款金额',
							trigger: 'blur'
						},
						{
							pattern: /^\d+(\.\d+)?$/,
							message: '实收款金额必须为数字'
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
		computed: {
			//计算应收款金额
			totalMoney() {
				let {
					mpnum,
					lpnum,
					pp,
					commission
				} = this.product;
				let rate = this.dataObj.rate;
				if (!isNaN(mpnum) != '' && !isNaN(lpnum) != '' && pp != '' && commission != '') {
					if (rate) {
						let totalPrice = (mpnum + lpnum) * Number(pp) * rate + Number(commission);
						return totalPrice.toFixed(2);
					}
				}
			}
		},
		created() {
			if (this.orderno != '') {
				this.getProductInfo(this.orderno)
			}
			// console.log(this.dataObj)
		},
		methods: {
			//提交测评订单信息
			submitForm(product) {
				this.product.ytotalPrice = this.totalMoney;
				this.$refs[product].validate((valid) => {
					if (valid) {
						let {
							title,
							stornName,
							brand,
							asin,
							url,
							imgUrl,
							keyword,
							keywordPage,
							code,
							price,
							lpnum,
							mpnum,
							pp,
							commission,
							ytotalPrice,
							stotalPrice,
							channel,
							reviewUrl,
							xdReamrk,
							remark,
							cwRemark
						} = this.product;
						if (keyword != '') {
							if (keyword.includes("\“") || keyword.includes("\"")) {
								this.$message.warning('关键词不能用双引号')
								return false
							}
						}
						this.btnLoading = true
						let {
							orderno,
							rate,
							orderState
						} = this.dataObj;
						this.$api.addProduct({
							orderno,
							"cporderno": this.orderno,
							rate,
							state:orderState,
							"realtotalmoney": stotalPrice,
							"sktype": channel,
							"cwremark": cwRemark,
							"KeyWord": keyword,
							"KeyWordPage": keywordPage ? keywordPage : '',
							"CouponCode": code,
							"HelpFulUrl": reviewUrl,
							"producttype": 0,
							lpnum,
							mpnum,
							"cpyj": commission,
							remark,
							"xdyq": xdReamrk,
							"productdj": price,
							"ProductPPMoney": pp,
							"sktotalmoney": ytotalPrice,
							"Asin": asin,
							"ProductTitle": title,
							"StoreName": stornName,
							"Brand": brand,
							"ProductUrl": url,
							"ProductImgUrl": imgUrl
						}).then(res => {
							console.log(res);
							let txt = ''
							if (this.orderno == '') {
								txt = '创建'
							} else {
								txt = '编辑'
							}
							if (res.rescode > 0) {
								this.$message.success(txt + '成功!')
								this.resetForm();
								this.$emit("dialogToggle", true);
							} else {
								this.$message.warning(res.resdesc)
							}
							this.btnLoading = false;

						}).catch(xhr => {
							this.$message.warning('提交失败')
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm() {
				this.$refs.product.resetFields();
			},
			//编辑获取测评订单信息
			getProductInfo(orderno) {
				this.$api.getCPOrderInfo({
					orderno
				}).then(res => {
					//console.log(res);
					if (res != '') {
						let obj = {
							title: res.ProductTitle,
							stornName: res.StoreName,
							brand: res.Brand,
							asin: res.Asin,
							url: res.ProductUrl,
							imgUrl: res.ProductImgUrl,
							keyword: res.KeyWord,
							keywordPage: Number(res.KeyWordPage),
							code: res.CouponCode,
							price: res.productdj,
							pp: res.ProductPPMoney,
							lpnum: res.lpnum,
							mpnum: res.mpnum,
							commission: res.cpyj,
							ytotalPrice: res.sktotalmoney,
							stotalPrice: res.realsktotalmoney,
							reviewUrl: res.HelpFulUrl,
							xdReamrk: res.xdyq,
							remark: res.remark,
						}
						Object.assign(this.product, obj);
					} else {
						this.resetForm()
					}
				}).catch(xhr => {
					console.log(xhr);
				})
			}
		},
		watch: {
			orderno(newVal, oldVal) {
				if (newVal != '') {
					this.getProductInfo(newVal)
				} else {
					this.resetForm()
				}
			}
		}
	})
</script>
