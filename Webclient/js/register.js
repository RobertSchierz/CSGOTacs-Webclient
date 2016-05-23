/**
 * Created by Robert Schierz on 04.01.2016.
 */

/**
 * Öffnet das Overlaypanel für die Registration eines Anwenders
 *
 *
 */
function openRegister(){

        $("#overlaypanel_insidebox").load("./html/register.html",function(){
            $("#register_usernameinput").focus();
            $("#register_submit").on( "click", function() {
                if(($("#register_usernameinput").val() != "" && $("#register_usernameinput").val() != null) && ($("#register_passwordinput").val() != "" &&  $("#register_passwordinput").val() != null )) {
                    sendRegisterData($("#register_usernameinput").val(), $("#register_passwordinput").val())
                }else{
                    alertMessage("Felder müssen befüllt sein", "red")
                }
            });
        });
}

/**
 * Sendet die Daten eines zu registrierenden Anwenders an den Server
 *
 * @param username = Benutzername, password = Passwort des Benutzers
 */
function sendRegisterData(username, password){
    socket.emit('reg',  JSON.stringify({'user': username, 'pw' : password }));
}







