
var rd = window.rd = {
	
	setDot: function(){
		var msg = JSON.parse(localStorage.getItem("DL_MESSAGE"));
		var o = {};
		o.id = payload.messId;
		o.type = payload.messType;
		o.state = '0';
		if(msg) {
			msg.push(o);
		} else {
			msg = [o];
		}
		localStorage.setItem("DL_MESSAGE", JSON.stringify(msg));
		setTimeout(function() {
			isRedDotbill(); 
			evalId("msg_index.html", ["isRedDot"]);
		}, 300)
	},
	getDot: function(){
		
	},
	addDot: function(){
		
	}
}
