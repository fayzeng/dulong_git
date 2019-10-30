!function(window, undefined){
	var wave = window.wave = function(option){
		var that = this;
		that.id = option.id;
		that.canvasH = option.canvasH || 200;
		that.step = option.step || 0;
		that.lines = option.lines || ["rgba(4,139,207, 1)", "rgba(63,163,215, 0.4)", "rgba(34,164,226, 0.2)"];
		
		var boHeight = 20;  
        var posHeight = 110;
		
		//如果浏览器支持requestAnimFrame则使用requestAnimFrame否则使用setTimeout  
        window.requestAnimFrame = (function(){  
        	return function( callback ){  
                window.setTimeout(callback, 1000 / 60);  
            }
        })();
		
		var canvas = document.getElementById(that.id);  
        var ctx = canvas.getContext('2d');  
        canvas.width = canvas.parentNode.offsetWidth;
        canvas.height = that.canvasH;
        
        
        function loop(){  
            ctx.clearRect(0,0,canvas.width,that.canvasH);  
            that.step++;  
            
            //画3个不同颜色的矩形  
            for(var j = that.lines.length - 1; j>=0; j--) {  
                ctx.fillStyle = lines[j];  
                //每个矩形的角度都不同，每个之间相差45度  
                var angle = (that.step+j*50)*Math.PI/180;  
                var deltaHeight   = Math.sin(angle) * boHeight;
                var deltaHeightRight   = Math.cos(angle) * boHeight;
                ctx.beginPath();
                 
				if(j==0){
                    ctx.moveTo(0, 100); 
           			ctx.bezierCurveTo(canvas.width/4, 120, canvas.width / 4, 80, canvas.width/2, 80);
           			ctx.bezierCurveTo(canvas.width/4*3, 100, canvas.width/4*3, 120, canvas.width, 100);					
				} else{
                    ctx.moveTo(0, posHeight+deltaHeight); 
           			ctx.bezierCurveTo(canvas.width/4, posHeight+deltaHeight-boHeight, canvas.width / 4, posHeight+deltaHeightRight-boHeight, canvas.width/2, posHeight+deltaHeightRight);
           			ctx.bezierCurveTo(canvas.width*3/4, posHeight+deltaHeight-boHeight, canvas.width *3/4, posHeight+deltaHeightRight-boHeight, canvas.width, posHeight+deltaHeightRight);					
				}               
                ctx.lineTo(canvas.width, canvas.height);  
                ctx.lineTo(0, canvas.height);  
                ctx.lineTo(0, posHeight+deltaHeight); 
                
                ctx.closePath();  
                ctx.fill();  
            }
            requestAnimFrame(loop);
        }  
        loop();
	}
}(window)
