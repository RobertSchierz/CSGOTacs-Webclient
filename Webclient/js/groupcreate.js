/**
 * Created by Robert on 15.01.2016.
 */
function creategroup(){
    $("#overlaypanel_insidebox").load(("./html/groupcreate.html"),function(){
        $("#groupcreate_submit").on( "click", function() {
            if(($("#groupcreate_nameinput").val() != "" && $("#groupcreate_nameinput").val() != null) && ($("#groupcreate_passwordinput").val() != "" &&  $("#groupcreate_passwordinput").val() != null )){
                sendGroupCreate($("#groupcreate_nameinput").val(), $("#groupcreate_passwordinput").val() );
            }else{
                alertMessage("Felder müssen befüllt sein!", "red")
            }

        });
    });
}

function sendGroupCreate(groupname, grouppassword){
    socket.emit('createGroup',  JSON.stringify({'user': localStorage.getItem("benutzername"),'name' : groupname,  'pw' : grouppassword }));
}

function createGroup(data) {
    var group = ({'name': $("#groupcreate_nameinput").val(), 'member': [localStorage.getItem("benutzername")], 'admin': localStorage.getItem("benutzername")});
    user.addGroup(group);

    appendGroupMenu(group);
    closeOverlaypanel()

}




