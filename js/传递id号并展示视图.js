function getparam() {
	var query = location.search.substring(1);
	var values = query.split("&");
	for(var i = 0; i < values.length; i++) {
		var pos = values[i].indexOf('=');
		if(pos == -1) continue;
		var paramname = values[i].substring(0, pos);
		var value = values[i].substring(pos + 1);

		var s1 = [];
		var s2 = [];
		var s3 = [];
		var s4 = [];

		var schanged1 = false;
		var schanged2 = false;
		var schanged3 = false;
		var schanged4 = false;
		
		function getData(fileName, whichfile) {
			return new Promise((res, rej) => {
				d3.csv(fileName, function(error, root) {
					if(error) console.log('读数据失败' + error);
					switch(whichfile) {
						case 1:
							schanged1 = false;
							for(var j = 0; j < root.length; j++) {
								if(root[j].siteid == value) {
									for(var o = 0; o < 24; o++) {
										s1[o] = root[j]['t' + o];
									}
									schanged1 = true;
									res(s1); //不可缺
									break;
								}
							}
							res(0);
							break;

						case 2:
							schanged2 = false;
							for(var j = 0; j < root.length; j++) {
								if(root[j].siteid == value) {
									for(var o = 0; o < 24; o++) {
										s2[o] = root[j]['t' + o];
									}
									schanged2 = true;
									res(s2); //不可缺
									break;
								}
							}
							res(0);
							break;
						case 3:
							schanged3 = false;
							for(var j = 0; j < root.length; j++) {
								if(root[j].siteid == value) {
									for(var o = 0; o < 24; o++) {
										s3[o] = root[j]['t' + o];
									}
									schanged3 = true;
									res(s3); //不可缺
									break;
								}
							}
							res(0);
							break;
					}
				});

			})
		}

		Promise.all([getData('./data_files/hightime_60.csv', 1)]).then(res => {
			if(schanged1 == false) s1 = [0];
			Promise.all([getData('./data_files/hightime_18_60.csv', 2)]).then(res => {
				if(schanged2 == false) s2 = [0];
				Promise.all([getData('./data_files/hightime_18.csv', 3)]).then(res => {
					if(schanged3 == false) s3 = [0];
					refresh_smallView1(s1, s2, s3, 0);
				});

			});

		});

		var s2_data = [];

		function getData2(fileName, whichfile) {
			return new Promise((res, rej) => {
				d3.csv(fileName, function(error, root) {
					if(error) console.log('读数据失败' + error);
					for(var i = 0; i < root.length; i++) {
						if(root[i].SITEID == value) {
							var mdate = +echarts.number.parseDate('2016' + '-10-01');
							var end = +echarts.number.parseDate('2017' + '-01-01');
							var dayTime = 3600 * 24 * 1000;
							var data_peoplenumber = [];
							for(var j = 1; j <= 92; j++) {
								data_peoplenumber[j] = root[i]['DAY' + j];
							}
							var k = 0;
							for(var time = mdate; time < end; time += dayTime) {
								s2_data.push([
									echarts.format.formatTime('yyyy-MM-dd', time),
									Math.floor(data_peoplenumber[k++])
								]);
							}
							res(s2_data);
						}
					}
				});
			})
		}

		Promise.all([getData2('./data_files/calendar2.csv', 1)]).then(res => {
			refresh_smallView2(s2_data);
		});

		var s3_data = [];

		function getData3(fileName, whichfile) {
			return new Promise((res, rej) => {
				d3.csv(fileName, function(error, root) {
					if(error) console.log('读数据失败' + error);
					for(var i = 0; i < root.length; i++) {
						if(root[i].siteid == value) {
							document.title = root[i].title;
//							siteid,title,lng,lat,sum,违规人数,少,青,老,男,女,本地,外地
							s3_data[0] = root[i].本地;
							s3_data[1] = root[i].外地;
							s3_data[2] = root[i].少;
							s3_data[3] = root[i].青;
							s3_data[4] = root[i].老;
							s3_data[5] = root[i].男;
							s3_data[6] = root[i].女;
							res(s3_data);
						}
					}
				});
			})
		}

		Promise.all([getData3('./data_files/map_data2.csv', 1)]).then(res => {
			refresh_smallView3(s3_data);
		});

	}
}