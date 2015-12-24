/**
 * Created by Robert on 23.12.2015.
 */
$( document ).ready(function() {
    var openheader = false;



    loadAllImagesMapselector();


    $( "#tacticcanvas" ).on( "click", function() {

        return false;

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


function setAllChildsClass(setclass, removeclass){
    $('#mapselector').children().each(function (){
       if($(this).hasClass(removeclass)){
           $(this).removeClass(removeclass);
           $(this).addClass(setclass);
       }
    } )
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