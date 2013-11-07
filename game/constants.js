define(["./canvas/pixelsManager"], function(PIXELS_ARRAY){
	return {
		WIDTH : 5000,
		HEIGHT : 400,
		SCALE : 30,
		PIXELS_ARRAY : PIXELS_ARRAY.PIXELS_ARRAY,
		isLittleEndian : PIXELS_ARRAY.isLittleEndian
	}
});