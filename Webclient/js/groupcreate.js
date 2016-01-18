/**
 * Created by Robert on 15.01.2016.
 */
function creategroup(){
    $("#overlaypanel_insidebox").load(("./html/groupcreate.html"),function(){
        $("#groupcreate_submit").on( "click", function() {
            sendGroupCreate($("#groupcreate_nameinput").val(), $("#groupcreate_passwordinput").val() );
        });
    });
}

function sendGroupCreate(groupname, grouppassword){
    socket.emit('createGroup', ({'user': localStorage.getItem("Benutzername"),'name' : groupname,  'pw' : grouppassword }));
}

socket.on('createGroupSuccess', function () { closeOverlaypanel()});
socket.on('createGroupFailed', function () { alert("Fehler");});


