/**
 * Created by Robert on 04.01.2016.
 */
var popup_zustand = false;

function openRegister(){
    if(popup_zustand == false) {
        $("#register_panel").fadeIn("normal");
        $("#register_opacitybox").css("opacity", "0.4");
        $("#register_opacitybox").fadeIn("normal");
        popup_zustand = true;
    }

    return false;
}


function closeRegister(){
    if(popup_zustand == true) {

        $("#register_panel").fadeOut("normal");
        $("#register_opacitybox").fadeOut("normal");
        popup_zustand = false;
    }}




