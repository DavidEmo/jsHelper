/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

(function(jQuery){

	// We override the animation for all of these color styles
	jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
		jQuery.fx.step[attr] = function(fx){
			if ( fx.state == 0 ) {
				fx.start = getColor( fx.elem, attr );
				fx.end = getRGB( fx.end );
			}

			fx.elem.style[attr] = "rgb(" + [
				Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
			].join(",") + ")";
		}
	});

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/

	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
		var result;

		// Check if we're already dealing with an array of colors
		if ( color && color.constructor == Array && color.length == 3 )
			return color;

		// Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for rgb(num%,num%,num%)
		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
			return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// Look for #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
			return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Otherwise, we're most likely dealing with a named color
		return colors[jQuery.trim(color).toLowerCase()];
	}
	
	function getColor(elem, attr) {
		var color;

		do {
			color = jQuery.curCSS(elem, attr);

			// Keep going until we find an element that has color, or we hit the body
			if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") )
				break; 

			attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
	};
	
	// Some named colors to work with
	// From Interface by Stefan Petre
	// http://interface.eyecon.ro/

	var colors = {
		aqua:[0,255,255],
		azure:[240,255,255],
		beige:[245,245,220],
		black:[0,0,0],
		blue:[0,0,255],
		brown:[165,42,42],
		cyan:[0,255,255],
		darkblue:[0,0,139],
		darkcyan:[0,139,139],
		darkgrey:[169,169,169],
		darkgreen:[0,100,0],
		darkkhaki:[189,183,107],
		darkmagenta:[139,0,139],
		darkolivegreen:[85,107,47],
		darkorange:[255,140,0],
		darkorchid:[153,50,204],
		darkred:[139,0,0],
		darksalmon:[233,150,122],
		darkviolet:[148,0,211],
		fuchsia:[255,0,255],
		gold:[255,215,0],
		green:[0,128,0],
		indigo:[75,0,130],
		khaki:[240,230,140],
		lightblue:[173,216,230],
		lightcyan:[224,255,255],
		lightgreen:[144,238,144],
		lightgrey:[211,211,211],
		lightpink:[255,182,193],
		lightyellow:[255,255,224],
		lime:[0,255,0],
		magenta:[255,0,255],
		maroon:[128,0,0],
		navy:[0,0,128],
		olive:[128,128,0],
		orange:[255,165,0],
		pink:[255,192,203],
		purple:[128,0,128],
		violet:[128,0,128],
		red:[255,0,0],
		silver:[192,192,192],
		white:[255,255,255],
		yellow:[255,255,0]
	};
	
})(jQuery);
/**************************************************************/
/**************************************************************/
/**************************************************************/
(function($) {
	$.fn.inform = function(html) {
		if($('#inform').length == 0)
			$('body').append('<div id="inform" style="display:none;position:fixed;z-index=1000;width:300px;"></div>');
		this.live('mouseover', function() {
			var offset = $(this).offset();
			var x = parseInt(offset.left,10);
			var y = parseInt(offset.top,10) + $(this).outerHeight();
			$('#inform').html(html).css({left : x, top : y}).stop(true,true).show();									
		});
		this.live('mouseout', function() {
			$('#inform').stop(true,true).fadeOut(500);
		});
		return this;
	};
})(jQuery);

(function($) {
	$.fn.fold = function() {
		return this;
	};
})(jQuery);

(function($){
	$.fn.swipe = function(){
		var minDx = minDy = 50;
		var maxDelay = 500;	
			
		return this.each(function() {
			var $this = $(this);
			var start = end = null;
			$this.bind('mousedown', function(e) {
				start = {time : new Date().getTime(),x : e.clientX, y:e.clientY};
			});
			$this.bind('mouseup', function(e) {
				end = {time : new Date().getTime(),x : e.clientX, y:e.clientY};
				var dx = end.x - start.x;
				var dy = end.y - start.y;
				if(start && end.time - start.time < maxDelay && (Math.abs(dx) > minDx || Math.abs(dy) > minDy)) {
					$this.trigger({
						type : 'swipe',
						duration : end.time - start.time,
						dx : dx,
						dy : dy
					});
					start = null;
					end = null;
				}
			});
			$this.bind('mouseleave',function(e) {
				$this.trigger({
					type :'mouseup',
					clientX : e.clientX,
					clientY : e.clientY
				});
			});
		});		
	}; // end swipe
})(jQuery);

