<template>
	<div class="home">
		<el-button type="success" size="small" class="lookEcharts" @click="$router.push({ path: '/index' })">查看工位
		</el-button>
		<div class="homeConter">
			<div class="homeUpBox">
				<div class="homeUpLeft">
					<div class="homeUpLeftEcharts" id="homeEcharts"></div>
					<div class="homeUpLeng">
						<div class="lampBox">
							<div class="lamp">
								<span></span>
								<p>运行正常</p>
							</div>
							<div class="lamp">
								<span style="background-color:#f6ba20"></span>
								<p>质量开启后台</p>
							</div>
							<div class="lamp">
								<span style="background-color:#de0000"></span>
								<p>PLC与MES断连</p>
							</div>
						</div>
					</div>
				</div>
				<div class="homeUpRight">
					<div class="homeNumber">
						设备总连接数&nbsp;:<span>&nbsp;{{this.Number.num}}</span>
					</div>
					<div class="homeWaring">
						<div class="homeNumberBox">
							<span v-if="this.Number.normal>0" class="isRed">{{this.Number.normal}}</span>
							<span v-else>{{this.Number.normal}}</span>
							<p>PLC未响应</p>
						</div>
						<div class="homeNumberBox">
							<span v-if="this.Number.MES>0" class="isRed">{{this.Number.MES}}</span>
							<span v-else>{{this.Number.MES}}</span>
							<p>MES未连接</p>
						</div>
						<div class="homeNumberBox">
							<span v-if="this.Number.Quality>0" class="isYellow">{{this.Number.Quality}}</span>
							<span v-else>{{this.Number.Quality}}</span>
							<p>质量后台开启</p>
						</div>
					</div>
				</div>
			</div>
			<div class="homedownBox">
				<div class="homeSearch">
					<el-button type="success" class="open" v-if="!isShow" @click="isShow = true" icon="el-icon-menu"
						size="small"></el-button>
					<el-button type="danger" class="close" v-if="isShow" @click="isShow = false" icon="el-icon-error"
						size="small"></el-button>
					<div class="search2" v-show="isShow">
						<el-row :gutter="20" type="flex">
							<!--<el-col :span="5">
								<el-select size="small" v-model="newArea" placeholder="选择区域" clearable @change="changeArea">
									<el-option v-for="item in optionsArea" :key="item.value" :label="item.label"
										style="width: 100%;"></el-option>
								</el-select>
							</el-col> -->
							<el-col :span="5">
								<!-- <el-date-picker size="small" v-model="newDate" type="daterange" align="center"
									unlink-panels range-separator="至" start-placeholder="开始日期" value-format="yyyy-MM-dd"
									end-placeholder="结束日期" :picker-options="pickerOptions" @change="search"
									:clearable="false">
								</el-date-picker> -->

								<el-date-picker size="small" v-model="newDate" type="daterange"
									:picker-options="pickerOptions" value-format="yyyy-MM-dd" range-separator="至"
									start-placeholder="开始日期" end-placeholder="结束日期" @change="search" align="right">
								</el-date-picker>
							</el-col>
							<!-- <el-col :span="5">
								<el-button type="success" @click="search">查询</el-button>
							</el-col> -->
						</el-row>
					</div>
				</div>


				<div class="homeDownEcharts" id="echarts1"></div>
				<div class="homeDownEcharts" id="echarts2"></div>
				<div class="homeDownEcharts" id="echarts3"></div>
			</div>

		</div>
	</div>
</template>

