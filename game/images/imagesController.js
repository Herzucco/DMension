define(["../../loader/libraries/puppets", "../game", './config'], function(Puppets, Game, config){
    var ImagesController = function(config){
        this.config = config;
        this.images = {};
    };

    ImagesController.prototype.init = function(){
        var counter = Object.keys(this.config.images).length;
        var self = this;
        for(var i in this.config.images){
            var image = new Image();
            image.src = this.config.images[i];
            image.onload = function(i, image){
                return function(){
                    counter--;
                    self.images[i] = image;
                    if(counter <= 0){
                        Game.observer.trigger('imagesLoaded');
                    }
                }
            }(i, image);
        }
    }

    return new ImagesController(config);
});