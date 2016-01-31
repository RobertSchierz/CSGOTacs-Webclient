/**
 * Created by Robert on 03.01.2016.
 */
function authentification(username, password){
    socket.emit('auth', ({'user': username, 'pw' : password }));

}

function authSuccess(data) {

    localStorage.setItem("benutzername", data.user);
    checkLoggedIn(false);
    closeOverlaypanel();
}

function checkLoggedIn(logout){

    if(logout){
        localStorage.removeItem("benutzername")
        socket.emit('disconnect');
    }

    $('#usercanvas').empty();
    var storagevar = localStorage.getItem("benutzername");
    if(storagevar == null){
        $('#usercanvas').html("<span>Benutzername:</span> <input type='input' id='login_username'> <span>Passwort:</span> <input type='input' id='login_password'> <input type='button' id='login_submit' value='Login'> <span id='login_register'>Registrieren</span>");
        $( "#login_submit" ).on( "click", function() {
            authentification($("#login_username").val(),$("#login_password").val());
        });
        $( "#login_register" ).on( "click", function() {
            openOverlaypanel("register");

        });
        $("#tacticcanvas").hide();
        $("#groupcanvas").hide();
    }else{
        $('#usercanvas').html("Eingeloggt als <span style='color:blue; font-size: 25px;'> "+storagevar+" </span> <br/><input style='margin-top:20px;' value='Logout' type='button' id='login_logout'>");
        $( "#login_logout" ).on( "click", function() {
            checkLoggedIn(true);
        });
        $("#tacticcanvas").show();
        $("#groupcanvas").load("./html/groupcanvas.html",function(){

            socket.emit('getGroups', ({'user': storagevar}));

            $("#group_create").on( "click", function() {
                openOverlaypanel("groupcreate");
            });

            $("#group_login").on( "click", function() {
                openOverlaypanel("grouplogin");
            });
        });
        $("#groupcanvas").show();
        socket.emit('getMaps', ({'user': localStorage.getItem("benutzername") }));

    }
}

function getGroups(data){
        for(var i = 0; i < data.length; i++ ) {
            appendGroupMenu(data[i]);
        }

        //socket.emit('getMaps', ({'group' : data}));
       // $("#groupcanvasmenu").menu();


}

function appendGroupMenu(data){



        $("#groupcanvasmenu").append("<div id='" + data.name + "' class ='groupname'>" + data.name + " </div>");




    $("#" + data.name + ".groupname").on("click", function(){
        openOverlaypanel("grouptactic", $(this).attr("id"));

  });


}




