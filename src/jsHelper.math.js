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
jsHelper.Math = function(instance) {
	/* source : http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript */
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
    
}(jsHelper.Math || {});
