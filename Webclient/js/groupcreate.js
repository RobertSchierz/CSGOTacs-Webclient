/**
 * Created by Robert Schierz on 15.01.2016.
 */

/**
 * Öffnet das Overlaypanel um eine Gruppe zu erstellen
 *
 */
function creategroup() {
    $("#overlaypanel_insidebox").load(("./html/groupcreate.html"), function () {
        $("#groupcreate_submit").on("click", function () {
            if (($("#groupcreate_nameinput").val() != "" && $("#groupcreate_nameinput").val() != null) && ($("#groupcreate_passwordinput").val() != "" && $("#groupcreate_passwordinput").val() != null )) {
                sendGroupCreate($("#groupcreate_nameinput").val(), $("#groupcreate_passwordinput").val());
            } else {
                alertMessage("Felder müssen befüllt sein!", "red")
            }

        });
    });
}

/**
 * Sendet die Informationen der zu erstellenden Gruppe an den Server
 *
 *@param groupname = Gruppenname, grouppassword = Gruppenpasswort
 */
function sendGroupCreate(groupname, grouppassword) {
    socket.emit('createGroup', JSON.stringify({'user': localStorage.getItem("benutzername"), 'name': groupname, 'pw': grouppassword }));
}

/**
 * Speichert den neuen Gruppenname in das Objekt group
 *
 * @param data = Rückgabewert vom Server
 */
function createGroup(data) {
    var group = ({'name': $("#groupcreate_nameinput").val(), 'member': [localStorage.getItem("benutzername")], 'admin': localStorage.getItem("benutzername")});
    user.addGroup(group);

    appendGroupMenu(group);
    closeOverlaypanel()

}




