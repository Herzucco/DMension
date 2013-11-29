define(["../../loader/libraries/puppets"], function(Puppets){
    var GaugeCreator = function(config){
        if(typeof config !== "object")
            config = {};

        var gaugeEntity = Puppets.createEntity("gauge", config, "UI");

        return {
            entity : gaugeEntity,
            components : Puppets.getComponents(gaugeEntity)[0]
        };
    }
    return GaugeCreator;
});