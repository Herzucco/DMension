define(["../game"],
 function(Game){
    return {
        position : {
            x : 1170,
            y : 5
        },
        size : {
            width : 20,
            height : 50,
        },
        gaugeComponent : {
            color : "red",
            strokeColor : "white",
        },
        clickable : {
            onMouseDown : function(){console.log("click on gauge")}
        }
    }
});