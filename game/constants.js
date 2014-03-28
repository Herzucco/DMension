define(["./canvas/pixelsManager"], function(PIXELS_ARRAY){
	return {
		WIDTH : 3200,
		HEIGHT : 3200,
        PAINTWIDTH : 1200,
        PAINTHEIGHT : 768,
		SCALE : 30,
		COLORS_PIXELS : PIXELS_ARRAY.COLORS_PIXELS.PIXELS_ARRAY,
        DIMENSION_PIXELS : PIXELS_ARRAY.DIMENSION_PIXELS.PIXELS_ARRAY,
		isLittleEndian : PIXELS_ARRAY.COLORS_PIXELS.isLittleEndian,
		maxPixelsArray : PIXELS_ARRAY.COLORS_PIXELS.maxPixelsArray,
		maxPixels : 300000000,
        playerMaxLife : 1,
	}
});