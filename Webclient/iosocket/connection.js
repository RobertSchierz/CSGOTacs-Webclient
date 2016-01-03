/**
 * Created by Robert on 22.12.2015.
 */
var socket = io('https://p4dme.shaula.uberspace.de/');

/*
 function sendData(x, y){
 socket.emit('json', ({'X': x, 'Y' : y }));
 }

 */

function sendLocaltactic(map, x, y){
    socket.emit('createMap', ({'map': map, 'x' : x, 'y' : y }));
}

