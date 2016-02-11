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

function draw(on) {

    var context = document.getElementById('imgpanel').getContext("2d");

    var contextid = '#' + context.canvas.id;

    if (on) {
        setListenerToCanvas(context, contextid);
    } else if (!on) {

        deleteCanvas(context);
    }


}


function setListenerToCanvas(context, contextid) {
    $(contextid).mousedown(function (e) {
        paint = true;

        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);
        redraw(context);
    });

    $(contextid).mousemove(function (e) {
        if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw(context);
        }
    });

    $(contextid).mouseup(function (e) {
        paint = false;
    });

    $(contextid).mouseleave(function (e) {
        paint = false;
    });
}


function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);


}

function redraw(context) {

    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 8;

    for (var i = 0; i < clickX.length; i++) {

        context.beginPath();
        if (clickDrag[i] /*&& i*/) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {

            context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);


        context.closePath();
        context.stroke();
    }
}

function deleteCanvas(context) {
    $("#imgpanel").off();
    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();
    this.tactic = new Tactic();
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

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
}

function actualDraw(x, y, drag) {

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
