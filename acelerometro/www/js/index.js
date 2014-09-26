
    // Espera a que PhoneGap se inicie
    //
    var watchID = null;
    document.addEventListener("deviceready", onDeviceReady, false);
    

    // PhoneGap esta listo
    //
    function onDeviceReady() {
        inicio();
    }

    function getAcceleration() 
    {
        var options = { frequency: 1000 };

        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    }
    function parar() {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }

    function askAcceleration()
    {
      navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
    }

    // onSuccess: Obtiene el resultado
    //
    function onSuccess(acceleration) {
         $("#x").html(acceleration.x);
         $("#y").html(acceleration.y);
         $("#z").html(acceleration.z);
        $("#t").html(  new Date( acceleration.timestamp) );
    }
    function limpiar()
    {
        navigator.accelerometer.clearWatch(watchID);
    }

    // onError: Ocurrio un error
    //
    function onError() {
        alert('Error');
    }
    $(document).on("ready",inicio);
    function inicio()
    {
        getAcceleration();
    }