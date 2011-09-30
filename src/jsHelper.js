/*
	jsHelper
    Copyright (C) 2011  David Emo

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
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
    
    instance.isInt = function(data) { 
        return !isNaN(parseInt(data,10)) && (parseFloat(data) == parseInt(data,10)); 
    }
    
    instance.isBoolean = function(data) {
        return (typeof data === 'boolean');
    }
    
    instance.isObject = function(data) {
        return (typeof data === 'object');
    }

    return instance;
}(jsHelper || {});