<script>
	var data = []
	//data.push({ name: '1', value: [0, 0, 120, 1, 4] })
	//data.push({ itemStyle: { normal: { color: '#1bbcf3' } }, name: '2', value: [0, 120, 220, 1, 4] })
	//data.push({ itemStyle: { normal: { color: 'lightgreen' } }, name: '3', value: [0, 0, 150, 2, 4] })
	//data.push({ itemStyle: { normal: { color: '#61a0a8' } }, name: '4', value: [0, 0, 200, 3, 4] })
	//data.push({ itemStyle: { normal: { color: '#715881' } }, name: '5', value: [0, 0, 200, 4, 4] })
	//// data.push({ itemStyle: { normal: { color: '#715881' } }, name: '2011', value: [0, 0, 200, 5, 5] })
	//data.push({ name: '6', value: [1, 0, 250, 1, 3] })
	//data.push({ name: '7', value: [1, 0, 280, 2, 3] })
	//data.push({ itemStyle: { normal: { color: '#91c7ae' } }, name: '8', value: [1, 0, 280, 3, 3] })
	//// data.push({ itemStyle: { normal: { color: 'lightgreen' } }, name: '2012', value: [0, 150, 350, 200] })
	//// data.push({ itemStyle: { normal: { color: 'lightgreen' } }, name: '2012', value: [1, 250, 320, 200] })
	//data.push({ name: '9', value: [2, 0, 330, 1, 1] })
	//data.push({ itemStyle: { normal: { color: '#2f4554' } }, name: '10', value: [3, 0, 430, 1, 2] })
	//data.push({ itemStyle: { normal: { color: 'lightgreen' } }, name: '11', value: [3, 0, 230, 2, 2] })


	data.push({
		name: '1',
		value: [0, 0, 120, 1, 1]
	})
	data.push({
		itemStyle: {
			normal: {
				color: '#1bbcf3'
			}
		},
		name: '2',
		value: [0, 120, 220, 1, 1]
	})
	data.push({
		itemStyle: {
			normal: {
				color: 'lightgreen'
			}
		},
		name: '3',
		value: [0, 220, 320, 1, 1]
	})

	data.push({
		name: '4',
		value: [1, 0, 80, 1, 5]
	})
	data.push({
		itemStyle: {
			normal: {
				color: '#1bbcf3'
			}
		},
		name: '5',
		value: [1, 80, 150, 1, 5]
	})
	data.push({
		itemStyle: {
			normal: {
				color: 'lightgreen'
			}
		},
		name: '6',
		value: [1, 150, 200, 1, 5]
	})

	data.push({
		name: '7',
		value: [1, 0, 110, 2, 5]
	})
	data.push({
		name: '8',
		value: [1, 110, 220, 2, 5]
	})
	data.push({
		itemStyle: {
			normal: {
				color: '#91c7ae'
			}
		},
		name: '9',
		value: [1, 220, 330, 2, 5]
	})

	data.push({
		name: '10',
		value: [1, 0, 110, 3, 5]
	})
	data.push({
		name: '11',
		value: [1, 110, 220, 3, 5]
	})
	data.push({
		itemStyle: {
			normal: {
				color: '#91c7ae'
			}
		},
		name: '12',
		value: [1, 220, 330, 3, 5]
	})

	data.push({
		name: '13',
		value: [1, 0, 110, 4, 5]
	})
	data.push({
		name: '14',
		value: [1, 110, 220, 4, 5]
	})
	data.push({
		itemStyle: {
			normal: {
				color: '#91c7ae'
			}
		},
		name: '15',
		value: [1, 220, 330, 4, 5]
	})

	data.push({
		name: '16',
		value: [1, 0, 110, 5, 5]
	})
	data.push({
		name: '17',
		value: [1, 110, 220, 5, 5]
	})
	data.push({
		itemStyle: {
			normal: {
				color: '#91c7ae'
			}
		},
		name: '18',
		value: [1, 220, 330, 5, 5]
	})

	data.push({
		name: '19',
		value: [1, 0, 100, 1, 5]
	})
	data.push({
		name: '20',
		value: [1, 0, 200, 1, 5]
	})
	data.push({
		itemStyle: {
			normal: {
				color: '#91c7ae'
			}
		},
		name: '21',
		value: [1, 0, 300, 1, 5]
	})
	data.push({
		name: '22',
		value: [2, 0, 330, 1, 1]
	})
	data.push({
		itemStyle: {
			normal: {
				color: '#2f4554'
			}
		},
		name: '23',
		value: [3, 0, 430, 1, 2]
	})
	data.push({
		itemStyle: {
			normal: {
				color: 'lightgreen'
			}
		},
		name: '24',
		value: [3, 0, 230, 2, 2]
	})
	// 引入封装好的接口
	import moment from 'moment';
	import {
		Equipment_LJList,
		EquipmentTypeeList,
		PYJKList,
		EchartsList
	} from "@/api/api.js";
	export default {

		data() {
			return {
				isShow: true, // 图表互斥时间	
				newDate: [
					moment().subtract(0, "days").format("YYYY-MM-DD"),
					moment().subtract(0, "days").format("YYYY-MM-DD")
				],
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				newArea: '全部', // 选择区域默认值,
				Number: {
					num: 100,
					normal: 5,
					MES: 0,
					Quality: 0
				},
				EquipmentTypeList: {
					NSC4: [],
					P68: [],
					MTZ2: [],
					NW: [],
					chassis: [],
					NT: [],
					ACC: [],
				},
				QualityList: [],
				normalList: [],
				PLCMESList: [],
				KanBanTwoXGX: ['A', 'B', 'C', 'D', 'E', 'F'],
				KanBanTwoXGY: [12, 22, 32, 43, 57, 87],
				PLCList: {
					X: [],
					Y: [],
				},
				MESList: {
					X: [],
					Y: [],
				},
				HTList: {
					X: [],
					Y: [],
				},
			};
		},
		methods: {

			toggle2() {
				this.istoggle2 = !this.istoggle2
			},

			//获取设备总链接数
			async getNmuber() {
				let result = await Equipment_LJList();
				if (result.status == "200") {
					this.Number = result.list[0]
				}
			},

			renderItem(params, api) {
				let categoryIndex = api.value(0)
				let start = api.coord([categoryIndex, api.value(1)])
				let end = api.coord([categoryIndex, api.value(2)])
				let width = api.size([0, api.value(2)])[0] * 0.8
				const num = api.value(4) // 每个系列柱子数
				const currentIndex = api.value(3)
				const isOdd = num % 2 === 0
				const midN = isOdd ? num / 2 : (num + 1) / 2

				var rect = ''

				width = width / num

				let rectX = start[0] - width / 2

				const FIXED_WIDTH = 0 // 柱子间距

				// 数据处理，结构为 { itemStyle: { normal: { color: 'lightgreen' } }, name: '2011', value: [0, 0, 150, 2, 5] }
				// 其中value 分为五个维度，分别为{系列项}（从0开始）、y轴起始值(均为0)、实际值、同系列中索引值（从1开始）、同系列数据项总数

				if (num > 1) {
					if (isOdd) {
						if (currentIndex <= midN) {
							// 中位数左侧
							rectX =
								start[0] - width / 2 - width / 2 + (currentIndex - midN) * width - FIXED_WIDTH * (
									midN +
									1 - currentIndex)
						} else {
							// 中位数右侧
							rectX =
								start[0] - width / 2 + width / 2 + (currentIndex - midN - 1) * width +
								FIXED_WIDTH * (
									currentIndex - midN)
						}
					} else {
						rectX = start[0] - width / 2 + (currentIndex - midN) * (width + FIXED_WIDTH)
					}
				}

				rect = {
					type: 'rect',
					shape: this.$echarts.graphic.clipRectByRect({
						x: rectX,
						y: end[1],
						width: width,
						height: start[1] - end[1]
					}, {
						x: params.coordSys.x,
						y: params.coordSys.y,
						width: params.coordSys.width,
						height: params.coordSys.height
					}),
					style: api.style()
				}
				return rect
			},

			//获取线体设备类型
			async homeEcharts() {
				//let result = await EquipmentTypeeList();
				//if (result.status == "200") {
				//	result.list.NSC4.forEach(item=>{
				//		this.EquipmentTypeList.NSC4.push(item.EquipmentType)
				//	})
				//	result.list.P68.forEach(item=>{
				//		this.EquipmentTypeList.P68.push(item.EquipmentType)
				//	})
				//	result.list.MTZ2.forEach(item=>{
				//		this.EquipmentTypeList.MTZ2.push(item.EquipmentType)
				//	})
				//	result.list.NW.forEach(item=>{
				//		this.EquipmentTypeList.NW.push(item.EquipmentType)
				//	})
				//	result.list.chassis.forEach(item=>{
				//		this.EquipmentTypeList.chassis.push(item.EquipmentType)
				//	})
				//	result.list.NT.forEach(item=>{
				//		this.EquipmentTypeList.NT.push(item.EquipmentType)
				//	})
				//	result.list.ACC.forEach(item=>{
				//		this.EquipmentTypeList.ACC.push(item.EquipmentType)
				//	})
				//}
				//获取设备类型数量
				let res = await PYJKList();
				if (res.status == "200") {
					var NSC4Testing = res.list.NSC4Testing[0]
					var NSC4Grating = res.list.NSC4Grating[0]
					var NSC4Camera = res.list.NSC4Camera[0]
					var P68Testing = res.list.P68Testing[0]
					var P68Grating = res.list.P68Grating[0]
					var P68Camera = res.list.P68Camera[0]
					var MTZ2Testing = res.list.MTZ2Testing[0]
					var MTZ2Grating = res.list.MTZ2Grating[0]
					var MTZ2Camera = res.list.MTZ2Camera[0]
					var NWTesting = res.list.NWTesting[0]
					var NWGrating = res.list.NWGrating[0]
					var NWCamera = res.list.NWCamera[0]
					var chassisTesting = res.list.chassisTesting[0]
					var chassisGrating = res.list.chassisGrating[0]
					var chassisCamera = res.list.chassisCamera[0]
					var NTTesting = res.list.NTTesting[0]
					var NTGrating = res.list.NTGrating[0]
					var NTCamera = res.list.NTCamera[0]
					var ACCTesting = res.list.ACCTesting[0]
					var ACCGrating = res.list.ACCGrating[0]
					var ACCCamera = res.list.ACCCamera[0]
					//const totalArr = [];
					//Object.keys(res.list).forEach(key => {
					//	totalArr.push(...res.list[key]);
					//});
					//console.log(totalArr,'totalArr');
					this.QualityList = [
						NSC4Testing.Quality, NSC4Grating.Quality, NSC4Camera.Quality,
						P68Testing.Quality, P68Grating.Quality, P68Camera.Quality,
						MTZ2Testing.Quality, MTZ2Grating.Quality, MTZ2Camera.Quality,
						NWTesting.Quality, NWGrating.Quality, NWCamera.Quality,
						chassisTesting.Quality, chassisGrating.Quality, chassisCamera.Quality,
						NTTesting.Quality, NTGrating.Quality, NTCamera.Quality,
						ACCTesting.Quality, ACCGrating.Quality, ACCCamera.Quality,
					]
					this.normalList = [
						NSC4Testing.normal, NSC4Grating.normal, NSC4Camera.normal,
						P68Testing.normal, P68Grating.normal, P68Camera.normal,
						MTZ2Testing.normal, MTZ2Grating.normal, MTZ2Camera.normal,
						NWTesting.normal, NWGrating.normal, NWCamera.normal,
						chassisTesting.normal, chassisGrating.normal, chassisCamera.normal,
						NTTesting.normal, NTGrating.normal, NTCamera.normal,
						ACCTesting.normal, ACCGrating.normal, ACCCamera.normal,
					]

					this.PLCMESList = [
						NSC4Testing.MES, NSC4Grating.MES, NSC4Camera.MES,
						P68Testing.MES, P68Grating.MES, P68Camera.MES,
						MTZ2Testing.MES, MTZ2Grating.MES, MTZ2Camera.MES,
						NWTesting.MES, NWGrating.MES, NWCamera.MES,
						chassisTesting.MES, chassisGrating.MES, chassisCamera.MES,
						NTTesting.MES, NTGrating.MES, NTCamera.MES,
						ACCTesting.MES, ACCGrating.MES, ACCCamera.MES,
					]
				}

				// 基于准备好的dom，初始化echarts实例
				let homeEcharts = this.$echarts.init(document.getElementById('homeEcharts'));
				homeEcharts.setOption({
						// legend: {
						// 	data: [
						// 		'3-11岁任务数',
						// 		'3-11岁全程接种量',
						// 		'3-11岁测试123',
						// 		'60岁任务数',
						// 		'60岁全程接种量',
						// 		'60岁测试123',
						// 		'80岁任务数',
						// 		'80岁全程接种量',
						// 		'80岁测试123',
						// 		'完成率'
						// 	]
						// },
						color: ['#de0000', 'green', '#f6ba20',  '#008dd3'],
						grid: {
							left: "1%",
							right: "0",
							bottom: "5%",
							top: "20%",
							containLabel: true,
						},
						xAxis: [{
								type: 'category',
								//axisTick: {
								//	length:25
								//},
								data: [
									'Testing', 'Grating', 'Camera',
									'Testing', 'Grating', 'Camera',
									'Testing', 'Grating', 'Camera',
									'Testing', 'Grating', 'Camera',
									'Testing', 'Grating', 'Camera',
									'Testing', 'Grating', 'Camera',
									'Testing', 'Grating', 'Camera',
									//this.EquipmentTypeList.NSC4,
									//this.EquipmentTypeList.P68,
									//this.EquipmentTypeList.MTZ2,
									//this.EquipmentTypeList.NW,
									//this.EquipmentTypeList.chassis,
									//this.EquipmentTypeList.NT,
									//this.EquipmentTypeList.ACC,
								],
								axisLabel: {
									interval: 0,
									//rotate: 30, //倾斜的程度
									textStyle: {
										color: '#f1f1f1',
										fontSize: 10
									},
									//设置一行显示几个字,自己设置
									//formatter: function (params) {
									//	var newParamsName = "";
									//	var paramsNameNumber = params.length;
									//	var provideNumber = 15;
									//	var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
									//	if (paramsNameNumber > provideNumber) {
									//	for (var p = 0; p < rowNumber; p++) {
									//		var tempStr = "";
									//		var start = p * provideNumber;
									//		var end = start + provideNumber;
									//		if (p == rowNumber - 1) {
									//		tempStr = params.substring(start, paramsNameNumber);
									//		} else {
									//		tempStr = params.substring(start, end) + "\n";
									//		}
									//		newParamsName += tempStr;
									//	}
									//	} else {
									//	newParamsName = params;
									//	}
									//	return newParamsName;
									//}
								}
							},
							{
								type: 'category',
								position: 'bottom',
								offset: 12,
								axisPointer: {
									type: 'none'
								},
								axisTick: {
									length: 30,
								},
								axisLine: {
									show: false,
								},
								data: [{
										value: 'NS&C4',
										textStyle: {
											fontSize: 16,
											lineHeight: 20,
											color: '#f1f1f1'
										}
									}, {
										value: '6&8P',
										textStyle: {
											fontSize: 16,
											lineHeight: 20,
											color: '#f1f1f1'
										}
									},
									{
										value: 'MTZ2',
										textStyle: {
											fontSize: 16,
											lineHeight: 20,
											color: '#f1f1f1'
										}
									},
									{
										value: 'NW',
										textStyle: {
											fontSize: 16,
											lineHeight: 20,
											color: '#f1f1f1'
										}
									},
									{
										value: 'Chassis',
										textStyle: {
											fontSize: 16,
											lineHeight: 20,
											color: '#f1f1f1'
										}
									},
									{
										value: 'NT',
										textStyle: {
											fontSize: 16,
											lineHeight: 20,
											color: '#f1f1f1'
										}
									},
									{
										value: 'ACC',
										textStyle: {
											fontSize: 16,
											lineHeight: 20,
											color: '#f1f1f1'
										}
									},


								],

							}
						],

						yAxis: [{
								type: 'value',
								name: '个',
								// min: 0,
								// max: 100,
								nameTextStyle: { //y轴上方单位的颜色
									color: '#f1f1f1'
								},
								axisLabel: {
									show: true,
									textStyle: {
										fontSize: 12,
										color: '#f1f1f1'
									}
								}
							},
							// {
							// 	min: 0,
							// 	max: 100,
							// 	axisLabel: {
							// 		show: false,
							// 		textStyle: {
							// 			fontSize: 12,
							// 			color: '#f1f1f1'
							// 		}
							// 	}
							// }
						],

						// tooltip: {
						// 	trigger: 'axis',
						// 	axisPointer: {
						// 		type: 'shadow'
						// 	},
						// 	textStyle: {
						// 		color: '#fff',
						// 		align: 'left',
						// 		fontSize: 14
						// 	},
						// 	axisLine: { //x坐标轴轴线
						// 		show: true,
						// 		lineStyle: { //x坐标轴轴线样式
						// 			color: '#000', //'#ccc' | 'rgb(128, 128, 128)' | 'rgba(128, 128, 128, 0.5)'，设置标签颜色                        
						// 		}
						// 	},

						// 	backgroundColor: 'rgba(0,0,0,0.8)',
						// 	formatter: function(params) {
						// 		console.log(params);

						// 		let str = params[0].name + '<br />';
						// 		console.log(str);
						// 		params.forEach((item) => {
						// 			console.log(item.seriesName);
						// 			let allNum = '';
						// 			if (item.value) {
						// 				if (item.seriesName) {
						// 					debugger
						// 					let num1 = item.value;
						// 					str += `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color: ${item.color}
						//                                     "></span>
						//                                          ${item.seriesName}
						//                                          :
						//                                        ${item.value}人
						//                                         <br/> `;
						// 				} 
						// 			}

						// 		});
						// 		return str;
						// 	}
						// },

						series: [{
								name: 'Testing',
								data: this.PLCMESList,
								stack: 'AA',
								type: 'bar',
								barWidth: 20,
								label: {
									normal: {
										show: true,
										formatter: function(params) {
											if (params.value > 0) {
												return params.value
											} else {
												return ''
											}
										}
									}
								},
								emphasis: {
									focus: 'series'
								},
								itemStyle: {
									normal: {
										label: {
											show: true,
											position: 'insideTop',
											textStyle: {
												color: '#f1f1f1',
												fontSize: 12
											}
										},
									},

								}
							},
							{
								name: 'Grating',
								data: this.QualityList,
								stack: 'AA',
								type: 'bar',
								barWidth: 20,
								label: {
									normal: {
										show: true,
										formatter: function(params) {
											if (params.value > 0) {
												return params.value
											} else {
												return ''
											}
										}
									}
								},
								emphasis: {
									focus: 'series'
								},
								itemStyle: {
									normal: {
										label: {
											show: true,
											position: 'insideTop',
											textStyle: {
												color: '#f1f1f1',
												fontSize: 12
											}
										}
									}
								}
							},
							{
								name: 'Camera',
								data: this.normalList,
								stack: 'AA',
								type: 'bar',
								barWidth: 20,
								label: {
									normal: {
										show: true,
										formatter: function(params) {
											if (params.value > 0) {
												return params.value
											} else {
												return ''
											}
										}
									}
								},
								itemStyle: {
									normal: {
										label: {
											show: true,
											position: 'insideTop',
											textStyle: {
												color: '#f1f1f1',
												fontSize: 12
											}
										},
										barBorderRadius: [5, 5, 0, 0]
									},

								}
							},


							// {
							// 	name: '总和',
							// 	data: [10, 20, 30, 40, 50, 60, 70],
							// 	yAxisIndex: 1,
							// 	type: 'bar',
							// 	barWidth: 10,
							// 	itemStyle: {
							// 		normal: {
							// 			label: {
							// 				show: true,
							// 				position: 'top',
							// 				textStyle: {
							// 					color: '#f1f1f1',
							// 					fontSize: 12
							// 				}
							// 			},
							// 			barBorderRadius: 10
							// 		}
							// 	}
							// 	// markLine: {
							// 	// 	symbol: 'none',
							// 	// 	itemStyle: {
							// 	// 		normal: {
							// 	// 			lineStyle: {
							// 	// 				type: 'dotted'
							// 	// 			}
							// 	// 		}
							// 	// 	},
							// 	// 	data: [{
							// 	// 		type: 'average',
							// 	// 		name: 'Avg' + '%'
							// 	// 	}]
							// 	// },
							// 	//   symbol: 'none',
							// 	// itemStyle: {
							// 	// 	normal: {
							// 	// 		lineStyle: {
							// 	// 			width: 2,
							// 	// 			type: 'solid' //'dotted'虚线 'solid'实线
							// 	// 		}
							// 	// 	}
							// 	// }
							// }
						]
						//参考链接：
						//  https://www.freesion.com/article/2719561454/
						//  https://blog.csdn.net/m0_37727560/article/details/105448161
						// https://echarts.apache.org/zh/option.html#series-custom
						// https://echarts.apache.org/examples/zh/index.html#chart-type-calendar
						// https://echarts.apache.org/examples/zh/editor.html?c=custom-profile
						//series: [
						//	{
						//		type: 'custom',
						//		renderItem: this.renderItem,
						//		itemStyle: { normal: { opacity: 0.8 } },
						//		encode: { y: [1, 2], x: 0 },
						//		data: data
						//	}
						//]
					}),
					window.onresize = function() {
						homeEcharts.resize()
					}
			},

			//查询
			search(val) {
				this.getMyEchartsData(val[0], val[1])
			},

			//获取MES、PLC、后台断链柏拉图
			async getMyEchartsData() {
				let params = {
					StartDate: this.newDate[0],
					EndDate: this.newDate[1]
				}
				let result = await EchartsList(params);
				if (result.status == "200") {

					let [bar1, lin1] = [
						[],
						[]
					];
					result.list.PLCList.map(item => {
						bar1.push(item.Equipmentname)
						lin1.push(item.OffnetworkTime)
					})
					this.PLCList.X = bar1
					this.PLCList.Y = lin1

					// result.list.PLCList.forEach(item => {
					// 	this.PLCList.X.push(item.Equipmentname)
					// 	this.PLCList.Y.push(item.OffnetworkTime)
					// })


					let [bar2, lin2] = [
						[],
						[]
					];
					result.list.MESList.map(item => {
						bar2.push(item.Equipmentname)
						lin2.push(item.RestartsTime)
					})
					this.MESList.X = bar2
					this.MESList.Y = lin2

					// result.list.MESList.forEach(item => {
					// 	this.MESList.X.push(item.Equipmentname)
					// 	this.MESList.Y.push(item.RestartsTime)
					// })


					let [bar3, lin3] = [
						[],
						[]
					];
					result.list.HTList.map(item => {
						bar3.push(item.ModificationCause)
						lin3.push(item.ModificationTime)
					})
					this.HTList.X = bar3
					this.HTList.Y = lin3

					// result.list.HTList.forEach(item => {
					// 	this.HTList.X.push(item.ModificationCause)
					// 	this.HTList.Y.push(item.ModificationTime)
					// })

					this.myEcharts1()
					this.myEcharts2()
					this.myEcharts3()
				}

			},

			myEcharts1() {
				// 基于准备好的dom，初始化echarts实例
				let myEcharts1 = this.$echarts.init(document.getElementById('echarts1'));
				myEcharts1.setOption({
					color: ["green", "yellow"],
					title: [{
						text: "PLC断连次数",
						left: "center",
						y: "20px", //垂
						textStyle: {
							//主标题文本样式
							fontSize: 22,
							color: "#37CC48",
							fontFamily: "cursive",
						},
					}, ],
					legend: {
						top: '25',
						x: '80',
						textStyle: {
							fontSize: 15,
							color: '#d5d5d5',
						},
						// icon: "circle",
						itemWidth: 20, // 设置宽度
						itemHeight: 10, // 设置高度、
						itemGap: 12, // 设置间距
					},
					grid: {
						left: "2%",
						right: "2%",
						bottom: "8%",
						top: "20%",
						containLabel: true,
					},
					tooltip: {
						show: true,
					},
					xAxis: {
						axisLabel: {
							interval: 0,
							rotate: 40,
							textStyle: {
								color: "#d5d5d5",
							},


						},

						axisLine: {
							lineStyle: {
								color: "#d5d5d5",
								width: 1, //这里是为了突出显示加上的
							},
							show: true,
						},
						data: this.PLCList.X,
					},
					yAxis: [{
						type: "value",
						name: "次数",
						minInterval: 0,
						interval: 1,
						nameTextStyle: {
							color: "#d5d5d5",
							fontSize: 12,
						},
						axisLabel: {
							textStyle: {
								color: "#d5d5d5",
							},
						},
						axisLine: {
							lineStyle: {
								color: "#d5d5d5",
								width: 1, //这里是为了突出显示加上的
							},
							show: true,
						},
						splitLine: {
							//网格线
							show: false,
						},
					}],

					series: [{
							name: '',
							type: 'bar',
							barWidth: 20,
							barGap: "50",
							lineStyle: {
								color: 'green'
							},
							data: this.PLCList.Y
						},
						{
							name: '实时数量',
							type: 'line',
							barWidth: 20,
							barGap: "50",
							lineStyle: {
								color: 'green'
							},
							data: this.PLCList.Y
						},
					],

				});

			},


			myEcharts2() {
				// 基于准备好的dom，初始化echarts实例
				let myEcharts2 = this.$echarts.init(document.getElementById('echarts2'));
				myEcharts2.setOption({
					color: ["green", "yellow"],
					title: [{
						text: "MES断连次数",
						left: "center",
						y: "20px", //垂
						textStyle: {
							//主标题文本样式
							fontSize: 22,
							color: "#37CC48",
							fontFamily: "cursive",
						},
					}, ],
					legend: {
						top: '25',
						x: '80',
						textStyle: {
							fontSize: 15,
							color: '#d5d5d5',
						},
						// icon: "circle",
						itemWidth: 20, // 设置宽度
						itemHeight: 10, // 设置高度、
						itemGap: 12, // 设置间距
					},
					grid: {
						left: "2%",
						right: "2%",
						bottom: "8%",
						top: "20%",
						containLabel: true,
					},
					tooltip: {},
					xAxis: {
						axisLabel: {
							interval: 0,
							rotate: 40,
							textStyle: {
								color: "#d5d5d5",
							},
						},
						axisLine: {
							lineStyle: {
								color: "#d5d5d5",
								width: 1, //这里是为了突出显示加上的
							},
							show: true,
						},
						data: this.MESList.X,
					},
					yAxis: [{
						type: "value",
						name: "次数",
						minInterval: 0,
						interval: 1,
						nameTextStyle: {
							color: "#d5d5d5",
							fontSize: 12,
						},
						axisLabel: {
							textStyle: {
								color: "#d5d5d5",
							},
						},
						axisLine: {
							lineStyle: {
								color: "#d5d5d5",
								width: 1, //这里是为了突出显示加上的
							},
							show: true,
						},
						splitLine: {
							//网格线
							show: false,
						},
					}],

					series: [{
							name: '',
							type: 'bar',
							barWidth: 20,
							barGap: "50",
							lineStyle: {
								color: 'green'
							},
							data: this.MESList.Y
						},
						{
							name: '实时数量',
							type: 'line',
							barWidth: 20,
							barGap: "50",
							lineStyle: {
								color: 'green'
							},
							data: this.MESList.Y
						}
					],
				});

				window.onresize = () => {
					myEcharts2.resize();
				}
			},

			myEcharts3() {
				// 基于准备好的dom，初始化echarts实例
				let myEcharts3 = this.$echarts.init(document.getElementById('echarts3'));
				myEcharts3.setOption({
					color: ["green", "yellow"],
					title: [{
						text: "后台开启数",
						left: "center",
						y: "20px", //垂
						textStyle: {
							//主标题文本样式
							fontSize: 22,
							color: "#37CC48",
							fontFamily: "cursive",
						},
					}, ],
					legend: {
						top: '25',
						x: '80',
						textStyle: {
							fontSize: 15,
							color: '#d5d5d5',
						},
						// icon: "circle",
						itemWidth: 20, // 设置宽度
						itemHeight: 10, // 设置高度、
						itemGap: 12, // 设置间距
					},
					grid: {
						left: "2%",
						right: "2%",
						bottom: "8%",
						top: "20%",
						containLabel: true,
					},
					tooltip: {},
					xAxis: {
						axisLabel: {
							interval: 0,
							rotate: 40,
							textStyle: {
								color: "#d5d5d5",
							},
						},
						axisLine: {
							lineStyle: {
								color: "#d5d5d5",
								width: 1, //这里是为了突出显示加上的
							},
							show: true,
						},
						data: this.HTList.X,
					},
					yAxis: [{
						type: "value",
						name: "次数",
						minInterval: 0,
						interval: 1,
						nameTextStyle: {
							color: "#d5d5d5",
							fontSize: 12,
						},
						axisLabel: {
							textStyle: {
								color: "#d5d5d5",
							},
						},
						axisLine: {
							lineStyle: {
								color: "#d5d5d5",
								width: 1, //这里是为了突出显示加上的
							},
							show: true,
						},
						splitLine: {
							//网格线
							show: false,
						},
					}],

					series: [{
						name: '',
						type: 'bar',
						barWidth: 20,
						barGap: "50",
						lineStyle: {
							color: 'green'
						},
						data: this.HTList.Y
					}, {
						name: '实时数量',
						type: 'line',
						barWidth: 20,
						barGap: "50",
						lineStyle: {
							color: 'green'
						},
						data: this.HTList.Y
					}],
				});

			},
		},
		mounted() {
			this.getNmuber()
			this.homeEcharts()
			this.getMyEchartsData()
			// this.myEcharts1()
			// this.myEcharts2()
			// this.myEcharts3()
		},
	};
