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
    socket.emit('createGroup', ({'user': localStorage.getItem("benutzername"),'name' : groupname,  'pw' : grouppassword }));
}

socket.on('createGroupSuccess', function () {

    var group = ({'name' : $("#groupcreate_nameinput").val(), 'member' : [localStorage.getItem("benutzername")]});
    appendGroupMenu(group);
    $("#groupcanvasmenu").menu( "refresh" );
    closeOverlaypanel()

});
socket.on('createGroupFailed', function () { alert("Fehler");});


