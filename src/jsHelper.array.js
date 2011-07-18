jsHelper.Array = function(instance) {
    instance.shuffle = function (array){ 
            for(var random, temp, index = array.length; index; random = parseInt(Math.random()*index), temp = array[--index], array[index] = array[random], array[random] = temp);
    };
}(jsHelper.Array || {})
