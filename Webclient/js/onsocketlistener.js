
/**
 * Created by Robert on 21.01.2016.
 */


socket.on('status', function (data) {

    console.log(data);

    switch (data.status) {
        case "authSuccess":
            authSuccess(data);
            break;

        case "authFailed":
            alertMessage("Passwort oder Benutzername nicht vorhanden!", "red");
            break;

        case "regSuccess":
            alertMessage("Registrieren erfolgreich!", "green");
            authSuccess(data);
            closeOverlaypanel();
            break;

        case  "regFailed":
            alertMessage("Benutzername bereits vorhanden!", "red");
            break;

        case "provideGroups":
            if (refreshmember) {
                user.setGroups(data.groups);
            } else {
                user.setGroups(data.groups);
                getGroups(user.getGroups());
            }
            break;

        case "provideTacs":
            if (requestgroup == null) {
                var tacticsarray = [];

                for (var w = 0; w < data.tacs.length; w++) {
                    if (data.tacs[w].group == null) {
                        tacticsarray.push(data.tacs[w]);
                    }
                }
                user.setTactics(tacticsarray);
            } else {
                user.setGrouptactics(data.tacs);
                openGroupTactic(requestgroup);
                requestgroup = null;
            }
            break;

        case "authGroupFailed":
            alertMessage("Gruppe existiert nicht, oder Passwort ist falsch", "red");
            break;

        case "authGroupSuccess":
            user.setGroups(data.groups);
            getGroups(user.getGroups());
            closeOverlaypanel();
            break;

        case "createGroupSuccess":
            createGroup(data);
            alertMessage("Gruppe erstellt", "green");
            break;

        case "createGroupFailed":
            alertMessage("Gruppenname bereits vorhanden", "red");
            break;

        case "leaveGroupSuccess":
            leaveGroup(data);
            break;

        case "leaveGroupFailed":
            alertMessage("Gruppenaustritt Fehlgeschlagen", "red");
            break;

        case "createTacSuccess":
            if (data.tacs[0].group != null) {
                tactic.setX(data.tacs[0].x);
                tactic.setY(data.tacs[0].y);
                tactic.setUser(data.tacs[0].user);
                tactic.setMaps(data.tacs[0].map);
                tactic.setTacticname(data.tacs[0].name);
                tactic.setDrag(data.tacs[0].drag);
                tactic.setId(data.tacs[0].id);
                user.addGrouptactic(({'group': tactic.getGroup(), 'x': tactic.getX(), 'y': tactic.getY(), 'user': tactic.getUser(), 'name': tactic.getTacticname(), 'map': tactic.getMap(), 'id': tactic.getId(), 'drag': tactic.getDrag() }));
            } else if (data.tacs[0].group == null) {
                tactic.setX(data.tacs[0].x);
                tactic.setY(data.tacs[0].y);
                tactic.setUser(data.tacs[0].user);
                tactic.setMaps(data.tacs[0].map);
                tactic.setTacticname(data.tacs[0].name);
                tactic.setDrag(data.tacs[0].drag);
                tactic.setId(data.tacs[0].id);
                user.addTactic(({'x': tactic.getX(), 'y': tactic.getY(), 'user': tactic.getUser(), 'name': tactic.getTacticname(), 'map': tactic.getMap(), 'id': tactic.getId(), 'drag': tactic.getDrag() }));
            }
            alertMessage("Taktik <u>" + tactic.getTacticname() + "</u> erfolgreich erstellt", "green");
            break;

        case "createTacFailed":
            alertMessage("Taktik konnte nicht gespeichert werden", "red");
            break;

        case "bindTacSuccess":
            user.setLocalToGroupTactic(data.id);
            $("[data-tactic =" + data.id + "]").hide(2000);
            alertMessage("Taktik an Gruppe <u>" + data.group + "</u> geteilt!", "green");

            break;

        case "bindTacFailed":
            alertMessage("Taktik teilen fehlgeschlagen!", "red");
            break;

        case "changeTacNameSuccess":
            if(data.group != null){
                changeNameOfTactic(data.id, data.name, "group", "[data-tacticchangenamebutton =" + data.id + "]", " [data-grouptactic = " + data.id + "]");

            }else if(data.group == null){
                changeNameOfTactic(data.id, data.name, null, "[data-edit =" + data.id + "]", " [data-name =" + data.id + "]");
            }
            alertMessage("Taktikname erfolgreich geändert!", "green");
            break;

        case "changeTacSuccess":
            tactic.setDrag(data.tacs[0].drag);
            tactic.setX(data.tacs[0].x);
            tactic.setY(data.tacs[0].y);
            user.changeTacticData(tactic);
            alertMessage("Geladene Taktik erfolgreich geändert!", "green");
            break;

        case "changeTacFailed":
            alertMessage("Geladene Taktik nicht erfolgreich geändert!", "red");
            break;

        case "kickUserSuccess":
            $("[data-member =" + data.kick + "]").hide(1000);
            alertMessage("User aus der Gruppe entfernt", "green");
            break;

        case "kickUserFailed":
            alertMessage("User nicht aus der Gruppe entfernt", "red");
            break;

        case "setGroupModSuccess":
            $("[data-grouptableadmin = " + data.user + "]").append("<i data-modbutton =" + data.user + " class='material-icons'>star_half</i>");
            $("[data-membermodoption =" + data.user + "]").attr("data-type", "remove");
            user.setModToGroup(data.group, data.user);
            $("[data-membermodoption =" + data.user + "]").html("remove");
            setListenerToModButton(data.user, data.group);
            setTooltipToElement("[data-modbutton =" + data.user + "]", "Gruppenmoderator");
            break;

        case "setGroupModFailed":
            alertMessage("User nicht als Mod hinzugefügt", "red");
            break;

        case "unsetGroupModSuccess":
            $("[data-grouptableadmin = " + data.user + "]").empty();
            $("[data-membermodoption =" + data.user + "]").attr("data-type", "add");
            user.deleteModofGroup(data.group, data.user);
            $("[data-membermodoption =" + data.user + "]").html("add");
            setListenerToModButton(data.user, data.group);
            break;

        case "unsetGroupModFailed":
            alertMessage("User nicht als Mod entfernt", "red");
            break;

        case "deleteGroupSuccess":
            leaveGroup(data);
            alertMessage("Gruppe gelöscht", "green");
            break;

        case "deleteGroupFailed":
            alertMessage("Gruppe nicht gelöscht", "red");
            break;

        case "deleteTacSuccess":
            if (requestgroup == "group") {
                $("[data-tactic =" + data.id + "]").hide(1000);
            } else {
                user.deleteTacticName(data.id);
                $("[data-tactic =" + data.id + "]").hide(1000);
            }
            requestgroup = null;
            break;

        case "deleteTacFailed":
            alertMessage("Fehler beim Löschen der Taktik aufgetreten", "red");
            break;

        case "provideRoomName":
            setLiveModus(true, data);
            break;

        case "connectedClients":
            setTimeout(function () {
                handleLiveUserlist(data);
            }, 1000);


            break;

        case "liveContent":

            drawLive(data.x, data.y, data.drag, data.startX, data.startY);
            $("[data-brush =" + data.user + "]").show();

            $(".livebrush").not("[data-brush =" + data.user + "]").hide();
            break;


        default:
           console.log("Keinen Status empfangen");
    }


});


