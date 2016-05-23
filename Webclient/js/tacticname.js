/**
 * Created by Robert Schierz on 06.01.2016.
 */

/**
 * Öffnet das Overlaypanel zum Speichern einer Taktik
 *
 *
 */
function openTacticname(){

    $("#overlaypanel_insidebox").load(("./html/tacticname.html"),function(){

        $( "#tacticname_tabmenu" ).tabs();
        if(user.getGroups().length == 0){
            $( "#tacticname_tabmenu" ).tabs( "option", "disabled", [ 1 ] );
        }else{
            $( "#tacticname_tabmenu" ).tabs( "option", "active", [ 1 ] );
        }


        for(var names = 0; names < user.groupNamesArray().length; names++) {
            $("#grouptacticname_groups").append("<option>" + user.groupNamesArray()[names] + "</option>");
        }
        $("#grouptacticname_submit").on( "click", function() {

            if(($("#grouptacticname_tacticnameinput").val() != "" && $("#grouptacticname_tacticnameinput").val() != null)){
                actualSaveTactic("group");
                closeOverlaypanel();
            }else{
                alertMessage("Der Taktikname ist nicht eingetragen!", "red")
            }

        });

        $("#tacticname_submit").on( "click", function() {

            if(($("#tacticname_tacticnameinput").val() != "" && $("#tacticname_tacticnameinput").val() != null)){
                actualSaveTactic("new");
                closeOverlaypanel();
            }else{
                alertMessage("Der Taktikname ist nicht eingetragen!", "red")
            }
        });


    });

}
