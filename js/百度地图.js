var map = new BMap.Map("container", {
	minZoom: 5,
	maxZoom: 20
}); // 创建地图实例

// 创建地图实例  
var point = new BMap.Point(107.55, 30.27);
// 创建点坐标  
map.centerAndZoom(point, 8);
// 初始化地图，设置中心点坐标和地图级别
map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

map.setMapStyle({
	style: 'midnight'
});

var marker; // 创建标注    
var mySquare;
var blist = [];
var districtLoading = 0;
var infoWindow; // 创建信息窗口对象    
var markers = new Array();
var things = new Array();
var markerArr;
//异常网吧

var ifopen1 = false,
	ifopen2 = false;

var remLastTimeId = -1;

d3.csv('./data_files/map_data2.csv', function(error, root) {
	if(error) console.log('读数据失败' + error);

	markerArr = root;

	var point = new Array(); //存放标注点经纬信息的数组
	var marker = new Array(); //存放标注点对象的数组
	for(var i = 0; i < markerArr.length; i++) {
		var p0 = markerArr[i].lng; //
		var p1 = markerArr[i].lat; //按照原数组的point格式将地图点坐标的经纬度分别提出来
		point[i] = new window.BMap.Point(p0, p1); //循环生成新的地图点

		var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(21, 24), {
			offset: new BMap.Size(10, 25), // 指定定位位置
			imageOffset: new BMap.Size(0, 0 - 12 * 25) // 设置图片偏移
		});

		marker[i] = new window.BMap.Marker(point[i], {
			icon: myIcon
		});

		map.addOverlay(marker[i]);
	}

	for(var i = 0; i < markerArr.length; i++) {
		addInfo(markerArr[i].siteid,
			"<p style='font-size:8px;lineheight:0.5em;'>" + "可疑网吧</br>" + "网吧名称：" +
			markerArr[i].title + "</br> 经度：" + markerArr[i].lng + "  维度：" + markerArr[i].lat,
			marker[i]);
	}

	function addInfo(pos, txt, marker) {

		var opts = {
			width: 100, // 信息窗口宽度    
			height: 90, // 信息窗口高度  
			title: txt
		}
		var infoWindow = new BMap.InfoWindow(txt, opts);
		//添加点击事件
		marker.addEventListener("click", function() {
			this.openInfoWindow(infoWindow);

			openwin(pos);

			function openwin(pos) {
				if(remLastTimeId == -1) {
					window.open('网吧分析视图1.html?id=' + pos, '1', 'height=350,width=750,left=850,top=0,  toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')
					remLastTimeId = pos;
				} else {
					window.open('网吧分析视图1.html?id=' + remLastTimeId, '1', 'height=350,width=750,left=850,top=0,  toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')
					window.open('网吧分析视图2.html?id=' + pos, '2', 'height=350,width=750,left=850,top=420,  toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')
					remLastTimeId = pos;
				}
			}
		});
	}

});
//正常网吧
//d3.csv('./data_files/normal_internet_cafe.csv', function(err, datas) {
//	if(err) console.log('读数据失败' + err);
//	markerArr = datas;
//	var point = new Array(); //存放标注点经纬信息的数组
//	var marker = new Array(); //存放标注点对象的数组
//	var mySquares = new Array();
//	for(var i = 0; i < markerArr.length; i++) {
//		var p0 = markerArr[i].lng; //
//		var p1 = markerArr[i].lat; //按照原数组的point格式将地图点坐标的经纬度分别提出来
//		point[i] = new window.BMap.Point(p0, p1); //循环生成新的地图点
//		mySquares[i] = new SquareOverlay(point[i], 4, "#00FFFF");
//		map.addOverlay(mySquares[i]);
//	}
//});

//TOP100网吧
d3.csv('./data_files/popular.csv', function(err, datas) {
	if(err) console.log('读数据失败' + err);
	markerArr = datas;
	var point = new Array(); //存放标注点经纬信息的数组
	var marker = new Array(); //存放标注点对象的数组
	var mySquares = new Array();
	for(var i = 0; i < markerArr.length; i++) {
		var p0 = markerArr[i].lng; //
		var p1 = markerArr[i].lat; //按照原数组的point格式将地图点坐标的经纬度分别提出来
		point[i] = new window.BMap.Point(p0, p1); //循环生成新的地图点

		var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(21, 24), {
			offset: new BMap.Size(10, 25), // 指定定位位置
			imageOffset: new BMap.Size(0, 0 - 11 * 25) // 设置图片偏移
		});
		marker[i] = new window.BMap.Marker(point[i], {
			icon: myIcon
		});
		map.addOverlay(marker[i]);
	}

	for(var i = 0; i < markerArr.length; i++) {
		addInfo(markerArr[i].siteid,
			"<p style='font-size:8px;lineheight:0.5em;'>" + "热门网吧TOP " + (i + 1) + "</br>" + "网吧名称：" +
			markerArr[i].title + "</br> 经度：" + markerArr[i].lng + "  维度：" + markerArr[i].lat,
			marker[i]);
	}

	function addInfo(pos, txt, marker) {
		var opts = {
			width: 100, // 信息窗口宽度    
			height: 90, // 信息窗口高度  
			title: txt
		}
		var infoWindow = new BMap.InfoWindow(txt, opts);
		marker.addEventListener("click", function() {
			this.openInfoWindow(infoWindow);
		});
	}
});

