<template>
	<div class="pkWarp">
		<el-button type="success" size="small" class="lookEcharts" @click="$router.push({ path: '/index' })">返回首页
		</el-button>
		<div class="haderSearch">
			<el-button type="success" class="open" v-if="!isShow" @click="isShow = true" icon="el-icon-menu"
				size="small"></el-button>
			<el-button type="danger" class="close" v-if="isShow" @click="isShow = false" icon="el-icon-error"
				size="small"></el-button>
			<template v-if="isShow">
				<div class="searchButton">
					<el-select v-model="params.Line" placeholder="选择线体" @change="lineChange" filterable clearable>
						<el-option v-for="item in optionsLine" :key="item.value" :label="item.text" :value="item.value">
						</el-option>
					</el-select>

					<el-select v-model="params.Equipment" placeholder="选择设备" :loading="loadingStation" filterable
						clearable>
						<el-option v-for="item in equipmentStation" :key="item.value" :label="item.text"
							:value="item.value">
						</el-option>
					</el-select>

					<el-date-picker v-model="params.StartDate" type="date" placeholder="时间从" format="yyyy-MM-dd"
						value-format="yyyy-MM-dd">
					</el-date-picker>

					<el-date-picker v-model="params.EndDate" type="date" placeholder="时间至" format="yyyy-MM-dd"
						value-format="yyyy-MM-dd">
					</el-date-picker>

				</div>
				<el-button type="success" icon="el-icon-search" @click="headerButton">搜索</el-button>
			</template>
		</div>
		<div class="pcEcharts" id="echarts1"></div>
		<div class="pcEcharts" id="echarts2"></div>
		<div class="pcEcharts" id="echarts3"></div>
		<div class="pcEcharts" id="echarts4"></div>
	</div>
