/**
 * Created by Robert Schierz on 15.01.2016.
 */

/**
 * Öffnet das Overlaypanel um eine Gruppe zu laden
 *
 */
function logingroup(){
    $("#overlaypanel_insidebox").load(("./html/grouplogin.html"),function(){
        $("#grouplogin_submit").on( "click", function() {
            sendGroupLogin($("#grouplogin_nameinput").val(), $("#grouplogin_passwordinput").val() );
        });
    });
}

/**
 * Sendet die Informationen um einer Gruppe beizutreten an den Server
 *
 * @param groupname = Gruppenname, grouppassword = Gruppenpasswort
 */
function sendGroupLogin(groupname, grouppassword){
    socket.emit('authGroup',  JSON.stringify({'user': localStorage.getItem("benutzername"),'name' : groupname,  'pw' : grouppassword }));
}

/**
 * Speichert den neuen Gruppenname in das Objekt group
 *
 * @param data = Rückgabewert vom Server
 */
function grouplogin(data) {
    data.member.push(localStorage.getItem("benutzername"));
    var group = ({'name': $("#grouplogin_nameinput").val(), 'member': data.member, 'admin' : data.admin, 'mods' : data.mods});
    user.addGroup(group);
    appendGroupMenu(group);
    closeOverlaypanel();
}


