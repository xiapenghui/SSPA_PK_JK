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
				<div class="homeDownEcharts" id="echarts1"></div>
				<div class="homeDownEcharts" id="echarts2"></div>
				<div class="homeDownEcharts" id="echarts3"></div>
			</div>
		</div>
	</div>
</template>

<script>
	// 引入封装好的接口
	import {
		Equipment_LJList
	} from "@/api/api.js";
	export default {
		data() {
			return {
				Number: {
					num: 100,
					normal: 5,
					MES: 0,
					Quality: 0
				},
				KanBanTwoXGX: ['A', 'B', 'C', 'D', 'E', 'F'],
				KanBanTwoXGY: [12, 22, 32, 43, 57, 87],
			};
		},
		methods: {

			//获取设备总链接数
			async getNmuber() {
				let result = await Equipment_LJList();
				if (result.status == "200") {
					this.Number = result.list[0]
				}
			},


			homeEcharts() {
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
						color: ['#de0000', '#f6ba20', 'green', '#008dd3'],
						grid: {
							left: "1%",
							right: "0",
							bottom: "5%",
							top: "20%",
							containLabel: true,
						},
						xAxis: [{
								type: 'category',
								data: [
									['Testing', 'Grating', 'Camera'],
									['Testing', 'Grating', 'Camera'],
									['Testing', 'Grating', 'Camera'],
									['Testing', 'Grating', 'Camera'],
									['Testing', 'Grating', 'Camera'],
									['Testing', 'Grating', 'Camera']
								],
								axisLabel: {
									interval: 0,
									textStyle: {
										color: '#f1f1f1'
									}
								},

							},
							{
								type: 'category',
								position: 'bottom',
								offset: 25,
								axisPointer: {
									type: 'none'
								},
								axisTick: {
									length: 20,
								},
								axisLine: {
									show: false,
								},
								data: [{
										value: 'NT',
										textStyle: {
											fontSize: 16,
											lineHeight: 20,
											color: '#f1f1f1'
										}
									}, {
										value: 'MTZ2',
										textStyle: {
											fontSize: 16,
											lineHeight: 20,
											color: '#f1f1f1'
										}
									},
									{
										value: '6&8P',
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
										value: 'NS&C4',
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
								data: [10, 20, 30, 40, 50, 60, 70],
								stack: 'AA',
								type: 'bar',
								barWidth: 20,
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
								data: [11, 20, 30, 40, 50, 60, 70],
								stack: 'AA',
								type: 'bar',
								barWidth: 20,
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
								data: [12, 20, 30, 40, 50, 60, 70],
								stack: 'AA',
								type: 'bar',
								barWidth: 20,
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

							{
								name: 'Testing',
								data: [10, 20, 30, 40, 50, 60, 70],
								stack: 'BB',
								type: 'bar',
								barWidth: 20,
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
								data: [10, 20, 30, 40, 50, 60, 70],
								stack: 'BB',
								type: 'bar',
								barWidth: 20,
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
								data: [10, 20, 30, 40, 50, 60, 70],
								stack: 'BB',
								type: 'bar',
								barWidth: 20,
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
									}
								}
							},

							{
								name: 'Testing',
								data: [10, 20, 30, 40, 50, 60, 70],
								stack: 'CC',
								type: 'bar',
								barWidth: 20,
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
								name: 'Grating',
								data: [15, 20, 30, 40, 50, 60, 70],
								stack: 'CC',
								type: 'bar',
								barWidth: 20,
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
								data: [16, 20, 30, 40, 50, 60, 70],
								stack: 'CC',
								type: 'bar',
								barWidth: 20,
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
									}
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
					}),
					window.onresize = function() {
						homeEcharts.resize()
					}
			},



			myEcharts1() {
				// 基于准备好的dom，初始化echarts实例
				let myEcharts1 = this.$echarts.init(document.getElementById('echarts1'));
				myEcharts1.setOption({
					color: ["green", "yellow"],
					title: [{
						text: "PLC断链次数柏拉图",
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
						x: '100',
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
						bottom: "5%",
						top: "20%",
						containLabel: true,
					},
					tooltip: {},
					xAxis: {
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
						data: this.KanBanTwoXGX,
					},
					yAxis: [{
						type: "value",
						name: "次数",
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
							data: this.KanBanTwoXGY
						},
						{
							name: '实时数量',
							type: 'line',
							barWidth: 20,
							barGap: "50",
							lineStyle: {
								color: 'green'
							},
							data: this.KanBanTwoXGY
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
						text: "MES断链次数柏拉图",
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
						x: '100',
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
						bottom: "5%",
						top: "20%",
						containLabel: true,
					},
					tooltip: {},
					xAxis: {
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
						data: this.KanBanTwoXGX,
					},
					yAxis: [{
						type: "value",
						name: "次数",
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
							data: this.KanBanTwoXGY
						},
						{
							name: '实时数量',
							type: 'line',
							barWidth: 20,
							barGap: "50",
							lineStyle: {
								color: 'green'
							},
							data: this.KanBanTwoXGY
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
						text: "后台开启数柏拉图",
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
						x: '100',
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
						bottom: "5%",
						top: "20%",
						containLabel: true,
					},
					tooltip: {},
					xAxis: {
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
						data: this.KanBanTwoXGX,
					},
					yAxis: [{
						type: "value",
						name: "次数",
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
						data: this.KanBanTwoXGY
					}, {
						name: '实时数量',
						type: 'line',
						barWidth: 20,
						barGap: "50",
						lineStyle: {
							color: 'green'
						},
						data: this.KanBanTwoXGY
					}],
				});
			
			},
		},
		mounted() {
			this.getNmuber()
			this.homeEcharts()
			this.myEcharts1()
			this.myEcharts2()
			this.myEcharts3()
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
