/**
 * Created by Robert on 26.12.2015.
 */

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

$( document ).ready(function() {
//getData(document.getElementById('imgpanel').getContext("2d"));

});

function draw(on){

    var context = document.getElementById('imgpanel').getContext("2d");
    var contextid = '#' + context.canvas.id;

    if(on){
        setListenerToCanvas(context, contextid);
    }else if(!on){
        $("#imgpanel").off();
        deleteCanvas(context);
    }



}

function setListenerToCanvas(context, contextid){
    $(contextid).mousedown(function(e){
        paint = true;

        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw(context);
    });

    $(contextid).mousemove(function(e){
        if(paint){
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw(context);
        }
    });

    $(contextid).mouseup(function(e){
        paint = false;
    });

    $(contextid).mouseleave(function(e){
        paint = false;
    });
}


function addClick(x, y, dragging)
{
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    //sendData(x, y);

}

function redraw(context){

    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 8;

    for(var i=0; i < clickX.length; i++) {

        context.beginPath();
        if(clickDrag[i] /*&& i*/){
            context.moveTo(clickX[i-1], clickY[i-1]);
        }else{

            context.moveTo(clickX[i]-1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);


        context.closePath();
        context.stroke();
    }
}

function deleteCanvas(context){
    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function getData(context){
    socket.on('json', function(msg){

        context.strokeStyle = "#df4b26";
        context.lineJoin = "round";
        context.lineWidth = 8;

        context.beginPath();

            context.moveTo(msg.X, msg.Y);


          //  context.moveTo(msg.X-1, msg.Y);

        context.lineTo(msg.X, msg.Y);


        context.closePath();
        context.stroke();
    });
}

function saveTactic(){
    openOverlaypanel("tacticname");
}
