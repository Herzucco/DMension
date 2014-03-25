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

        var image = Puppets.createEntity("specialdraw", {
            size : {width : 90, height : 150},
            draw : {
                image : Game.imagesController.images.gaugeLeft,
                context : Game.canvasController.mainCanvas.components.canvasContext.context
            },
            position : {
                x : gauge.components.position.x-20,
                y : gauge.components.position.y-25,
            }
        }, "UI");

        gauge.components.gaugeComponent.context = Game.canvasController.mainCanvas.components.canvasContext.context;
        gauge.components.gaugeComponent.valueMax = Game.constants.maxPixels;
        gauge.components.gaugeComponent.currentValue = Game.constants.maxPixels;
        gauge.components.gaugeComponent.onEmpty = function(){
            Game.mouseController.components.renderCircle.canNotPaint = true;
            Game.playerController.player.components.gaugeComponent.currentValue = 0;
        }
        gauge.components.gaugeComponent.onEmptyToStable = function(){
            Game.mouseController.components.renderCircle.canNotPaint = false;
        }
        gauge.components.clickable.mouse = Game.mouseController.components;
        Game.observer.on("pixelsChanged", function(pixel, erase){
            var pixelsArray = Game.constants.maxPixelsArray;
            if(!erase){
                if(!pixelsArray[pixel]){
                    pixelsArray[pixel] = true;
                    pixelsArray.length++;
                    this.components.gaugeComponent.currentValue--;
                }
            }
            else{
                if(pixelsArray[pixel] !== undefined && pixelsArray[pixel] !== false){
                    pixelsArray[pixel] = false;
                    pixelsArray.length--;
                    this.components.gaugeComponent.currentValue++;
                }
            }
        }, gauge);

        Game.observer.on("colorChanged", function(color){
            this.components.gaugeComponent.color = color;
            var draw = Puppets.getComponents(image)[0].draw;
            if(color === 'rgba(255,0,0,0.5)')
                draw.image = Game.imagesController.images.gaugeLeft;
            else if(color === 'rgba(0,255,0,0.5)')
                draw.image = Game.imagesController.images.gaugeUp;
            else if(color === 'rgba(0,0,255,0.5)')
                draw.image = Game.imagesController.images.gaugeRight;
            else if(color === 'rgba(255,0,255,0.5)')
                draw.image = Game.imagesController.images.gaugeDown;
        }, gauge);


        return gauge;
    }

    return new UIController();
});