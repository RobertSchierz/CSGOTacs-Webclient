/**
 * Created by Robert on 20.01.2016.
 */
function alertMessage(text, color, option, source){
    if(option == "password"){
        $("body").append("<div id='alertmessage'><span class='alert_message'>"+text+"</span>" +
            "<input type='password' class='alert_passwordinput'" +
            "<div></div>" +
            "</div>");

        $("#alertmessage").fadeTo(1000,1);



    }else if(option == undefined){

        $("body").append("<div id='alertmessage' '><span class='alert_message'>"+text+"</span></div>");
        $("#alertmessage").css("color" , color);
        $("#alertmessage").fadeTo(1000,1, function(){
            window.setTimeout(hidealert,1000);
        });
    }



}

function hidealert(){
    $("#alertmessage").fadeTo(500,0, function(){
        $(this).remove();
    });
}