/**
 * Created by Robert on 23.12.2015.
 */




var socket = io('https://p4dme.shaula.uberspace.de/');

var openheader = false;
var maketactic = false;

$(document).ready(function () {


    checkLoggedIn(false);
    loadAllImagesMapselector();
    setListenerToElements();


    $(document).ajaxComplete(function () {
        $('#mapselector img').on("click", function () {
            handleMapselectorStates(this, false);
        });
    });


});

function handleMapselectorStates(map, loadmap) {

    if ($(map).hasClass("passive")) {
        setAllChildsClass("passive", "active");
        $(map).removeClass("passive").addClass("active");
    }
    loadMap($(map).attr('id'), loadmap);


}


function closeHeader() {
    $("#absolute_header").animate({
        top: "-170"
    }, 1000, function () {
        openheader = false;
        $("#header_arrow").attr('src', "images/icons/header/arrowdown.png");
    });
}
function openHeader() {
    $("#absolute_header").animate({
        top: "0"
    }, 1000, function () {
        openheader = true;
        $("#header_arrow").attr('src', "images/icons/header/arrowup.png");

    });
}
function setListenerToElements() {

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
        if (tactic.getId() != undefined) {
            ActualSaveTactic("loaded");
        } else {
            saveTactic();
        }
    });

    $("#loadtacticbutton").on("click", function () {
        loadTactics();
    });

    $("#mapselector_arrowleft").on("click", function(){
        handleMapselectorScroll($(this).attr("id"));


    })

    $("#mapselector_arrowright").on("click", function(){
        handleMapselectorScroll($(this).attr("id"));
    })


}

function handleMapselectorScroll(source){

    var leftPos = $('#mapselector').scrollLeft();

    if(source == "mapselector_arrowleft"){
        $("#mapselector").animate({scrollLeft: leftPos - $("#mapselector").width()}, 500);
    }
    else if(source == "mapselector_arrowright"){
        $("#mapselector").animate({scrollLeft: leftPos + $("#mapselector").width()}, 500);
    }
}

function setAllChildsClass(setclass, removeclass) {
    $('#mapselector').children().each(function () {
        if ($(this).hasClass(removeclass)) {
            $(this).removeClass(removeclass);
            $(this).addClass(setclass);
        }
    })
}

function handleTacticEvents(loadtactics) {
    if (loadtactics) {
        maketactic = false;
    }

    if (!maketactic) {
        maketactic = true;
        draw(maketactic);
        $("#maketacticbutton").attr('value', 'Taktik Verwerfen');
        $("#savetacticbutton").removeClass("disabled");
        $("#savetacticbutton").removeAttr("disabled");
        $("#savetacticbutton").addClass("active");

    } else if (maketactic) {
        maketactic = false;
        draw(maketactic);
        $("#maketacticbutton").attr('value', 'Taktik Erstellen');
        $("#savetacticbutton").removeClass("active");
        $("#savetacticbutton").attr("disabled", "true");
        $("#savetacticbutton").addClass("disabled");

    }


}


function loadMap(id, loadtactic) {
    $.ajax({

        url: "./jsons/mapselections.json",
        dataType: 'json',

        success: function (data) {
            for (i = 0; i < data.images.length; i++) {

                if (data.images[i].mapname == id) {

                    //Erstellt neue HTML Elemente
                    $("#map").attr('src', data.images[i].map);
                    $("#maketacticthumb").attr('src', data.images[i].url);
                    maketactic = true;
                    handleTacticEvents(loadtactic);


                }
            }
        },

        error: function () {

            alert("Fehler beim Zugriff auf das Image JSON aufgetreten");

        }

    });
}


function loadAllImagesMapselector() {
    $.ajax({

        url: "./jsons/mapselections.json",

        dataType: 'json',

        success: function (data) {

            for (i = 0; i < data.images.length; i++) {


                // Mache das erste Objekt aktiv
                if (i == 0) {
                    $("#mapselector").append("<img id='" + data.images[i].name + "' src='" + data.images[i].url + "' class='mapselection active'>");
                    loadMap(data.images[i].name, false);
                    maketactic = false;
                    handleTacticEvents(false);
                } else {
                    $("#mapselector").append("<img id='" + data.images[i].name + "' src='" + data.images[i].url + "' class='mapselection passive'>");
                }

            }
        },

        error: function () {

            alert("Fehler beim Zugriff auf das Image JSON aufgetreten");

        }

    });
}

