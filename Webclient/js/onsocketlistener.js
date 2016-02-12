/**
 * Created by Robert on 21.01.2016.
 */



socket.on('status', function (data) {

    console.log(data);

    if (data.status == "authSuccess") {
        authSuccess(data);
    }

    if (data.status == "authFailed") {
        alertMessage("Einloggen fehlgeschlagen!", "red");
    }

    if (data.status == "regSuccess") {
        alertMessage("Registrieren erfolgreich!", "green");
        authSuccess(data);
        closeOverlaypanel();
    }

    if (data.status == "regFailed") {
        alertMessage("Registrieren fehlgeschlagen!", "red");
    }

    if (data.status == "provideGroups") {
        if (refreshmember) {
            user.setGroups(data.groups);
        } else {
            user.setGroups(data.groups);
            getGroups(user.getGroups());
        }
    }

    if (data.status == "provideTacs") {
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
    }

    if (data.status == "authGroupFailed") {
        alertMessage("Beitreten der Gruppe Fehlgeschlagen", "red");
    }

    if (data.status == "authGroupSuccess") {

        user.setGroups(data.groups);
        getGroups(user.getGroups());
        closeOverlaypanel();
    }

    if (data.status == "createGroupSuccess") {
        createGroup(data);
        alertMessage("Gruppe erstellt", "green")
    }

    if (data.status == "createGroupFailed") {
        alertMessage("Fehler beim Erstellen der Gruppe", "red")
    }

    if (data.status == "leaveGroupSuccess") {
        leaveGroup(data);
    }

    if (data.status == "leaveGroupFailed") {
        alertMessage("Gruppenaustritt Fehlgeschlagen", "red");
    }

    if (data.status == "createTacSuccess") {
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
        alertMessage("Taktik <u>" + tactic.getTacticname() + "</u> erfolgreich erstellt", "green")

    }

    if (data.status == "createTacFailed") {
        alertMessage("Taktik konnte nicht gespeichert werden", "red")
    }

    if (data.status == "bindTacSuccess") {
        user.setLocalToGroupTactic(data.id);
        $("[data-tactic =" + data.id + "]").hide(2000);
        alertMessage("Taktik an Gruppe <u>" + data.group + "</u> geteilt!", "green");
    }

    if (data.status == "bindTacFailed") {
        alertMessage("Taktik teilen fehlgeschlagen!", "red");
    }

    if (data.status == "changeTacNameSuccess") {
        alertMessage("Taktikname erfolgreich geändert!", "green");
    }

    if (data.status == "changeTacSuccess") {

        tactic.setDrag(data.tacs[0].drag);
        tactic.setX(data.tacs[0].x);
        tactic.setY(data.tacs[0].y);
        user.changeTacticData(tactic);
        alertMessage("Geladene Taktik erfolgreich geändert!", "green");
    }

    if (data.status == "changeTacFailed") {
        alertMessage("Geladene Taktik nicht erfolgreich geändert!", "red");
    }

    if (data.status == "kickUserSuccess") {
        $("[data-member =" + data.kick + "]").hide(1000);
        alertMessage("User aus der Gruppe entfernt", "green");
    }

    if (data.status == "kickUserFailed") {
        alertMessage("User nicht aus der Gruppe entfernt", "red");
    }

    if (data.status == "setGroupModSuccess") {
        $("[data-grouptableadmin = " + data.user + "]").append("<i data-modbutton =" + data.user + " class='material-icons'>star_half</i>");
        $("[data-membermodoption =" + data.user + "]").attr("data-type", "remove");
        user.setModToGroup(data.group, data.user);
        $("[data-membermodoption =" + data.user + "]").html("remove");
        setListenerToModButton(data.user, data.group);
        setTooltipToElement("[data-modbutton =" + data.user + "]", "Gruppenmoderator")
    }

    if (data.status == "setGroupModFailed") {
        alertMessage("User nicht als Mod hinzugefügt", "red");
    }

    if (data.status == "unsetGroupModSuccess") {
        $("[data-grouptableadmin = " + data.user + "]").empty();
        $("[data-membermodoption =" + data.user + "]").attr("data-type", "add");
        user.deleteModofGroup(data.group, data.user);
        $("[data-membermodoption =" + data.user + "]").html("add");
        setListenerToModButton(data.user, data.group);

    }

    if (data.status == "unsetGroupModFailed") {
        alertMessage("User nicht als Mod entfernt", "red")
    }

    if (data.status == "deleteGroupSuccess") {
        leaveGroup(data);
        alertMessage("Gruppe gelöscht", "green");
    }

    if (data.status == "deleteGroupFailed") {
        alertMessage("Gruppe nicht gelöscht", "red");
    }

    if (data.status == "deleteTacSuccess") {
        if (requestgroup == "group") {
            $("[data-tactic =" + data.id + "]").hide(1000);
        } else {
            user.deleteTacticName(data.id);
            $("[data-tactic =" + data.id + "]").hide(1000);
        }
        requestgroup = null;
    }

    if (data.status == "deleteTacFailed") {
        alertMessage("Fehler beim Löschen der Taktik aufgetreten", "red")
    }

    if (data.status == "provideRoomName") {
        setLiveModus(true, data);


    }

    if (data.status == "connectedClients") {


        setTimeout(function () {
            var livemember = new Array();


            $('#livememberlist').children().each(function () {
                livemember.push($(this).text());
            });

            if (livemember.length == 0) {
                for (var liveuser in data.live) {
                    $("#livememberlist").append("<div data-name='" + data.live[liveuser] + "'>" + data.live[liveuser] + "</div>");
                }
            } else {
                if (data.live.length > livemember.length) {
                    for (var liveuser in data.live) {
                        if (isInArray(livemember, data.live[liveuser]).length == 0) {
                            $("#livememberlist").append("<div data-name='" + data.live[liveuser] + "'>" + data.live[liveuser] + "</div>");
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


        }, 1000);


    }

});

function setLiveModus(on, data) {
    if (on) {
        closeOverlaypanel();
        $(".liveelement").toggle("slow");
        $("#livemodus").toggle("slow", function () {
            $("#livemodus").load("./html/livemoduscanvas.html", function () {
                afterLivemodusLoaded(data);
            });

        });
        draw(true);

    }
};

function afterLivemodusLoaded(data) {

    setTooltipToElement("#leavelivemodus", "Livemodus beenden");

    $("#leavelivemodus").on("click", function () {
        socket.emit("leaveGroupLive", JSON.stringify({'room': data.room}));
        $("#livememberlist").empty();
        $(".liveelement").toggle("slow");
        $("#livemodus").toggle("slow");
        draw(false);

    })
};