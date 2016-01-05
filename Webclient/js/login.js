/**
 * Created by Robert on 03.01.2016.
 */
function authentification(username, password){
    socket.emit('auth', ({'user': username, 'pw' : password }));

}

socket.on('authFailed', function (data) {

$("#login_errormessage").show(1000, function(){
    $("#login_errormessage").hide(5000);
});
});

socket.on('authSuccess', function (data) {

    localStorage.setItem("benutzername", data.user);
    checkLoggedIn(false);
});

function checkLoggedIn(logout){

    if(logout){
        localStorage.removeItem("benutzername")
    }

    $('#usercanvas').empty();
    var storagevar = localStorage.getItem("benutzername");
    if(storagevar == null){
        $('#usercanvas').html("<span>Benutzername:</span> <input type='input' id='login_username'> <span>Passwort:</span> <input type='input' id='login_password'> <input type='button' id='login_submit' value='Login'> <span id='login_register'>Registrieren</span> <div id='login_errormessage'>Datenfehler!</div>");
        $( "#login_submit" ).on( "click", function() {
            authentification($("#login_username").val(),$("#login_password").val());
        });
        $( "#login_register" ).on( "click", function() {
            openRegister();

        });
        $("#tacticcanvas").hide();
    }else{
        $('#usercanvas').html("Eingeloggt als <span style='color:blue; font-size: 25px;'> "+storagevar+" </span> <br/><input style='margin-top:20px;' value='Logout' type='button' id='login_logout'>");
        $( "#login_logout" ).on( "click", function() {
            checkLoggedIn(true);
        });
        $("#tacticcanvas").show();
    }
}