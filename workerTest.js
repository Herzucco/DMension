onmessage = function (oEvent) {
    var pixelsArray = oEvent.data;
    var length = pixelsArray.length;
    var pixels = 0;
    for(var i = 0; i < length; i++){
        if(pixelsArray[i]){
            pixels++;
        }
    }
};