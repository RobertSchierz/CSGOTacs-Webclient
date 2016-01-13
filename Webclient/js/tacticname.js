/**
 * Created by Robert on 06.01.2016.
 */
function openTacticname(){

    $("#overlaypanel_insidebox").load(("./html/tacticname.html"),function(){
        $("#tacticname_submit").on( "click", function() {
                ActualSaveTactic("new");
                closeOverlaypanel();
        });
    });

}
