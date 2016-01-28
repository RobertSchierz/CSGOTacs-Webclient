


function openGroupTactic(groupname){
    var grouptacticsarray = user.getGrouptacticsByName(groupname);
    var groupobject = user.getGroupByName(groupname);

    overlaypanel_header("Gruppe: " + groupname);
    if($("#groupdelete").length == 0){
        $("#overlaypanel_header").append("<i class='material-icons' id='groupdelete'>exit_to_app</i>")
        $("#groupdelete").on("click", function(){
            socket.emit('leaveGroup', ({'user': localStorage.getItem("benutzername"), 'name' : groupobject.name }));
        })

    }




    $("#overlaypanel_insidebox").append("<div id='groupusercontroll'>User in Gruppe: <select id='groupusercontroll_usercombobox'></select> </div> <div id='loadtactic_canvas' ></div>");

    for(var groupmember in groupobject.member){


            if(groupobject.member[groupmember] == groupobject.admin){

                $("#groupusercontroll_usercombobox").append("<option> Admin: "+groupobject.member[groupmember]+"</option>");
            }else{
                $("#groupusercontroll_usercombobox").append("<option>"+groupobject.member[groupmember]+"</option>");
            }
    }

    if(grouptacticsarray.length != 0){
        for(var grouptactic in grouptacticsarray){
            $("#loadtactic_canvas").append("<h3>"+grouptacticsarray[grouptactic].name+"</h3> <div></div>");
        }
        $("#loadtactic_canvas").accordion({
            collapsible: true,
            heightStyle: "content"

        });
    }else{
        $("#loadtactic_canvas").append("<p>Keine Taktiken vorhanden</p> ");
    }




}


/*
 for(var l = 0 ; l < data.member.length; l++){
 var memberclass = data.member[l] + "_"+ data.name;
 $("#member_" +data.name).append("<li><table><tr> <td class='admin "+data.name+"'></td><td class='mod "+memberclass+" '></td><td class='member "+memberclass+"'></td><td class='delete "+memberclass+"'></td> </tr></table></li>");

 if(data.member[l] == data.admin){

 $(".admin" + "." + data.name).append("<i class='material-icons'>star</i>");
 }
 $(".mod" + "." + memberclass).append("<i class='material-icons'>group</i>");


 $(".member" + "." + memberclass).append(""+data.member[l]+"");

 if(admin){
 $(".delete" + "." + memberclass).append(" <i id='memberdeletebutton_"+data.name + "' class='"+data.member[l]+" material-icons'>delete</i>");
 }

 $("#memberdeletebutton_" + data.name + "." + data.member[l]).on( "click", function() {
    alert("test");
 });
 }

 $("#groupdeletebutton_"+data.name).on("click", function(){
 socket.emit('leaveGroup', ({'user': localStorage.getItem("benutzername"), 'name' : $(this).attr("class") }));
 });
 */



function leaveGroup(data){
    $("#" + data.group).hide(2000);
    user.deleteGroup(user.getGroups(), data.group);
    closeOverlaypanel();
}
