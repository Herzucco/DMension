define(["../game/game", "../libraries/howler.min", "../loader/libraries/puppets"], function(Game, howler, Puppets){
    Puppets.component("sound", function(data, entity, undefined){
        var component = {
            autoplay : data.autoplay,
            loop : data.loop,
            sprites : data.sprites,
            volume : data.volume,
            onend : data.onend,
            onload : data.onload,
            onloaderror : data.onloaderror,
            onpause : data.onpause,
            onplay : data.onplay,
            urls : data.urls
        };
        component.clip = new Howl(component);
        return component;
    })
})