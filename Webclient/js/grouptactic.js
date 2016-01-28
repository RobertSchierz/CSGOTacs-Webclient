


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

    $("#overlaypanel_insidebox").append("<div id='grouptacticcanvas'></div> <div id='groupmembercanvas'></div>");
    $("#groupmembercanvas").append("<h3 class='tableheader'>Benutzer:</h3><table id='groupmember_table'></table>");
    for(var groupmember in groupobject.member){
        var membername = groupobject.member[groupmember];
        $("#groupmember_table").append("<tr> <td id='grouptable_admin_"+membername+"'> </td> <td id='grouptable_name_"+membername+"'></td> <td id='grouptable_option_"+membername+"'></td>  </tr>");

        if(groupobject.member[groupmember] == groupobject.admin) {
            $("#grouptable_admin_" + membername).append("<i class='material-icons'>star</i>");
        }
            $("#grouptable_name_" + membername).append(""+groupobject.member[groupmember]+"");
            $("#grouptable_option_" + membername).append("<i id='grouptable_option' class='material-icons group_option'>keyboard_arrow_down</i>");


    }

    if(grouptacticsarray.length != 0){
        $("#grouptacticcanvas").append("<h3 class='tableheader'>Taktiken:</h3><table id='grouptactic_table'></table>");
        for(var grouptactic in grouptacticsarray){

            loadTacticImage(grouptacticsarray[grouptactic]);

            var tacticname = grouptacticsarray[grouptactic].name;
            $("#grouptactic_table").append("<tr> <td id='grouptacticimage_"+tacticname+"' ></td> <td id='grouptactic_"+tacticname+"'>  </td> <td id='grouptactictable_option_"+tacticname+"'></td>  </tr>");
            $("#grouptactic_"+tacticname).append(""+tacticname+"");
            $("#grouptactictable_option_"+tacticname).append("<i id='grouptactictable_option' class='material-icons group_option'>keyboard_arrow_down</i>");
        }
        }else{
        $("#grouptacticcanvas").append("<h3 class='tableheader'>Keine Taktiken vorhanden</h3>");
    }


/*
    $("#overlaypanel_insidebox").append("<div id='groupusercontroll'>User in Gruppe: <select id='groupusercontroll_usercombobox'></select> </div> <div id='loadtactic_canvas' ></div>");




        $("#loadtactic_canvas").accordion({
            collapsible: true,
            heightStyle: "content"

        });
    }else{
        $("#loadtactic_canvas").append("<p>Keine Taktiken vorhanden</p> ");
    }
*/



}

function loadTacticImage(currenttactic){
    $.ajax({
        url : "./jsons/mapselections.json",
        dataType : 'json',
        success : function (data) {
            for (i = 0; i < data.images.length; i++) {
                if(data.images[i].name == currenttactic.map){
                  $("#grouptacticimage_"+currenttactic.name).append("<img class='grouptable_images' src='" + data.images[i].url + "' >");
                }
                    //$("#mapselector").append("<img id='" + data.images[i].name + "' src='" + data.images[i].url + "' class='mapselection passive'>");
            }
        },
        error : function () {
           alertMessage("Fehler beim Zugriff auf Taktikbilder", "red");
        }

    });
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
