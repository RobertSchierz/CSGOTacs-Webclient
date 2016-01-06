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
        $(".opacitybox").fadeOut("normal");
        popup_zustand = false;

    }
}