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
jsHelper.Color = function(instance) {
    
    function rgbToHex(r,g,b) {
      return '#'+parseInt(r,16)+parseInt(g,16)+parseInt(b,16);
    }
    
    function hex2rgb(str){
      var hex = parseInt(str.substring(1), 16);
      var r = (hex & 0xff0000) >> 16;
      var g = (hex & 0x00ff00) >> 8;
      var b = hex & 0x0000ff ;
      return [r,g,b];
    }
    
    instance.rgbToHsl = function(r, g, b){
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if(max == min){
            h = s = 0; // achromatic
        }else{
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h, s, l];
    }
    
    instance.hslToRgb = function(h, s, l){
        var r, g, b;

        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [r * 255, g * 255, b * 255];
    }
    
    instance.colorTransition = function(position, startColor, endColor) {
        return [Math.max(Math.min( parseInt((position * (endColor[0] - startColor[0])) + startColor[0]), 255), 0),
				Math.max(Math.min( parseInt((position * (endColor[1] - startColor[1])) + startColor[1]), 255), 0),
				Math.max(Math.min( parseInt((position * (endColor[2] - startColor[2])) + startColor[2]), 255), 0)];
    }

    return instance;
    
}(jsHelper.Color || {});