function setLiveModus(on, data) {
    if (on) {
        deleteCanvas();
        closeOverlaypanel();
        $(".liveelement").toggle("slow");
        $("#livemodus").toggle("slow", function () {
            $("#livemodus").load("./html/livemoduscanvas.html", function () {
                afterLivemodusLoaded(data);
            });

        });
        draw(true, data.room);

    }
}

function afterLivemodusLoaded(data) {

    setTooltipToElement("#leavelivemodus", "Livemodus beenden");

    $("#leavelivemodus").on("click", function () {
        socket.emit("leaveGroupLive", JSON.stringify({'room': data.room}));
        $("#livememberlist").empty();
        $(".liveelement").toggle("slow");
        $("#livemodus").toggle("slow");
        maketactic = false;
        handleTacticButtons(false);
        draw(false);

    })
}

function handleLiveUserlist(data) {
    var livemember = new Array();
    $('#livememberlist').children().find("span").each(function () {
        livemember.push($(this).text());
    });

    if (livemember.length == 0) {
        for (var liveuser in data.live) {
            $("#livememberlist").append("<div class='live_userdiv' data-name='" + data.live[liveuser] + "'>" +
                "<i data-brush='" + data.live[liveuser] + "' style='margin-right: 5px; display: none' class='material-icons livebrush'>brush</i> <span>" + data.live[liveuser] + "</span></div>");

        }
    } else {
        if (data.live.length > livemember.length) {
            for (var liveuser in data.live) {
                if (isInArray(livemember, data.live[liveuser]).length == 0) {
                    $("#livememberlist").append("<div class='live_userdiv' data-name='" + data.live[liveuser] + "'><" +
                        "i data-brush='" + data.live[liveuser] + "' style='margin-right: 5px; display: none' class='material-icons livebrush'>brush</i><span>" + data.live[liveuser] + "</span></div>");
                }
            }
        } else if (data.live.length < livemember.length) {
            for (var liveuser in livemember) {
                if (isInArray(data.live, livemember[liveuser]).length == 0) {
                    $("[data-name = " + livemember[liveuser] + "]").remove();
                }
            }
        }
    }
}