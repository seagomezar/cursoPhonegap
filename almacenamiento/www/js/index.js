// Wait for device API libraries to load
    //
    var db;
    $("#resultados").hide();
    $("#crearForm").hide();
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        db.transaction(populateDB, errorCB, successCB);
    }

    // Populate the database
    //
    function populateDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS DEMO');
        tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    }

    // Transaction error callback
    //
    function errorCB(tx, err) {
        alert("Error processing SQL: "+err.code);
    }

    // Transaction success callback
    //
    function successCB() {
        alert("success");
    }
    $("#verTodos").on("click",verTodos);
    function verTodos(){
        $("#crearForm").hide();
        $("#resultados").html("");
        db.transaction(verTodosDB, errorCB, successVT);

    }
    function verTodosDB(tx)
    {
        tx.executeSql('SELECT * FROM DEMO',[],successSelect,errorSelect);
    }
    function successSelect(tx,results)
    {
       var len = results.rows.length;
       for (var i = 0; i< len; i ++) 
        {
            $("#resultados").html($("#resultados").html()+"<br/>fila =" + i + "ID =" + results.rows.item(i).id + "datos =" + results.rows.item(i).data);
        }
    }
    function successVT() {
        
        $("#resultados").show();
    }
    function errorSelect(tx,error)
    {
        alert("error: "+error.code);
    }
    $("#crear").on("click",function(){
        $("#resultados").hide();
        $("#crearForm").show();
     });
     $("#guardar").on("click",function(){
        db.transaction(guardar,errorInsert,successInsert);
     });
     function guardar(tx)
     {
        var id=$("#id").val();
        var data=$("#data").val();
        $("#data").val("");
        $("#id").val("");
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES ('+id+', "'+data+'")');
        
     }
     function errorInsert(tx,error)
     {
        alert("error en el insert",error.code);
     }
     function successInsert(tx)
     {
        verTodos();
     }
     /*
     La window.localStorage interfaz implementa del W3C interfaz Web Storage. Una aplicación puede utilizar para guardar los datos persistentes usando pares de clave y valor. La window.sessionStorage interfaz funciona del mismo modo en todos los sentidos, excepto que todos los datos se borra cada vez que la aplicación se cierra. Cada base de datos proporciona un espacio de nombre separado.*/
     $("#guardar2").on("click",function(){
        guardar2();
     });
     function guardar2()
     {
        var id=$("#id").val();
        var data=$("#data").val();
        $("#data").val("");
        $("#id").val("");
        window.localStorage.setItem("id", id);
        window.localStorage.setItem("data", data);

        var id2 = window.localStorage.getItem("id");
        var data2 = window.localStorage.getItem("data");

        alert("se ha insertado el id: " +id2+" con data: "+data2);
        
     }