define([], function(){
	var PIXELS_ARRAY = function(bufferLength){
		var buffer = new ArrayBuffer(bufferLength);
		var PIXELS_ARRAY = new Uint32Array(buffer);
		PIXELS_ARRAY[1] = 0x0a0B0c0d;
		if(buffer[4] === 0x0a && buffer[5] === 0x0b && buffer[6] === 0x0c && buffer[7] === 0x0d)
			var isLittleEndian = true;
		else
			var isLittleEndian = false;

		PIXELS_ARRAY[1] = 0;

		var maxPixelsArray = {
            length : 0
        };

		return { PIXELS_ARRAY : PIXELS_ARRAY, isLittleEndian : isLittleEndian, maxPixelsArray : maxPixelsArray};
	}

	return {
        COLORS_PIXELS : PIXELS_ARRAY(3200*3200*4),
        DIMENSION_PIXELS : PIXELS_ARRAY(3200*3200*4)
    }
});