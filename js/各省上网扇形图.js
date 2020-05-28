var myChart1 = echarts.init(document.getElementById('div_fanmap2'), 'dark');

var data = genData(50);

option1 = {
	title: {
		text: '各省市人口比',
		subtext: '',
		x: 'left',

		textStyle: {
			fontWeight: 'normal', //标题颜色
			color: 'white'
		},
		//		backgroundColor: '# ff0000 '
	},
	tooltip: {
		trigger: 'item',
		formatter: "{b} : {c} ({d}%)"
	},
	legend: {
		type: 'scroll',
		orient: 'vertical',
		right: 10,
		top: 20,
		bottom: 20,
		data: data.legendData,

		selected: data.selected
	},
	series: [{
		name: '省份',
		type: 'pie',
		radius: '60%',
		center: ['40%', '55%'],
		data: data.seriesData,
		itemStyle: {
			emphasis: {
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowColor: 'rgba(0, 0, 0, 0.5)'
			}
		}
	}]
};

function genData(count) {
	var legendData = [];
	var seriesData = [];
	var selected = {};

	aprodata = ['四川', '重庆', '贵州', '湖北', '湖南', '河南', '云南', '江西', '安徽',
		'陕西', '江苏', '甘肃', '河北', '浙江', '山东', '福建', '新疆', '广东', '山西',
		'广西', '黑龙江', '内蒙古', '辽宁', '吉林', '海南', '青海', '西藏', '宁夏', '天津',
		'上海', '北京', '其他'
	];
	baprodata = [865364, 205777, 119266, 66793,
		47195, 44377, 41478, 29129, 27452, 25638, 22587,
		22247, 20776, 19266, 19097, 18511, 18494, 17106, 16193, 12773, 11932,
		9897, 9029, 8327, 6708, 6617, 5647, 4628, 1646, 1342, 1210, 17
	];

	for(var i = 0; i < 32; i++) {
		name = aprodata[i];
		legendData.push(name);

		seriesData.push({
			name: name,
			value: baprodata[i]
		});
		selected[name] = i < 8;
	}

	return {
		legendData: legendData,
		seriesData: seriesData,
		selected: selected
	};
}

myChart1.setOption(option1);

window.addEventListener("resize", function() {
	myChart1.resize();
});