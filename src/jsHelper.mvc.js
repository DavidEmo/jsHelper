jsHelper.MVC = function(instance) {
    
    /*********************/
    /* EventBus */
    instance.EventBus = function() {
    	var instance = {};
    	var listeners = [];
    	
    	instance.subscribe = function(event, source, callback) {
    		if(!(event in listeners))
    			listeners[event] = [];
    		listeners[event].push({source:source,callback:callback});
    	};
    
    	instance.unSubscribe = function(event, source) {
    		if(event in listeners) {
    			var currentListeners = listeners[event];
    			for(var index = 0,count = currentListeners.length;index<count;index++)	{
    				if(currentListeners[index].source == source) {
    					currentListeners.splice(index,1);
    					break;
    				}			
    			}
    		}
    	};
    
    	instance.publish = function(event) {
    		if(event.name in listeners) {
    			var currentListeners = listeners[event.name];
    			for(var index = 0,count = currentListeners.length;index<count;index++) {
    				currentListeners[index].callback.call(currentListeners[index].source,event);		
    			}		
    		}
    	};
    
    	return instance;
    }();
    
    /* EventSource */
    instance.EventSource = function() {
    	this.listeners = [];
    };
    
    instance.EventSource.prototype.addListener = function(eventName, source, callback) {
    	if(!(eventName in this.listeners))
    		this.listeners[eventName] = [];
    	this.listeners[eventName].push({source:source,callback:callback});
    };
    
    instance.EventSource.prototype.removeListener = function(eventName, source) {
    	if(eventName in this.listeners) {
    		var listeners = this.listeners[eventName];
    		for(var index = 0,count = listeners.length;index<count;index++)	{
    			if(listeners[index].source == source) {
    				listeners.splice(index,1);
    				break;
    			}			
    		}
    	}
    };
    
    instance.EventSource.prototype.emit = function(event) {	
    	if(event.name in this.listeners) {
    		var listeners = this.listeners[event.name];
    		for(var index = 0,count = listeners.length;index<count;index++)
    			listeners[index].callback.call(listeners[index].source,event);		
    	}
    };
    
    instance.EventSource.extend = jsHelper.extend;
    
    /* Controller */
    instance.Controller = function(view, model) {
    	this.view = view;
    	this.model = model;
    	this.registerListeners();
        this.load();
    }; // end Controller
    
    instance.Controller.prototype.load = function() {
    }; // end load

    instance.Controller.prototype.registerListeners = function() {
    }; // end registerListeners
    
    /* View */
    instance.View = instance.EventSource.extend({
    	constructor: function(id) {
    		instance.EventSource.apply(this);
    		this.id = id;
    		this.initialize();
    		this.bindEvents();
    		this.hide();
      	},
      	initialize:function() {
    	}, // end initialize
    	bindEvents : function() {
    	}, // end bindEvents
    	show : function() {
            var element = document.getElementById(this.id);
            if(element)
    		    element.style.display = 'block';
    	}, // end show
    	hide : function() {
            var element = document.getElementById(this.id);
            if(element)
    		    element.style.display = 'none';
    	} // end hide
    });
    
    /* Model */
    instance.Model = instance.EventSource.extend({
    	constructor: function() {
    		instance.EventSource.apply(this);
    		this.data = {};
    	}
    });    
    
    instance.View.extend = instance.Controller.extend = instance.Model.extend = jsHelper.extend;
    
    return instance;
    
}(jsHelper.MVC || {});