//、、、、、、、、、、、、、、、、
//map.addControl(new BMap.ScaleControl());
map.setDefaultCursor("crosshair");

//map.addControl(new BMap.NavigationControl()); //为地图添加鱼骨

map.enableScrollWheelZoom();
map.enableDragging();
map.disableDoubleClickZoom();

var ctrlNav = new window.BMap.NavigationControl({
	anchor: BMAP_ANCHOR_TOP_LEFT,
	type: BMAP_NAVIGATION_CONTROL_LARGE
});
map.addControl(ctrlNav);

//向地图中添加缩略图控件
var ctrlOve = new window.BMap.OverviewMapControl({
	anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
	isOpen: 1
});
map.addControl(ctrlOve);

//向地图中添加比例尺控件
var ctrlSca = new window.BMap.ScaleControl({
	anchor: BMAP_ANCHOR_BOTTOM_LEFT
});
map.addControl(ctrlSca);

/*
=====获取行政区域边界=====
*/
function getBoundary() {
	addDistrict("重庆市");
}

/*
=====添加行政区域=====
*/
function addDistrict(districtName) {
	//使用计数器来控制加载过程
	districtLoading++;
	var bdary = new BMap.Boundary();
	bdary.get(districtName, function(rs) { //获取行政区域
		var count = rs.boundaries.length; //行政区域的点有多少个
		for(var i = 0; i < count; i++) {
			blist.push({
				points: rs.boundaries[i],
				name: districtName
			});
		};
		//加载完成区域点后计数器-1
		districtLoading--;
		if(districtLoading == 0) {
			//全加载完成后画端点
			drawBoundary();
		}
	});
}

/*
=====点击行政区域事件=====
*/
function click(evt) {
	//	alert(evt.target.name);
}
/*
=====绘制边界=====
*/
function drawBoundary() {
	//包含所有区域的点数组
	var pointArray = [];
	//循环添加各闭合区域
	for(var i = 0; i < blist.length; i++) {
		//添加多边形层并显示
		var ply = new BMap.Polygon(blist[i].points, {
			strokeWeight: 5, //边框宽度
			trokeColor: "#F0FFF0", //边框颜色
			fillColor: "#00688B" //填充颜色
		}); //建立多边形覆盖物
		ply.name = blist[i].name;
		ply.addEventListener("click", click);
		map.addOverlay(ply);
		//将点增加到视野范围内
		var path = ply.getPath();
		pointArray = pointArray.concat(path);
	}
	//限定显示区域(只显示特定区域，鼠标拖动松开后自动回到显示范围内)，需要引用api库
	// var boundply = new BMap.Polygon(pointArray);
	// BMapLib.AreaRestriction.setBounds(map, boundply.getBounds());

	//	map.setViewport(pointArray); //调整视野 
}

setTimeout(function() {
	getBoundary();
}, 15);

//自定义绘制网吧坐标点、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
// 定义自定义覆盖物的构造函数  
function SquareOverlay(center, length, color) {
	this._center = center;
	this._length = length;
	this._color = color;
}
// 继承API的BMap.Overlay
SquareOverlay.prototype = new BMap.Overlay();

// 实现初始化方法  
SquareOverlay.prototype.initialize = function(map) {
	// 保存map对象实例
	this._map = map;
	// 创建div元素，作为自定义覆盖物的容器
	var div = document.createElement("div");
	div.style.position = "absolute";
	// 可以根据参数设置元素外观
	div.style.width = this._length + "px";
	div.style.height = this._length + "px";
	div.style.background = this._color;
	// 将div添加到覆盖物容器中
	map.getPanes().markerPane.appendChild(div);
	// 保存div实例
	this._div = div;
	// 需要将div元素作为方法的返回值，当调用该覆盖物的show、
	// hide方法，或者对覆盖物进行移除时，API都将操作此元素。
	return div;
}

// 实现绘制方法   
SquareOverlay.prototype.draw = function() {
	// 根据地理坐标转换为像素坐标，并设置给容器    
	var position = this._map.pointToOverlayPixel(this._center);
	this._div.style.left = position.x - this._length / 2 + "px";
	this._div.style.top = position.y - this._length / 2 + "px";
}

// 实现显示方法    
SquareOverlay.prototype.show = function() {
	if(this._div) {
		this._div.style.display = "";
	}
}
// 实现隐藏方法  
SquareOverlay.prototype.hide = function() {
	if(this._div) {
		this._div.style.display = "none";
	}
}

// 添加自定义方法   
SquareOverlay.prototype.toggle = function() {
	if(this._div) {
		if(this._div.style.display == "") {
			this.hide();
		} else {
			this.show();
		}
	}
}