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

        $("#groupmember_table").append("<tr data-member="+ membername +" > <td data-grouptableadmin='" + membername + "' class='canvastd'> </td> " +
            "<td data-grouptable_name ='" + membername + "' class='canvastd'></td> " +
            "<td data-groupmembertableoptiontd=" + membername + " class='canvastd'></td>  </tr>");

        if (membername == groupobject.admin) {
            $("[data-grouptableadmin = " + membername + "]").append("<i data-adminbutton =" + membername + " class='material-icons'>star</i>");
            setTooltipToElement("[data-adminbutton =" + membername + "]", "Gruppenadministrator");
        }

        if (ismod.length != 0) {
            $("[data-grouptableadmin = " + membername + "]").append("<i data-modbutton=  " + membername + "   class='material-icons'>star_half</i>");
            setTooltipToElement("[data-modbutton =" + membername + "]", "Gruppenmoderator")
        }
        $("[data-grouptable_name =  " + membername + "]").append("" + groupobject.member[groupmember] + "");
        if (membername != groupobject.admin && membername != localStorage.getItem("benutzername") && (localStorage.getItem("benutzername") == groupobject.admin || isInArray(groupobject.mods, localStorage.getItem("benutzername")).length != 0)) {
            $("[data-groupmembertableoptiontd = " + membername + "]").append("<i data-groupmembertableoption = " + membername + " class='material-icons groupmember_option'>keyboard_arrow_down</i>");

        }

        $("[data-groupmembertableoption=" + membername + "]").on("click", function () {
            optionPanel($(this).attr("data-groupmembertableoption"), "member", groupobject);
        });

    }


    if (grouptacticsarray.length != 0) {
        $("#grouptacticcanvas").append("<h3 class='tableheader'>Taktiken:</h3><div class='tablewrapper'><table id='grouptactic_table'></table></div>");
        for (var grouptactic in grouptacticsarray) {

            loadTacticImage(grouptacticsarray[grouptactic]);

            var tacticid = grouptacticsarray[grouptactic].id;
            $("#grouptactic_table").append("<tr data-tactic = " + tacticid + "> <td data-grouptacticimage =" + tacticid + " class='canvastd' ></td> " +
                "<td data-grouptactic =" + tacticid + " class='canvastd' >  </td> " +
                "<td data-grouptactictableoptiontd = " + tacticid + " class='canvastd' ></td>  </tr>");
            $("[data-grouptactic = " + tacticid + "]").append("" + grouptacticsarray[grouptactic].name + "");
            $("[data-grouptactictableoptiontd = " + tacticid + "]").append("<i data-grouptactictableoption =" + tacticid + " class='material-icons grouptactic_option'>keyboard_arrow_down</i>");

            $("[data-grouptactictableoption = " + tacticid + "]").on("click", function () {
                optionPanel($(this).attr("data-grouptactictableoption"), "tactic");
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
        request = "grouptactictableoptiontd";
    } else if (source == "member") {
        request = "groupmembertableoptiontd";
    }


    if ($("[data-optionpanel = " + id + "]").length == 0) {
        if (source == "tactic") {
            $("[data-" + request + "=" + id + "]").append("<div class='optionpanel' data-optionpanel =" + id + ">" +
                "<table><tr><td class='tdoptionpanel'><i data-tacticloadbutton =" + id + " class='material-icons'>gesture</i></td> " +
                "<td class='tdoptionpanel' data-changenametd =" + id + "><i data-tacticchangenamebutton =" + id + " class='material-icons'>edit</i></td>" +
                "<td class='tdoptionpanel'><i data-tacticdeletebutton =" + id + " class='material-icons'>delete</i></td></tr></table>" +
                "</div>");

            $("[data-tacticdeletebutton = " + id + "]").on("click", function () {
                socket.emit('deleteMap', ({'id': id}));
                requestgroup = "group";
            });

            $("[data-tacticloadbutton =" + id + "]").on("click", function () {
                closeOverlaypanel();
                deleteCanvas(document.getElementById('imgpanel').getContext("2d"));
                var tactic = setArrayData(user.getGrouptacticByID($(this).attr("data-tacticloadbutton")));
                drawSavedMap(tactic);
                handleMapselectorStates("#" + tactic.getMap(), true);
            });

            $("[data-tacticchangenamebutton =" + id + "]").on("click", function () {
                var id = $(this).attr("data-tacticchangenamebutton");
                setChangeName("[data-tacticchangenamebutton =" + id + "]", "[data-changenametd =" + id + "]", id, "[data-grouptactic = " + id + "]", "group");
            });

            setTooltipToElement("[data-tacticloadbutton =" + id + "]", "Taktik weiterzeichnen");
            setTooltipToElement("[data-tacticchangenamebutton =" + id + "]", "Taktiknamen bearbeiten");
            setTooltipToElement("[data-tacticdeletebutton =" + id + "]", "Taktik Löschen");


        } else if (source == "member") {

            $("[data-" + request + "=" + id + "]").append("<div class='optionpanel' data-optionpanel = " + id + "><table><tr>" +
                "<td  class='tdoptionpanel'><i data-memberdeletebutton = " + id + " class='material-icons'>delete</i> </td>" +
                "<td class='tdoptionpanel' data-membermod = " + id + "></td>" +
                "</tr></table></div>");


            var modArraylength = isInArray(group.mods, id).length;
            if (modArraylength != 0) {
                $("[data-membermod =" + id + "]").html("<i data-membermodoption = " + id + " class='material-icons' data-type='remove'>remove</i>");
            } else if (modArraylength == 0) {
                $("[data-membermod =" + id + "]").html("<i data-membermodoption = " + id + " class='material-icons' data-type='add'>add</i>");
            }

            setListenerToModButton(id, group.name);


            $("[data-memberdeletebutton =" + id + "]").on("click", function () {
                socket.emit('kickUser', ({'user': group.admin, 'name': group.name, 'kick': id}));
            });
            setTooltipToElement("[data-memberdeletebutton = " + id + "]", "Member Kicken");

        }

        $("[data-optionpanel =" + id + "]").show(500);
    } else {
        $("[data-optionpanel =" + id + "]").hide(500);
        $("[data-optionpanel =" + id + "]").remove();

    }
}

function setListenerToModButton(id, group) {
    var membermodelement = "[data-membermodoption =" + id + "]";
    switch ($(membermodelement).attr("data-type")) {
        case "remove":
            $(membermodelement).unbind("click");
            $(membermodelement).on("click", function () {
                socket.emit("unsetGroupMod", ({'user': id, 'name': group}));
            });
            setTooltipToElement(membermodelement, "Gruppenmoderator entfernen");
            break;
        case "add":
            $(membermodelement).unbind("click");
            $(membermodelement).on("click", function () {
                socket.emit("setGroupMod", ({'user': id, 'name': group}));

            });
            setTooltipToElement(membermodelement, "Gruppenmoderator hinzufügen");
            break;
    }
}


function optionPanelDelete(id) {
    $('div').each(function (index) {
        if ($(this).attr('class') == "optionpanel" && $(this).attr('data-optionpanel') != id) {
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
                    $("[data-grouptacticimage =" + currenttactic.id + "]").append("<div class='grouptable_images' style='background-image:url(" + data.images[i].url + ")' ></div>");
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


