/**
 * Created by Robert on 22.12.2015.
 */
var socket = io('https://p4dme.shaula.uberspace.de/');

/*
 function sendData(x, y){
 socket.emit('json', ({'X': x, 'Y' : y }));
 }

 */

function sendLocaltactic(id, username, map, x, y, tacticname){
    socket.emit('createMap', ({'id' : id, 'username' : username ,'map': map, 'tacticname' : tacticname , 'x' : x, 'y' : y}));
}

