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
            getGroups(data.groups);
        }

    }

    if (data.status == "provideMaps") {
        if (requestgroup == null) {
            var tacticsarray = [];

            for (var w = 0; w < data.maps.length; w++) {
                if (data.maps[w].group == null) {
                    tacticsarray.push(data.maps[w]);
                }
            }

            user.setTactics(tacticsarray);
        } else {
            user.setGrouptactics(data.maps);
            openGroupTactic(requestgroup);
            requestgroup = null;
        }


    }

    if (data.status == "authGroupFailed") {
        alertMessage("Beitreten der Gruppe Fehlgeschlagen", "red");
    }

    if (data.status == "authGroupSuccess") {
        grouplogin(data);
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

    if (data.status == "createMapSuccess") {



        alertMessage("Taktik erstellt!", "green");
    }

    if (data.status == "bindMapSuccess") {
        alertMessage("Taktik an Gruppe geteilt!", "green");
    }

    if (data.status == "changeMapNameSuccess") {
        alertMessage("Taktikname erfolgreich geändert!", "green");
    }

    if (data.status == "changeMapSuccess") {
        alertMessage("Geladene Taktik erfolgreich geändert!", "green");
    }

    if (data.status == "changeMapFailed") {
        alertMessage("Geladene Taktik nicht erfolgreich geändert!", "red");
    }

    if (data.status == "kickUserSuccess") {
        console.log(data.kick);
        $("#member_" + data.kick).hide(2000);
        alertMessage("User aus der Gruppe entfernt", "green");
    }

    if (data.status == "kickUserFailed") {
        alertMessage("User nicht aus der Gruppe entfernt", "red");
    }

    if(data.status == "setGroupModSuccess"){
        $("#grouptableadmin_" + data.user).append("<i id='modbutton_" + data.user + "' class='material-icons'>star_half</i>");
        $("#membermodoption_" + data.user).attr("data-type", "remove");
        user.setModToGroup(data.group, data.user);
        $("#membermodoption_" + data.user).html("remove");
        setListenerToModButton(data.user, data.group);
    }

    if(data.status == "setGroupModFailed"){
        alertMessage("User nicht als Mod hinzugefügt", "red");
    }

    if(data.status == "unsetGroupModSuccess") {
        $("#grouptableadmin_" + data.user).empty();
        $("#membermodoption_" + data.user).attr("data-type", "add");
        user.deleteModofGroup(data.group, data.user);
        $("#membermodoption_" + data.user).html("add");
        setListenerToModButton(data.user, data.group);
    }

    if(data.status == "unsetGroupModFailed"){
        alertMessage("User nicht als Mod entfernt", "red")
    }

    if(data.status == "deleteGroupSuccess"){
        alertMessage("Gruppe gelöscht", "green");
    }

    if(data.status == "deleteGroupFailed"){
        alertMessage("Gruppe nicht gelöscht", "red");
    }

});