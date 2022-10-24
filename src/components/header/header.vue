<template>
	<div class="pcHeader">
		<img src="../../assets/images/kb_top_logo1.png" class="pcLogo" />
		<div class="pcHeaderText">
			SSPA PY & JK Dashboard <span>{{timeData}}</span>
		</div>
	</div>
</template>
<script>
	import moment from 'moment';
	export default {
		data() {
			return {
				timeData: moment().format('YYYY-MM-DD HH:mm:ss'),
			}
		},
		methods: {

		},

		created() {
			setInterval(() => {
				this.timeData = moment().format('YYYY-MM-DD HH:mm:ss')
			}, 1000)
		}
	}
</script>
<style scoped>
	.pcHeader {
		display: flex;
		align-items: center;
		position: relative;
		width: 100%;
		height: 60px;
		padding: 0 10px;

	}

	.pcHeader::after {
		content: "";
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 1px;
		background: url("../../assets/images/kb_top_logo_line1.png");
		background-size: 100% 100%;
	}

	.pcLogo {
		width: 240px;
	}

	.pcHeaderText {
		position: relative;
		color: #37CC48;
		font-size: 27px;
		font-weight: bold;
		letter-spacing: .1rem;
	}
	
	.pcHeaderText span{
		position: fixed;
		top: 20px;
		right: 120px;
		color: #ececec;
		font-size: 20px;
	}
</style>
