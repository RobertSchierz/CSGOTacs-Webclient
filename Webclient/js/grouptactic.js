function openGroupTactic(groupname) {

    var groupobject = user.getGroupByName(groupname);


    overlaypanel_header("Gruppe: " + groupname);
    if ($("#groupleave").length == 0) {
        $("#overlaypanel_header").append("<i class='material-icons' id='groupleave'>exit_to_app</i>");


        $("#groupleave").on("click", function () {
            socket.emit('leaveGroup', ({'user': localStorage.getItem("benutzername"), 'name': groupobject.name }));

        })
        setTooltipToElement("#groupleave", "Aus der Gruppe austreten");

    }

    if (localStorage.getItem("benutzername") == groupobject.admin) {
        $("#overlaypanel_header").append("<i class='material-icons' id='groupdelete'>delete</i>");
        setTooltipToElement("#groupdelete", "Gruppe entfernen");
        $("#groupdelete").on("click", function () {
            socket.emit("deleteGroup", ({'user': localStorage.getItem("benutzername"), 'name': groupobject.name}));

        })
    }

    var grouptacticsarray = user.getGrouptacticsByName(groupname);

    $("#overlaypanel_insidebox").append("<div id='grouptacticcanvas'></div> <div id='groupmembercanvas'></div>");
    $("#groupmembercanvas").append("<h3 class='tableheader'>Benutzer:</h3><div class='tablewrapper'><table id='groupmember_table'></table></div>");
    for (var groupmember in groupobject.member) {
        var membername = groupobject.member[groupmember];
        var ismod = isInArray(groupobject.mods, membername);

        $("#groupmember_table").append("<tr> <td id='grouptableadmin_" + membername + "' class='canvastd'> </td> " +
            "<td id='grouptable_name_" + membername + "' class='canvastd'></td> " +
            "<td id='groupmembertableoptiontd_" + membername + "' class='canvastd'></td>  </tr>");

        if (membername == groupobject.admin) {
            $("#grouptableadmin_" + membername).append("<i id='adminbutton_" + membername + "' class='material-icons'>star</i>");
            setTooltipToElement("#adminbutton_" + membername, "Gruppenadministrator");
        }
        var useroption = "admin";
        if (ismod.length != 0) {
            $("#grouptableadmin_" + membername).append("<i id='modbutton_" + membername + "' class='material-icons'>star_half</i>");
            setTooltipToElement("#modbutton_" + membername, "Gruppenmoderator")
        }
        $("#grouptable_name_" + membername).append("" + groupobject.member[groupmember] + "");
        if (membername != groupobject.admin && membername != localStorage.getItem("benutzername") && (localStorage.getItem("benutzername") == groupobject.admin || isInArray(groupobject.mods, localStorage.getItem("benutzername")).length != 0)) {
            $("#groupmembertableoptiontd_" + membername).append("<i id='groupmembertableoption_" + membername + "' class='material-icons groupmember_option'>keyboard_arrow_down</i>");

        }

        $("#groupmembertableoption_" + membername).on("click", function () {
            optionPanel(splittId($(this).attr("id")), "member", groupobject);
        });

    }


    if (grouptacticsarray.length != 0) {
        $("#grouptacticcanvas").append("<h3 class='tableheader'>Taktiken:</h3><div class='tablewrapper'><table id='grouptactic_table'></table></div>");
        for (var grouptactic in grouptacticsarray) {

            loadTacticImage(grouptacticsarray[grouptactic]);

            var tacticid = grouptacticsarray[grouptactic].id;
            $("#grouptactic_table").append("<tr id='tactic_" + tacticid + "'> <td id='grouptacticimage_" + tacticid + "' class='canvastd' ></td> " +
                "<td id='grouptactic_" + tacticid + "' class='canvastd' >  </td> " +
                "<td id='grouptactictableoptiontd_" + tacticid + "' class='canvastd' ></td>  </tr>");
            $("#grouptactic_" + tacticid).append("" + grouptacticsarray[grouptactic].name + "");
            $("#grouptactictableoptiontd_" + tacticid).append("<i id='grouptactictableoption_" + tacticid + "' class='material-icons grouptactic_option'>keyboard_arrow_down</i>");

            $("#grouptactictableoption_" + tacticid).on("click", function () {
                optionPanel(splittId($(this).attr("id")), "tactic");
            });
        }
    } else {
        $("#grouptacticcanvas").append("<h3 class='tableheader'>Keine Taktiken vorhanden</h3>");
    }

}

$(document).click(function (e) {
    if ($(e.target).closest(".optionpanel").length == 0 && $(e.target).closest(".grouptactic_option").length == 0 && $(e.target).closest(".groupmember_option").length == 0) {
        if ($(".optionpanel").length != 0) {
            $(".optionpanel").hide(500);
            $(".optionpanel").remove();
        }
    }
});

