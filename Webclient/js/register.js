/**
 * Created by Robert on 04.01.2016.
 */
var popup_zustand = false;

function openRegister(){
    if(popup_zustand == false) {
        $("#register_panel").fadeIn("normal");
        $(".opacitybox").css("opacity", "0.4");
        $(".opacitybox").fadeIn("normal");
        popup_zustand = true;
    }

    return false;
}


function closeRegister(){
    if(popup_zustand == true) {

        $("#register_panel").fadeOut("normal");
        $(".opacitybox").fadeOut("normal");
        popup_zustand = false;
    }}

function sendRegisterData(username, password){
    socket.emit('reg', ({'user': username, 'pw' : password }));
}

socket.on('regSuccess', function () { });
socket.on('regFailed', function () { });

$( document ).ready(function() {

    $( "#register_submit" ).on( "click", function() {
        sendRegisterData($("#register_usernameinput").val(),$("#register_passwordinput").val() )
    });


});





