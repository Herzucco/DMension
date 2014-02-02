define(["../../loader/libraries/puppets", "../game", "./configColorGauge", "./gaugeCreator"],
function(Puppets, Game, configColorGauge, GaugeCreator){
    var UIController = function(){
        this.configColorGauge = configColorGauge;
    };
    
    UIController.prototype.init = function(){
        this.gauge = this.createColorGauge(this.configColorGauge);
    };

    UIController.prototype.createColorGauge = function(config){
        var gauge = GaugeCreator(config);

        gauge.components.gaugeComponent.context = Game.canvasController.mainCanvas.components.canvasContext.context;
        gauge.components.gaugeComponent.valueMax = Game.constants.maxPixels;
        gauge.components.gaugeComponent.currentValue = Game.constants.maxPixels;
        gauge.components.gaugeComponent.onEmpty = function(){
            Game.mouseController.components.renderCircle.canNotPaint = true;
        }
        gauge.components.gaugeComponent.onEmptyToStable = function(){
            Game.mouseController.components.renderCircle.canNotPaint = false;
        }
        gauge.components.clickable.onMouseDown = function(){
            Puppets.addComponent(this.id, "draged", {
                mouse : Game.mouseController.components,
                relativeX : -this.components.size.width/2,
                relativeY : -this.components.size.height/2,
            })
        }
        gauge.components.clickable.onMouseUp = function(){
            Puppets.removeComponent(this.id, "draged")
        }
        gauge.components.clickable.mouse = Game.mouseController.components;
        Game.observer.on("pixelsChanged", function(pixel, erase){
            var pixelsArray = Game.constants.maxPixelsArray;
            if(!erase){
                if(!pixelsArray[pixel]){
                    pixelsArray[pixel] = true;
                    pixelsArray.length++;
                }
            }
            else{
                if(pixelsArray[pixel] !== undefined && pixelsArray[pixel] !== false){
                    pixelsArray[pixel] = false;
                    pixelsArray.length--;
                }
            }

            this.components.gaugeComponent.currentValue = this.components.gaugeComponent.valueMax - pixelsArray.length;
        }, gauge);

        Game.observer.on("colorChanged", function(color){
            this.components.gaugeComponent.color = color;
        }, gauge);


        return gauge;
    }

    return new UIController();
});