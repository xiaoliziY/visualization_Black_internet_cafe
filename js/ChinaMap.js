function getEcharts() {
	MyOption=	{
				dataRange: {
					min: 1000,
					max: 100000,
					calculable: true,
					color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
					textStyle: {
						color: '#fff'
					}
				},

				backgroundColor: '#232323',
				series: [{
						name: '全国',
						type: 'map',
						roam: true,
						hoverable: false,
						mapType: 'china',
						itemStyle: {
							normal: {
								borderColor: 'rgba(100,149,237,1)',
								borderWidth: 0.9,
								areaStyle: {
									color: '#1b1b1b'
								}
							}
						},
						data: [],
						markLine: {
							smooth: true,
							symbol: ['none', 'circle'],
							symbolSize: 1,
							itemStyle: {
								normal: {
									color: '#fff',
									borderWidth: 1
								}
							},
							data: [],
						},
						geoCoord: {
							'新疆': [87.6, 36.8], //
							'安徽': [117.8333, 31.85], //
							'江苏': [118.8333, 32.3333], //
							'浙江': [120.15, 30.2333], //
							'湖南': [113.4666, 28.1833], //
							'江西': [115.8666, 28.6833], //
							'湖北': [114.35, 30.6166], //
							'四川': [104.0833, 30.65], //
							'贵州': [106.7, 26.5833], //
							'福建': [119.3, 26.0833], //
							'台湾': [121.5166, 25.05], //
							'广东': [113.25, 23.1333], //
							'海南': [110.3333, 20.0333], //
							'广西': [108.3333, 22.8], //
							'云南': [102.6833, 25], //
							'西藏': [91.1666, 29.6666], //
							'香港': [114.1666, 22.3], //
							'北京': [116.4666, 39.9], //
							'上海': [121.4833, 31.2333], //
							'天津': [117.1833, 39.15], //
							'重庆': [106.5333, 29.5333],
							'黑龙江': [126.6833, 45.75], //
							'吉林': [125.3166, 43.8666], //
							'辽宁': [123.4, 41.8333], //
							'内蒙古': [111.8, 40.8166], //
							'河北': [114.4666, 38.0333], //
							'山西': [112.5666, 37.8666], //
							'山东': [117, 36.6333], //
							'河南': [113.7, 34.8], //
							'陕西': [108.9, 34.2666], //
							'甘肃': [103.8166, 36.05], //
							'宁夏': [106.2666, 38.3333], //
							'青海': [101.75, 36.6333] //

						},
						markPoint: {
							symbol: 'emptyCircle',
							symbolSize: function(v) {
								if(v > 100000)
									return 10 + v / 100000;
								else return 10 + v / 10000;

							},
							effect: {
								show: true,
								shadowBlur: 0
							},
							itemStyle: {
								normal: {
									label: {
										show: false
									}
								},
								emphasis: {
									label: {
										position: 'top'
									}
								}
							},
							//动画波浪圆圈
							data: [

								{
									name: '四川',
									value: 865364
								},

								{
									name: '贵州',
									value: 119266
								},

								{
									name: '湖北',
									value: 66793
								},

								{
									name: '湖南',
									value: 47195
								},

								{
									name: '河南',
									value: 44377
								},

								{
									name: '云南',
									value: 41478
								},

								{
									name: '江西',
									value: 29129
								},

								{
									name: '安徽',
									value: 27452
								},

								{
									name: '陕西',
									value: 25638
								},

								{
									name: '江苏',
									value: 22587
								},

								{
									name: '甘肃',
									value: 22247
								},

								{
									name: '河北',
									value: 20776
								},

								{
									name: '浙江',
									value: 19266
								},

								{
									name: '山东',
									value: 19097
								},

								{
									name: '福建',
									value: 18511
								},

								{
									name: '新疆',
									value: 18494
								},

								{
									name: '广东',
									value: 17106
								},

								{
									name: '山西',
									value: 16193
								}, {
									name: '广西',
									value: 12773
								},

								{
									name: '黑龙江',
									value: 11932
								},

								{
									name: '内蒙古',
									value: 9897
								},
								{
									name: '辽宁',
									value: 9029
								},

								{
									name: '吉林',
									value: 8327
								},
								{
									name: '海南',
									value: 6708
								}, {
									name: '青海',
									value: 6617
								},

								{
									name: '西藏',
									value: 5647
								},

								{
									name: '宁夏',
									value: 4628
								},

								{
									name: '天津',
									value: 1646
								},

								{
									name: '上海',
									value: 1342
								},

								{
									name: '北京',
									value: 1210
								}

								//、、、、、、、、、、、、、、

							]
						}
					},
					{
						name: '北京 Top10',
						type: 'map',
						mapType: 'china',
						data: [],
						markLine: {
							smooth: true,
							effect: {
								show: true,
								scaleSize: 1,
								period: 30,
								color: '#fff',
								shadowBlur: 10
							},
							itemStyle: {
								normal: {
									label: {
										show: false
									},
									borderWidth: 1,
									lineStyle: {
										type: 'solid',
										shadowBlur: 10
									}
								}
							},
							//首位指向明确
							data: [
								[{
									name: '上海'
								}, {
									name: '重庆',
									value: 95
								}],
								//重庆, 205777, 174466, 31311
								[{
									name: '四川'
								}, {
									name: '重庆',
									value: 865364
								}],

								[{
									name: '贵州'
								}, {
									name: '重庆',
									value: 119266
								}],

								[{
									name: '湖北'
								}, {
									name: '重庆',
									value: 66793
								}],

								[{
									name: '湖南'
								}, {
									name: '重庆',
									value: 47195
								}],

								[{
									name: '河南'
								}, {
									name: '重庆',
									value: 44377
								}],

								[{
									name: '云南'
								}, {
									name: '重庆',
									value: 41478
								}],

								[{
									name: '江西'
								}, {
									name: '重庆',
									value: 29129
								}],

								[{
									name: '安徽'
								}, {
									name: '重庆',
									value: 27452
								}],

								[{
									name: '陕西'
								}, {
									name: '重庆',
									value: 25638
								}],

								[{
									name: '江苏'
								}, {
									name: '重庆',
									value: 22587
								}],

								[{
									name: '甘肃'
								}, {
									name: '重庆',
									value: 22247
								}],

								[{
									name: '河北'
								}, {
									name: '重庆',
									value: 20776
								}],

								[{
									name: '浙江'
								}, {
									name: '重庆',
									value: 19266
								}],

								[{
									name: '山东'
								}, {
									name: '重庆',
									value: 19097
								}],

								[{
									name: '福建'
								}, {
									name: '重庆',
									value: 18511
								}],

								[{
									name: '新疆'
								}, {
									name: '重庆',
									value: 18494
								}],

								[{
									name: '广东'
								}, {
									name: '重庆',
									value: 17106
								}],

								[{
									name: '山西'
								}, {
									name: '重庆',
									value: 16193
								}],

								[{
									name: '广西'
								}, {
									name: '重庆',
									value: 12773
								}],

								[{
									name: '黑龙江'
								}, {
									name: '重庆',
									value: 11932
								}],
								[{
									name: '内蒙古'
								}, {
									name: '重庆',
									value: 9897
								}],

								[{
									name: '辽宁'
								}, {
									name: '重庆',
									value: 9029
								}],
								[{
									name: '吉林'
								}, {
									name: '重庆',
									value: 8327
								}],
								[{
									name: '海南'
								}, {
									name: '重庆',
									value: 6708
								}],
								[{
									name: '青海'
								}, {
									name: '重庆',
									value: 6617
								}],

								[{
									name: '西藏'
								}, {
									name: '重庆',
									value: 5647
								}],

								[{
									name: '宁夏'
								}, {
									name: '重庆',
									value: 4628
								}],

								[{
									name: '天津'
								}, {
									name: '重庆',
									value: 1646
								}],

								[{
									name: '上海'
								}, {
									name: '重庆',
									value: 1342
								}],
								[{
									name: '北京'
								}, {
									name: '重庆',
									value: 1210
								}],

							]
						},
						markPoint: {
							symbol: 'emptyCircle',
							symbolSize: function(v) {
								return 0.1
							},
							effect: {
								show: true,
								shadowBlur: 0
							},
							itemStyle: {
								normal: {
									label: {
										show: true,
										position: 'top',
										textStyle: {
											fontSize: 14
										}
									}
								},
								emphasis: {
									label: {
										show: false
									}
								}
							},
							//数字显示
							data: [{
									name: '四川',
									value: 865364
								},

								{
									name: '贵州',
									value: 119266
								},

								{
									name: '湖北',
									value: 66793
								},

								{
									name: '湖南',
									value: 47195
								},

								{
									name: '河南',
									value: 44377
								},

								{
									name: '云南',
									value: 41478
								},

								{
									name: '江西',
									value: 29129
								},

								{
									name: '安徽',
									value: 27452
								},

								{
									name: '陕西',
									value: 25638
								},

								{
									name: '江苏',
									value: 22587
								},

								{
									name: '甘肃',
									value: 22247
								},

								{
									name: '河北',
									value: 20776
								},

								{
									name: '浙江',
									value: 19266
								},

								{
									name: '山东',
									value: 19097
								},

								{
									name: '福建',
									value: 18511
								},

								{
									name: '新疆',
									value: 18494
								},

								{
									name: '广东',
									value: 17106
								},

								{
									name: '山西',
									value: 16193
								}, {
									name: '广西',
									value: 12773
								},

								{
									name: '黑龙江',
									value: 11932
								},

								{
									name: '内蒙古',
									value: 9897
								},
								{
									name: '辽宁',
									value: 9029
								},

								{
									name: '吉林',
									value: 8327
								},
								{
									name: '海南',
									value: 6708
								}, {
									name: '青海',
									value: 6617
								},

								{
									name: '西藏',
									value: 5647
								},

								{
									name: '宁夏',
									value: 4628
								},

								{
									name: '天津',
									value: 1646
								},

								{
									name: '上海',
									value: 1342
								},

								{
									name: '北京',
									value: 1210
								}

							]
						}
					}
				]
			};
						
	require.config({
		paths: {
			echarts: './js'
		}
	});

	require(
		[
			'echarts',
			'echarts/chart/map'
		],
		function(ec) {
			// --- 地图 ---
			var myChart2 = ec.init(document.getElementById('div_ChinaMap'));
			myChart2.setOption(MyOption);
		});	
}







function eConsole(param) {  
    if (typeof param.seriesIndex == 'undefined') {  
        return;  
    }  
    if (param.type == 'click') {  
        alert(param.name);  
    }  
}
