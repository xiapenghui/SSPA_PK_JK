<template>
	<div class="pkWarp">
		<el-button type="success" size="small" class="lookEcharts" @click="$router.push({ path: '/home' })">返回首页
		</el-button>
		<div class="pkTableBg">
			<div class="haderSearch">
				<!-- <el-button type="success" class="open" v-if="!isShow" @click="isShow = true" icon="el-icon-menu"
					size="small"></el-button>
				<el-button type="danger" class="close" v-if="isShow" @click="isShow = false" icon="el-icon-error"
					size="small"></el-button> -->
				<template v-if="isShow">
					<div class="searchButton">
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


			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane name="CQ"><span slot="label"><i class="el-icon-refresh"></i>重启服务记录<b
							class="tableNum">{{CQlength}}</b>次</span></el-tab-pane>
				<el-tab-pane name="XG"><span slot="label"><i class="el-icon-edit"></i>修改后台记录<b
							class="tableNum">{{XGlength}}</b>次</span></el-tab-pane>
				<el-tab-pane name="SC"><span slot="label"><i class="el-icon-delete"></i>删除结果记录<b
							class="tableNum">{{SClength}}</b>次</span></el-tab-pane>
			</el-tabs>
			<div class="pkTableBox">
				<el-table :data="tableData" ref="tableBox" :key="tableIndex" style="width: 100%; " height="100%"
					v-loading="loading" element-loading-text="加载中……" element-loading-spinner="el-icon-loading"
					element-loading-background="rgba(0, 0, 0, 0.6)">
					<el-table-column v-if="activeName != 'XG'" prop="Line" label="线体" align="center"
						show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="Station" label="工位" align="center"></el-table-column>
					<el-table-column prop="Equipmentname" label="设备名称" align="center" show-overflow-tooltip>
					</el-table-column>
					<template v-if="activeName == 'XG'">
						<el-table-column prop="ModificationCause" label="修改原因" align="center" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="ModificationMan" label="修改人员" align="center">
						</el-table-column>
					</template>
					<template v-if="activeName == 'SC'">
						<el-table-column prop="DELETECause" label="删除原因" align="center" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="DELETEMan" label="删除人员" align="center">
						</el-table-column>
						<el-table-column prop="DELETEResult" label="删除结果" align="center">
						</el-table-column>
					</template>

					<el-table-column prop="ModificationDate" label="修改时间" align="center" v-if="activeName == 'XG'">
					</el-table-column>
					<el-table-column prop="Date" label="时间记录" align="center" v-else>
					</el-table-column>
				</el-table>
			</div>
			<el-pagination layout="prev, pager, next" :total="100" style="display:none"> </el-pagination>
		</div>
	</div>
</template>


<script>
	import moment from "moment";
	// 引入封装好的接口
	import {
		SearchWebTheer
	} from "@/api/api.js";
	export default {
		data() {
			return {
				loading: false,
				isShow: true,
				params: {
					// current: 1,
					// pagesize: 20,
					Line: "",
					Station: "",
					Equipment: "",
					StartDate: moment(moment(new Date()).add('year', 0).format("YYYY-MM-DD")).subtract(7, "days").format(
					"YYYY-MM-DD"),
					EndDate: moment(new Date()).add('year', 0).format("YYYY-MM-DD"),
				},
				// startTime: moment(moment(new Date()).add('year', 0).format("YYYY-MM-DD")).subtract(7, "days").format(
				// 	"YYYY-MM-DD"),
				// endTime: moment(new Date()).add('year', 0).format("YYYY-MM-DD"),
				tableIndex: 0,
				activeName: "CQ",
				tableData: [],
				dataList:{},
				CQlength:0,
				XGlength:0,
				SClength:0
			};
		},
		methods: {
			// 获取列表
			async getDataList() {
				this.loading = true
				let result = await SearchWebTheer(this.params);
				if (result.status == "200") {
					this.dataList= result.list;
					this.CQlength =this.dataList.KanBanTheerCQ.length
					this.XGlength =this.dataList.KanBanTheerXG.length
					this.SClength =this.dataList.KanBanTheerSC.length
					this.onDataList()
					
				} else {
					this.loading = false
				}
			},
			onDataList(){
				if (this.activeName == "CQ") {
					this.tableData = this.dataList.KanBanTheerCQ;
					
				} else if (this.activeName == "XG") {
					this.tableData = this.dataList.KanBanTheerXG;
					
				} else {
					this.tableData = this.dataList.KanBanTheerSC;
					
				}
				this.tableIndex++;
				this.loading = false
			},
			handleClick(e) {
				this.activeName = e.name;
				this.onDataList()
			},

			//搜索
			headerButton() {
				this.getDataList();
			},

		},
		mounted() {
			this.params = this.$route.query;
			var end = moment(new Date()).add('year', 0).format("YYYY-MM-DD");
			this.params.StartDate = moment(end).subtract(7, "days").format("YYYY-MM-DD")
			this.params.EndDate = moment(new Date()).add('year', 0).format("YYYY-MM-DD")
			this.getDataList();
		},
	};
</script>
<style scoped>
	.lookEcharts {
		position: fixed;
		top: 15px;
		right: 30px;
	}

	.pkWarp>>>.el-tabs__header {
		margin-bottom: 0;
	}

	.pkWarp>>>.el-tabs__item {
		font-size: 16px;
		color: #b2e9c1;
	}

	.pkWarp>>>.el-tabs__item.is-active {
		font-weight: bold;
		color: #008000;
	}

	.pkWarp>>>.el-tabs--card>.el-tabs__header .el-tabs__nav {
		border-color: #37CC48;
		border-radius: 5px 5px 0 0;
	}

	.pkWarp>>>.el-tabs--card>.el-tabs__header {
		border-bottom-color: #37CC48;
	}

	.pkWarp>>>.el-tabs--card>.el-tabs__header .el-tabs__item {
		border-left-color: #37CC48;
	}

	.pkWarp>>>.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
		border-bottom-color: #161414 !important;
	}

	.pkTableBox {
		position: relative;
		padding: 10px;
		border-left: 1px solid #37CC48;
		border-right: 1px solid #37CC48;
		border-bottom: 1px solid #37CC48;
		border-radius: 0 0 5px 5px;
	}

	.el-pagination {
		border-left: 1px solid #37CC48;
		border-right: 1px solid #37CC48;
		border-bottom: 1px solid #37CC48;
		border-radius: 0 0 5px 5px;
	}

	.tableNum {
		color: red;
		font-weight: bold;
		margin: 0 5px;
	}

	.haderSearch {
		position: absolute;
		top: 85px;
		left: 600px;
		display: flex;
		z-index: 9;
	}

	.searchButton {
		display: flex;
		justify-items: center;
		align-items: center;
		margin-left: 20px;
	}

	.searchButton .el-date-editor {
		margin-right: 10px;
	}
</style>
