/* 调用方法
 * selectAddr.init({
 * 	 sId:[...], 下拉框id数组
 * 	 deVal:'130102' 下拉框默认区值
 * })
 * 省市区选择插件
 * varstion 1.0.0
 * by Allen-Fei
 * tipefi@126.com
 * 基于js/region.js城市Json文件------手机 and PC端
 */

var selectAddr = {
	init: function(o, callback) {
		this.end = callback;
		this.options = o;
		this.addChange();
		this.getJson();
		this.data = {
			dProvince: [],
			dCity: [],
			dCounty: []
		};
		this.addr = [];
	},
	//获取JSON城市数据
	getJson: function() {
		var that = this;
		var val = this.options.deVal;
		var sId = this.options.sId;
		mui.getJSON('js/region.json', function(data) {
			for(var i = 0; i < data.length; i++) {
				var len = data[i].qybm.length;
				if(len == 2) that.data.dProvince.push(data[i])
				if(len == 4) that.data.dCity.push(data[i])
				if(len == 6) that.data.dCounty.push(data[i])
			}
			that.addOption(that.data.dProvince, 0)
			if(val) {
				that.setSelect(that.data.dProvince, val.substring(0, 2), 0);
				that.sProvince(val.substring(0, 2), true);
				that.sCity(val.substring(0, 4), true);
				that.sCounty(val, true);
			}
		});
	},
	//给select追加事件
	addChange: function() {
		var sId = this.options.sId;
		for(var i = 0; i < sId.length; i++) {
			if(i == 0) document.getElementById(sId[i]).setAttribute('onchange', 'selectAddr.sProvince(this.options[this.options.selectedIndex])')
			if(i == 1) document.getElementById(sId[i]).setAttribute('onchange', 'selectAddr.sCity(this.options[this.options.selectedIndex])')
			if(i == 2) document.getElementById(sId[i]).setAttribute('onchange', 'selectAddr.sCounty(this.options[this.options.selectedIndex])')
		}
	},
	// 给下拉添加列表元素
	addOption: function(d, n) {
		var sId = this.options.sId;
		if(n != 0) document.getElementById(sId[n]).innerHTML = '';
		for(var i = 0; i < d.length; i++) {
			var hoption = document.createElement('option');
			var htext = document.createTextNode(d[i].qyjc);
			hoption.appendChild(htext);
			hoption.setAttribute('value', d[i].qybm)
			document.getElementById(sId[n]).appendChild(hoption);
		}
	},
	// 设置选中的值
	setSelect: function(d, v, n) {
		var sId = this.options.sId;
		for(var i = 0; i < d.length; i++) {
			if(v == d[i].qybm) {
				if(n == 0) {
					document.getElementById(sId[n])[i + 1].selected = true;
				} else {
					document.getElementById(sId[n])[i].selected = true;
				}
			}
		}
	},
	// 选择省后运行（筛选出市列表）
	sProvince: function(op, isdefault) {
		var v = op instanceof Object ? op.value : op;
		var d = this.data.dCity,
			aCity = [],
			sId = this.options.sId,
			$s1 = document.getElementById(sId[1]);

		this.addr = [];

		for(var i = 0; i < d.length; i++) {
			if(d[i].sjqybm == v) {
				aCity.push(d[i]);
			}
		}
		if(aCity.length > 0) {
			this.addOption(aCity, 1)
		} else { //当没有市级时，显示区县
			var dt = this.data.dCounty;
			for(var i = 0; i < dt.length; i++) {
				if(dt[i].sjqybm == v) {
					aCity.push(dt[i]);
				}
			}
			this.addOption(aCity, 1)
		}

		this.setReturn(0);
		if(isdefault) {
			this.setSelect(aCity, this.options.deVal.substring(0, 4), 1);
			return false;
		}

		if(sId.length == 3) this.sCity($s1.options[$s1.options.selectedIndex].value);
	},
	// 选择市后运行（筛选出区列表）
	sCity: function(op, isdefault) {
		var v = op instanceof Object ? op.value : op;
		var d = this.data.dCounty,
			aCounty = [],
			sId = this.options.sId,
			$s2 = document.getElementById(sId[2]);
		for(var i = 0; i < d.length; i++) {
			if(d[i].sjqybm == v) {
				aCounty.push(d[i]);
			}
		}
		this.addOption(aCounty, 2)
		this.setReturn(1)

		if(isdefault) { //如果值为字符串，则为默认值
			this.setSelect(aCounty, this.options.deVal, 2);
			return false;
		}

		if(v.length != 6) {
			this.sCounty($s2.options[$s2.options.selectedIndex].value);
		} else {
			this.sCounty('');
		}
	},
	// 选择区后运行
	sCounty: function(op) {
		if(op) {
			var v = op instanceof Object ? op.value : op;
			this.setReturn(2);
		}

		this.end(this.addr);
	},
	// 设置返回值
	setReturn: function(n) {
		var o = {},
			sId = this.options.sId,
			$s0 = document.getElementById(sId[0]),
			$s1 = document.getElementById(sId[1]),
			$s2 = document.getElementById(sId[2]);
		switch(n) {
			case 0:
				o.text = $s0.options[$s0.options.selectedIndex].text;
				o.value = $s0.options[$s0.options.selectedIndex].value;
				break;
			case 1:
				o.text = $s1.options[$s1.options.selectedIndex].text;
				o.value = $s1.options[$s1.options.selectedIndex].value;
				break;
			case 2:
				o.text = $s2.options[$s2.options.selectedIndex].text;
				o.value = $s2.options[$s2.options.selectedIndex].value;
				break;
			default:
				break;
		}
		this.addr[n] = o;
	}
}