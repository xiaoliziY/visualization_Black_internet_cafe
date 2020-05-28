var mychart_scatter;

mychart_scatter = echarts.init(document.getElementById('circletime'), 'dark');
mychart_scatter.title = '周上网时间分析';
var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
	'7a', '8a', '9a', '10a', '11a',
	'12p', '1p', '2p', '3p', '4p', '5p',
	'6p', '7p', '8p', '9p', '10p', '11p'
];
var days = ['Saturday', 'Friday', 'Thursday',
	'Wednesday', 'Tuesday', 'Monday', 'Sunday'
];

var data = mydata();
option = {
	title: {
		text: '周上网时间分析'
	},
	 backgroundColor: '#08304a',
	legend: {
		data: ['Punch Card'],
		left: 'right'
	},
	polar: {},
	tooltip: {
		formatter: function(params) {
			return params.value[2] + ' commits in ' + hours[params.value[1]] + ' of ' + days[params.value[0]];
		}
	},
	angleAxis: {
		type: 'category',
		data: hours,
		boundaryGap: false,
		splitLine: {
			show: true,
			lineStyle: {
				color: '#999',
				type: 'dashed'
			}
		},
		axisLine: {
			show: false
		}
	},
	radiusAxis: {
		type: 'category',
		data: days,
		axisLine: {
			show: false
		},
		axisLabel: {
			rotate: 45
		}
	},
	series: [{
		name: 'Punch Card',
		type: 'scatter',
		coordinateSystem: 'polar',
		symbolSize: function(val) {
			return val[2]/200;
		},
		data: data,
		animationDelay: function(idx) {
			return idx * 7;
		}
	}]

};
mychart_scatter.setOption(option);

function mydata() {
	var mydata = []
	var c = 0
	var temp = []
	var dataset = [
		[1370, 847, 452, 363, 273, 177, 174, 146, 273, 656, 920, 1057, 1159, 2143, 2129, 2124, 2176, 2175, 2284, 3009, 3154, 2770, 2215, 1732],
		[948, 787, 440, 341, 214, 165, 191, 163, 255, 640, 922, 1016, 1105, 2082, 1911, 1791, 1593, 1538, 1665, 2524, 2774, 2168, 1782, 1355],
		[915, 862, 500, 380, 273, 213, 174, 177, 245, 636, 936, 966, 1124, 2107, 1934, 1807, 1598, 1581, 1708, 2483, 2726, 2285, 1857, 1361],
		[941, 899, 474, 426, 297, 202, 165, 158, 255, 685, 948, 1057, 1174, 2147, 2022, 1924, 1719, 1574, 1655, 2613, 2799, 2283, 1769, 1340],
		[903, 981, 576, 394, 291, 155, 138, 145, 278, 714, 954, 1093, 1236, 2141, 1889, 1803, 1621, 1541, 1655, 2528, 2786, 2319, 1818, 1340],
		[1107, 1240, 659, 466, 319, 238, 203, 222, 392, 936, 1421, 1645, 1857, 3033, 3938, 3637, 2838, 2237, 1977, 2553, 2991, 2401, 2018, 1498],
		[1535, 1290, 614, 494, 345, 258, 174, 261, 548, 1084, 1581, 1713, 1835, 3054, 3748, 3421, 2657, 2317, 2393, 3169, 3591, 3243, 2630, 2077]
	]
	//day
	for(var i = 6; i >= 0; i--) {
		//hour
		for(var j = 0; j <= 23; j++) {
			temp = [i, j, dataset[i][j]];
			mydata[c] = temp;
			c++;
		}
	}
	return mydata
}