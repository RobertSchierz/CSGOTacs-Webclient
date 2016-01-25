/**
 * Created by Robert on 20.01.2016.
 */
function alertMessage(text, color){
    $("body").append("<div id='alertmessage' '>"+text+"</div>");

    $(alertmessage).css("color" , color);
    $("#alertmessage").fadeTo(1000,1, function(){
        window.setTimeout(hidealert,1000);
    });


}

function hidealert(){
    $("#alertmessage").fadeTo(1000,0, function(){
        $(this).remove();
    });
}