var myChart_small2;

function refresh_smallView2(data1) {
	if(myChart_small2 != null && myChart_small2 != "" && myChart_small2 != undefined) {
		myChart_small2.dispose();
	}
	var data = data1;
	myChart_small2 = echarts.init(document.getElementById('small_view2'), 'dark');
	option_small2 = {
		backgroundColor: '#404a59',
		tooltip: {
			trigger: 'item'
		},
		legend: { //标签
			left: '15%',
			data: ['人数', 'Top 10'],
			textStyle: {
				color: '#fff'
			}
		},
		calendar: [{
			right: '5%',
			top: '24%',
			left: '8%',
			range: ['2016-10-01', '2016-12-31'],
			splitLine: {
				show: true,
				lineStyle: {
					color: '#000',
					width: 3,
					type: 'solid'
				}
			},
			itemStyle: {
				normal: {
					color: '#323c48',
					borderWidth: 1,
					borderColor: '#111'
				}
			}
		}],
		series: [{
				name: '人数',
				type: 'scatter',
				coordinateSystem: 'calendar',
				data: data,
				symbolSize: function(val) {
					if(val[1] == 0) return 0;
					else return Math.log(val[1]) * 5;
					//					return val[1]/5;
				},
				itemStyle: {
					normal: {
						color: '#ddb926'
					}
				}
			},

			//			{
			//				name: 'Top 10',
			//				type: 'effectScatter',
			//				coordinateSystem: 'calendar',
			//				calendarIndex: 1,
			//				data: data.sort(function(a, b) {
			//					return b[1] - a[1];
			//				}).slice(0, 11),
			//				symbolSize: function(val) {
			//					return val[1] / 5;
			//				},
			//				showEffectOn: 'render',
			//				rippleEffect: {
			//					brushType: 'stroke'
			//				},
			//				hoverAnimation: true,
			//				itemStyle: {
			//					normal: {
			//						color: '#f4e925',
			//						shadowBlur: 15,
			//						shadowColor: '#333'
			//					}
			//				},
			//				zlevel: 1
			//			},
			{
				name: 'Top 10',
				type: 'effectScatter',
				coordinateSystem: 'calendar',
				data: data.sort(function(a, b) {
					return b[1] - a[1];
				}).slice(0, 11),
				symbolSize: function(val) {
					if(val[1] == 0) return 0;
					else return Math.log(val[1]) * 5;
					//					return 25;
					//					if()

					//					return val[1]/5 ;
				},
				showEffectOn: 'render',
				rippleEffect: {
					brushType: 'stroke'
				},
				hoverAnimation: true,
				itemStyle: {
					normal: {
						color: '#ddb926',
						shadowBlur: 5,
						shadowColor: '#333'
					}
				},
				zlevel: 1
			}
		]
	};

	myChart_small2.setOption(option_small2);

	window.addEventListener("resize", function() {
		myChart_small2.resize();
	});

}