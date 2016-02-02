/**
 * Created by Robert on 06.01.2016.
 */
var popup_zustand = false;
var requestgroup = null;
var refreshmember = false;

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
            refreshmember = true;
            socket.emit('getGroups', ({'user': localStorage.getItem("benutzername")}));
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
    var generatedid = (new Date()).getTime();

    if(option == "group"){
        tactic.setX(clickX);
        tactic.setY(clickY);
        tactic.setUser(localStorage.getItem("benutzername"));
        tactic.setMaps($("#mapselector").find(".active").attr("id"));
        tactic.setTacticname($("#grouptacticname_tacticnameinput").val());
        tactic.setDrag(clickDrag);
        tactic.setId(generatedid);
        user.addGrouptactic(({'group' : $("#grouptacticname_groups option:selected" ).text(), 'x': tactic.getX(), 'y': tactic.getY(), 'user': tactic.getUser(), 'name' : tactic.getTacticname(), 'map' : tactic.getMap(), 'id' : tactic.getId(), 'drag' : tactic.getDrag() }));
        sendLocaltactic(tactic.getId(), tactic.getUser(), tactic.getMap(), tactic.getDrag(), tactic.getX(), tactic.getY(), tactic.getTacticname(), $("#grouptacticname_groups option:selected" ).text());
    }

    if(option == "new"){
        tactic.setX(clickX);
        tactic.setY(clickY);
        tactic.setUser(localStorage.getItem("benutzername"));
        tactic.setMaps($("#mapselector").find(".active").attr("id"));
        tactic.setTacticname($("#tacticname_tacticnameinput").val());
        tactic.setDrag(clickDrag);
        tactic.setId(generatedid);
        user.addTactic(({'x': tactic.getX(), 'y': tactic.getY(), 'user': tactic.getUser(), 'name' : tactic.getTacticname(), 'map' : tactic.getMap(), 'id' : tactic.getId(), 'drag' : tactic.getDrag() }));
        sendLocaltactic(tactic.getId(), tactic.getUser(), tactic.getMap(), tactic.getDrag(), tactic.getX(), tactic.getY(), tactic.getTacticname(), null);
    }else if(option == "loaded"){
        tactic.setDrag(tactic.getDrag().concat(clickDrag));
        tactic.setX(tactic.getX().concat(clickX));
        tactic.setY(tactic.getY().concat(clickY));
        user.changeTacticData(tactic);
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

function setTooltipToElement(element, text){



    $(element).attr('title', text).tooltip({
        tooltipClass: "tooltip",
        position: {
            my: "center bottom-20",
            at: "center top",
            using: function( position, feedback ) {
                $( this ).css( position );
                $( "<div>" )
                    .addClass( "arrow" )
                    .appendTo( this );
            }
        }
    });

}

function setChangeName(target, dest, id, changevalueelement, option){
    console.log(dest);
    $(target).hide();
    $(dest).append("<textarea class='changename_textfield'></textarea>");

    $(".changename_textfield").on("focusout", function () {
        var newvalue = $('.changename_textfield').val();

        socket.emit("changeMapName", ({ 'id' : id, 'name' : newvalue }));
        user.changeTacticName(id, newvalue, option);

        $(".changename_textfield").remove();
        $(target).show();
        $(changevalueelement).html(newvalue);

    });
}

function isInArray(array, value){
    if(array.length != 0){


    var tempindexarray = new Array();
    for(var element in array){
        if(array[element] == value){
            tempindexarray.push(element);
        }
    }

    return tempindexarray;
    }else{
        return new Array();
    }
}
