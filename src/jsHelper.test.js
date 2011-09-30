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
jsHelper.Test = function(instance) {
    var channel = 'throw';
    
    instance.log = function() {
        channel = 'log';
    }
    
    instance.throw = function() {
        channel = 'throw';
    }
    
    instance.alert = function() {
        channel = 'alert';
    }
    
    instance.assertNull = function(a, message) {
	    if(a !== null) {
	       output(message);
	    }
    }
    
    instance.assertNotNull = function(a, message) {
	    if(a === null) {
	       output(message);
	    }
    }
    
    
	instance.assertTrue = function(test, message) {
	    if(test !== true) {
	       output(message);
	    }
    }
    
    instance.assertFalse = function(test, message) {
	    if(test !== false) {
	       output(message);
	    }
    }
    
    instance.assertObjectEquals = function(a, b, message) {
        if(!objectEquals(a,b))
            output(message);            	    
    }
    
    instance.assertIntEquals = function(a, b, message) {
	    if(!jsHelper.isInt(a) || !jsHelper.isInt(b) || a !== b) {
	       output(message);
	    }
    }
    
    instance.assertStringEquals = function(a, b, message) {
	    if(!jsHelper.isString(a) || !jsHelper.isString(b) || a !== b) {
	       output(message);
	    }
    }
    
    instance.assertArrayEquals = function(a, b, message) {
	    if(!jsHelper.isArray(a) || !jsHelper.isArray(b) || a.length != b.length) {
	       output(message);
	    }
	    else {
            for(var index = 0, count = a.length; index < count; index++) {
                if(!objectEquals(a[index], b[index]))
                    output(message);
            }
	    }
    }
    
    function objectEquals(a,b) {
        if(typeof a !== typeof b)
            return false;
        else {
            if(jsHelper.isObject(a)) {
                for (var i in a) {
                    if (a.hasOwnProperty(i)) {
                        if (!b.hasOwnProperty(i))
                            return false;
                        if (!objectEquals(a[i],b[i]))
                            return false;
                    }
                }
                for (var i in b) {
                    if (b.hasOwnProperty(i)) {
                        if (!a.hasOwnProperty(i))
                            return false;
                        if (!objectEquals(a[i],b[i]))
                            return false;
                    }
                }
                return true;
            }
            else
                return (a === b);
        }
    }
    
    function output(message) {
        message = message || 'Test failed.';
        if(channel == 'throw')
            throw (message);
        else
        if(channel == 'log')
            console.log(message);
        else
        if(channel == 'alert')
            alert(message);
        
    }
    
    return instance;
    
}(jsHelper.Test || {});