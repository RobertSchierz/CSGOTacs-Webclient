/**
 * Created by Robert on 04.01.2016.
 */


function openRegister(){

        $("#overlaypanel_insidebox").load("./html/register.html",function(){
            $("#register_usernameinput").focus();
            $("#register_submit").on( "click", function() {
                sendRegisterData($("#register_usernameinput").val(),$("#register_passwordinput").val() )
            });
        });
}

function sendRegisterData(username, password){
    socket.emit('reg',  JSON.stringify({'user': username, 'pw' : password }));
}







