/**
 * Created by Robert Schierz on 23.12.2015.
 */






var openheader = false;
var maketactic = false;
var imagearray = new Array();

/**
 * Handling der Callouts
 *
 *
 */
function calloutVisibility() {
    if ($("#callout_visibility").attr("data-option") == "on") {
        $("#callout").fadeOut(700, function () {
            $("#callout_visibility").html("visibility_off");
            $("#callout_visibility").attr("data-option", "off")
        });

    } else if ($("#callout_visibility").attr("data-option") == "off") {
        $("#callout").fadeIn(700, function () {
            $("#callout_visibility").html("visibility");
            $("#callout_visibility").attr("data-option", "on")
        });

    }
}
$(document).ready(function () {


    $("#callout_visibility").on("click", function () {
        calloutVisibility();
    });

    checkLoggedIn(false);
    loadAllImagesMapselector();
    setListenerToElements();


});

/**
 * Handling der Kartenauswahl
 *
 * @param map = Id des zu ladenen Vorschbilds der Karte, loadmap = Boolescher wert ob es sich beim Ausführen um das Laden einer Karte handelt.
 */
function handleMapselectorStates(map, loadmap) {

    if ($(map).hasClass("passive")) {
        setAllChildsClass("passive", "active");
        $(map).removeClass("passive").addClass("active");
    }
    setCanvasImage($(map).attr('id'), loadmap);


}

/**
 * Schließt den Header Bereich der Webseite
 *
 *
 */
function closeHeader() {
    $("#absolute_header").animate({
        top: "-170"
    }, 100, function () {
        openheader = false;
        $("#header_arrow").attr('src', "images/icons/header/arrowdown.png");
    });
}

/**
 * Öffnet den Header Bereich der Webseite
 *
 *
 */
function openHeader() {
    $("#absolute_header").animate({
        top: "0"
    }, 100, function () {
        openheader = true;
        $("#header_arrow").attr('src', "images/icons/header/arrowup.png");
        $("#login_username").focus();

    });
}

/**
 * Bindet die Eventlistener an die Bedienelemente im Header Bereich
 *
 *
 */
function setListenerToElements() {
    pressEnter();


    $("#tacticcanvas").on("click", function () {
        return false;
    });

    $("#usercanvas").on("click", function () {
        return false;
    });

    $("#groupcanvas").on("click", function () {
        return false;
    });

    $("#maketacticbutton").on("click", function () {
        handleTacticEvents(false);
    });


    $("#overlaypanel_close").on("click", function () {
        closeOverlaypanel();

    });


    $("#header").on("click", function () {
        if (openheader == false) {
            openHeader();
        } else if (openheader == true) {
            closeHeader();
        }
    });

    $("#savetacticbutton").on("click", function () {
        if ($(this).hasClass("disabled")) {
            return false;
        }

        if (tactic.getId() != undefined) {
            actualSaveTactic("loaded");
        } else {
            saveTactic();
        }
    });

    $("#loadtacticbutton").on("click", function () {
        loadTactics();
    });

    $("#mapselector_arrowleft").on("click", function () {
        handleMapselectorScroll($(this).attr("id"));


    });

    $("#mapselector_arrowright").on("click", function () {
        handleMapselectorScroll($(this).attr("id"));
    })


}

/**
 * Handling der Scrollpfeile im Kartenvorschaubereich
 *
 * @param source = Id des geklickten Pfeils
 */
function handleMapselectorScroll(source) {

    var leftPos = $('#mapselector').scrollLeft();

    if (source == "mapselector_arrowleft") {
        $("#mapselector").animate({scrollLeft: leftPos - $("#mapselector").width()}, 500);
    }
    else if (source == "mapselector_arrowright") {
        $("#mapselector").animate({scrollLeft: leftPos + $("#mapselector").width()}, 500);
    }
}

