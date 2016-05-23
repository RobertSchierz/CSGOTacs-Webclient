/**
 * Created by Robert Schierz on 03.01.2016.
 */

/**
 * Sendet die Informationen an den Server die benötigt werden um einen Anwender systemseitig einzuloggen
 *
 * @param username = Benutzername, password = Passwort des Benutzers
 */
function authentification(username, password) {
    socket.emit('auth',  JSON.stringify({'user': username, 'pw': password }));

}

/**
 * Versetzt die Webseite in den Modus, den der Anwender sieht wenn dieser eingeloggt ist
 *
 * @param data = Rückgabewert vom Server
 */
function authSuccess(data) {

    localStorage.setItem("benutzername", data.user);
    checkLoggedIn(false);
    closeOverlaypanel();
}

/**
 * Handling der Bedienelemente, sobald überprüft werden muss ob der Anwender eingeloggt ist oder nicht
 *
 * @param logout = Boolescher Wert, welcher das eingeloggt sein bestimmt
 */
function checkLoggedIn(logout) {

    if (logout) {
        localStorage.removeItem("benutzername");
        socket.emit('disconnect');
        deleteCanvas();

    }

    $('#usercanvas').empty();
    var storagevar = localStorage.getItem("benutzername");
    if (storagevar == null) {
        $('#usercanvas').html("<span  class='userloginelement'>Benutzername:</span> " +
            "<input type='input' id='login_username' class='form-control userloginelement' maxlength='20'> " +
            "<span  style = 'margin-top:10px;' class='userloginelement' >Passwort:</span> " +
            "<input type='password' id='login_password' class='form-control userloginelement' maxlength='20'> " +
            "<input type='button' id='login_submit' value='Login' class='userloginelement'> " +
            "<span id='login_register' class='userloginelement'>Registrieren</span>");

        $("#login_submit").on("click", function () {
            if(($("#login_username").val() != "" && $("#login_username").val() != null) && ($("#login_password").val() != "" &&  $("#login_password").val() != null )) {
                authentification($("#login_username").val(), $("#login_password").val());
            }else{
                alertMessage("Felder müssen befüllt sein", "red")
            }
        });



        $("#login_register").on("click", function () {
            openOverlaypanel("register");

        });

        $(".tacticelement").hide();
        $("#groupcanvas").hide();

    } else {


        $('#usercanvas').html("" +
            "<div id='userinnercanvas' class='col-xl-12 col-l-12 col-xs-12'>" +
            "<span id='login_usernametext'> " + storagevar + " </span>" +
            "<i class='material-icons headericons'  id='login_logout'>exit_to_app</i></div>");

        $("#userinnercanvas").on("click", function () {
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

            socket.emit('getGroups',  JSON.stringify({'user': storagevar}));
            socket.emit('getTacs',  JSON.stringify({'user': localStorage.getItem("benutzername") }));
        });
        $("#groupcanvas").show();
        handleTacticButtons(false);
        draw(false);


    }
}

/**
 * Zeigt die beigetretenen Gruppen des Anwenders im Gruppenpanel an
 *
 * @param data = Rückgabewert vom Server
 */
function getGroups(data) {
    $(document).ready(function () {
        $("#groupcanvasmenu").empty();
        for (var i = 0; i < data.length; i++) {
            appendGroupMenu(data[i]);
        }
    });
}

/**
 * Fügt die Gruppen im Gruppenpanel an
 *
 * @param data = Rückgabewert vom Server
 */
function appendGroupMenu(data) {

    $("#groupcanvasmenu").append("<span id='" + data.name + "' class ='groupname'>" + data.name + " </span>");


    $("#" + data.name + ".groupname").on("click", function () {
        openOverlaypanel("grouptactic", $(this).attr("id"));

    });


}




