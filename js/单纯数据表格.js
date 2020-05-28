function show(jsondata) {
	var jsonobjs = eval(jsondata);
	var table = document.getElementById("myTable");
	
	
	table.onclick=function(){
		console.log("数据测试");
	}
	
	for(var y = 0; y < jsonobjs.data.length; y++) {
		var tr = table.insertRow(table.rows.length); //添加一行

		//添加三列
		var td1 = tr.insertCell();
		td1.colSpan = 3;

		var td2 = tr.insertCell();
		td2.colSpan = 1;

		td2.align = "center";
		var td3 = tr.insertCell();
		td3.colSpan = 1;

		td3.align = "center";
		//设置列内容和属性
		var td4 = tr.insertCell();
		td4.colSpan = 3;
		td4.align = "center";
		var td5 = tr.insertCell();
		td5.colSpan = 2;
		var td6 = tr.insertCell();
		td6.colSpan = 2;
		td6.align = "center";
		td1.innerHTML = jsonobjs.data[y].id;
		td2.innerHTML = jsonobjs.data[y].name;
		td3.innerHTML = jsonobjs.data[y].age;
		td4.innerHTML = jsonobjs.data[y].hourS;
		td5.innerHTML = jsonobjs.data[y].allhour;
		td6.innerHTML = jsonobjs.data[y].time;

		td1.style.color = "#DCDCDC";
		td2.style.color = "#DCDCDC";
		td3.style.color = "#DCDCDC";
		td4.style.color = "#DCDCDC";
		td5.style.color = "#DCDCDC";
		td6.style.color = "#DCDCDC";
	
	}
}

function init() {
	d3.json('./data_files/data.json', function(err, dataset) {
		if(err) {
			return;
		}
		console.log(dataset);
		show(dataset);
	})
}

init();




	




//      tds = document.getElementsByTagName('th');
//  for(var i = 0; i < ths.length; i++){
//      ths[i].index = i;
//      ths[i].onclick = function () {
//          tds[this.index].style.backgroundColor = 'red';
//      }
//  }