function optionPanel(id, source, group) {
    var request;
    optionPanelDelete(id);
    if (source == "tactic") {
        request = "grouptactictableoptiontd_";
    } else if (source == "member") {
        request = "groupmembertableoptiontd_";
    }


    if ($("#optionpanel_" + id).length == 0) {
        if (source == "tactic") {
            $("#" + request + id).append("<div class='optionpanel' id='optionpanel_" + id + "'>" +
                "<table><tr><td class='tdoptionpanel'><i id='tacticloadbutton_" + id + "' class='material-icons'>gesture</i></td> " +
                "<td class='tdoptionpanel' id='changenametd_" + id + "'><i id='tacticchangenamebutton_" + id + "' class='material-icons'>edit</i></td>" +
                "<td class='tdoptionpanel'><i id='tacticdeletebutton_" + id + "' class='material-icons'>delete</i></td></tr></table>" +
                "</div>");

            $("#tacticdeletebutton_" + id).on("click", function () {
                socket.emit('deleteMap', ({'id': id}));
                requestgroup = "group";
            });

            $("#tacticloadbutton_" + id).on("click", function () {
                closeOverlaypanel();
                deleteCanvas(document.getElementById('imgpanel').getContext("2d"));
                var tactic = setArrayData(user.getGrouptacticByID(splittId($(this).attr("id"))));
                drawSavedMap(tactic);
                handleMapselectorStates("#" + tactic.getMap(), true);
            });

            $("#tacticchangenamebutton_" + id).on("click", function () {
                var splittedid = splittId($(this).attr("id"));
                setChangeName("#tacticchangenamebutton_" + splittedid, "#changenametd_" + splittedid, splittedid, "#grouptactic_" + splittedid, "group");


            });

            setTooltipToElement("#tacticloadbutton_" + id, "Taktik weiterzeichnen");
            setTooltipToElement("#tacticchangenamebutton_" + id, "Taktiknamen bearbeiten");
            setTooltipToElement("#tacticdeletebutton_" + id, "Taktik Löschen");


        } else if (source == "member") {

            $("#" + request + id).append("<div class='optionpanel' id='optionpanel_" + id + "'><table><tr>" +
                "<td  class='tdoptionpanel'><i id='memberdeletebutton_" + id + "' class='material-icons'>delete</i> </td>" +
                "<td class='tdoptionpanel' id='membermod_" + id + "'></td>" +
                "</tr></table></div>");


            var modArraylength = isInArray(group.mods, id).length;
            if (modArraylength != 0) {
                $("#membermod_" + id).html("<i id='membermodoption_" + id + "' class='material-icons' data-type='remove'>remove</i>");
            } else if (modArraylength == 0) {
                $("#membermod_" + id).html("<i id='membermodoption_" + id + "' class='material-icons' data-type='add'>add</i>");
            }

            setListenerToModButton(id, group.name);


            $("#memberdeletebutton_" + id).on("click", function () {
                socket.emit('kickUser', ({'user': group.admin, 'name': group.name, 'kick': id}));
            });
            setTooltipToElement("#memberdeletebutton_" + id, "Member Kicken");

        }

        $("#optionpanel_" + id).show(500);
    } else {
        $("#optionpanel_" + id).hide(500);
        $("#optionpanel_" + id).remove();

    }
}

function setListenerToModButton(id, group) {
    switch ($("#membermodoption_" + id).attr("data-type")) {
        case "remove":
            $("#membermodoption_" + id).unbind("click");
            $("#membermodoption_" + id).on("click", function () {
                var id = splittId($(this).attr("id"));
                socket.emit("unsetGroupMod", ({'user': id, 'name': group}));
            });
            setTooltipToElement("#membermodoption_" + id, "Gruppenmoderator entfernen");
            break;
        case "add":
            $("#membermodoption_" + id).unbind("click");
            $("#membermodoption_" + id).on("click", function () {
                var id = splittId($(this).attr("id"));
                socket.emit("setGroupMod", ({'user': id, 'name': group}));

            });
            setTooltipToElement("#membermodoption_" + id, "Gruppenmoderator hinzufügen");
            break;
    }
}


function optionPanelDelete(id) {
    $('div').each(function (index) {
        if ($(this).attr('class') == "optionpanel" && $(this).attr('id') != "optionpanel_" + id) {
            $(this).hide(500);
            $(this).remove();
        }
    });
}

function loadTacticImage(currenttactic) {
    $.ajax({
        url: "./jsons/mapselections.json",
        dataType: 'json',
        success: function (data) {
            for (i = 0; i < data.images.length; i++) {
                if (data.images[i].name == currenttactic.map) {
                    $("#grouptacticimage_" + currenttactic.id).append("<div class='grouptable_images' style='background-image:url(" + data.images[i].url + ")' ></div>");
                }
            }
        },
        error: function () {
            alertMessage("Fehler beim Zugriff auf Taktikbilder", "red");
        }

    });
}

function leaveGroup(data) {
    var group;
    if (data.group == undefined) {
        group = data.name
    } else {
        group = data.group;
    }
    $("#" + group).hide(2000, function () {
        user.deleteGroup(user.getGroups(), group);
        $("#" + group).remove();
        closeOverlaypanel();
    });

}


