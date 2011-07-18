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
    
    instance.uuid = function (len, radix) {
        var chars = CHARS, uuid = [];
        radix = radix || chars.length;
        
        if (len) {
            for (var i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        }
        else {
            var r;
            
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            
            for (var i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random()*16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        
        return uuid.join('');
    };

    return instance;
    
}(jsHelper.String || {});