/**
 * Created by Robert on 23.12.2015.
 */


var tactic = new Tactic();

var socket = io('https://p4dme.shaula.uberspace.de/');

/*
 function sendData(x, y){
 socket.emit('json', ({'X': x, 'Y' : y }));
 }

 */

var openheader = false;
var maketactic = false;

$( document ).ready(function() {



    loadAllImagesMapselector();
    setListenerToElements();


    $(document).ajaxComplete(function () {
        $( '#mapselector img' ).on( "click", function() {
            if($( this ).hasClass("passive")){
                setAllChildsClass("passive","active");
                $(this).removeClass("passive").addClass("active");
                loadMap($(this).attr('id'));
            }

        });
    });




});



function setListenerToElements(){

    $( "#tacticcanvas" ).on( "click", function() {
        return false;
    });

    $("#maketacticbutton").on("click", function(){
        handleTacticEvents();

    });



    $( "#header" ).on( "click", function() {
        if(openheader == false){
            $( "#header" ).animate({
                top: "0"
            }, 1000, function() {
                openheader = true;
                $( "#header_arrow").attr('src',"images/icons/arrowup.png");

            });

        }else if(openheader == true){
            $( "#header" ).animate({
                top: "-170"
            }, 1000, function() {
                openheader = false;
                $( "#header_arrow").attr('src',"images/icons/arrowdown.png");
            });
        }
    });

    $("#savetacticbutton").on("click", function(){
        saveTactic();
    });
}

function setAllChildsClass(setclass, removeclass){
    $('#mapselector').children().each(function (){
       if($(this).hasClass(removeclass)){
           $(this).removeClass(removeclass);
           $(this).addClass(setclass);
       }
    } )
}

function handleTacticEvents(){

        if(!maketactic){
            maketactic = true;
            draw(maketactic);
            $("#maketacticbutton").attr('value', 'Taktik Löschen');
            $("#maketacticbutton").height('30px');
            $("#savetacticbutton").show();
        }else if(maketactic){
            maketactic = false;
            draw(maketactic);
            $("#maketacticbutton").attr('value', 'Taktik Erstellen');
            $("#maketacticbutton").height('60px');
            $("#savetacticbutton").hide();

        }


}


function loadMap(id){
    $.ajax({

        url : "./jsons/mapselections.json",
        dataType : 'json',

        success : function (data) {
            for (i = 0; i < data.images.length; i++) {

                if(data.images[i].mapname == id){

                    //Erstellt neue HTML Elemente
                    $("#map").attr('src', data.images[i].map);
                    $("#maketacticthumb").attr('src', data.images[i].url);
                    tactic.setMap(data.images[i].name);
                    handleTacticEvents();



                }
                }
        },

        error : function () {

            alert("Fehler beim Zugriff auf das Image JSON aufgetreten");

        }

    });
}


function loadAllImagesMapselector(){
    $.ajax({

        url : "./jsons/mapselections.json",

        dataType : 'json',

        success : function (data) {

            for (i = 0; i < data.images.length; i++) {


                // Mache das erste Objekt aktiv
                if(i == 0){
                    $("#mapselector").append("<img id='"+ data.images[i].name+"' src='"+ data.images[i].url+"' class='mapselection active'>");
                    loadMap(data.images[i].name);
                    maketactic = false;
                    handleTacticEvents();

                }else {
                    $("#mapselector").append("<img id='" + data.images[i].name + "' src='" + data.images[i].url + "' class='mapselection passive'>");
                }

            }
        },

        error : function () {

            alert("Fehler beim Zugriff auf das Image JSON aufgetreten");

        }

    });
}