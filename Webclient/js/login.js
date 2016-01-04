/**
 * Created by Robert on 03.01.2016.
 */
function authentification(username, password){
    socket.emit('auth', ({'user': username, 'pw' : password }));

    socket.on('authFailed', function (data) {
        console.log('einloggen faslch');
    });

    socket.on('authSuccess', function (data) {
        console.log('eingeloggt');
    });
}