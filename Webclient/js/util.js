/**
 * Created by Robert Schierz on 06.01.2016.
 */
var popup_zustand = false;
var requestgroup = null;
var refreshmember = false;

/**
 * Öffnet die verschiedenen Overlaypanels
 *
 *@param source = Option die bestimmt, welches Overlaypanel geöffnet wird, groupname = Gruppenname für Gruppenoverlaypanel
 *
 */
function openOverlaypanel(source, groupname) {

    closeHeader();

    if (popup_zustand == false) {

        if (source == "register") {
            openRegister();
            overlaypanel_header("Registrieren");
        }

        if (source == "tacticname") {

            openTacticname();
            overlaypanel_header("Taktik Speichern");
        }

        if (source == "loadtactics") {
            getMaps(user.getTactics());
            console.log(user.getTactics());
            overlaypanel_header("Taktik Laden");
        }

        if (source == "groupcreate") {
            creategroup();
            overlaypanel_header("Gruppe Erstellen");
        }

        if (source == "grouplogin") {
            logingroup();
            overlaypanel_header("Gruppe Beitreten");
        }

        if (source == "grouptactic") {
            refreshmember = true;
            socket.emit('getGroups',  JSON.stringify({'user': localStorage.getItem("benutzername")}));
            requestgroup = groupname;
            socket.emit("getTacs",  JSON.stringify({'group': groupname}));


        }


        $(".opacitybox").css("opacity", "0.4");
        $(".opacitybox").fadeIn("5000");
        $(".overlaypanel").fadeIn("1000");


        popup_zustand = true;
        return false;
    }
}

/**
 * Schließt das jeweilige Overlaypanel
 *
 */
function closeOverlaypanel() {
    var requerstsource = null;
    if (popup_zustand == true) {
        refreshmember = null;

        $(".overlaypanel").fadeOut("2000");

        $(".opacitybox").fadeOut("2000", function () {
            $("#overlaypanel_insidebox").empty();
            $("#overlaypanel_header").contents(':not(#overlaypanel_close)').remove();
        });

        popup_zustand = false;

    }
}

/**
 * Setzt den Headertext der Overlaypanels
 *
 *  @param headertext = Text der in den Header geschrieben wird
 *
 */
function overlaypanel_header(headertext) {
    $("#overlaypanel_header").append("<h3 id='overlaypanel_headertext'>" + headertext + "</h3>");
}

/**
 * Funktion zum Speichern einer Taktik
 *
 * @param option = Option des Speichervorgangs
 *
 */
function actualSaveTactic(option) {
    var canvaswidth = $("#imgpanel").width();
    var canvasheight = $("#imgpanel").height();

    var generatedid = (new Date()).getTime();

    if (option == "group") {

          sendTactic(generatedid, localStorage.getItem("benutzername"), $("#mapselector").find(".active").attr("id"), coordinateDrag,  tactic.normalizeKoordinates(coordinateX,canvaswidth),tactic.normalizeKoordinates(coordinateY,canvasheight) , $("#grouptacticname_tacticnameinput").val(), $("#grouptacticname_groups option:selected").text());

    }
    if (option == "new") {

          sendTactic(generatedid, localStorage.getItem("benutzername"), $("#mapselector").find(".active").attr("id"), coordinateDrag,tactic.normalizeKoordinates(coordinateX,canvaswidth) , tactic.normalizeKoordinates(coordinateY,canvasheight), $("#tacticname_tacticnameinput").val(), null);


    } else if (option == "loaded") {
        socket.emit('changeTac',  JSON.stringify({'id': tactic.getId(), 'drag': tactic.getDrag().concat(coordinateDrag), 'x': tactic.getX().concat( tactic.normalizeKoordinates(coordinateX,canvaswidth)), 'y': tactic.getY().concat( tactic.normalizeKoordinates(coordinateY, canvasheight))}));
    }

}

/**
 * Bindet ein Tooltip Element an ein HTML Element
 *
 * @param element = HTML Element auf das ein Tooltip angebunden werden soll, text = Der Text der in dem Tooltip stehen soll
 */
function setTooltipToElement(element, text) {


    $(element).attr('title', text).tooltip({
        tooltipClass: "tooltip",
        position: {
            my: "center bottom-20",
            at: "center top",
            using: function (position, feedback) {
                $(this).css(position);
                $("<div>")
                    .addClass("arrow")
                    .appendTo(this);
            }
        }
    });

}

/**
 * Ändert den Namen des HTML ELements, das den Namen einer Taktik anzeigt
 * @param id = Id des Elements, newvalue = Neue Name der Taktik, option = Prüfvariable ob es eine Gruppentaktik ist, target = Zielelement das geändert wird, changevalueelement = Id des Zielelements
 *
 */
function changeNameOfTactic(id, newvalue, option, target, changevalueelement) {

    user.changeTacticName(id, newvalue, option);
    $(".changename_textfield").remove();
    $(target).show();
    $(changevalueelement).html(newvalue);
}

/**
 * Ändert den Namen des HTML ELements, das den Namen einer Taktik anzeigt
 * @param id = Id des Elements, newvalue = Neue Name der Taktik, option = Prüfvariable ob es eine Gruppentaktik ist, target = Zielelement das geändert wird, changevalueelement = Id des Zielelements
 *
 */
function setChangeName(target, dest, id) {

    $(target).hide();
    $(dest).append("<textarea class='changename_textfield' maxlength='20'></textarea>");

    $(".changename_textfield").on("focusout", function () {
        var newvalue = $('.changename_textfield').val();
        if (newvalue != "") {
            socket.emit("changeTacName",  JSON.stringify({ 'id': id, 'name': newvalue }));
        }


    });
}

/**
 * Prüft ob ein Wert in einem Array vorkommt
 * @param array = Das zu testende Array, value = Der Wert nach dem gesucht werden soll
 * @return tempindexarray = Das array mit dem gesuchten Wert
 */
function isInArray(array, value) {
    if (array.length != 0) {


        var tempindexarray = new Array();
        for (var element in array) {
            //noinspection JSUnfilteredForInLoop
            if (array[element] == value) {
                tempindexarray.push(element);
            }
        }

        return tempindexarray;
    } else {
        return new Array();
    }
}

/**
 * Prüft auf die Anwenderinteraktion mittels Entertaste
 * @param source = Aus welcher Funktion es aufgerufen wird
 *
 */
function pressEnter(source){


    $(document).bind("keypress.key13", function(event) {


            if (event.which == 13) {

                        if ($('.overlaypanel').css('display') == 'none') {
                            if(($("#login_username").val() != "" && $("#login_username").val() != null) && ($("#login_password").val() != "" &&  $("#login_password").val() != null )) {
                                authentification($("#login_username").val(), $("#login_password").val());
                            }else{
                                alertMessage("Felder müssen befüllt sein", "red")
                            }


                        }


                        if ($('.overlaypanel').css('display') == 'block') {
                            if(($("#register_usernameinput").val() != "" && $("#register_usernameinput").val() != null) && ($("#register_passwordinput").val() != "" &&  $("#register_passwordinput").val() != null )) {
                                sendRegisterData($("#register_usernameinput").val(), $("#register_passwordinput").val())
                            }else{
                                alertMessage("Felder müssen befüllt sein", "red")
                            }

                        }
            }



    });


}
