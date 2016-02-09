/**
 * Created by Robert on 03.01.2016.
 */
function authentification(username, password) {
    socket.emit('auth', ({'user': username, 'pw': password }));

}

function authSuccess(data) {

    localStorage.setItem("benutzername", data.user);
    checkLoggedIn(false);
    closeOverlaypanel();
}

function checkLoggedIn(logout) {

    if (logout) {
        localStorage.removeItem("benutzername")
        socket.emit('disconnect');
    }

    $('#usercanvas').empty();
    var storagevar = localStorage.getItem("benutzername");
    if (storagevar == null) {
        $('#usercanvas').html("<span  class='userloginelement'>Benutzername:</span> " +
            "<input type='input' id='login_username' class='form-control userloginelement'> " +
            "<span  style = 'margin-top:10px;' class='userloginelement' >Passwort:</span> " +
            "<input type='password' id='login_password' class='form-control userloginelement'> " +
            "<input type='button' id='login_submit' value='Login' class='userloginelement'> " +
            "<span id='login_register' class='userloginelement'>Registrieren</span>");

        $("#login_submit").on("click", function () {
            authentification($("#login_username").val(), $("#login_password").val());
        });
        $("#login_register").on("click", function () {
            openOverlaypanel("register");

        });
        $(".tacticelement").hide();
        $("#groupcanvas").hide();
    } else {

        $('#usercanvas').html("<span id='loggedintext'>Eingeloggt als</span> <span id='login_usernametext'> " + storagevar + " </span><input  value='Logout' type='button' id='login_logout'>");
        $("#login_logout").on("click", function () {
            checkLoggedIn(true);

        });
        $(".tacticelement").show();
        $("#groupcanvas").load("./html/groupcanvas.html", function () {


            $("#group_create").on("click", function () {
                openOverlaypanel("groupcreate");
            });

            $("#group_login").on("click", function () {
                openOverlaypanel("grouplogin");
            });

            socket.emit('getGroups', ({'user': storagevar}));
            socket.emit('getMaps', ({'user': localStorage.getItem("benutzername") }));
        });
        $("#groupcanvas").show();


    }
}

function getGroups(data) {
    $(document).ready(function () {
        $("#groupcanvasmenu").empty();
        for (var i = 0; i < data.length; i++) {
            appendGroupMenu(data[i]);
        }


    });

}

function appendGroupMenu(data) {

    $("#groupcanvasmenu").append("<span id='" + data.name + "' class ='groupname'>" + data.name + " </span>");


    $("#" + data.name + ".groupname").on("click", function () {
        openOverlaypanel("grouptactic", $(this).attr("id"));

    });


}




