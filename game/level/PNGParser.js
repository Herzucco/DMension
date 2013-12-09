define([], function(){

    var PNGParser = function(config){
        this.init(config);
    }


    PNGParser.prototype.init = function(config){
        this.shapes = {};
        this.size = config.size;
        this.image = config.image;
        this.accuracy = config.accuracy || 10;
        this.tolerance = config.tolerance || 10;

        this.canvas = document.createElement("canvas");
        this.canvas.width = this.size.width;
        this.canvas.height = this.size.height;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.webkitImageSmoothingEnabled=false;
        this.ctx.mozImageSmoothingEnabled = false;
    }

    PNGParser.prototype.computeBuffer = function(){
        this.ctx.drawImage(this.image, 0, 0, this.size.width, this.size.height);

        var data = this.ctx.getImageData(0, 0, this.size.width, this.size.height);
        var buffer = new Uint32Array(this.size.width*this.size.height);
        var m = 0;

        for(var i = 0; i < data.data.length; i+=4){
            buffer[m] = data.data[i] << 24 | data.data[i+1] << 16 | data.data[i+2] << 8| data.data[i+3];
            ++m;
        }

        return buffer;
    }

    PNGParser.prototype.isWhiteOrBlack = function(color, tolerance){
        return((color.red <= tolerance && color.green <= tolerance && color.blue <= tolerance) || (color.red >= 255 && color.green >= 255 && color.blue >= 255 ));
    }
    PNGParser.prototype.compile = function(){
        var _self = this;
        var buffer = _self.computeBuffer();
        var shapesIndex = 0;
        for(var i = 0; i < buffer.length; i+=_self.accuracy){
            var color;
            var firstColor = {red : buffer[i] >> 24 & 0xff, green : buffer[i] >> 16 & 0xff, blue : buffer[i] >> 8 & 0xff, alpha : buffer[i] & 0xff};
            var vecX, vecY, vecX1, vecY1;
            if(!_self.isWhiteOrBlack(firstColor, 0))
            {
                vecX = {x : i % _self.size.width, y : (i - (i%_self.size.width))/_self.size.width};
                for(var x = i; x < buffer.length; x+= _self.size.width){
                    color = {
                                red : buffer[x+_self.size.width] >> 24 & 0xff,
                                green : buffer[x+_self.size.width] >> 16 & 0xff,
                                blue : buffer[x+_self.size.width] >> 8 & 0xff,
                                alpha : buffer[x+_self.size.width] & 0xff
                            };
                    if(_self.isWhiteOrBlack(color, _self.tolerance)){
                        vecY = {x : x % _self.size.width, y : (x - (x%_self.size.width))/_self.size.width};
                        break;
                    }
                };
                for(var x1 = i; x1 < buffer.length; x1+=1){
                    color = buffer[x1+1];
                    color = {
                                red : buffer[x1+1] >> 24 & 0xff,
                                green : buffer[x1+1] >> 16 & 0xff,
                                blue : buffer[x1+1] >> 8 & 0xff,
                                alpha : buffer[x1+1] & 0xff
                            };
                    if(_self.isWhiteOrBlack(color, _self.tolerance)){
                        vecX1 = {x : x1 % _self.size.width, y : vecX.y};
                        break;
                    }
                };
                for(var x2 = x; x2 < buffer.length; x2+=1){
                    color = buffer[x2+1];
                    color = {
                                red : buffer[x2+1] >> 24 & 0xff,
                                green : buffer[x2+1] >> 16 & 0xff,
                                blue : buffer[x2+1] >> 8 & 0xff,
                                alpha : buffer[x2+1] & 0xff
                            };
                    if(_self.isWhiteOrBlack(color, _self.tolerance)){
                        vecY1 = {x : x2 % _self.size.width, y : vecY.y};
                        break;
                    }
                };
                if(vecX1.x - vecX.x <= vecY1.x - vecY.x){
                    var vecX2 = vecX1;
                    if(vecY.y > vecX.y && vecX2.x > vecX.x){
                        shapesIndex++;
                        _self.shapes[shapesIndex] = {
                            upperLeft : vecX,
                            upperRight : vecX2,
                            lowerRight : {x : vecX2.x, y : vecY.y},
                            lowerLeft : vecY,
                            color : firstColor
                        };
                    }
                }
                else{
                    var vecX2 = vecY1;
                    if(vecY.y > vecX.y && vecX2.x > vecX.x){
                        shapesIndex++;
                        _self.shapes[shapesIndex] = {
                            upperLeft : vecX,
                            upperRight : {x : vecX2.x, y : vecX.y},
                            lowerRight : vecX2,
                            lowerLeft : vecY,
                            color : firstColor
                        };
                    }
                }
                for(var u = vecX.x; u < vecX2.x; u++){
                    for(var t = vecX.y; t < vecY.y; t++){
                        buffer[u + t * _self.size.width] = 0;
                    }
                }
            }
        }
    }
    

    return PNGParser;
});