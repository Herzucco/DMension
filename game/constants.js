define(["./canvas/pixelsManager"], function(PIXELS_ARRAY){
	return {
		WIDTH : 2000,
		HEIGHT : 2000,
        PAINTWIDTH : 600,
        PAINTHEIGHT : 400,
		SCALE : 30,
		COLORS_PIXELS : PIXELS_ARRAY.COLORS_PIXELS.PIXELS_ARRAY,
        DIMENSION_PIXELS : PIXELS_ARRAY.DIMENSION_PIXELS.PIXELS_ARRAY,
		isLittleEndian : PIXELS_ARRAY.COLORS_PIXELS.isLittleEndian,
		maxPixelsArray : PIXELS_ARRAY.COLORS_PIXELS.maxPixelsArray,
		maxPixels : 100000,
        playerMaxLife : 1,
	}
});