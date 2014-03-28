define(["../game"],
 function(Game){
    return {
        position : {
            x : 1120,
            y : 40
        },
        size : {
            width : 50,
            height : 100,
        },
        gaugeComponent : {
            color : "red",
            strokeColor : "white",
        },
        clickable : {
            onMouseDown : function(){}
        }
    }
});