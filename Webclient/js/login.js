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
};

function checkLoggedIn(logout){

    if(logout){
        localStorage.removeItem("benutzername")
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
        $("#tacticinfocanvas").hide();
    }else{
        $('#usercanvas').html("Eingeloggt als <span style='color:blue; font-size: 25px;'> "+storagevar+" </span> <br/><input style='margin-top:20px;' value='Logout' type='button' id='login_logout'>");
        $( "#login_logout" ).on( "click", function() {
            checkLoggedIn(true);
        });
        $("#tacticinfocanvas").show();
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

        $("#tacticinfocanvas").load("./html/grouptacticcanvas.html", function(){

        });
    }
}

function getGroups(data){
        for(var i = 0; i < data.length; i++ ) {
            appendGroupMenu(data[i]);
        }

        //socket.emit('getMaps', ({'group' : data}));
        $("#groupcanvasmenu").menu();


}

function appendGroupMenu(data){
    var admin = false;

    if(data.admin == localStorage.getItem("benutzername")){
         admin = true;
    }

    $("#groupcanvasmenu").append("<li id='" + data.name + "' class ='groupname'>" + data.name + " <img id='groupdeletebutton_"+data.name + "' class='"+data.name+"'  src='images/icons/tacticload/exit.png'> </li>");
    $("#" + data.name).append("<ul id='member_"+data.name+"'></ul>");

    $("#" + data.name).on("click", function(){
       // socket.emit("getMaps", ({'group' : data.name}));
        openOverlaypanel("grouptactic");
    });

    for(var l = 0 ; l < data.member.length; l++){
        var memberclass = data.member[l] + "_"+ data.name;
        $("#member_" +data.name).append("<li><table><tr> <td class='admin "+data.name+"'></td><td class='mod "+memberclass+" '></td><td class='member "+memberclass+"'></td><td class='delete "+memberclass+"'></td> </tr></table></li>");

        if(data.member[l] == data.admin){

            $(".admin" + "." + data.name).append("<i class='material-icons'>star</i>");
        }
        $(".mod" + "." + memberclass).append("<i class='material-icons'>group</i>");


        $(".member" + "." + memberclass).append(""+data.member[l]+"");

        if(admin){
             $(".delete" + "." + memberclass).append(" <i id='memberdeletebutton_"+data.name + "' class='"+data.member[l]+" material-icons'>delete</i>");
        }

        $("#memberdeletebutton_" + data.name + "." + data.member[l]).on( "click", function() {
            alert("test");
        });
    }

    $("#groupdeletebutton_"+data.name).on("click", function(){
        socket.emit('leaveGroup', ({'user': localStorage.getItem("benutzername"), 'name' : $(this).attr("class") }));
    });

}

function leaveGroup(data){
    $("#" + data.group).hide(2000);
    user.deleteGroup(user.getGroups(), data.group);
    }


