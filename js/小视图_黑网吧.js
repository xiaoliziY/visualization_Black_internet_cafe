var myChart_small1;

function refresh_smallView1(data1, data2, data3, data4) {

	if(myChart_small1 != null && myChart_small1 != "" && myChart_small1 != undefined) {
		myChart_small1.dispose();
	}

	myChart_small1 = echarts.init(document.getElementById('small_view1'), 'dark');

	var datalist1 = [];
	var datalist2 = [];
	var datalist3 = [];
	var datalist4 = [];

	this.datalist1 = data1;
	this.datalist2 = data2;
	this.datalist3 = data3;
	this.datalist4 = data4;

	option_small1 = {

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			right: '20%',
			top: '4%',
			data: ['60岁以上', '18至60岁', '18岁以下']
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
		}],
		yAxis: [{
			type: 'value'
		}],

		series: [{
				name: '60岁以上',
				type: 'line',
				stack: '总量',
				areaStyle: {},
				data: this.datalist1
			},
			{
				name: '18至60岁',
				type: 'line',
				stack: '总量',
				areaStyle: {},
				data: this.datalist2
			},
			{
				name: '18岁以下',
				type: 'line',
				stack: '总量',
				areaStyle: {},
				data: this.datalist3
			}
		]
	};

	myChart_small1.setOption(option_small1);

	window.addEventListener("resize", function() {
		myChart_small1.resize();
	});

}