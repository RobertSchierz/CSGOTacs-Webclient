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
            openTacticname();
        }

        if(source == "loadtactics"){
            $(".overlaypanel").css({"width": "550px", "height": "550px", "margin-left" : "-250px"});
            $(".overlaypanel_close").css({"left" : "525px"});
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