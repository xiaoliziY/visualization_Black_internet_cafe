function draw_migrant_barchart() {

	var myChart = echarts.init(document.getElementById('migrant_barchart'),'dark');
	myChart.title = '堆叠柱状图';
	option = {
		title: {
			text: '各省份人口统计'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		legend: {
			data: ['男', '女']
		},
		grid: {
			left: '3%',
			right: '5%',
			bottom: '5%',
			containLabel: true
		},
		yAxis: {
			type: 'value'
		},
		xAxis: {
			type: 'category',
			data: ['四川', '重庆', '贵州', '湖北', '湖南', '河南', '云南', '江西', '安徽', '陕西']
		},
		series: [{
				name: '男',
				type: 'bar',
				stack: '总量',
				label: {
					normal: {
						show: false,
						position: 'inside'
					}
				},
				data: [766820, 174466, 105060, 60667, 43027, 40587, 36243, 27365, 25725, 23536]
			},
			{
				name: '女',
				type: 'bar',
				stack: '总量',
				label: {
					normal: {
						show: false,
						position: 'right'
					}
				},
				data: [98544, 31311, 14206, 6126, 4168, 3790, 5235, 1764, 1727, 2102]
			}
		]
	};
	myChart.setOption(option);
	
	
	
	 


window.addEventListener("resize", function() {
	myChart.resize();
});
}