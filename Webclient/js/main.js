/**
 * Created by Robert on 23.12.2015.
 */






var openheader = false;
var maketactic = false;
var imagearray = new Array();

$(document).ready(function () {




    $("#callout_visibility").on("click", function(){
       if($(this).attr("data-option") == "on"){
            $("#callout").fadeOut(700, function(){
                $("#callout_visibility").html("visibility_off");
                $("#callout_visibility").attr("data-option", "off")
            });

       }else if($(this).attr("data-option") == "off"){
           $("#callout").fadeIn(700, function(){
               $("#callout_visibility").html("visibility");
               $("#callout_visibility").attr("data-option", "on")
           });

       }

    });

    checkLoggedIn(false);
    loadAllImagesMapselector();
    setListenerToElements();



});

function handleMapselectorStates(map, loadmap) {

    if ($(map).hasClass("passive")) {
        setAllChildsClass("passive", "active");
        $(map).removeClass("passive").addClass("active");
    }
    setCanvasImage($(map).attr('id'), loadmap);


}


function closeHeader() {
    $("#absolute_header").animate({
        top: "-170"
    }, 100, function () {
        openheader = false;
        $("#header_arrow").attr('src', "images/icons/header/arrowdown.png");
    });
}
function openHeader() {
    $("#absolute_header").animate({
        top: "0"
    }, 100, function () {
        openheader = true;
        $("#header_arrow").attr('src', "images/icons/header/arrowup.png");
        $("#login_username").focus();

    });
}
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

function handleMapselectorScroll(source) {

    var leftPos = $('#mapselector').scrollLeft();

    if (source == "mapselector_arrowleft") {
        $("#mapselector").animate({scrollLeft: leftPos - $("#mapselector").width()}, 500);
    }
    else if (source == "mapselector_arrowright") {
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

function handleTacticButtons(option) {
   if(option){
       maketactic=true;
       $("#maketacticbutton").html("Taktik Verwerfen <i class='material-icons headericons'>delete</i>");
       $("#savetacticbutton").removeClass("disabled");
       $("#savetacticbutton").addClass("active");
   }else if(!option){
       maketactic=false;
       $("#maketacticbutton").html("Taktik Erstellen <i class='material-icons headericons'>gesture</i>");
       $("#savetacticbutton").removeClass("active");
       $("#savetacticbutton").addClass("disabled");
   }

}

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


function setCanvasImage(id, loadtactic) {

    for(var mapobject in imagearray){
        if(imagearray[mapobject].mapname == id){

            $("#callout").attr('src', imagearray[mapobject].callout);
            $("#map").attr('src', imagearray[mapobject].map);
            $("#maketacticthumb").attr('src', imagearray[mapobject].url);
            maketactic = true;
            handleTacticEvents(loadtactic);
        }
    }

}



function loadAllImagesMapselector() {
    $.ajax({


        url: "./jsons/mapselections.json",

        dataType: 'json',

        success: function (data) {

            for (i = 0; i < data.images.length; i++) {
                imagearray.push(data.images[i]);


                // Mache das erste Objekt aktiv
                if (i == 0) {
                    $("#mapselector").append("<img id='" + data.images[i].name + "' src='" + data.images[i].url + "' class='mapselection active'><div data-name='"+data.images[i].name+"' class='selectorimageoverlay'> "+data.images[i].name+"</div>");
                    setCanvasImage(data.images[i].mapname, false);
                    maketactic = false;
                    handleTacticEvents(false);
                } else {
                    $("#mapselector").append("<img id='" + data.images[i].name + "' src='" + data.images[i].url + "' class='mapselection passive'> <div data-name='"+data.images[i].name+"' class='selectorimageoverlay'> "+data.images[i].name+"</div>");
                }

                $('#'+data.images[i].name).on("click", function () {
                    handleMapselectorStates(this, false);
                });

                $('#'+data.images[i].name).hover( function () {
                   $("[data-name =" +$(this).attr("id")+ "]").slideDown(200);
                },function(){

                    $("[data-name =" +$(this).attr("id")+ "]").delay(1000).slideUp(200);
                });






            }
        },

        error: function () {

            alertMessage("Fehler beim Zugriff auf das Image JSON aufgetreten", "red");

        }

    });
}

