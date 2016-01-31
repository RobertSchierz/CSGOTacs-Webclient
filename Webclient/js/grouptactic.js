


function openGroupTactic(groupname){

    var groupobject = user.getGroupByName(groupname);

    overlaypanel_header("Gruppe: " + groupname);
    if($("#groupdelete").length == 0){
        $("#overlaypanel_header").append("<i class='material-icons' id='groupdelete'>exit_to_app</i>")
        $("#groupdelete").on("click", function(){
            socket.emit('leaveGroup', ({'user': localStorage.getItem("benutzername"), 'name' : groupobject.name }));
        })

    }

        var grouptacticsarray = user.getGrouptacticsByName(groupname);

    $("#overlaypanel_insidebox").append("<div id='grouptacticcanvas'></div> <div id='groupmembercanvas'></div>");
    $("#groupmembercanvas").append("<h3 class='tableheader'>Benutzer:</h3><div class='tablewrapper'><table id='groupmember_table'></table></div>");
    for(var groupmember in groupobject.member){
        var membername = groupobject.member[groupmember];
        $("#groupmember_table").append("<tr> <td id='grouptable_admin_"+membername+"'> </td> <td id='grouptable_name_"+membername+"'></td> <td id='groupmembertableoptiontd_"+membername+"'></td>  </tr>");

        if(groupobject.member[groupmember] == groupobject.admin) {
            $("#grouptable_admin_" + membername).append("<i class='material-icons'>star</i>");
        }
            $("#grouptable_name_" + membername).append(""+groupobject.member[groupmember]+"");
            $("#groupmembertableoptiontd_" + membername).append("<i id='groupmembertableoption_"+membername+"' class='material-icons groupmember_option'>keyboard_arrow_down</i>");

            $("#groupmembertableoption_" + membername).on("click", function(){
                optionPanel(splittId($(this).attr("id")), "member");
            });

    }

    if(grouptacticsarray.length != 0){
        $("#grouptacticcanvas").append("<h3 class='tableheader'>Taktiken:</h3><div class='tablewrapper'><table id='grouptactic_table'></table></div>");
        for(var grouptactic in grouptacticsarray){

            loadTacticImage(grouptacticsarray[grouptactic]);

            var tacticid = grouptacticsarray[grouptactic].id;
            $("#grouptactic_table").append("<tr id='tactic_"+tacticid+"'> <td id='grouptacticimage_"+tacticid+"' class='canvastd' ></td> <td id='grouptactic_"+tacticid+"' class='canvastd'>  </td> <td id='grouptactictableoptiontd_"+tacticid+"' class='canvastd'></td>  </tr>");
            $("#grouptactic_"+tacticid).append(""+grouptacticsarray[grouptactic].name+"");
            $("#grouptactictableoptiontd_"+tacticid).append("<i id='grouptactictableoption_"+tacticid+"' class='material-icons grouptactic_option'>keyboard_arrow_down</i>");

            $("#grouptactictableoption_" + tacticid).on("click", function(){
                optionPanel(splittId($(this).attr("id")), "tactic");
            });
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

 var admin = false;

 if(data.admin == localStorage.getItem("benutzername")){
 admin = true;
 }
*/



}

$(document).click(function(e){
    if( $(e.target).closest(".optionpanel").length == 0 && $(e.target).closest(".grouptactic_option").length == 0 && $(e.target).closest(".groupmember_option").length == 0 ) {
       if($(".optionpanel").length != 0){
           $(".optionpanel").hide(500);
           $(".optionpanel").remove();
       }
    }
});

function optionPanel(id, source){
    var request;
    optionPanelDelete(id);
    if(source == "tactic"){
        request = "grouptactictableoptiontd_";
    }else if(source == "member"){
        request = "groupmembertableoptiontd_";
    }


    if($("#optionpanel_"+id).length == 0){
        if(source == "tactic"){
            //console.log(user.getGrouptacticByID(id));
            $("#" + request+ id).append("<div class='optionpanel' id='optionpanel_"+id+"'>" +
                "<table><tr><td class='tdoptionpanel'><i id='tacticloadbutton_"+id+"' class='material-icons'>gesture</i></td>" +
                "<td class='tdoptionpanel'><i id='tacticdeletebutton_"+id+ "' class='material-icons'>delete</i></td></tr></table>" +
                "</div>");

            $("#tacticdeletebutton_"+id).on("click", function(){
                socket.emit('deleteMap', ({'id' : id}));
                $("#tactic_" + id).hide(2000);
            });

            $("#tacticloadbutton_"+id).on("click", function(){
                closeOverlaypanel();
                deleteCanvas(document.getElementById('imgpanel').getContext("2d"));
                var tactic = setArrayData(user.getGrouptacticByID(splittId($(this).attr("id"))));
                drawSavedMap(tactic);
                handleMapselectorStates("#" + tactic.getMap(), true);
            })

            setTooltipToElement("#tacticloadbutton_"+id, "Taktik Laden");
            setTooltipToElement("#tacticdeletebutton_"+id, "Taktik Löschen");



        }else if(source == "member"){
            $("#" + request+ id).append("<div class='optionpanel' id='optionpanel_"+id+"'>AMK2</div>");
        }

        $("#optionpanel_" + id).show(500);
    }else{
        $("#optionpanel_"+id).hide(500);
        $("#optionpanel_"+id).remove();

    }
}

function optionPanelDelete(id){
    $('div').each(function(index){
        if($(this).attr('class') == "optionpanel" && $(this).attr('id') != "optionpanel_"+id){
            $(this).hide(500);
            $(this).remove();
        }
    });
}

function loadTacticImage(currenttactic){
    $.ajax({
        url : "./jsons/mapselections.json",
        dataType : 'json',
        success : function (data) {
            for (i = 0; i < data.images.length; i++) {
                if(data.images[i].name == currenttactic.map){
                  $("#grouptacticimage_"+currenttactic.id).append("<div class='grouptable_images' style='background-image:url(" + data.images[i].url + ")' ></div>");
                }
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
 $(".delete" + "." + memberclass).append(" ");
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
    $("#" + data.group).hide(2000, function(){
        user.deleteGroup(user.getGroups(), data.group);
        $("#" + data.group).remove();
        closeOverlaypanel();
    });

}
