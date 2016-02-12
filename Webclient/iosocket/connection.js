/**
 * Created by Robert on 22.12.2015.
 */

var socket = io('https://p4dme.shaula.uberspace.de/');




/*
 function sendData(x, y){
 socket.emit('json', ({'X': x, 'Y' : y }));
 }

 */

function sendLocaltactic(id, username, map, drag, x, y, tacticname, group ){
    if(group != null){
        socket.emit('createMap',  JSON.stringify({'id' : id, 'user' : username ,'map': map, 'name' : tacticname , 'drag' : drag, 'x' : x, 'y' : y, 'group' : group}));
    }else {
        socket.emit('createMap',  JSON.stringify({'id': id, 'user': username, 'map': map, 'name': tacticname, 'drag': drag, 'x': x, 'y': y}));
    }
    }

