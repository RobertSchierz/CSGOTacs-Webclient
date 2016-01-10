/**
 * Created by Robert on 09.01.2016.
 */


function getSavedTactics(){

    socket.emit('getMaps', ({'user': localStorage.getItem("benutzername") }));

}

socket.on('provideMaps', function (data) {
    var mapnames = [];
    var obj = {};

    for(var i = 0; i < data.length; i++){
            mapnames.push(data[i].map);
    }

    for (var j = 0; j < mapnames.length; j++) {
        if (!(mapnames[j] in obj)) {
            $("#overlaypanel_insidebox").append("<li>"+mapnames[j]+"</li>");
            obj[mapnames[j]] = true;
            for( var o = 0; o < data.length; o++){
                if(data[o].map == mapnames[j]){
                    $("#overlaypanel_insidebox").append("<ul><span id="+data[o].id+" class='"+o+"'>"+data[o].name+"</span></ul>");
                    $("#" + data[o].id).on("click", function(){
                        closeOverlaypanel();
                       // loadMap(data[$(this).attr("class")].map, true);
                        var tactic = setArrayData(data[$(this).attr("class")]);
                        drawSavedMap(tactic);
                        handleMapselectorStates("#" + tactic.getMap(), true);
                    });
                }
            }
        }
    }



});

function setArrayData(data){
    var tactic = new Tactic();
    tactic.setMaps(data.map)
    tactic.setX(data.x);
    tactic.setY(data.y);
    tactic.setUser(data.user);
    tactic.setTacticname(data.name);
    tactic.setId(data.id);
    return tactic;
}
