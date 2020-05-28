var myChart = echarts.init(document.getElementById('div_tiaoxinMap'), 'dark');

myChart.showLoading();

d3.json('./data_files/outpeople2.json', function(datas) {
	myChart.hideLoading();

	option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
				label: {
					show: true
				}
			}
		},
		toolbox: {
			show: true,
			feature: {
				mark: {
					show: true
				},
				dataView: {
					show: true,
					readOnly: false
				},
				magicType: {
					show: true,
					type: ['line', 'bar']
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		calculable: true,
		legend: {
			data: ['girl', 'boy', 'sum'],
			itemGap: 5
		},
		grid: {
			top: '12%',
			left: '1%',
			right: '10%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			data: datas.names
		}],
		yAxis: [{
			type: 'value',
			name: '人口数目',
			axisLabel: {
				formatter: function(a) {
					a = +a;
					return isFinite(a) ?
						echarts.format.addCommas(+a / 1000) :
						'';
				}
			}
		}],
		dataZoom: [{
				show: true,
				start: 0,
				end: 100
			},
			{
				type: 'inside',
				start: 94,
				end: 100
			},
			{
				show: true,
				yAxisIndex: 0,
				filterMode: 'empty',
				width: 30,
				height: '80%',
				showDataShadow: false,
				left: '93%'
			}
		],
		series: [{
				name: 'girl',
				type: 'bar',
				data: datas.girl
			},

			{
				name: 'boy',
				type: 'bar',
				data: datas.boy
			},

			{
				name: 'sum',
				type: 'bar',
				data: datas.people
			}
		]
	};

	myChart.setOption(option);
	window.addEventListener("resize", function() {
		myChart.resize();
	});

});