(function($) {
	$.fn.slide = function(horizontally, vertically){
		horizontally = horizontally || true;
		vertically = vertically || true;
		
		var animationDelay = 25;
		var maxStopDelay = 250;
		var coef = 0.96;
		
		return this.each(function() {
			var $this = $(this);
			var $parent = $this.parent();
			var start = last = startPosition = timer = null;
			
			var offset = $this.offset();
			$this.css({'left' : parseInt(offset.left,10) + 'px',
						'top' : parseInt(offset.top,10) + 'px',
						'width' : parseInt($this.width(),10) + 'px',
						'height' : parseInt($this.height(),10) + 'px',
						'position' : 'absolute'});
			
			$this.bind('mousedown', function(e) {
				if(timer)
					clearInterval(timer);
				var offset = $this.offset();
				startPosition = {x : parseInt(offset.left,10), y : parseInt(offset.top,10)};
				start = {time : new Date().getTime(),x : e.clientX, y:e.clientY};
			});
			
			
			$(window).bind('mousemove', function(e) {
				if(start) {
					last = {time : new Date().getTime(),x : e.clientX, y:e.clientY};
					var parentOffset = $parent.offset();
					var nx = startPosition.x + last.x - start.x;
					var ny = startPosition.y + last.y - start.y;
					var parentWidth = parseInt($parent.width(),10);
					var parentHeight = parseInt($parent.height(),10);
					var parentX = parseInt(parentOffset.left,10);
					var parentY = parseInt(parentOffset.top,10);
					var width = parseInt($this.width(),10);
					var height = parseInt($this.height(),10);
				
					nx = Math.max(parentX,nx);
					nx = Math.min(nx,parentX  + (parentWidth - width));
					ny = Math.max(parentY,ny);
					ny = Math.min(ny,parentY  + (parentHeight - height));
					if(horizontally && parentWidth > width)
						$this.css('left', nx + 'px');
					if(vertically && parentHeight > height)
						$this.css('top', ny + 'px');
				}
			});	
			
			$(window).bind('mouseup', function(e) {
				if(start && last && new Date().getTime() - last.time < maxStopDelay) {
					last = {time : new Date().getTime(),x : e.clientX, y:e.clientY};
					var dt = last.time - start.time;
					var ax = ay = 0;
					if(horizontally) {
						ax = (last.x - start.x) / dt;
					}
					if(vertically) {
						ay = (last.y - start.y) / dt;
					}
					
					var offset = $this.offset();
					var parentOffset = $parent.offset();
					var nx = parseInt(offset.left,10);
					var ny = parseInt(offset.top,10);
					var parentWidth = parseInt($parent.width(),10);
					var parentHeight = parseInt($parent.height(),10);
					var parentX = parseInt(parentOffset.left,10);
					var parentY = parseInt(parentOffset.top,10);
					var width = parseInt($this.width(),10);
					var height = parseInt($this.height(),10);
							
					timer = setInterval(function() {	
						nx += animationDelay*ax;
						nx = Math.max(parentX,nx);
						nx = Math.min(nx,parentX  + (parentWidth - width));
						
						ny += animationDelay*ay;
						ny = Math.max(parentY,ny);
						ny = Math.min(ny,parentY  + (parentHeight - height));
						
						ax = coef*ax;
						ay = coef*ay;
						
						$this.css({'left' : nx + 'px','top' : ny + 'px'});
						
						if(timer && Math.abs(ax) < 0.01 && Math.abs(ay) < 0.01) {
							clearInterval(timer);
							timer = null;
						}				
					},animationDelay);
				}			
				start = last = startPosition = null;
			});
			
		});		
	}; // end slide
})(jQuery);
/**************************************************************/
/**************************************************************/
/**************************************************************/
(function($){
	$.fn.select = function(){
	 	this.live('click',function() {
		    var $this = $(this);
			$this.siblings().each(function() {
				if($(this).hasClass('selected')) {
					$(this).removeClass('selected').trigger('unSelect');
				}
			});
			$this.addClass('selected').trigger('select');
			return false;
		});
		return this;
	}; // end select
})(jQuery);

(function($) {
	$.fn.toggle = function(testCallback) {
		this.live('click', function() {
			if(typeof testCallback == 'undefined' || testCallback($(this))) {
				if($(this).hasClass('selected'))
					$(this).removeClass('selected');
				else
					$(this).addClass('selected');
			}
		});
		return this;
	}; // end toggle
})(jQuery);


(function($) {
	$.fn.tabs = function() {
	    var $this = this;
		this.find('li').select().live('select', function() {		    
			$this.siblings('.tab').hide().eq($this.children('li').index($(this))).show();
		});
		return this;
	}; // end tabs
})(jQuery);

