/**
 * Created by Robert on 26.12.2015.
 */

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;




$(document).ready(function () {
//getData(document.getElementById('imgpanel').getContext("2d"));



});

function draw(on, optionlive) {


    var context = document.getElementById('imgpanel').getContext("2d");

    var contextid = '#' + context.canvas.id;

    if (on) {
        setListenerToCanvas(context, contextid, optionlive);
    } else if (!on) {

        deleteCanvas();
    }


}


function setListenerToCanvas(context, contextid, optionlive) {
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 8;

    $(contextid).mousedown(function (e) {
        closeHeader();
        paint = true;
        context.beginPath();

        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false, context, optionlive);
    });

    $(contextid).mousemove(function (e) {
        if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true, context, optionlive);
        }
    });

    $(contextid).mouseup(function (e) {
        paint = false;
    });

    $(contextid).mouseleave(function (e) {
        paint = false;
    });
}


function addClick(x, y, dragging, context, optionlive) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    redraw(context, optionlive, x, y, dragging);


}

function redraw(context, optionlive, x, y, dragging) {

    if(optionlive != null){
       // socket.emit("broadcastGroupLive",({'room' : optionlive, 'user' : localStorage.getItem("benutzername"), 'x' : clickX)})  );
    }


    context.beginPath();
    if(dragging){

        context.moveTo(clickX[clickX.length-2],clickY[clickY.length-2]);
        context.lineTo(x,y);

    }else if(!dragging){
        context.moveTo(x,y);
        context.lineTo(x,y);
    }

    context.closePath();
    context.stroke();



/*
    for (var i = 0; i < clickX.length; i++) {

        context.beginPath();
        if (clickDrag[i]) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {

            context.moveTo(clickX[i] - 1, clickY[i] - 1);
        }
        context.lineTo(clickX[i], clickY[i]);


        context.closePath();
        context.stroke();
    }*/
}

function deleteCanvas(context) {
    var context = document.getElementById('imgpanel').getContext("2d");
    $("#imgpanel").off();
    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();
    this.tactic = new Tactic();
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

/*
function getData(context) {
    socket.on('json', function (msg) {

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
}*/

function actualDraw(x, y, drag) {
    var canvaswidth = $("#imgpanel").width();
    var canvasheight = $("#imgpanel").height();

    var x =  tactic.unnormalizeKoordinates(x,canvaswidth);
    var y = tactic.unnormalizeKoordinates(y, canvasheight);

    var context = document.getElementById('imgpanel').getContext("2d");
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 8;

    for (var i = 0; i < x.length; i++) {

        context.beginPath();
        if (drag[i] /*&& i*/) {
            context.moveTo(x[i - 1], y[i - 1]);
        } else {

            context.moveTo(x[i] - 1, y[i]);
        }
        context.lineTo(x[i], y[i]);


        context.closePath();
        context.stroke();
    }
}

function drawSavedMap(tactic) {
    actualDraw(tactic.x, tactic.y, tactic.drag);
}

function saveTactic() {
    openOverlaypanel("tacticname");
}

function loadTactics() {
    openOverlaypanel("loadtactics");
}
