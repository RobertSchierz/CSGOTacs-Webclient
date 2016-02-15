/**
 * Created by Robert on 06.01.2016.
 */
function openTacticname(){

    $("#overlaypanel_insidebox").load(("./html/tacticname.html"),function(){

        $( "#tacticname_tabmenu" ).tabs();
        console.log(user.getGroups());
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
                ActualSaveTactic("group");
                closeOverlaypanel();
            }else{
                alertMessage("Der Taktikname ist nicht eingetragen!", "red")
            }

        });

        $("#tacticname_submit").on( "click", function() {

            if(($("#tacticname_tacticnameinput").val() != "" && $("#tacticname_tacticnameinput").val() != null)){
                ActualSaveTactic("new");
                closeOverlaypanel();
            }else{
                alertMessage("Der Taktikname ist nicht eingetragen!", "red")
            }
        });


    });

}
