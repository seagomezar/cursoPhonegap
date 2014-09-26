var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        var saber = document.getElementById("saber");
        saber.addEventListener('click', app.saber, false);

        var mas = document.getElementById("mas");
        mas.addEventListener('click', app.mas, false);
    },
    saber: function(){
        var options = { timeout: 31000, enableHighAccuracy: true, maximumAge: 90000 };
        alert("Voy a tratar de localizarte...!");
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError, options);
    },
    mas: function(){
        var latitude=$("#la").html();
        var longitude=$("#lo").html();
        $.get( 
            "http://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&sensor=true", 
            function( data ) 
            {
                console.log(data.results[0].formatted_address);
              $( ".masinfo" ).html( data.results[0].formatted_address );
              $( ".masinfo" ).show();
              alert( "Con estos datos te podrán encontrar!" );
            }
        );
        
    },
    onSuccess: function(position)
    {
        $(".coordenadas").show();
        $("#la").html(position.coords.latitude);
        $("#lo").html(position.coords.longitude);
        $("#al").html(position.coords.altitude);
        $(".informacion > h2").html("Te encontré!!!");
        $("#mas").show();
    },
    onError: function(error){
         alert('código: '  + error.code    + '\n' +
          'No te pude encontrar porque: ' + error.message + '\n');
    }    
};
