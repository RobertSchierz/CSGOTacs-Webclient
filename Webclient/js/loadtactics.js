/**
 * Created by Robert on 09.01.2016.
 */

function getSavedTactics(){

    socket.emit('getMaps', ({'user': localStorage.getItem("benutzername") }));

}

function getMaps(data){
    var mapnames = [];
    var obj = {};

    for (var i = 0; i < data.length; i++) {
        mapnames.push(data[i].map);
    }


    $("#overlaypanel_insidebox").append("<div id='loadtactic_canvas' > </div>");
    for (var j = 0; j < mapnames.length; j++) {
        if (!(mapnames[j] in obj)) {
            $("#loadtactic_canvas").append("<h3>" + mapnames[j] + "</h3>");
            $("#loadtactic_canvas").append("<div id='loadtactic_section" + j + "'> </div>");
            obj[mapnames[j]] = true;
            for (var o = 0; o < data.length; o++) {
                if (data[o].map == mapnames[j]) {
                    $("#loadtactic_section" + j).append("<div id='tactic_" + data[o].id + "'><span id=" + data[o].id + " class='" + o + "' style='cursor:pointer'>" + data[o].name + "</span> <img src='images/icons/tacticload/delete.png' class='tactic_elements' id='delete_" + data[o].id + "'> <img src='images/icons/tacticload/edit.png' class='tactic_elements' id='edit_" + data[o].id + "'></div></br>");

                    $("#edit_" + data[o].id).on("click", function () {

                        var splittedid = $(this).attr("id").split("_");
                        var savedclass = $('#' + splittedid[1]).attr("class");
                        $('#' + splittedid[1]).replaceWith("<textarea class='edit_textarea' id='edittextarea_" + splittedid[1] + "'>" + $('#' + splittedid[1]).text() + "</textarea>");

                        $('#edittextarea_' + splittedid[1]).on("focusout", function () {
                            var newvalue = $('#edittextarea_' + splittedid[1]).val();
                            //socket.emit('changeMapName', ({'id' : splittedid[1], 'name' : newvalue }));
                            $('#edittextarea_' + splittedid[1]).replaceWith("<span id=" + splittedid[1] + " class='" + savedclass + "'  style='cursor:pointer'>" + newvalue + "</span>");
                            setTacticListener(data, savedclass)

                        });
                    });


                    $("#delete_" + data[o].id).on("click", function () {
                        var splittedid = $(this).attr("id").split("_");
                        ActualDeleteTactic(splittedid[1]);
                    });
                    setTacticListener(data, o)
                }
            }
        }
    }


    $(function () {

        $("#loadtactic_canvas").accordion({
            collapsible: true,
            heightStyle: "content"

        });
    });


    function setTacticListener(data, index) {
        $("#" + data[index].id).on("click", function () {
            closeOverlaypanel();
            deleteCanvas(document.getElementById('imgpanel').getContext("2d"));
            var tactic = setArrayData(data[$(this).attr("class")]);
            drawSavedMap(tactic);
            handleMapselectorStates("#" + tactic.getMap(), true);
        });
    }


}



function setArrayData(data){

    tactic.setMaps(data.map);
    tactic.setX(data.x);
    tactic.setY(data.y);
    tactic.setUser(data.user);
    tactic.setTacticname(data.name);
    tactic.setId(data.id);
    tactic.setDrag(data.drag);
    return tactic;
}
