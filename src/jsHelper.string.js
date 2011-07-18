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
jsHelper.String = function(instance) {    
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''); 
    
    instance.endsWith = function(str,token) {
    	return (str.match(token+'$')==token);
    }
    
    instance.startsWith = function(str,token) {
    	return (str.match('^'+token)==token);
    }
    
    instance.isEmail = function(str) {
        return /[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(str);
    }
    
    instance.htmlEntitiesEncode = function(str, document){
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        str = div.innerHTML.replace(/\'/g,'&#39;');
        div = null;
        return str;
    };

    instance.htmlEntitiesDecode = function(str, document){
        var div = document.createElement('div');
        div.innerHTML = str;
        str = div.innerText || div.textContent;
        
        div = null;
        return str;
    };

    return instance;
    
}(jsHelper.String || {});
