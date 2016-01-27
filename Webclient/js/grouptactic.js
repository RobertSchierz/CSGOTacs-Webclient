


function openGroupTactic(groupname){
    $("#overlaypanel_insidebox").append("<h3>"+groupname +"</h3>");
    $("#overlaypanel_insidebox").append("<div id='loadtactic_canvas' >fghrtgfsh </div>");

    $("#loadtactic_canvas").accordion({
        collapsible: true,
        heightStyle: "content"

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


/*
function leaveGroup(data){
    $("#" + data.group).hide(2000);
    user.deleteGroup(user.getGroups(), data.group);
}
    */