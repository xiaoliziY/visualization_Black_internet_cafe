var myChart_small3;

function refresh_smallView3(data1) {
	if(myChart_small3 != null && myChart_small3 != "" && myChart_small3 != undefined) {
		myChart_small3.dispose();
	}
	var myData3 = data1;
	myChart_small3 = echarts.init(document.getElementById('small_view3'), 'dark');
	option_small3 = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},

		legend: {
			orient: 'vertical',
			x: 'left',
			top: '3%',
			data: ['重庆本地', '外来人口', '18岁以下', '18至60岁', '60岁以上', '男性', '女性']
		},
		series: [

			{
				name: '性别比例',
				type: 'pie',
				radius: ['0%', '25%'],
				center: ['70%', '50%'],
				label: {
					normal: {
						show: false
					}
				},
				data: [{ //外部圆环数据
						value: myData3[5],
						name: '男性'
					},
					{ //外部圆环数据
						value: myData3[6],
						name: '女性'
					}
//							s3_data[0] = root[i].本地;
//							s3_data[1] = root[i].外地;
//							s3_data[2] = root[i].少;
//							s3_data[3] = root[i].青;
//							s3_data[4] = root[i].老;
//							s3_data[5] = root[i].男;
//							s3_data[6] = root[i].女;
					
				]
			},

			{
				name: '人员来自',
				type: 'pie',
				radius: ['35%', '55%'],
				center: ['70%', '50%'],
				label: {
					normal: {
						show: false
					}
				},
				data: [{ //外部圆环数据
						value: myData3[0],
						name: '重庆本地'
					},
					{ //外部圆环数据
						value: myData3[1],
						name: '外来人口'
					}

				]
			},

			{
				name: '年龄分布',
				type: 'pie',
				selectedMode: 'single',
				radius: ['65%', '85%'],
				center: ['70%', '50%'],
				label: {
					normal: {
						show: false
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data: [{
						value: myData3[2],
						name: '18岁以下',

					},
					{
						value: myData3[3],
						name: '18至60岁'
					},
					{
						value: myData3[4],
						name: '60岁以上'
					}
				]
			}

		]
	};

	myChart_small3.setOption(option_small3);
	window.addEventListener("resize", function() {
		myChart_small3.resize();
	});

}