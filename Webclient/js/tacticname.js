/**
 * Created by Robert on 06.01.2016.
 */
function openTacticname(){

    $("#overlaypanel_insidebox").load(("./html/tacticname.html"),function(){

        $("#tacticname_submit").on( "click", function() {
            var tactic = new Tactic();
            tactic.setX(clickX);
            tactic.setY(clickY);
            tactic.setUser(localStorage.getItem("benutzername"));
            tactic.setMaps($("#mapselector").find(".active").attr("id"));
            tactic.setTacticname($("#tacticname_tacticnameinput").val());
            tactic.setId((new Date()).getTime());
            console.log(tactic.getId() + " " + tactic.getUser() + " " +  tactic.getMap() + " " + tactic.getX() + " " + tactic.getY() + " " + tactic.getTacticname());
            sendLocaltactic(tactic.getId(), tactic.getUser(), tactic.getMap(), tactic.getX(), tactic.getY(), tactic.getTacticname());
            closeOverlaypanel();
        });
    });
}