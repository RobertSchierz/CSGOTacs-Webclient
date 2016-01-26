/**
 * Created by Robert on 06.01.2016.
 */
var popup_zustand = false;

function openOverlaypanel(source) {


    if (popup_zustand == false) {

        if(source == "register"){
            openRegister();
        }

        if(source == "tacticname"){
            $(".overlaypanel").css({"height": "300px"});
           // $(".overlaypanel_close").css({"left" : "525px"});
                openTacticname();
        }

        if(source == "loadtactics"){
            $(".overlaypanel").css({"width": "550px", "height": "550px", "margin-left" : "-250px"});
            $(".overlaypanel_close").css({"left" : "525px"});
            getMaps(user.getTactics());
            console.log(user.getTactics());
        }

        if(source == "groupcreate"){
            creategroup();
        }

        if(source == "grouplogin"){
            logingroup();
        }

        if(source == "grouptactic"){
            console.log(user.getTactics());
        }

        $(".overlaypanel").fadeIn("normal");
        $(".opacitybox").css("opacity", "0.4");
        $(".opacitybox").fadeIn("normal");


        popup_zustand = true;


        return false;
    }
}

function closeOverlaypanel(){
    if(popup_zustand == true) {

        $("#overlaypanel_insidebox").empty();
        $(".overlaypanel").fadeOut("normal");
        $(".opacitybox").fadeOut("normal", function(){
            $(".overlaypanel").css({"width": "250px", "height": "190px", "margin-left" : "-125px", "margin-top" : "-500px" });
            $(".overlaypanel_close").css({"left" : "225px"});
        });

        popup_zustand = false;

    }
}

function ActualSaveTactic(option){

    if(option == "group"){
        tactic.setX(clickX);
        tactic.setY(clickY);
        tactic.setUser(localStorage.getItem("benutzername"));
        tactic.setMaps($("#mapselector").find(".active").attr("id"));
        tactic.setTacticname($("#grouptacticname_tacticnameinput").val());
        tactic.setDrag(clickDrag);
        tactic.setId((new Date()).getTime());
        tactic.setGroup($("#grouptacticname_groups option:selected" ).text());
        user.addGrouptactic(({'group' : tactic.getGroup(), 'x': tactic.getX(), 'y': tactic.getY(), 'user': tactic.getUser(), 'name' : tactic.getTacticname(), 'map' : tactic.getMap(), 'id' : tactic.getId(), 'drag' : tactic.getDrag() }));
        console.log(tactic);
        sendLocaltactic(tactic.getId(), tactic.getUser(), tactic.getMap(), tactic.getDrag(), tactic.getX(), tactic.getY(), tactic.getTacticname(), tactic.getGroup());
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



