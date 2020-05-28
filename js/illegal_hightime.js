//非法网吧  总的高峰上网时间图
var myChart_illegalHighTime = echarts.init(document.getElementById('illegal_hightime'), 'dark');
myChart_illegalHighTime.title = '堆叠区域图';
option = {
	title: {
		text: '上网高峰时段'
	},
	 backgroundColor: '#08304a',
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
		left: '30%',
		top: '3%',
		data: ['18岁以下', '18至40岁','40至60岁', '60岁以上']
	},
	grid: {
		left: '2%',
		right: '2%',
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
			name: '18岁以下',
			type: 'line',
			stack: '总量',
			areaStyle: {},
			data: [1261, 1174, 1138, 1103, 1092, 1086, 1082, 1040, 526, 444, 612, 801, 1319, 1695, 1792, 1865, 1836, 1622, 1410, 1413, 1465, 1460, 1428, 1330]
		},
		{
			name: '18至40岁',
			type: 'line',
			stack: '总量',
			areaStyle: {},
			data: [40807, 35156, 31956, 29994, 28887, 28095, 26948, 24779, 18798, 20373, 23993, 28033, 36989, 45485, 50582, 54233, 54754, 51984, 53017, 58996, 63079, 62508, 56291, 47662]
		},
		{
			name: '40至60岁',
			type: 'line',
			stack: '总量',
			areaStyle: {},
			data: [5109, 4701, 4538, 4440, 4280, 4203, 4092, 3730, 3179, 3792, 4464, 4883, 6085, 7214, 7753, 8018, 7674, 6792, 6083, 6463, 6602, 6332, 5878, 5510]
		},
		{
			name: '60岁以上',
			type: 'line',
			stack: '总量',
			areaStyle: {},
			data: [406, 388, 379, 377, 373, 366, 361, 333, 316, 327, 364, 392, 457, 519, 510, 539, 534, 480, 429, 413, 409, 419, 425, 420]
		}
	]
};

myChart_illegalHighTime.setOption(option);


window.addEventListener("resize", function() {
	myChart_illegalHighTime.resize();
});