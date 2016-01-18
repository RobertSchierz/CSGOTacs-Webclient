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
    socket.emit('authGroup', ({'user': localStorage.getItem("Benutzername"),'name' : groupname,  'pw' : grouppassword }));
}

socket.on('authGroupSuccess', function () { closeOverlaypanel()});
socket.on('authGroupFailed', function () { alert("Fehler");});

