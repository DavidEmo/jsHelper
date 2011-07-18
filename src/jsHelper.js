var jsHelper = function(instance) {
	/* source : http://documentcloud.github.com/backbone/ */
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

    return instance;
}(jsHelper || {});
