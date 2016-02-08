/**
 * Created by Robert on 09.01.2016.
 */

function getMaps(data) {
    var mapnames = [];
    var obj = {};

    for (var i = 0; i < data.length; i++) {
        mapnames.push(data[i].map);
    }

if(mapnames.length != 0){
    $("#overlaypanel_insidebox").append("<div id='loadtactic_canvas' > </div>");
    for (var j = 0; j < mapnames.length; j++) {
        if (!(mapnames[j] in obj)) {
            $("#loadtactic_canvas").append("<h3>" + mapnames[j] + "</h3>");
            $("#loadtactic_canvas").append("<div id='loadtactic_section" + j + "'> </div>");
            obj[mapnames[j]] = true;
            for (var o = 0; o < data.length; o++) {
                if (data[o].map == mapnames[j]) {
                    $("#loadtactic_section" + j).append("<div data-tactic = " + data[o].id + "><table><tr>" +
                        "<td data-name=" + data[o].id + " class='" + o + "' style='cursor:pointer'>" + data[o].name + "</td>" +
                        "<td> <i class='tactic_elements material-icons' data-delete =" + data[o].id + ">delete</i></td> " +
                        "<td data-edittd =" + data[o].id + "><i class='tactic_elements material-icons' data-edit =" + data[o].id + ">edit </i></td>" +
                        "<td><il class = 'tactic_elements material-icons' data-share =" + data[o].id + ">share</il></td></tr></table></div></br>");


                    $("[data-edit =" + data[o].id + "]").on("click", function () {
                        var id = $(this).attr("data-edit");
                        setChangeName("[data-edit =" + id + "]", "[data-edittd =" + id + "]", id, "[data-name =" + id + "]");
                    });


                    $("[data-share =" + data[o].id + "]").on("click", function () {

                        var id = $(this).attr("data-share");
                        if ($("[data-sharegroup =" + id + "]").length == 0) {
                            $("[data-tactic =" + id +"]").append("<select data-sharegroup =" + id + " class='tactic_elements' ></select>");
                            for (var names = 0; names < user.groupNamesArray().length; names++) {
                                $("[data-sharegroup =" + id + "]").append("<option>" + user.groupNamesArray()[names] + "</option> ");

                            }
                            $("[data-tactic =" + id + "]").append("<i data-sharegroupadd =" + id + " class='material-icons tactic_elements'>add</i>");

                            $("[data-sharegroupadd =" + id + "]").on("click", function () {
                                var id = $(this).attr("data-sharegroupadd");
                                socket.emit("bindMap", ({'id': id, 'group': $("[data-sharegroup =" + id +  "] option:selected").text()}));
                            })

                        } else {
                            $("[data-sharegroup =" + id + "]").remove();
                            $("[data-sharegroupadd =" + id + "]").remove();
                        }

                    });


                    $("[data-delete =" + data[o].id + "]").on("click", function () {
                        var id = $(this).attr("data-delete");
                        socket.emit('deleteMap', ({'id': id}));
                    });
                    setTacticListener(data, o)
                }
                setTooltipToElement("[data-delete =" + data[o].id + "]", "Taktik löschen");
                setTooltipToElement("[data-edit =" + data[o].id + "]", "Taktiknamen bearbeiten");
                setTooltipToElement("[data-share =" + data[o].id + "]", "Taktik mit Gruppe teilen");
            }
        }
    }


    $(function () {

        $("#loadtactic_canvas").accordion({
            collapsible: true,
            heightStyle: "content"

        });
    });



}else{
    $("#overlaypanel_insidebox").append("<h3>Keine gespeicherten Taktiken vorhanden</h3>");
}

}



function setTacticListener(data, index) {
    $("[data-name =" + data[index].id + "]").on("click", function () {
        closeOverlaypanel();
        deleteCanvas(document.getElementById('imgpanel').getContext("2d"));
        var tactic = setArrayData(data[$(this).attr("class")]);
        drawSavedMap(tactic);
        handleMapselectorStates("#" + tactic.getMap(), true);
    });
}


function setArrayData(data) {
    if (data.group != null) {
        tactic.setGroup(data.group);
    }
    tactic.setMaps(data.map);
    tactic.setX(data.x);
    tactic.setY(data.y);
    tactic.setUser(data.user);
    tactic.setTacticname(data.name);
    tactic.setId(data.id);
    tactic.setDrag(data.drag);
    return tactic;
}
