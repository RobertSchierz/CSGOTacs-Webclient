/**
 * Created by Robert on 09.01.2016.
 */

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
                    $("#loadtactic_section" + j).append("<div id='tactic_" + data[o].id + "'><table><tr>" +
                        "<td id=" + data[o].id + " class='" + o + "' style='cursor:pointer'>" + data[o].name + "</td>" +
                        "<td> <i class='tactic_elements material-icons' id='delete_" + data[o].id + "'>delete</i></td> " +
                        "<td class='edittd_"+data[o].id+"'><i class='tactic_elements material-icons' id='edit_" + data[o].id + "'>edit </i></td>" +
                        "<td><il class = 'tactic_elements material-icons' id='share_"+data[o].id+"'>share</il></td></tr></table></div></br>");


                    $("#edit_" + data[o].id).on("click", function () {
                        var id = splittId($(this).attr("id"));
                        setChangeName("#edit_"+id, ".edittd_"+id,id,"#" + id);
                        /*
                        var splittedid = $(this).attr("id").split("_");
                        var savedclass = $('#' + splittedid[1]).attr("class");
                        $('#' + splittedid[1]).replaceWith("<textarea class='edit_textarea' id='edittextarea_" + splittedid[1] + "'>" + $('#' + splittedid[1]).text() + "</textarea>");

                        $('#edittextarea_' + splittedid[1]).on("focusout", function () {
                            var newvalue = $('#edittextarea_' + splittedid[1]).val();
                            socket.emit("changeMapName", ({ 'id' : splittedid[1], 'name' : newvalue }));
                            user.changeTacticName(splittedid[1], newvalue);
                            $('#edittextarea_' + splittedid[1]).replaceWith("<span id=" + splittedid[1] + " class='" + savedclass + "'  style='cursor:pointer'>" + newvalue + "</span>");
                            setTacticListener(data, savedclass);

                        });*/
                    });



                    $("#share_" + data[o].id).on("click", function () {

                        var splittedid = $(this).attr("id").split("_");
                            if ($("#sharegroup_"+splittedid[1]).length == 0){
                                $("#tactic_" + splittedid[1]).append("<select id='sharegroup_"+splittedid[1]+"' class='tactic_elements' ></select>");
                                for(var names = 0; names < user.groupNamesArray().length; names++) {
                                    $("#sharegroup_" + splittedid[1]).append("<option>" + user.groupNamesArray()[names] + "</option> ");

                                }
                                $("#tactic_" + splittedid[1]).append("<i id='sharegroupadd_"+splittedid[1]+"' class='material-icons tactic_elements'>add</i>");

                                $("#sharegroupadd_"+splittedid[1]).on("click", function () {
                                    var splittedid = $(this).attr("id").split("_");
                                    user.setLocalToGroupTactic(splittedid[1]/*, $("#sharegroup_" + splittedid[1] + " option:selected").text() */);
                                    socket.emit("bindMap", ({'id' : splittedid[1], 'group' : $("#sharegroup_" + splittedid[1] + " option:selected").text()}));
                                    $("#tactic_" + splittedid[1]).hide(2000);
                                })

                            }else{
                                $("#sharegroup_" + splittedid[1]).remove();
                                $("#sharegroupadd_" + splittedid[1]).remove();
                            }

                    });


                    $("#delete_" + data[o].id).on("click", function () {
                        var splittedid = splittId($(this).attr("id"));
                        socket.emit('deleteMap', ({'id' : splittedid}));
                    });
                    setTacticListener(data, o)
                }
                setTooltipToElement("#delete_" + data[o].id, "Taktik löschen");
                setTooltipToElement("#edit_" + data[o].id, "Taktik bearbeiten");
                setTooltipToElement("#share_" + data[o].id, "Taktik mit Gruppe teilen");
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
    if(data.group != null){
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
