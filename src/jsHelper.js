var jsHelper = function(instance) {
    
    
    var ctor = function(){};    
    
    function inherits(parent,props) {
    	var child;
    	
    	if (props && props.hasOwnProperty('constructor')) {
        	child = props.constructor;
        } else {
        	child = function(){ return parent.apply(this, arguments); };
        }	
    	
    	ctor.prototype = parent.prototype;
    	child.prototype = new ctor();
    	
    	for(var prop in props) {
    		if(props[prop] !== void 0) {
    			child.prototype[prop] = props[prop];
    		}
    	}
    	
    	child.prototype.constructor = child;
    	child.__super__ = parent.prototype;
    	return child;
    }
    
    instance.extend = function(props) {
    	var child = inherits(this,props);
    	child.extend = instance.extend;
    	return child;
    }
    
    instance.isArray = function(data) {
        return Object.prototype.toString.call(data) === '[object Array]';    
    }

    instance.isString = function(data) {
        return (typeof data === 'string');
    }

    instance.uuid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
    
    instance.randomInt = function(from, to) {
        return parseInt(from + Math.random()*(to - from));
    }
    
    return instance;
}(jsHelper || {});
