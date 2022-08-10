<template>
	<div class="pkWarp">
		<el-button type="success" size="small" class="lookEcharts" @click="$router.push({ path: '/echarts' })">查看图表
		</el-button>

		<div class="haderSearch">
			<el-button type="success" class="open" v-if="!isShow" @click="isShow = true" icon="el-icon-menu"
				size="small"></el-button>
			<el-button type="danger" class="close" v-if="isShow" @click="isShow = false" icon="el-icon-error"
				size="small"></el-button>
			<template v-if="isShow">
				<div class="searchButton">
					<el-select v-model="params.Line" clearable filterable placeholder="选择线体" @change="lineChange">
						<el-option v-for="item in optionsLine" :key="item.value" :label="item.text" :value="item.value">
						</el-option>
					</el-select>

					<el-select v-model="params.Station" clearable filterable placeholder="选择工位"
						:loading="loadingStation">
						<el-option v-for="item in optionStation" :key="item.value" :label="item.text"
							:value="item.value">
						</el-option>
					</el-select>
				</div>
				<el-button type="success" icon="el-icon-search" @click="headerButton">搜索</el-button>
			</template>
		</div>

		<div class="pkTableBg">
			<div class="pkTableBox">
				<el-table :data="tableData" style="width: 100%" height="100%" @row-click="rowClick" v-loading="loading"
					element-loading-text="加载中……" element-loading-spinner="el-icon-loading"
					element-loading-background="rgba(0, 0, 0, 0.6)">
					<el-table-column prop="Line" label="线体" align="left" header-align="center" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="Station" label="工位" align="center"></el-table-column>
					<el-table-column prop="Equipmentname" label="设备名称" align="center" show-overflow-tooltip>
					</el-table-column>
					<!-- <el-table-column prop="EquipmentPictureName" label="设备图片" align="center">
						<template slot-scope="scope">
							<img v-if="scope.row.EquipmentPictureName == null" src="@/assets/images/kb_top_logo1.png"
								width="auto" height="38px" />
							<img :src="
                  'http://smartflow.diskstation.me:8009/DEVICE_VISUALIZATION/Resource/Equipment/' +
                  scope.row.EquipmentPictureName
                " v-else width="auto" height="38px" />
						</template>
					</el-table-column> -->
					<el-table-column prop="EquipmentStatus" label="设备状态" align="center">
						<template slot-scope="scope">
							<el-button type="success" v-if="scope.row.EquipmentStatus == 1" circle size="small"
								class="green"></el-button>
							<el-button type="danger" v-else circle size="small" class="red"></el-button>
						</template>
					</el-table-column>
					<el-table-column prop="MESConnection" label="MES链接" align="center">
						<template slot-scope="scope">
							<el-button type="success" v-if="scope.row.MESConnection == 1" circle size="small"
								class="green"></el-button>
							<el-button type="danger" v-else circle size="small" class="red"></el-button>
						</template>
					</el-table-column>
					<el-table-column prop="MESbackground" label="MES后台" align="center">
						<template slot-scope="scope">
							<el-button type="success" v-if="scope.row.MESbackground == 1" circle size="small"
								class="green"></el-button>
							<el-button type="danger" v-else circle size="small" class="red"></el-button>
						</template>
					</el-table-column>
					<el-table-column prop="RunningStatus" label="运行状态" align="center">
					</el-table-column>
				</el-table>
			</div>
			<el-pagination layout="prev, pager, next" :total="50" style="display:none"> </el-pagination>
		</div>
	</div>
</template>

<script>
	// 引入封装好的接口
	import {
		GetLineIdText,
		GetStationIdText,
		SearchWebOne,
		Line_Equipment
	} from "@/api/api.js";
	export default {
		data() {
			return {
				loading: false,
				loadingStation: false,
				params: {
					// current: 1,
					// pagesize: 20,
					Line: "",
					Station: "",
				},
				isShow: false,
				optionsLine: [],
				optionStation: [],
				tableData: [],
			};
		},
		methods: {
			// 获取列表
			async getDataList() {
				this.loading = true
				let result = await SearchWebOne({
					Line: this.params.Line == "" ? " " : this.params.Line,
					Station: this.params.Station == "" ? " " : this.params.Station,
				});
				if (result.status == "200") {
					this.tableData = result.list.KanBanOne;
					this.loading = false
				} else {
					this.loading = false
				}

				console.log(result);
			},
			//搜索
			headerButton() {

				this.getDataList();
			},
			//获取线体下拉
			async lineList() {
				let result = await GetLineIdText();
				if (result.status == "200") {
					this.optionsLine = Object.values(result.list);
				}
			},

			//获取工位下拉
			async equipmentList() {
				this.loadingStation = true
				let result = await GetStationIdText();
				if (result.status == "200") {
					this.optionStation = Object.values(result.list);
					this.loadingStation = false
				}
			},
			rowClick(row) {
				this.$router.push({
					path: "/detail",
					query: {
						Line: row.LineID,
						Station: row.StationID,
						Equipment: row.EquipmentID,
					},
				});
			},


			// 下拉线体获取对应的工位
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
						this.optionStation = newList
						this.loadingStation = false
					})
				}
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
	.haderSearch {
		top: 93px;
	}

	.green {
		background: green;
	}

	.red {
		background: red;
	}
</style>
