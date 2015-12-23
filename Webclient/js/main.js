/**
 * Created by Robert on 23.12.2015.
 */
$( document ).ready(function() {
    var openheader = false;



    loadAllImagesMapselector();

    $( "#header" ).on( "click", function() {
        if(openheader == false){
            $( "#header" ).animate({
                height: "100"
            }, 1000, function() {
                openheader = true;
            });
        }else if(openheader == true){
            $( "#header" ).animate({
                height: "30"
            }, 1000, function() {
                openheader = false;
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

                //Erstellt neue HTML Elemente
                $("#mapselector").append("<img id='"+ data.images[i].name+"' src='"+ data.images[i].url+"' class='mapselection passive'>");
            }
        },

        error : function () {

            alert("Fehler beim Zugriff auf das Image JSON aufgetreten");

        }

    });

}