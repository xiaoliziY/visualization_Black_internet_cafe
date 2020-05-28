function show(jsondata) {
	var jsonobjs = jsondata;
	var table = document.getElementById("myTable2");
	for(var y = 0; y < jsonobjs.length; y++) {
		var tr = table.insertRow(table.rows.length); //添加一行

		//添加三列
		var td1 = tr.insertCell();
		td1.colSpan = 3;

//		var td2 = tr.insertCell();
//		td2.colSpan = 1;

//		td2.align = "center";
		var td3 = tr.insertCell();
		td3.colSpan = 1;

		td3.align = "center";
		//设置列内容和属性
		var td4 = tr.insertCell();
		td4.colSpan = 1;
		td4.align = "center";
//		var td5 = tr.insertCell();
//		td5.colSpan = 2;
//		var td6 = tr.insertCell();
//		td6.colSpan = 2;
//		td6.align = "center";
		
		
		
		
		var td7 = tr.insertCell();
		td7.colSpan = 2;
		td7.align = "center";
		var td8 = tr.insertCell();
		td8.colSpan = 3;
		td8.align = "center";
		var td9 = tr.insertCell();
		td9.colSpan = 2;
		td9.align = "center";
//		PERSONID,SITEID,XB,CUSTOMERNAME,ONLINETIME,OFFLINETIME,AREAID,TIME,AGE
//1384c0c3cb65eb48ca,50011310000029,男,李**,2016/10/12 11:41:05,2016/10/15 23:44:45,511322,84.06,23
		td1.innerHTML = jsonobjs[y].PERSONID;
//		td2.innerHTML = jsonobjs[y].SITEID;
		td7.innerHTML = jsonobjs[y].XB;
		td3.innerHTML = jsonobjs[y].CUSTOMERNAME;
//		td5.innerHTML = jsonobjs[y].ONLINETIME;
//		td6.innerHTML = jsonobjs[y].OFFLINETIME;
		
		td8.innerHTML = jsonobjs[y].AREAID;
		td9.innerHTML = jsonobjs[y].TIME;
		
		td4.innerHTML = jsonobjs[y].AGE;
		td7.style.color = "#DCDCDC";
		td8.style.color = "#DCDCDC";
		td4.style.color = "#DCDCDC";
		

		td1.style.color = "#DCDCDC";
//		td2.style.color = "#DCDCDC";
		td3.style.color = "#DCDCDC";
		td9.style.color = "#DCDCDC";
//		td5.style.color = "#DCDCDC";
//		td6.style.color = "#DCDCDC";
	}
}

function init() {
	d3.csv('./data_files/criminal_tendency_people.csv', function(err, dataset) {
		if(err) {
			return;
		}
		console.log(dataset);
		show(dataset);
	})
}

init();