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
                    $("#overlaypanel_insidebox").append("<ul><span id="+data[o].id+" class='"+o+"' style='cursor:pointer'>"+data[o].name+"</span> <img src='images/icons/tacticload/delete.png' class='tactic_elements' id='delete_"+data[o].id+"'> <img src='images/icons/tacticload/edit.png' class='tactic_elements' id='edit_"+data[o].id+"'></ul>");

                    $("#edit_" + data[o].id).on("click", function(){

                        var splittedid = $(this).attr("id").split("_");
                        var savedclass = $('#'+splittedid[1]).attr("class");
                        $('#'+splittedid[1]).replaceWith("<textarea class='edit_textarea' id='edittextarea_"+splittedid[1]+"'>"+$('#'+splittedid[1]).text()+"</textarea>");

                        $('#edittextarea_'+splittedid[1]).on("focusout",  function() {
                            var newvalue = $('#edittextarea_'+splittedid[1]).val();
                            $('#edittextarea_'+ splittedid[1]).replaceWith("<span id="+splittedid[1]+" class='"+savedclass+"'  style='cursor:pointer'>"+newvalue+"</span>");
                            setTacticListener(data,savedclass)
                        });
                    });


                    $("#delete_" + data[o].id).on("click", function(){
                        var splittedid = $(this).attr("id").split("_");
                        ActualDeleteTactic(splittedid[1]);
                    });
                    setTacticListener(data,o)
                }
            }
        }
    }

    function setTacticListener(data, index){
        $("#" + data[index].id).on("click", function(){
            closeOverlaypanel();
            deleteCanvas(document.getElementById('imgpanel').getContext("2d"));
            var tactic = setArrayData(data[$(this).attr("class")]);
            drawSavedMap(tactic);
            handleMapselectorStates("#" + tactic.getMap(), true);
        });
    }


});

function setListenerToTactic(){}


function setArrayData(data){

    tactic.setMaps(data.map);
    tactic.setX(data.x);
    tactic.setY(data.y);
    tactic.setUser(data.user);
    tactic.setTacticname(data.name);
    tactic.setId(data.id);
    return tactic;
}