/**
 * Durchläuft alle Elemente des Kartenvorschaubereichs und setzt deren Attribute "class" auf einen bestimmten Wert
 *
 * @param setclass = Die zu setzende Klasse, removeclass = Die Klasse die entfernt werden soll
 */
function setAllChildsClass(setclass, removeclass) {
    $('#mapselector').children().each(function () {
        if ($(this).hasClass(removeclass)) {
            $(this).removeClass(removeclass);
            $(this).addClass(setclass);
        }
    })
}

/**
 * Handling des Taktikbuttons, ob Taktik erstellt oder gespeichert werden soll
 *
 * @param option = Wert der den Zustand des Taktikbuttons bestimmt
 */
function handleTacticButtons(option) {
    if (option) {
        maketactic = true;
        $("#maketacticbutton").html("Taktik Verwerfen <i class='material-icons headericons'>delete</i>");
        $("#savetacticbutton").removeClass("disabled");
        $("#savetacticbutton").addClass("active");
    } else if (!option) {
        maketactic = false;
        $("#maketacticbutton").html("Taktik Erstellen <i class='material-icons headericons'>gesture</i>");
        $("#savetacticbutton").removeClass("active");
        $("#savetacticbutton").addClass("disabled");
    }

}

/**
 * Handling des Zustandes der Bedienelemente im Header Bereich
 *
 * @param loadtactic = Prüfwert ob Taktik geladen wurde
 */
function handleTacticEvents(loadtactics) {
    if (loadtactics) {
        maketactic = false;
    }

    if (!maketactic) {
        maketactic = true;
        draw(maketactic);
        handleTacticButtons(true);
    } else if (maketactic) {
        maketactic = false;
        draw(maketactic);
        handleTacticButtons(false);

    }


}

/**
 * Setzt das Kartenbild der anzuzeigenden Karte auf einen bestimmten Wert
 *
 * @param id = Name der Karte, loadtactic = Prüfwert ob Taktik geladen wurde
 */
function setCanvasImage(id, loadtactic) {

    for (var mapobject in imagearray) {
        if (imagearray[mapobject].mapname == id) {

            $("#callout").attr('src', imagearray[mapobject].callout);
            $("#map").attr('src', imagearray[mapobject].map);
            $("#maketacticthumb").attr('src', imagearray[mapobject].url);
            maketactic = true;
            handleTacticEvents(loadtactic);
        }
    }

}


/**
 * Lädt die Kartenvorschaubilder in den Kartenvorschaubilderbereich mittels des JSON mapselection
 *
 *
 */
function loadAllImagesMapselector() {
    $.ajax({


        url: "./jsons/mapselections.json",

        dataType: 'json',

        success: function (data) {

            for (i = 0; i < data.images.length; i++) {
                imagearray.push(data.images[i]);


                if (i == 0) {
                    $("#mapselector").append("<img id='" + data.images[i].name + "' src='" + data.images[i].url + "' class='mapselection active'><div data-name='" + data.images[i].name + "' class='selectorimageoverlay'> " + data.images[i].name + "</div>");
                    setCanvasImage(data.images[i].mapname, false);
                    maketactic = true;
                    handleTacticEvents(false);
                } else {
                    $("#mapselector").append("<img id='" + data.images[i].name + "' src='" + data.images[i].url + "' class='mapselection passive'> <div data-name='" + data.images[i].name + "' class='selectorimageoverlay'> " + data.images[i].name + "</div>");
                }

                $('#' + data.images[i].name).on("click", function () {
                    handleMapselectorStates(this, false);
                });

                $('#' + data.images[i].name).hover(function () {
                    $("[data-name =" + $(this).attr("id") + "]").slideDown(200);
                }, function () {

                    $("[data-name =" + $(this).attr("id") + "]").delay(1000).slideUp(200);
                });


            }
        },

        error: function () {

            alertMessage("Fehler beim Zugriff auf das Image JSON aufgetreten", "red");

        }

    });
}