</script>


<style scoped>
	.home {
		width: 100%;
		height: 100%;
		padding: 15px 20px;
	}

	.home .homeConter {
		width: 100%;
		height: 100%;

	}

	.homeConter .homeUpBox,
	.homeConter .homedownBox {
		width: 100%;
		height: 53%;
		display: flex;
		justify-content: space-between;
	}

	.homeUpBox .homeUpLeft,
	.homeUpBox .homeUpRight,
	.homedownBox .homeDownEcharts {
		background-image: url(../assets/images/bg.png);
		background-repeat: no-repeat;
		background-size: 110% 110%;
		background-position: center;
		border: .5px solid green;
		border-radius: 5px;
	}

	.homeConter .homedownBox {
		position: relative;
	}

	.homedownBox .homeSearch {
		position: absolute;
		top: 10px;
		left: 20px;
		z-index: 99;
	}

	.homedownBox .search2 {
		position: absolute;
		top: 2px;
		left: 50px;
	}

	.homeUpBox .homeUpRight .homeNumber {
		width: 100%;
		height: 15vh;
		font-size: 25px;
		color: #ececec;
		padding: 5vh 5vh 0 2vh;
	}

	.homeUpBox .homeUpRight .homeNumber span {
		font-size: 28px;
		font-weight: bold;
	}

	.homeUpBox .homeUpRight .homeWaring {
		width: 100%;
		height: 30vh;
		margin-top: 15px;
		display: flex;
		justify-content: space-between;
	}

	.homeUpBox .homeUpRight .homeNumberBox {
		width: 30%;
		height: 100%;
		text-align: center;
	}

	.homeUpBox .homeUpRight .homeNumberBox span {
		width: 100px;
		height: 100px;
		line-height: 100px;
		display: block;
		border-radius: 50%;
		background-color: green;
		margin: 0 auto;
		font-size: 35px;
		font-weight: blod;
		color: #ececec;
	}

	.homeUpBox .homeUpRight .homeNumberBox span.isRed {
		background-color: #de0000;
	}

	.homeUpBox .homeUpRight .homeNumberBox span.isYellow {
		background-color: #f6ba20;
	}

	.homeUpBox .homeUpRight .homeNumberBox p {
		margin-top: 50px;
		font-weight: blod;
		font-size: 22px;
		color: #ececec;
	}


	.homeUpBox .homeUpLeft {
		width: 66.3%;
		display: flex;
		justify-content: space-between;
	}

	.homeUpBox .homeUpRight {
		width: 32.6%;
	}

	.homeUpBox .homeUpLeft .homeUpLeftEcharts {
		width: 86%;
	}

	.homeUpBox .homeUpLeft .homeUpLeng {
		width: 13%;
	}

	.homeUpLeft .homeUpLeng .lampBox {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.homeUpLeft .homeUpLeng .lamp {
		width: 100%;
		height: 16vh;
		text-align: center;
	}

	.homeUpLeng .lamp span {
		display: block;
		width: 20px;
		height: 55px;
		background: green;
		text-align: center;
		margin: 25px auto;
		border-radius: 5px;
	}

	.homeUpLeng .lamp p {
		font-size: 17px;
		color: #ececec;
	}


	.homeConter .homedownBox {
		display: flex;
		justify-content: space-between;
		margin-top: 15px;
		height: 45%;
	}

	.homedownBox .homeDownEcharts {
		width: 32.6%;
	}
</style>
