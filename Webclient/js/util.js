/**
 * Created by Robert on 06.01.2016.
 */
var popup_zustand = false;
var requestgroup = null;

function openOverlaypanel(source, groupname) {


    if (popup_zustand == false) {

        if(source == "register"){
            openRegister();
            overlaypanel_header("Registrieren");
        }

        if(source == "tacticname"){
           // $(".overlaypanel").css({"height": "300px"});
           // $(".overlaypanel_close").css({"left" : "525px"});
                openTacticname();
            overlaypanel_header("Taktik Speichern");
        }

        if(source == "loadtactics"){
           /* $(".overlaypanel").css({"width": "550px", "height": "550px", "margin-left" : "-250px"});
            $(".overlaypanel_close").css({"left" : "525px"});*/
            getMaps(user.getTactics());
            console.log(user.getTactics());
            overlaypanel_header("Taktik Laden");
        }

        if(source == "groupcreate"){
            creategroup();
            overlaypanel_header("Gruppe Erstellen");
        }

        if(source == "grouplogin"){
            logingroup();
            overlaypanel_header("Gruppe Beitreten");
        }

        if(source == "grouptactic"){
            requestgroup = groupname;
            socket.emit("getMaps", ({'group' : groupname}));


        }

        $(".overlaypanel").fadeIn("normal");
        $(".opacitybox").css("opacity", "0.4");
        $(".opacitybox").fadeIn("normal");


        popup_zustand = true;


        return false;
    }
}

function closeOverlaypanel(){
    requerstsource = null;
    if(popup_zustand == true) {


        $(".overlaypanel").fadeOut("normal");

        $(".opacitybox").fadeOut("normal", function(){
            $("#overlaypanel_insidebox").empty();

            if($("#overlaypanel_headertext").length){
                $("#overlaypanel_headertext").remove();
            }

            if($("#groupdelete").length){
                $("#groupdelete").remove();
            }

        });

        popup_zustand = false;

    }
}

function overlaypanel_header(headertext){
        $("#overlaypanel_header").append("<h3 id='overlaypanel_headertext'>"+headertext+"</h3>");
}

function ActualSaveTactic(option){
    var canvas = document.getElementById("imgpanel");
    var img    = canvas.toDataURL("./testimages");


    if(option == "group"){
        tactic.setX(clickX);
        tactic.setY(clickY);
        tactic.setUser(localStorage.getItem("benutzername"));
        tactic.setMaps($("#mapselector").find(".active").attr("id"));
        tactic.setTacticname($("#grouptacticname_tacticnameinput").val());
        tactic.setDrag(clickDrag);
        tactic.setId((new Date()).getTime());
        user.addGrouptactic(({'group' : $("#grouptacticname_groups option:selected" ).text(), 'x': tactic.getX(), 'y': tactic.getY(), 'user': tactic.getUser(), 'name' : tactic.getTacticname(), 'map' : tactic.getMap(), 'id' : tactic.getId(), 'drag' : tactic.getDrag() }));
        console.log(tactic);
        sendLocaltactic(tactic.getId(), tactic.getUser(), tactic.getMap(), tactic.getDrag(), tactic.getX(), tactic.getY(), tactic.getTacticname(), $("#grouptacticname_groups option:selected" ).text());
    }

    if(option == "new"){
        tactic.setX(clickX);
        tactic.setY(clickY);
        tactic.setUser(localStorage.getItem("benutzername"));
        tactic.setMaps($("#mapselector").find(".active").attr("id"));
        tactic.setTacticname($("#tacticname_tacticnameinput").val());
        tactic.setDrag(clickDrag);
        tactic.setId((new Date()).getTime());
        user.addTactic(({'x': tactic.getX(), 'y': tactic.getY(), 'user': tactic.getUser(), 'name' : tactic.getTacticname(), 'map' : tactic.getMap(), 'id' : tactic.getId(), 'drag' : tactic.getDrag() }));

        sendLocaltactic(tactic.getId(), tactic.getUser(), tactic.getMap(), tactic.getDrag(), tactic.getX(), tactic.getY(), tactic.getTacticname(), null);
    }else if(option == "loaded"){
        tactic.setDrag(tactic.getDrag().concat(clickDrag));
        tactic.setX(tactic.getX().concat(clickX));
        tactic.setY(tactic.getY().concat(clickY));
        user.changeTacticData(tactic);
        //console.log(tactic.getId() + " " + tactic.getDrag() + " " + tactic.getX().length +" " + tactic.getY().length);
        socket.emit('changeMap', ({'id' : tactic.getId(), 'drag' : tactic.getDrag(),  'x' : tactic.getX(), 'y' : tactic.getY()}));
    }

}


function ActualDeleteTactic(id){
    socket.emit('deleteMap', ({'id' : id}));
    user.deleteTacticName(id);
    $("#tactic_" + id).hide(2000, function(){

    });

}

function splittId(id){
    var splittedid = id.split("_");
    return splittedid[1];
}



