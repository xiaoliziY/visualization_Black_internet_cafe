var myChart_top100;

function refresh_top100(mydata, textdata) {

	if(myChart_top100 != null && myChart_top100 != "" && myChart_top100 != undefined) {
		myChart_top100.dispose();
	}

	myChart_top100 = echarts.init(document.getElementById('test22'), 'dark');
	var dataAxis = textdata;
	var data = mydata;

	var yMax = 500;
	var dataShadow = [];

	for(var i = 0; i < data.length; i++) {
		dataShadow.push(yMax);
	}

	option = {
		title: {
			text: '热门网吧top10',
			textStyle: {
				fontSize: 18
			}
		},
		 backgroundColor: '#08304a',
		tooltip: {
			//			trigger: 'item',
			formatter: "{b} : {c} "
		},
		xAxis: {
			data: dataAxis,
			axisLabel: {
				interval: 0,
				rotate: 45,
				textStyle: {
					color: '#fff',
					fontSize: 10
				}
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			z: 10
		},
		yAxis: {
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				textStyle: {
					color: '#fff'
				}
			}
		},
		dataZoom: [{
			type: 'inside'
		}],
		series: [{ // For shadow
				type: 'bar',
				itemStyle: {
					normal: {
						color: 'rgba(0,0,0,0.05)'
					}
				},
				barGap: '-100%',
				barCategoryGap: '40%',
				data: dataShadow,
				animation: false
			},
			{
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [{
									offset: 0,
									color: '#83bff6'
								},
								{
									offset: 0.5,
									color: '#188df0'
								},
								{
									offset: 1,
									color: '#188df0'
								}
							]
						)
					},
					emphasis: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [{
									offset: 0,
									color: '#2378f7'
								},
								{
									offset: 0.7,
									color: '#2378f7'
								},
								{
									offset: 1,
									color: '#83bff6'
								}
							]
						)
					}
				},
				data: data
			}
		]
	};

	// Enable data zoom when user click bar.
	var zoomSize = 6;
	myChart_top100.on('click', function(params) {
		console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
		myChart_top100.dispatchAction({
			type: 'dataZoom',
			startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
			endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
		});

		function movebaiduView(pos) {

		}

	});

	myChart_top100.setOption(option);

	window.addEventListener("resize", function() {
		myChart_top100.resize();
	});

}

//TOP100网吧
d3.csv('./data_files/popular.csv', function(err, datas) {
	if(err) console.log('读数据失败' + err);
	var numdata = [];
	var textdatas = [];
	for(var i = 0; i < datas.length; i++) {
		numdata[i] = datas[i].sum;
		textdatas[i] = datas[i].title;
	}
	refresh_top100(numdata, textdatas);
});