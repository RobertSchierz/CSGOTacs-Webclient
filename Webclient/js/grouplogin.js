/**
 * Created by Robert on 15.01.2016.
 */
function logingroup(){
    $("#overlaypanel_insidebox").load(("./html/grouplogin.html"),function(){
        $("#grouplogin_submit").on( "click", function() {
            sendGroupLogin($("#grouplogin_nameinput").val(), $("#grouplogin_passwordinput").val() );
        });
    });
}

function sendGroupLogin(groupname, grouppassword){
    socket.emit('authGroup', ({'user': localStorage.getItem("benutzername"),'name' : groupname,  'pw' : grouppassword }));
}

socket.on('authGroupSuccess', function (data) {
    data.member.push(localStorage.getItem("benutzername"));
    var group = ({'name' : $("#grouplogin_nameinput").val(), 'member' : data.member});
    appendGroupMenu(group);
    $("#groupcanvasmenu").menu( "refresh" );
    closeOverlaypanel();
});
socket.on('authGroupFailed', function () { alert("Fehler");});