</template>
<script>
	import moment from "moment";
	import {
		GetLineIdText,
		GetEquipmentIdText,
		SearchWebTwo,
		Line_Equipment
	} from "@/api/api.js";
	export default {
		data() {
			return {
				params: {
					Line: "",
					Equipment: "",
					StartDate: moment(moment(new Date()).add('year', 0).format("YYYY-MM-DD")).subtract(7, "days").format(
						"YYYY-MM-DD"),
					EndDate: moment(new Date()).add('year', 0).format("YYYY-MM-DD")
				},
				isShow: false,
				optionsLine: [],
				equipmentStation: [],
				KanBanTwoXGX: [],
				KanBanTwoXGY: [],
				KanBanTwoCQX: [],
				KanBanTwoCQY: [],
				KanBanTwoDWX: [],
				KanBanTwoDWY: [],
				KanBanTwoSCX: [],
				KanBanTwoSCY: [],
				loadingStation: false
			};
		},
		methods: {
			myChart1() {
				let myChart1 = this.$echarts.init(document.getElementById("echarts1")); // 绘制图表
				myChart1.setOption({
					color: ["green"],
					title: [{
						text: "修改次数",
						left: "center",
						y: "20px", //垂
						textStyle: {
							//主标题文本样式
							fontSize: 25,
							color: "#37CC48",
							fontFamily: "cursive",
						},
					}, ],
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
								color: "#fff",
							},
						},
						axisLine: {
							lineStyle: {
								color: "#fff",
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
								color: "#fff",
								fontSize: 12,
							},
							axisLabel: {
								textStyle: {
									color: "#fff",
								},
							},
							axisLine: {
								lineStyle: {
									color: "#fff",
									width: 1, //这里是为了突出显示加上的
								},
								show: true,
							},
							splitLine: {
								//网格线
								show: false,
							},
						}

					],
					dataZoom: {
						show: this.KanBanTwoXGX.length > 20 ? true : false, // 为true 滚动条出现
						zoomLock: false,
						realtime: true,
						type: "slider", // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
						height: 10, // 表示滚动条的高度，也就是粗细
						start: 0, // 表示默认展示20%～80%这一段。
						end: (20 / this.KanBanTwoXGX.length) * 100,
						bottom: 5,
					},
					series: [{
							name: "次数",
							type: "bar",
							barWidth: 20,
							barGap: "50",
							data: this.KanBanTwoXGY,
							label: {
								show: true, // 开启显示
								position: 'top', // 在上方显示
								distance: 20, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。
								verticalAlign: 'middle',
								textStyle: { // 数值样式
									color: '#ffffff',
									fontSize: 15
								},
							}
						},

						{
							name: '次数',
							type: 'line',
							barWidth: 20,
							barGap: "50",
							lineStyle: {
								color: 'yellow'
							},
							data: this.KanBanTwoXGY
						}
					],
				});
			},

			myChart2() {
				let myChart2 = this.$echarts.init(document.getElementById("echarts2")); // 绘制图表
				myChart2.setOption({
					color: ["green"],
					title: [{
						text: "重启次数",
						left: "center",
						y: "20px", //垂
						textStyle: {
							//主标题文本样式
							fontSize: 25,
							color: "#37CC48",
							fontFamily: "cursive",
						},
					}, ],
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
								color: "#fff",
							},
						},
						axisLine: {
							lineStyle: {
								color: "#fff",
								width: 1, //这里是为了突出显示加上的
							},
							show: true,
						},
						data: this.KanBanTwoCQX,
					},
					yAxis: {
						type: "value",
						name: "次数",
						nameTextStyle: {
							color: "#fff",
							fontSize: 12,
						},
						axisLabel: {
							textStyle: {
								color: "#fff",
							},
						},
						axisLine: {
							lineStyle: {
								color: "#fff",
								width: 1, //这里是为了突出显示加上的
							},
							show: true,
						},
						splitLine: {
							//网格线
							show: false,
						},
					},
					dataZoom: {
						show: this.KanBanTwoCQX.length > 20 ? true : false, // 为true 滚动条出现
						zoomLock: false,
						realtime: true,
						type: "slider", // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
						height: 10, // 表示滚动条的高度，也就是粗细
						start: 0, // 表示默认展示20%～80%这一段。
						end: (20 / this.KanBanTwoCQX.length) * 100,
						bottom: 5,
					},
					series: [{
							name: "次数",
							type: "bar",
							barWidth: 20,
							data: this.KanBanTwoCQY,
							label: {
								show: true, // 开启显示
								position: 'top', // 在上方显示
								distance: 20, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。
								verticalAlign: 'middle',
								textStyle: { // 数值样式
									color: '#ffffff',
									fontSize: 15
								},
							}
						},
						{
							name: '次数',
							type: 'line',
							barWidth: 20,
							lineStyle: {
								color: 'yellow'
							},
							data: this.KanBanTwoCQY
						}
					],
				});
			},

			myChart3() {
				let myChart3 = this.$echarts.init(document.getElementById("echarts3")); // 绘制图表
				myChart3.setOption({
					color: ["green"],
					title: [{
						text: "断网次数",
						left: "center",
						y: "20px", //垂
						textStyle: {
							//主标题文本样式
							fontSize: 25,
							color: "#37CC48",
							fontFamily: "cursive",
						},
					}, ],
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
								color: "#fff",
							},
						},
						axisLine: {
							lineStyle: {
								color: "#fff",
								width: 1, //这里是为了突出显示加上的
							},
							show: true,
						},
						data: this.KanBanTwoDWX,
					},
					yAxis: {
						type: "value",
						name: "次数",
						nameTextStyle: {
							color: "#fff",
							fontSize: 12,
						},
						axisLabel: {
							textStyle: {
								color: "#fff",
							},
						},
						axisLine: {
							lineStyle: {
								color: "#fff",
								width: 1, //这里是为了突出显示加上的
							},
							show: true,
						},
						splitLine: {
							//网格线
							show: false,
						},
					},
					dataZoom: {
						show: this.KanBanTwoDWX.length > 20 ? true : false, // 为true 滚动条出现
						zoomLock: false,
						realtime: true,
						type: "slider", // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
						height: 10, // 表示滚动条的高度，也就是粗细
						start: 0, // 表示默认展示20%～80%这一段。
						end: (20 / this.KanBanTwoDWX.length) * 100,
						bottom: 5,
					},
					series: [{
							name: "次数",
							type: "bar",
							barWidth: 20,
							data: this.KanBanTwoDWY,
							label: {
								show: true, // 开启显示
								position: 'top', // 在上方显示
								distance: 20, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。
								verticalAlign: 'middle',
								textStyle: { // 数值样式
									color: '#ffffff',
									fontSize: 15
								},
							}
						},
						{
							name: '次数',
							type: 'line',
							barWidth: 20,
							lineStyle: {
								color: 'yellow'
							},
							data: this.KanBanTwoDWY
						}
					],
				});
			},

			myChart4() {
				let myChart4 = this.$echarts.init(document.getElementById("echarts4")); // 绘制图表
				myChart4.setOption({
					color: ["green"],
					title: [{
						text: "删除次数",
						left: "center",
						y: "20px", //垂
						textStyle: {
							//主标题文本样式
							fontSize: 25,
							color: "#37CC48",
							fontFamily: "cursive",
						},
					}, ],
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
								color: "#fff",
							},
						},
						axisLine: {
							lineStyle: {
								color: "#fff",
								width: 1, //这里是为了突出显示加上的
							},
							show: true,
						},
						data: this.KanBanTwoSCX,
					},
					yAxis: {
						type: "value",
						name: "次数",
						nameTextStyle: {
							color: "#fff",
							fontSize: 12,
						},
						axisLabel: {
							textStyle: {
								color: "#fff",
							},
						},
						axisLine: {
							lineStyle: {
								color: "#fff",
								width: 1, //这里是为了突出显示加上的
							},
							show: true,
						},
						splitLine: {
							//网格线
							show: false,
						},
					},
					dataZoom: {
						show: this.KanBanTwoSCX.length > 20 ? true : false, // 为true 滚动条出现
						zoomLock: false,
						realtime: true,
						type: "slider", // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
						height: 10, // 表示滚动条的高度，也就是粗细
						start: 0, // 表示默认展示20%～80%这一段。
						// end: this.KanBanTwoXGX.length > = 15 ? 20 : 50,
						end: (20 / this.KanBanTwoSCX.length) * 100,
						bottom: 5,
					},
					series: [{
							name: "次数",
							type: "bar",
							barWidth: 20,
							data: this.KanBanTwoSCY,
							label: {
								show: true, // 开启显示
								position: 'top', // 在上方显示
								distance: 20, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。
								verticalAlign: 'middle',
								textStyle: { // 数值样式
									color: '#ffffff',
									fontSize: 15
								},
							}
						},
						{
							name: '次数',
							type: 'line',
							barWidth: 20,
							lineStyle: {
								color: 'yellow'
							},
							data: this.KanBanTwoSCY
						}
					],
				});
			},

			//获取线体下拉
			async lineList() {
				let result = await GetLineIdText();
				if (result.status == "200") {
					this.optionsLine = Object.values(result.list);
				}
			},

			//获取设备下拉
			async equipmentList() {
				this.loadingStation = true
				let result = await GetEquipmentIdText();
				if (result.status == "200") {
					this.equipmentStation = Object.values(result.list);
					this.loadingStation = false
				}
			},



			// 下拉线体获取对应的设备
			async lineChange(val) {
				this.loadingStation = true
				let result = await Line_Equipment({
					LineID: val
				});
				if (result.status == "200") {
					let newList = []
					for (let [text, value] of Object.entries(result.list.Line_Equipment)) {
						newList.push({
							text: value.Equipmentname,
							value: value.EquipmentID
						})
					}
					this.$nextTick(function() {
						this.equipmentStation = newList
						this.loadingStation = false
					})
				}
			},



			//获取echarts 数据
			async getDataList() {
				let result = await SearchWebTwo({
					Line: this.params.Line == "" ? " " : this.params.Line,
					Equipment: this.params.Equipment == "" ? " " : this.params.Equipment,
					StartDate: this.params.StartDate == "" ? " " : this.params.StartDate,
					EndDate: this.params.EndDate == "" ? " " : this.params.EndDate
				});
				if (result.status == "200") {
					this.KanBanTwoXGX = [];
					this.KanBanTwoXGY = [];
					Array.from(result.list.KanBanTwoXG).map((item) => {
						this.KanBanTwoXGX.push(item.ModificationCause);
						this.KanBanTwoXGY.push(item.ModificationTime);
					});

					//重启
					this.KanBanTwoCQX = [];
					this.KanBanTwoCQY = [];
					Array.from(result.list.KanBanTwoCQ).map((item) => {
						this.KanBanTwoCQX.push(item.Equipmentname);
						this.KanBanTwoCQY.push(item.RestartsTime);
					});

					//断网
					this.KanBanTwoDWX = [];
					this.KanBanTwoDWY = [];
					Array.from(result.list.KanBanTwoDW).map((item) => {
						this.KanBanTwoDWX.push(item.Equipmentname);
						this.KanBanTwoDWY.push(item.OffnetworkTime);
					});

					//删除
					this.KanBanTwoSCX = [];
					this.KanBanTwoSCY = [];
					Array.from(result.list.KanBanTwoSC).map((item) => {
						this.KanBanTwoSCX.push(item.DELETECause);
						this.KanBanTwoSCY.push(item.DELETETime);
					});

					this.myChart1();
					this.myChart2();
					this.myChart3();
					this.myChart4();
				}
				console.log(result);
			},
			//搜索
			headerButton() {

				this.getDataList();
			},
		},
		mounted() {
			this.getDataList();
			this.equipmentList();
			this.lineList();
		},
	};
</script>

<style scoped>
	.pkWarp {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
	}

	.lookEcharts {
		position: fixed;
		top: 15px;
		right: 30px;
	}

	.pcEcharts {
		width: calc(50% - 8px);
		height: calc(50% - 15px);
		background: url("../assets/images/bg.png") center no-repeat;
		background-size: 100% 100%;
	}

	.pcEcharts /deep/ canvas {
		background-color: rgba(200, 221, 206, 0.3);
	}


	.haderSearch {
		position: absolute;
		top: 25px;
		left: 2%;
		display: flex;
		z-index: 9;
	}

	.searchButton {
		display: flex;
		justify-items: center;
		align-items: center;
		margin-left: 20px;
	}

	.searchButton .el-select,
	.searchButton .el-date-editor {
		margin-right: 10px;
	}
</style>
