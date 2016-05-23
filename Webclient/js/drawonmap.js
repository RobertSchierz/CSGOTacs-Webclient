/**
 * Created by Robert Schierz on 26.12.2015.
 */

var coordinateX = new Array();
var coordinateY = new Array();
var coordinateDrag = new Array();
var paint;


/**
 * handling des Zeichnen auf dem Canvas
 *
 * @param on = Boolescher Wert ob zeichnen oder nicht, optionlive = wenn der Livemodus aktiviert wird
 *
 *
 */
function draw(on, optionlive) {


    var context = document.getElementById('imgpanel').getContext("2d");

    var contextid = '#' + context.canvas.id;

    if (on) {
        setListenerToCanvas(context, contextid, optionlive);
    } else if (!on) {

        deleteCanvas();
    }


}

/**
 * Bindet die verschiedenen Eventhandler an das Canvas
 *#
 * @param context = Kontext des Canvas, centextid = ID des Context, optionlive = Information aus dem Livemodus
 *
 *
 */
function setListenerToCanvas(context, contextid, optionlive) {


    $(contextid).mousedown(function (e) {
        if(optionlive != null){
            $("[data-brush ="+localStorage.getItem("benutzername") +"]").show();
            $(".livebrush").not("[data-brush =" + localStorage.getItem("benutzername") + "]").hide();
        }

        closeHeader();
        paint = true;
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

/**
 * Bildet eine Anwenderinteraktion in den Arrays ab
 *
 * @param x = x Koordinate des Klicks, y = y Koordinate des Klicks, drag = Dragwert des Klicks, context = Context des Canvas, optionlive = Information aus dem Livemodus
 *
 *
 */
function addClick(x, y, dragging, context, optionlive) {
    coordinateX.push(x);
    coordinateY.push(y);
    coordinateDrag.push(dragging);
    redraw(context, optionlive);
}

/**
 * Zeichnet die Anwenderinteraktion auf das Canvas
 *
 * @param context = Context des Canvas, optionlive = Information aus dem Livemodus
 *
 *
 */
function redraw(context, optionlive) {

    context.strokeStyle = "#FB8C00";
    context.lineJoin = "round";
    context.lineWidth = 4;
    var x = coordinateX[coordinateX.length-1];
    var y = coordinateY[coordinateY.length-1];
    var dragging  = coordinateDrag[coordinateDrag.length-1];


    if(optionlive != null){

        var startx = (coordinateX[coordinateX.length -2] / $("#imgpanel").width());
        var starty = (coordinateY[coordinateY.length -2] / $("#imgpanel").height());

        if(isNaN(startx) || isNaN(starty)){
            startx = x / $("#imgpanel").width();
            starty = y / $("#imgpanel").height();
        }

        socket.emit("broadcastGroupLive",  JSON.stringify(({
            'status' : 'liveContent',
            'room' : optionlive,
            'user' : localStorage.getItem("benutzername"),
            'startX': startx,
            'startY': starty,
            'x' : (x / $("#imgpanel").width()),
            'y' : (y / $("#imgpanel").height()),
            'drag' : dragging}))  );


    }


    context.beginPath();
    if(dragging){

        context.moveTo(coordinateX[coordinateX.length-2],coordinateY[coordinateY.length-2]);
        context.lineTo(x,y);

    }else if(!dragging){
        context.moveTo(x,y);
        context.lineTo(x,y);
    }

    context.closePath();
    context.stroke();



}

/**
 * Zeichnet Anwenderinteraktion im Livemodus
 *
 * @param x = x Koordinate des Klicks, y = y Koordinate des Klicks, dragging = Dragwert des Klicks, xstart = Startkoordinate x, ystart = Startkoordinate y
 *
 *
 */
function drawLive(x,y,dragging, xstart, ystart){
    var context = document.getElementById('imgpanel').getContext("2d");
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 4;

    var imgcanvaswidth = $("#imgpanel").width();
    var imgcanvasheight = $("#imgpanel").height();


    context.beginPath();
    if(dragging){

        context.moveTo(xstart * imgcanvaswidth,ystart * imgcanvasheight);
        context.lineTo(x * imgcanvaswidth,y * imgcanvasheight);

    }else if(!dragging){

        context.moveTo(x * imgcanvaswidth,y * imgcanvasheight);
        context.lineTo(x * imgcanvaswidth,y * imgcanvasheight);
    }

    context.closePath();
    context.stroke();


}

/**
 * Löscht den Inhalt des Canvas
 *
 *
 *
 *
 */
function deleteCanvas() {
    var context = document.getElementById('imgpanel').getContext("2d");
    $("#imgpanel").off();
    coordinateX = new Array();
    coordinateY = new Array();
    coordinateDrag = new Array();
    tactic = Tactic.createTactic();
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}


/**
 * Zeichnet eine gespeicherte Taktik in das Canvas
 *
 * @param x = x Koordinate des Klicks, y = y Koordinate des Klicks, drag = Dragwert des Klicks
 *
 *
 */
function actualDraw(x, y, drag) {
    var canvaswidth = $("#imgpanel").width();
    var canvasheight = $("#imgpanel").height();

    var x =  tactic.unnormalizeKoordinates(x,canvaswidth);
    var y = tactic.unnormalizeKoordinates(y, canvasheight);

    var context = document.getElementById('imgpanel').getContext("2d");
    context.strokeStyle = "#FB8C00";
    context.lineJoin = "round";
    context.lineWidth = 4;

    for (var i = 0; i < x.length; i++) {

        context.beginPath();
        if (drag[i]) {
            context.moveTo(x[i - 1], y[i - 1]);
        } else {

            context.moveTo(x[i], y[i]);
        }
        context.lineTo(x[i], y[i]);


        context.closePath();
        context.stroke();
    }
}

/**
 * Auslösen des Ladevorgangs einer gespeicherten Taktik
 *
 * @param tactic = Taktikobjekt der zu ladenen Taktik
 *
 *
 */
function drawSavedMap(tactic) {
    actualDraw(tactic.x, tactic.y, tactic.drag);
    handleMapselectorStates("#" + tactic.getMap(), true);
}

/**
 * Öffnet das Overlaypanel um eine Taktik zu speichern
 *
 *
 *
 *
 */
function saveTactic() {
    openOverlaypanel("tacticname");
}

/**
 * Öffnet das Overlaypanel um eine Taktik zu laden
 *
 *
 *
 *
 */
function loadTactics() {
    openOverlaypanel("loadtactics");
}
