define("echarts/chart/force", ["require", "./base", "../data/Graph", "../layout/Force", "zrender/shape/Line", "zrender/shape/BezierCurve", "zrender/shape/Image", "../util/shape/Icon", "../config", "../util/ecData", "zrender/tool/util", "zrender/config", "zrender/tool/vector", "../chart"], function(e) {
	"use strict";

	function t(e, t, o, h, d) {
		var c = this;
		r.call(this, e, t, o, h, d), this.__nodePositionMap = {}, this._graph = new s(!0), this._layout = new l, this._layout.onupdate = function() {
			c._step()
		}, this._steps = 1, this.ondragstart = function() {
			i.apply(c, arguments)
		}, this.ondragend = function() {
			a.apply(c, arguments)
		}, this.ondrop = function() {}, this.shapeHandler.ondragstart = function() {
			c.isDragstart = !0
		}, this.onmousemove = function() {
			n.apply(c, arguments)
		}, this.refresh(h)
	}

	function i(e) {
		if(this.isDragstart && e.target) {
			var t = e.target;
			t.fixed = !0, this.isDragstart = !1, this.zr.on(y.EVENT.MOUSEMOVE, this.onmousemove)
		}
	}

	function n() {
		this._layout.temperature = .8, this._step()
	}

	function a(e, t) {
		if(this.isDragend && e.target) {
			var i = e.target;
			i.fixed = !1, t.dragIn = !0, t.needRefresh = !1, this.isDragend = !1, this.zr.un(y.EVENT.MOUSEMOVE, this.onmousemove)
		}
	}

	function o(e, t, i) {
		var n = f.create();
		return n[0] = (Math.random() - .5) * i + e, n[1] = (Math.random() - .5) * i + t, n
	}
	var r = e("./base"),
		s = e("../data/Graph"),
		l = e("../layout/Force"),
		h = e("zrender/shape/Line"),
		d = e("zrender/shape/BezierCurve"),
		c = e("zrender/shape/Image"),
		p = e("../util/shape/Icon"),
		m = e("../config");
	m.force = {
		zlevel: 1,
		z: 2,
		center: ["50%", "50%"],
		size: "100%",
		preventOverlap: !1,
		coolDown: .99,
		minRadius: 10,
		maxRadius: 20,
		ratioScaling: !1,
		large: !1,
		useWorker: !1,
		steps: 1,
		scaling: 1,
		gravity: 1,
		symbol: "circle",
		symbolSize: 0,
		linkSymbol: null,
		linkSymbolSize: [10, 15],
		draggable: !0,
		clickable: !0,
		roam: !1,
		itemStyle: {
			normal: {
				label: {
					show: !1,
					position: "inside"
				},
				nodeStyle: {
					brushType: "both",
					borderColor: "#5182ab",
					borderWidth: 1
				},
				linkStyle: {
					color: "#5182ab",
					width: 1,
					type: "line"
				}
			},
			emphasis: {
				label: {
					show: !1
				},
				nodeStyle: {},
				linkStyle: {
					opacity: 0
				}
			}
		}
	};
	var u = e("../util/ecData"),
		g = e("zrender/tool/util"),
		y = e("zrender/config"),
		f = e("zrender/tool/vector");
	return t.prototype = {
		constructor: t,
		type: m.CHART_TYPE_FORCE,
		_init: function() {
			this.selectedMap = {};
			var e, t = this.component.legend,
				i = this.series;
			this.clear();
			for(var n = 0, a = i.length; a > n; n++) {
				var o = i[n];
				if(o.type === m.CHART_TYPE_FORCE) {
					if(i[n] = this.reformOption(i[n]), e = i[n].name || "", this.selectedMap[e] = t ? t.isSelected(e) : !0, !this.selectedMap[e]) continue;
					this.buildMark(n), this._initSerie(o, n);
					break
				}
			}
			this.animationEffect()
		},
		_getNodeCategory: function(e, t) {
			return e.categories && e.categories[t.category || 0]
		},
		_getNodeQueryTarget: function(e, t, i) {
			i = i || "normal";
			var n = this._getNodeCategory(e, t) || {};
			return [t.itemStyle && t.itemStyle[i], n && n.itemStyle && n.itemStyle[i], e.itemStyle[i].nodeStyle]
		},
		_getEdgeQueryTarget: function(e, t, i) {
			return i = i || "normal", [t.itemStyle && t.itemStyle[i], e.itemStyle[i].linkStyle]
		},
		_initSerie: function(e, t) {
			this._temperature = 1, e.matrix ? this._graph = this._getSerieGraphFromDataMatrix(e) : e.links && (this._graph = this._getSerieGraphFromNodeLinks(e)), this._buildLinkShapes(e, t), this._buildNodeShapes(e, t);
			var i = e.roam === !0 || "move" === e.roam,
				n = e.roam === !0 || "scale" === e.roam;
			this.zr.modLayer(this.getZlevelBase(), {
				panable: i,
				zoomable: n
			}), (this.query("markPoint.effect.show") || this.query("markLine.effect.show")) && this.zr.modLayer(m.EFFECT_ZLEVEL, {
				panable: i,
				zoomable: n
			}), this._initLayout(e), this._step()
		},
		_getSerieGraphFromDataMatrix: function(e) {
			for(var t = [], i = 0, n = [], a = 0; a < e.matrix.length; a++) n[a] = e.matrix[a].slice();
			for(var o = e.data || e.nodes, a = 0; a < o.length; a++) {
				var r = {},
					l = o[a];
				for(var h in l) "name" === h ? r.id = l.name : r[h] = l[h];
				var d = this._getNodeCategory(e, l),
					c = d ? d.name : l.name;
				if(this.selectedMap[c] = this.isSelected(c), this.selectedMap[c]) t.push(r), i++;
				else {
					n.splice(i, 1);
					for(var p = 0; p < n.length; p++) n[p].splice(i, 1)
				}
			}
			var m = s.fromMatrix(t, n, !0);
			return m.eachNode(function(e, t) {
				e.layout = {
					size: e.data.value,
					mass: 0
				}, e.rawIndex = t
			}), m.eachEdge(function(e) {
				e.layout = {
					weight: e.data.weight
				}
			}), m
		},
		_getSerieGraphFromNodeLinks: function(e) {
			for(var t = new s(!0), i = e.data || e.nodes, n = 0, a = i.length; a > n; n++) {
				var o = i[n];
				if(o && !o.ignore) {
					var r = this._getNodeCategory(e, o),
						l = r ? r.name : o.name;
					if(this.selectedMap[l] = this.isSelected(l), this.selectedMap[l]) {
						var h = t.addNode(o.name, o);
						h.rawIndex = n
					}
				}
			}
			for(var n = 0, a = e.links.length; a > n; n++) {
				var d = e.links[n],
					c = d.source,
					p = d.target;
				"number" == typeof c && (c = i[c], c && (c = c.name)), "number" == typeof p && (p = i[p], p && (p = p.name));
				var m = t.addEdge(c, p, d);
				m && (m.rawIndex = n)
			}
			return t.eachNode(function(e) {
				var t = e.data.value;
				if(null == t) {
					t = 0;
					for(var i = 0; i < e.edges.length; i++) t += e.edges[i].data.weight || 0
				}
				e.layout = {
					size: t,
					mass: 0
				}
			}), t.eachEdge(function(e) {
				e.layout = {
					weight: null == e.data.weight ? 1 : e.data.weight
				}
			}), t
		},
		_initLayout: function(e) {
			var t = this._graph,
				i = t.nodes.length,
				n = this.query(e, "minRadius"),
				a = this.query(e, "maxRadius");
			this._steps = e.steps || 1;
			var r = this._layout;
			r.center = this.parseCenter(this.zr, e.center), r.width = this.parsePercent(e.size, this.zr.getWidth()), r.height = this.parsePercent(e.size, this.zr.getHeight()), r.large = e.large, r.scaling = e.scaling, r.ratioScaling = e.ratioScaling, r.gravity = e.gravity, r.temperature = 1, r.coolDown = e.coolDown, r.preventNodeEdgeOverlap = e.preventOverlap, r.preventNodeOverlap = e.preventOverlap;
			for(var s = 1 / 0, l = -(1 / 0), h = 0; i > h; h++) {
				var d = t.nodes[h];
				l = Math.max(d.layout.size, l), s = Math.min(d.layout.size, s)
			}
			for(var c = l - s, h = 0; i > h; h++) {
				var d = t.nodes[h];
				c > 0 ? (d.layout.size = (d.layout.size - s) * (a - n) / c + n, d.layout.mass = d.layout.size / a) : (d.layout.size = (a - n) / 2, d.layout.mass = .5)
			}
			for(var h = 0; i > h; h++) {
				var d = t.nodes[h];
				if("undefined" != typeof this.__nodePositionMap[d.id]) d.layout.position = f.create(), f.copy(d.layout.position, this.__nodePositionMap[d.id]);
				else if("undefined" != typeof d.data.initial) d.layout.position = f.create(), f.copy(d.layout.position, d.data.initial);
				else {
					var p = this._layout.center,
						m = Math.min(this._layout.width, this._layout.height);
					d.layout.position = o(p[0], p[1], .8 * m)
				}
				var u = d.shape.style,
					g = d.layout.size;
				u.width = u.width || 2 * g, u.height = u.height || 2 * g, u.x = -u.width / 2, u.y = -u.height / 2, f.copy(d.shape.position, d.layout.position)
			}
			i = t.edges.length, l = -(1 / 0);
			for(var h = 0; i > h; h++) {
				var y = t.edges[h];
				y.layout.weight > l && (l = y.layout.weight)
			}
			for(var h = 0; i > h; h++) {
				var y = t.edges[h];
				y.layout.weight /= l
			}
			this._layout.init(t, e.useWorker)
		},
		_buildNodeShapes: function(e, t) {
			var i = this._graph,
				n = this.query(e, "categories");
			i.eachNode(function(i) {
				var a = this._getNodeCategory(e, i.data),
					o = [i.data, a, e],
					r = this._getNodeQueryTarget(e, i.data),
					s = this._getNodeQueryTarget(e, i.data, "emphasis"),
					l = new p({
						style: {
							x: 0,
							y: 0,
							color: this.deepQuery(r, "color"),
							brushType: "both",
							strokeColor: this.deepQuery(r, "strokeColor") || this.deepQuery(r, "borderColor"),
							lineWidth: this.deepQuery(r, "lineWidth") || this.deepQuery(r, "borderWidth")
						},
						highlightStyle: {
							color: this.deepQuery(s, "color"),
							strokeColor: this.deepQuery(s, "strokeColor") || this.deepQuery(s, "borderColor"),
							lineWidth: this.deepQuery(s, "lineWidth") || this.deepQuery(s, "borderWidth")
						},
						clickable: e.clickable,
						zlevel: this.getZlevelBase(),
						z: this.getZBase()
					});
				l.style.color || (l.style.color = this.getColor(a ? a.name : i.id)), l.style.iconType = this.deepQuery(o, "symbol");
				var h = this.deepQuery(o, "symbolSize") || 0;
				"number" == typeof h && (h = [h, h]), l.style.width = 2 * h[0], l.style.height = 2 * h[1], l.style.iconType.match("image") && (l.style.image = l.style.iconType.replace(new RegExp("^image:\\/\\/"), ""), l = new c({
					style: l.style,
					highlightStyle: l.highlightStyle,
					clickable: l.clickable,
					zlevel: this.getZlevelBase(),
					z: this.getZBase()
				})), this.deepQuery(o, "itemStyle.normal.label.show") && (l.style.text = null == i.data.label ? i.id : i.data.label, l.style.textPosition = this.deepQuery(o, "itemStyle.normal.label.position"), l.style.textColor = this.deepQuery(o, "itemStyle.normal.label.textStyle.color"), l.style.textFont = this.getFont(this.deepQuery(o, "itemStyle.normal.label.textStyle") || {})), this.deepQuery(o, "itemStyle.emphasis.label.show") && (l.highlightStyle.textPosition = this.deepQuery(o, "itemStyle.emphasis.label.position"), l.highlightStyle.textColor = this.deepQuery(o, "itemStyle.emphasis.label.textStyle.color"), l.highlightStyle.textFont = this.getFont(this.deepQuery(o, "itemStyle.emphasis.label.textStyle") || {})), this.deepQuery(o, "draggable") && (this.setCalculable(l), l.dragEnableTime = 0, l.draggable = !0, l.ondragstart = this.shapeHandler.ondragstart, l.ondragover = null);
				var d = "";
				if("undefined" != typeof i.category) {
					var a = n[i.category];
					d = a && a.name || ""
				}
				u.pack(l, e, t, i.data, i.rawIndex, i.data.name || "", i.category), this.shapeList.push(l), this.zr.addShape(l), i.shape = l
			}, this)
		},
		_buildLinkShapes: function(e, t) {
			for(var i = this._graph, n = i.edges.length, a = 0; n > a; a++) {
				var o = i.edges[a],
					r = o.data,
					s = o.node1,
					l = o.node2,
					c = i.getEdge(l, s),
					m = this._getEdgeQueryTarget(e, r),
					y = this.deepQuery(m, "type");
				e.linkSymbol && "none" !== e.linkSymbol && (y = "line");
				var f = "line" === y ? h : d,
					V = new f({
						style: {
							xStart: 0,
							yStart: 0,
							xEnd: 0,
							yEnd: 0
						},
						clickable: this.query(e, "clickable"),
						highlightStyle: {},
						zlevel: this.getZlevelBase(),
						z: this.getZBase()
					});
				if(c && c.shape && (V.style.offset = 4, c.shape.style.offset = 4), g.merge(V.style, this.query(e, "itemStyle.normal.linkStyle"), !0), g.merge(V.highlightStyle, this.query(e, "itemStyle.emphasis.linkStyle"), !0), "undefined" != typeof r.itemStyle && (r.itemStyle.normal && g.merge(V.style, r.itemStyle.normal, !0), r.itemStyle.emphasis && g.merge(V.highlightStyle, r.itemStyle.emphasis, !0)), V.style.lineWidth = V.style.lineWidth || V.style.width, V.style.strokeColor = V.style.strokeColor || V.style.color, V.highlightStyle.lineWidth = V.highlightStyle.lineWidth || V.highlightStyle.width, V.highlightStyle.strokeColor = V.highlightStyle.strokeColor || V.highlightStyle.color, u.pack(V, e, t, o.data, null == o.rawIndex ? a : o.rawIndex, o.data.name || s.id + " - " + l.id, s.id, l.id), this.shapeList.push(V), this.zr.addShape(V), o.shape = V, e.linkSymbol && "none" !== e.linkSymbol) {
					var U = new p({
						style: {
							x: -5,
							y: 0,
							width: e.linkSymbolSize[0],
							height: e.linkSymbolSize[1],
							iconType: e.linkSymbol,
							brushType: "fill",
							color: V.style.strokeColor
						},
						highlightStyle: {
							brushType: "fill"
						},
						position: [0, 0],
						rotation: 0,
						zlevel: this.getZlevelBase(),
						z: this.getZBase()
					});
					V._symbolShape = U, this.shapeList.push(U), this.zr.addShape(U)
				}
			}
		},
		_updateLinkShapes: function() {
			for(var e = f.create(), t = f.create(), i = f.create(), n = f.create(), a = this._graph.edges, o = 0, r = a.length; r > o; o++) {
				var s = a[o],
					l = s.node1.shape,
					h = s.node2.shape;
				f.copy(i, l.position), f.copy(n, h.position);
				var d = s.shape.style;
				if(f.sub(e, i, n), f.normalize(e, e), d.offset ? (t[0] = e[1], t[1] = -e[0], f.scaleAndAdd(i, i, t, d.offset), f.scaleAndAdd(n, n, t, d.offset)) : "bezier-curve" === s.shape.type && (d.cpX1 = (i[0] + n[0]) / 2 - (n[1] - i[1]) / 4, d.cpY1 = (i[1] + n[1]) / 2 - (i[0] - n[0]) / 4), d.xStart = i[0], d.yStart = i[1], d.xEnd = n[0], d.yEnd = n[1], s.shape.modSelf(), s.shape._symbolShape) {
					var c = s.shape._symbolShape;
					f.copy(c.position, n), f.scaleAndAdd(c.position, c.position, e, h.style.width / 2 + 2);
					var p = Math.atan2(e[1], e[0]);
					c.rotation = Math.PI / 2 - p, c.modSelf()
				}
			}
		},
		_syncNodePositions: function() {
			for(var e = this._graph, t = 0; t < e.nodes.length; t++) {
				var i = e.nodes[t],
					n = i.layout.position,
					a = i.data,
					o = i.shape,
					r = o.fixed || a.fixX,
					s = o.fixed || a.fixY;
				r === !0 ? r = 1 : isNaN(r) && (r = 0), s === !0 ? s = 1 : isNaN(s) && (s = 0), o.position[0] += (n[0] - o.position[0]) * (1 - r), o.position[1] += (n[1] - o.position[1]) * (1 - s), f.copy(n, o.position);
				var l = a.name;
				if(l) {
					var h = this.__nodePositionMap[l];
					h || (h = this.__nodePositionMap[l] = f.create()), f.copy(h, n)
				}
				o.modSelf()
			}
		},
		_step: function() {
			this._syncNodePositions(), this._updateLinkShapes(), this.zr.refreshNextFrame(), this._layout.temperature > .01 ? this._layout.step(this._steps) : this.messageCenter.dispatch(m.EVENT.FORCE_LAYOUT_END, {}, {}, this.myChart)
		},
		refresh: function(e) {
			if(e && (this.option = e, this.series = this.option.series), this.legend = this.component.legend, this.legend) this.getColor = function(e) {
				return this.legend.getColor(e)
			}, this.isSelected = function(e) {
				return this.legend.isSelected(e)
			};
			else {
				var t = {},
					i = 0;
				this.getColor = function(e) {
					return t[e] ? t[e] : (t[e] || (t[e] = this.zr.getColor(i++)), t[e])
				}, this.isSelected = function() {
					return !0
				}
			}
			this._init()
		},
		dispose: function() {
			this.clear(), this.shapeList = null, this.effectList = null, this._layout.dispose(), this._layout = null, this.__nodePositionMap = {}
		},
		getPosition: function() {
			var e = [];
			return this._graph.eachNode(function(t) {
				t.layout && e.push({
					name: t.data.name,
					position: Array.prototype.slice.call(t.layout.position)
				})
			}), e
		}
	}, g.inherits(t, r), e("../chart").define("force", t), t
}), define("echarts/data/Graph", ["require", "zrender/tool/util"], function(e) {
	var t = e("zrender/tool/util"),
		i = function(e) {
			this._directed = e || !1, this.nodes = [], this.edges = [], this._nodesMap = {}, this._edgesMap = {}
		};
	i.prototype.isDirected = function() {
		return this._directed
	}, i.prototype.addNode = function(e, t) {
		if(this._nodesMap[e]) return this._nodesMap[e];
		var n = new i.Node(e, t);
		return this.nodes.push(n), this._nodesMap[e] = n, n
	}, i.prototype.getNodeById = function(e) {
		return this._nodesMap[e]
	}, i.prototype.addEdge = function(e, t, n) {
		if("string" == typeof e && (e = this._nodesMap[e]), "string" == typeof t && (t = this._nodesMap[t]), e && t) {
			var a = e.id + "-" + t.id;
			if(this._edgesMap[a]) return this._edgesMap[a];
			var o = new i.Edge(e, t, n);
			return this._directed && (e.outEdges.push(o), t.inEdges.push(o)), e.edges.push(o), e !== t && t.edges.push(o), this.edges.push(o), this._edgesMap[a] = o, o
		}
	}, i.prototype.removeEdge = function(e) {
		var i = e.node1,
			n = e.node2,
			a = i.id + "-" + n.id;
		this._directed && (i.outEdges.splice(t.indexOf(i.outEdges, e), 1), n.inEdges.splice(t.indexOf(n.inEdges, e), 1)), i.edges.splice(t.indexOf(i.edges, e), 1), i !== n && n.edges.splice(t.indexOf(n.edges, e), 1), delete this._edgesMap[a], this.edges.splice(t.indexOf(this.edges, e), 1)
	}, i.prototype.getEdge = function(e, t) {
		return "string" != typeof e && (e = e.id), "string" != typeof t && (t = t.id), this._directed ? this._edgesMap[e + "-" + t] : this._edgesMap[e + "-" + t] || this._edgesMap[t + "-" + e]
	}, i.prototype.removeNode = function(e) {
		if("string" != typeof e || (e = this._nodesMap[e])) {
			delete this._nodesMap[e.id], this.nodes.splice(t.indexOf(this.nodes, e), 1);
			for(var i = 0; i < this.edges.length;) {
				var n = this.edges[i];
				n.node1 === e || n.node2 === e ? this.removeEdge(n) : i++
			}
		}
	}, i.prototype.filterNode = function(e, t) {
		for(var i = this.nodes.length, n = 0; i > n;) e.call(t, this.nodes[n], n) ? n++ : (this.removeNode(this.nodes[n]), i--)
	}, i.prototype.filterEdge = function(e, t) {
		for(var i = this.edges.length, n = 0; i > n;) e.call(t, this.edges[n], n) ? n++ : (this.removeEdge(this.edges[n]), i--)
	}, i.prototype.eachNode = function(e, t) {
		for(var i = this.nodes.length, n = 0; i > n; n++) this.nodes[n] && e.call(t, this.nodes[n], n)
	}, i.prototype.eachEdge = function(e, t) {
		for(var i = this.edges.length, n = 0; i > n; n++) this.edges[n] && e.call(t, this.edges[n], n)
	}, i.prototype.clear = function() {
		this.nodes.length = 0, this.edges.length = 0, this._nodesMap = {}, this._edgesMap = {}
	}, i.prototype.breadthFirstTraverse = function(e, t, i, n) {
		if("string" == typeof t && (t = this._nodesMap[t]), t) {
			var a = "edges";
			"out" === i ? a = "outEdges" : "in" === i && (a = "inEdges");
			for(var o = 0; o < this.nodes.length; o++) this.nodes[o].__visited = !1;
			if(!e.call(n, t, null))
				for(var r = [t]; r.length;)
					for(var s = r.shift(), l = s[a], o = 0; o < l.length; o++) {
						var h = l[o],
							d = h.node1 === s ? h.node2 : h.node1;
						if(!d.__visited) {
							if(e.call(d, d, s)) return;
							r.push(d), d.__visited = !0
						}
					}
		}
	}, i.prototype.clone = function() {
		for(var e = new i(this._directed), t = 0; t < this.nodes.length; t++) e.addNode(this.nodes[t].id, this.nodes[t].data);
		for(var t = 0; t < this.edges.length; t++) {
			var n = this.edges[t];
			e.addEdge(n.node1.id, n.node2.id, n.data)
		}
		return e
	};
	var n = function(e, t) {
		this.id = e, this.data = t || null, this.inEdges = [], this.outEdges = [], this.edges = []
	};
	n.prototype.degree = function() {
		return this.edges.length
	}, n.prototype.inDegree = function() {
		return this.inEdges.length
	}, n.prototype.outDegree = function() {
		return this.outEdges.length
	};
	var a = function(e, t, i) {
		this.node1 = e, this.node2 = t, this.data = i || null
	};
	return i.Node = n, i.Edge = a, i.fromMatrix = function(e, t, n) {
		if(t && t.length && t[0].length === t.length && e.length === t.length) {
			for(var a = t.length, o = new i(n), r = 0; a > r; r++) {
				var s = o.addNode(e[r].id, e[r]);
				s.data.value = 0, n && (s.data.outValue = s.data.inValue = 0)
			}
			for(var r = 0; a > r; r++)
				for(var l = 0; a > l; l++) {
					var h = t[r][l];
					n && (o.nodes[r].data.outValue += h, o.nodes[l].data.inValue += h), o.nodes[r].data.value += h, o.nodes[l].data.value += h
				}
			for(var r = 0; a > r; r++)
				for(var l = r; a > l; l++) {
					var h = t[r][l];
					if(0 !== h) {
						var d = o.nodes[r],
							c = o.nodes[l],
							p = o.addEdge(d, c, {});
						if(p.data.weight = h, r !== l && n && t[l][r]) {
							var m = o.addEdge(c, d, {});
							m.data.weight = t[l][r]
						}
					}
				}
			return o
		}
	}, i
}), define("echarts/layout/Force", ["require", "./forceLayoutWorker", "zrender/tool/vector"], function(e) {
	function t() {
		if("undefined" != typeof Worker && "undefined" != typeof Blob) try {
			var e = new Blob([n.getWorkerCode()]);
			i = window.URL.createObjectURL(e)
		} catch(t) {
			i = ""
		}
		return i
	}
	var i, n = e("./forceLayoutWorker"),
		a = e("zrender/tool/vector"),
		o = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(e) {
			setTimeout(e, 16)
		},
		r = "undefined" == typeof Float32Array ? Array : Float32Array,
		s = function(e) {
			"undefined" == typeof i && t(), e = e || {}, this.width = e.width || 500, this.height = e.height || 500, this.center = e.center || [this.width / 2, this.height / 2], this.ratioScaling = e.ratioScaling || !1, this.scaling = e.scaling || 1, this.gravity = "undefined" != typeof e.gravity ? e.gravity : 1, this.large = e.large || !1, this.preventNodeOverlap = e.preventNodeOverlap || !1, this.preventNodeEdgeOverlap = e.preventNodeEdgeOverlap || !1, this.maxSpeedIncrease = e.maxSpeedIncrease || 1, this.onupdate = e.onupdate || function() {}, this.temperature = e.temperature || 1, this.coolDown = e.coolDown || .99, this._layout = null, this._layoutWorker = null;
			var n = this,
				a = this._$onupdate;
			this._$onupdate = function(e) {
				a.call(n, e)
			}
		};
	return s.prototype.updateConfig = function() {
		var e = this.width,
			t = this.height,
			i = Math.min(e, t),
			n = {
				center: this.center,
				width: this.ratioScaling ? e : i,
				height: this.ratioScaling ? t : i,
				scaling: this.scaling || 1,
				gravity: this.gravity || 1,
				barnesHutOptimize: this.large,
				preventNodeOverlap: this.preventNodeOverlap,
				preventNodeEdgeOverlap: this.preventNodeEdgeOverlap,
				maxSpeedIncrease: this.maxSpeedIncrease
			};
		if(this._layoutWorker) this._layoutWorker.postMessage({
			cmd: "updateConfig",
			config: n
		});
		else
			for(var a in n) this._layout[a] = n[a]
	}, s.prototype.init = function(e, t) {
		if(this._layoutWorker && (this._layoutWorker.terminate(), this._layoutWorker = null), i && t) try {
			this._layoutWorker || (this._layoutWorker = new Worker(i), this._layoutWorker.onmessage = this._$onupdate), this._layout = null
		} catch(a) {
			this._layoutWorker = null, this._layout || (this._layout = new n)
		} else this._layout || (this._layout = new n);
		this.temperature = 1, this.graph = e;
		for(var o = e.nodes.length, s = new r(2 * o), l = new r(o), h = new r(o), d = 0; o > d; d++) {
			var c = e.nodes[d];
			s[2 * d] = c.layout.position[0], s[2 * d + 1] = c.layout.position[1], l[d] = "undefined" == typeof c.layout.mass ? 1 : c.layout.mass, h[d] = "undefined" == typeof c.layout.size ? 1 : c.layout.size, c.layout.__index = d
		}
		o = e.edges.length;
		for(var p = new r(2 * o), m = new r(o), d = 0; o > d; d++) {
			var u = e.edges[d];
			p[2 * d] = u.node1.layout.__index, p[2 * d + 1] = u.node2.layout.__index, m[d] = u.layout.weight || 1
		}
		this._layoutWorker ? this._layoutWorker.postMessage({
			cmd: "init",
			nodesPosition: s,
			nodesMass: l,
			nodesSize: h,
			edges: p,
			edgesWeight: m
		}) : (this._layout.initNodes(s, l, h), this._layout.initEdges(p, m)), this.updateConfig()
	}, s.prototype.step = function(e) {
		var t = this.graph.nodes;
		if(this._layoutWorker) {
			for(var i = new r(2 * t.length), n = 0; n < t.length; n++) {
				var s = t[n];
				i[2 * n] = s.layout.position[0], i[2 * n + 1] = s.layout.position[1]
			}
			this._layoutWorker.postMessage(i.buffer, [i.buffer]), this._layoutWorker.postMessage({
				cmd: "update",
				steps: e,
				temperature: this.temperature,
				coolDown: this.coolDown
			});
			for(var n = 0; e > n; n++) this.temperature *= this.coolDown
		} else {
			o(this._$onupdate);
			for(var n = 0; n < t.length; n++) {
				var s = t[n];
				a.copy(this._layout.nodes[n].position, s.layout.position)
			}
			for(var n = 0; e > n; n++) this._layout.temperature = this.temperature, this._layout.update(), this.temperature *= this.coolDown
		}
	}, s.prototype._$onupdate = function(e) {
		if(this._layoutWorker) {
			for(var t = new Float32Array(e.data), i = 0; i < this.graph.nodes.length; i++) {
				var n = this.graph.nodes[i];
				n.layout.position[0] = t[2 * i], n.layout.position[1] = t[2 * i + 1]
			}
			this.onupdate && this.onupdate()
		} else if(this._layout) {
			for(var i = 0; i < this.graph.nodes.length; i++) {
				var n = this.graph.nodes[i];
				a.copy(n.layout.position, this._layout.nodes[i].position)
			}
			this.onupdate && this.onupdate()
		}
	}, s.prototype.dispose = function() {
		this._layoutWorker && this._layoutWorker.terminate(), this._layoutWorker = null, this._layout = null
	}, s
}), define("echarts/layout/forceLayoutWorker", ["require", "zrender/tool/vector"], function e(t) {
	"use strict";

	function i() {
		this.subRegions = [], this.nSubRegions = 0, this.node = null, this.mass = 0, this.centerOfMass = null, this.bbox = new l(4), this.size = 0
	}

	function n() {
		this.position = r.create(), this.force = r.create(), this.forcePrev = r.create(), this.speed = r.create(), this.speedPrev = r.create(), this.mass = 1, this.inDegree = 0, this.outDegree = 0
	}

	function a(e, t) {
		this.node1 = e, this.node2 = t, this.weight = 1
	}

	function o() {
		this.barnesHutOptimize = !1, this.barnesHutTheta = 1.5, this.repulsionByDegree = !1, this.preventNodeOverlap = !1, this.preventNodeEdgeOverlap = !1, this.strongGravity = !0, this.gravity = 1, this.scaling = 1, this.edgeWeightInfluence = 1, this.center = [0, 0], this.width = 500, this.height = 500, this.maxSpeedIncrease = 1, this.nodes = [], this.edges = [], this.bbox = new l(4), this._rootRegion = new i, this._rootRegion.centerOfMass = r.create(), this._massArr = null, this._k = 0
	}
	var r, s = "undefined" == typeof window && "undefined" == typeof t;
	r = s ? {
		create: function(e, t) {
			var i = new Float32Array(2);
			return i[0] = e || 0, i[1] = t || 0, i
		},
		dist: function(e, t) {
			var i = t[0] - e[0],
				n = t[1] - e[1];
			return Math.sqrt(i * i + n * n)
		},
		len: function(e) {
			var t = e[0],
				i = e[1];
			return Math.sqrt(t * t + i * i)
		},
		scaleAndAdd: function(e, t, i, n) {
			return e[0] = t[0] + i[0] * n, e[1] = t[1] + i[1] * n, e
		},
		scale: function(e, t, i) {
			return e[0] = t[0] * i, e[1] = t[1] * i, e
		},
		add: function(e, t, i) {
			return e[0] = t[0] + i[0], e[1] = t[1] + i[1], e
		},
		sub: function(e, t, i) {
			return e[0] = t[0] - i[0], e[1] = t[1] - i[1], e
		},
		dot: function(e, t) {
			return e[0] * t[0] + e[1] * t[1]
		},
		normalize: function(e, t) {
			var i = t[0],
				n = t[1],
				a = i * i + n * n;
			return a > 0 && (a = 1 / Math.sqrt(a), e[0] = t[0] * a, e[1] = t[1] * a), e
		},
		negate: function(e, t) {
			return e[0] = -t[0], e[1] = -t[1], e
		},
		copy: function(e, t) {
			return e[0] = t[0], e[1] = t[1], e
		},
		set: function(e, t, i) {
			return e[0] = t, e[1] = i, e
		}
	} : t("zrender/tool/vector");
	var l = "undefined" == typeof Float32Array ? Array : Float32Array;
	if(i.prototype.beforeUpdate = function() {
			for(var e = 0; e < this.nSubRegions; e++) this.subRegions[e].beforeUpdate();
			this.mass = 0, this.centerOfMass && (this.centerOfMass[0] = 0, this.centerOfMass[1] = 0), this.nSubRegions = 0, this.node = null
		}, i.prototype.afterUpdate = function() {
			this.subRegions.length = this.nSubRegions;
			for(var e = 0; e < this.nSubRegions; e++) this.subRegions[e].afterUpdate()
		}, i.prototype.addNode = function(e) {
			if(0 === this.nSubRegions) {
				if(null == this.node) return void(this.node = e);
				this._addNodeToSubRegion(this.node), this.node = null
			}
			this._addNodeToSubRegion(e), this._updateCenterOfMass(e)
		}, i.prototype.findSubRegion = function(e, t) {
			for(var i = 0; i < this.nSubRegions; i++) {
				var n = this.subRegions[i];
				if(n.contain(e, t)) return n
			}
		}, i.prototype.contain = function(e, t) {
			return this.bbox[0] <= e && this.bbox[2] >= e && this.bbox[1] <= t && this.bbox[3] >= t
		}, i.prototype.setBBox = function(e, t, i, n) {
			this.bbox[0] = e, this.bbox[1] = t, this.bbox[2] = i, this.bbox[3] = n, this.size = (i - e + n - t) / 2
		}, i.prototype._newSubRegion = function() {
			var e = this.subRegions[this.nSubRegions];
			return e || (e = new i, this.subRegions[this.nSubRegions] = e), this.nSubRegions++, e
		}, i.prototype._addNodeToSubRegion = function(e) {
			var t = this.findSubRegion(e.position[0], e.position[1]),
				i = this.bbox;
			if(!t) {
				var n = (i[0] + i[2]) / 2,
					a = (i[1] + i[3]) / 2,
					o = (i[2] - i[0]) / 2,
					r = (i[3] - i[1]) / 2,
					s = e.position[0] >= n ? 1 : 0,
					l = e.position[1] >= a ? 1 : 0,
					t = this._newSubRegion();
				t.setBBox(s * o + i[0], l * r + i[1], (s + 1) * o + i[0], (l + 1) * r + i[1])
			}
			t.addNode(e)
		}, i.prototype._updateCenterOfMass = function(e) {
			null == this.centerOfMass && (this.centerOfMass = r.create());
			var t = this.centerOfMass[0] * this.mass,
				i = this.centerOfMass[1] * this.mass;
			t += e.position[0] * e.mass, i += e.position[1] * e.mass, this.mass += e.mass, this.centerOfMass[0] = t / this.mass, this.centerOfMass[1] = i / this.mass
		}, o.prototype.nodeToNodeRepulsionFactor = function(e, t, i) {
			return i * i * e / t
		}, o.prototype.edgeToNodeRepulsionFactor = function(e, t, i) {
			return i * e / t
		}, o.prototype.attractionFactor = function(e, t, i) {
			return e * t / i
		}, o.prototype.initNodes = function(e, t, i) {
			this.temperature = 1;
			var a = e.length / 2;
			this.nodes.length = 0;
			for(var o = "undefined" != typeof i, r = 0; a > r; r++) {
				var s = new n;
				s.position[0] = e[2 * r], s.position[1] = e[2 * r + 1], s.mass = t[r], o && (s.size = i[r]), this.nodes.push(s)
			}
			this._massArr = t, o && (this._sizeArr = i)
		}, o.prototype.initEdges = function(e, t) {
			var i = e.length / 2;
			this.edges.length = 0;
			for(var n = "undefined" != typeof t, o = 0; i > o; o++) {
				var r = e[2 * o],
					s = e[2 * o + 1],
					l = this.nodes[r],
					h = this.nodes[s];
				if(l && h) {
					l.outDegree++, h.inDegree++;
					var d = new a(l, h);
					n && (d.weight = t[o]), this.edges.push(d)
				}
			}
		}, o.prototype.update = function() {
			var e = this.nodes.length;
			if(this.updateBBox(), this._k = .4 * this.scaling * Math.sqrt(this.width * this.height / e), this.barnesHutOptimize) {
				this._rootRegion.setBBox(this.bbox[0], this.bbox[1], this.bbox[2], this.bbox[3]), this._rootRegion.beforeUpdate();
				for(var t = 0; e > t; t++) this._rootRegion.addNode(this.nodes[t]);
				this._rootRegion.afterUpdate()
			} else {
				var i = 0,
					n = this._rootRegion.centerOfMass;
				r.set(n, 0, 0);
				for(var t = 0; e > t; t++) {
					var a = this.nodes[t];
					i += a.mass, r.scaleAndAdd(n, n, a.position, a.mass)
				}
				i > 0 && r.scale(n, n, 1 / i)
			}
			this.updateForce(), this.updatePosition()
		}, o.prototype.updateForce = function() {
			for(var e = this.nodes.length, t = 0; e > t; t++) {
				var i = this.nodes[t];
				r.copy(i.forcePrev, i.force), r.copy(i.speedPrev, i.speed), r.set(i.force, 0, 0)
			}
			this.updateNodeNodeForce(), this.gravity > 0 && this.updateGravityForce(), this.updateEdgeForce(), this.preventNodeEdgeOverlap && this.updateNodeEdgeForce()
		}, o.prototype.updatePosition = function() {
			for(var e = this.nodes.length, t = r.create(), i = 0; e > i; i++) {
				var n = this.nodes[i],
					a = n.speed;
				r.scale(n.force, n.force, 1 / 30);
				var o = r.len(n.force) + .1,
					s = Math.min(o, 500) / o;
				r.scale(n.force, n.force, s), r.add(a, a, n.force), r.scale(a, a, this.temperature), r.sub(t, a, n.speedPrev);
				var l = r.len(t);
				if(l > 0) {
					r.scale(t, t, 1 / l);
					var h = r.len(n.speedPrev);
					h > 0 && (l = Math.min(l / h, this.maxSpeedIncrease) * h, r.scaleAndAdd(a, n.speedPrev, t, l))
				}
				var d = r.len(a),
					s = Math.min(d, 100) / (d + .1);
				r.scale(a, a, s), r.add(n.position, n.position, a)
			}
		}, o.prototype.updateNodeNodeForce = function() {
			for(var e = this.nodes.length, t = 0; e > t; t++) {
				var i = this.nodes[t];
				if(this.barnesHutOptimize) this.applyRegionToNodeRepulsion(this._rootRegion, i);
				else
					for(var n = t + 1; e > n; n++) {
						var a = this.nodes[n];
						this.applyNodeToNodeRepulsion(i, a, !1)
					}
			}
		}, o.prototype.updateGravityForce = function() {
			for(var e = 0; e < this.nodes.length; e++) this.applyNodeGravity(this.nodes[e])
		}, o.prototype.updateEdgeForce = function() {
			for(var e = 0; e < this.edges.length; e++) this.applyEdgeAttraction(this.edges[e])
		}, o.prototype.updateNodeEdgeForce = function() {
			for(var e = 0; e < this.nodes.length; e++)
				for(var t = 0; t < this.edges.length; t++) this.applyEdgeToNodeRepulsion(this.edges[t], this.nodes[e])
		}, o.prototype.applyRegionToNodeRepulsion = function() {
			var e = r.create();
			return function(t, i) {
				if(t.node) this.applyNodeToNodeRepulsion(t.node, i, !0);
				else {
					if(0 === t.mass && 0 === i.mass) return;
					r.sub(e, i.position, t.centerOfMass);
					var n = e[0] * e[0] + e[1] * e[1];
					if(n > this.barnesHutTheta * t.size * t.size) {
						var a = this._k * this._k * (i.mass + t.mass) / (n + 1);
						r.scaleAndAdd(i.force, i.force, e, 2 * a)
					} else
						for(var o = 0; o < t.nSubRegions; o++) this.applyRegionToNodeRepulsion(t.subRegions[o], i)
				}
			}
		}(), o.prototype.applyNodeToNodeRepulsion = function() {
			var e = r.create();
			return function(t, i, n) {
				if(t !== i && (0 !== t.mass || 0 !== i.mass)) {
					r.sub(e, t.position, i.position);
					var a = e[0] * e[0] + e[1] * e[1];
					if(0 !== a) {
						var o, s = t.mass + i.mass,
							l = Math.sqrt(a);
						r.scale(e, e, 1 / l), this.preventNodeOverlap ? (l = l - t.size - i.size, l > 0 ? o = this.nodeToNodeRepulsionFactor(s, l, this._k) : 0 >= l && (o = this._k * this._k * 10 * s)) : o = this.nodeToNodeRepulsionFactor(s, l, this._k), n || r.scaleAndAdd(t.force, t.force, e, 2 * o), r.scaleAndAdd(i.force, i.force, e, 2 * -o)
					}
				}
			}
		}(), o.prototype.applyEdgeAttraction = function() {
			var e = r.create();
			return function(t) {
				var i = t.node1,
					n = t.node2;
				r.sub(e, i.position, n.position);
				var a, o = r.len(e);
				a = 0 === this.edgeWeightInfluence ? 1 : 1 == this.edgeWeightInfluence ? t.weight : Math.pow(t.weight, this.edgeWeightInfluence);
				var s;
				if(!(this.preventOverlap && (o = o - i.size - n.size, 0 >= o))) {
					var s = this.attractionFactor(a, o, this._k);
					r.scaleAndAdd(i.force, i.force, e, -s), r.scaleAndAdd(n.force, n.force, e, s)
				}
			}
		}(), o.prototype.applyNodeGravity = function() {
			var e = r.create();
			return function(t) {
				r.sub(e, this.center, t.position), this.width > this.height ? e[1] *= this.width / this.height : e[0] *= this.height / this.width;
				var i = r.len(e) / 100;
				this.strongGravity ? r.scaleAndAdd(t.force, t.force, e, i * this.gravity * t.mass) : r.scaleAndAdd(t.force, t.force, e, this.gravity * t.mass / (i + 1))
			}
		}(), o.prototype.applyEdgeToNodeRepulsion = function() {
			var e = r.create(),
				t = r.create(),
				i = r.create();
			return function(n, a) {
				var o = n.node1,
					s = n.node2;
				if(o !== a && s !== a) {
					r.sub(e, s.position, o.position), r.sub(t, a.position, o.position);
					var l = r.len(e);
					r.scale(e, e, 1 / l);
					var h = r.dot(e, t);
					if(!(0 > h || h > l)) {
						r.scaleAndAdd(i, o.position, e, h);
						var d = r.dist(i, a.position) - a.size,
							c = this.edgeToNodeRepulsionFactor(a.mass, Math.max(d, .1), 100);
						r.sub(e, a.position, i), r.normalize(e, e), r.scaleAndAdd(a.force, a.force, e, c), r.scaleAndAdd(o.force, o.force, e, -c), r.scaleAndAdd(s.force, s.force, e, -c)
					}
				}
			}
		}(), o.prototype.updateBBox = function() {
			for(var e = 1 / 0, t = 1 / 0, i = -(1 / 0), n = -(1 / 0), a = 0; a < this.nodes.length; a++) {
				var o = this.nodes[a].position;
				e = Math.min(e, o[0]), t = Math.min(t, o[1]), i = Math.max(i, o[0]), n = Math.max(n, o[1])
			}
			this.bbox[0] = e, this.bbox[1] = t, this.bbox[2] = i, this.bbox[3] = n
		}, o.getWorkerCode = function() {
			var t = e.toString();
			return t.slice(t.indexOf("{") + 1, t.lastIndexOf("return"))
		}, s) {
		var h = null;
		self.onmessage = function(e) {
			if(e.data instanceof ArrayBuffer) {
				if(!h) return;
				for(var t = new Float32Array(e.data), i = t.length / 2, n = 0; i > n; n++) {
					var a = h.nodes[n];
					a.position[0] = t[2 * n], a.position[1] = t[2 * n + 1]
				}
			} else switch(e.data.cmd) {
				case "init":
					h || (h = new o), h.initNodes(e.data.nodesPosition, e.data.nodesMass, e.data.nodesSize), h.initEdges(e.data.edges, e.data.edgesWeight);
					break;
				case "updateConfig":
					if(h)
						for(var r in e.data.config) h[r] = e.data.config[r];
					break;
				case "update":
					var s = e.data.steps;
					if(h) {
						var i = h.nodes.length,
							t = new Float32Array(2 * i);
						h.temperature = e.data.temperature;
						for(var n = 0; s > n; n++) h.update(), h.temperature *= e.data.coolDown;
						for(var n = 0; i > n; n++) {
							var a = h.nodes[n];
							t[2 * n] = a.position[0], t[2 * n + 1] = a.position[1]
						}
						self.postMessage(t.buffer, [t.buffer])
					} else {
						var l = new Float32Array;
						self.postMessage(l.buffer, [l.buffer])
					}
			}
		}
	}
	return o
});