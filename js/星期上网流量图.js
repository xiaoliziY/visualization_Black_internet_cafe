var myChart6;
refresh6(0, 0, 0, 0);

function refresh6(data1, data2, data3, data4) {

	if(myChart6 != null && myChart6 != "" && myChart6 != undefined) {
		myChart6.dispose();
	}

	myChart6 = echarts.init(document.getElementById('scatter'), 'dark');

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
		tooltip: {
			position: 'top'
		},
		title: [],
		singleAxis: [],
		series: [],
		
		
		      
		
		
	};

	echarts.util.each(days, function(day, idx) {
		option.title.push({
			textBaseline: 'middle',
			top: (idx + 0.5) * 100 / 8 + '%',
			text: day
		});
		option.singleAxis.push({
			left: 150,
			type: 'category',
			boundaryGap: false,
			data: hours,
			top: (idx * 100 / 8 + 5) + '%',
			height: (100 / 7 - 10) + '%',
			axisLabel: {
				interval: 2
			}
		});
		option.series.push({
			singleAxisIndex: idx,
			coordinateSystem: 'singleAxis',
			type: 'scatter',
			data: [],
			symbolSize: function(dataItem) {
				return dataItem[1] /5000* 7;
			}
		});
	});

	echarts.util.each(data, function(dataItem) {
		option.series[dataItem[0]].data.push([dataItem[1], dataItem[2]]);
	});

	myChart6.setOption(option);
	window.addEventListener("resize", function() {
	myChart6.resize();
});

}

function mydata() {
	var mydata = []
	var c = 0
	var temp = []
	var dataset = [
		[9599, 5936, 3512, 2737, 1801, 1272, 1068, 948, 1658, 4582, 6124, 7411, 8466, 14425, 15523, 15613, 15972, 15392, 16137, 23552, 26455, 22560, 18340, 13921],
		[7402, 5795, 3310, 2541, 1669, 1198, 999, 882, 1553, 4405, 6055, 7074, 8011, 13436, 13883, 13823, 12540, 11958, 13250, 20431, 23248, 18708, 14760, 10637],
		[7361, 6186, 3566, 2659, 1884, 1351, 1066, 1153, 1685, 4367, 6136, 7120, 8287, 13779, 14394, 14443, 12693, 12724, 13855, 21243, 23473, 19459, 15271, 10662],
		[7322, 6140, 3534, 2858, 1978, 1318, 1027, 934, 1619, 4430, 6198, 7188, 8532, 14365, 14910, 14880, 13707, 12826, 13859, 21776, 24040, 19259, 14943, 10858],
		[7369, 7440, 4185, 2873, 1976, 1309, 971, 906, 1706, 4477, 6332, 7444, 8444, 13934, 14714, 14488, 12749, 12858, 13587, 20891, 23212, 19396, 15037, 10747],
		[8502, 9287, 5114, 3682, 2543, 1727, 1315, 1241, 2153, 5778, 8577, 10185, 12246, 19740, 26264, 25162, 20024, 16856, 15345, 21855, 24907, 21247, 17111, 12517],
		[11572, 8740, 4565, 3429, 2332, 1670, 1220, 1489, 2547, 6000, 8382, 9933, 11486, 18374, 24194, 23357, 19352, 16742, 17239, 24627, 29116, 25561, 20929, 16344]
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