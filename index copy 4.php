<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- tabs -->

        <link rel="stylesheet" href="./estilos/cs_ventas/normalize.css">
        <link rel="stylesheet" href="./estilos/cs_ventas/sweetalert2.css">
        <link rel="stylesheet" href="./estilos/cs_ventas/material.min.css">
        <link rel="stylesheet" href="./estilos/cs_ventas/material-design-iconic-font.min.css">
        <link rel="stylesheet" href="./estilos/cs_ventas/jquery.mCustomScrollbar.css">
        <link rel="stylesheet" href="./estilos/cs_ventas/main.css">
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="./js/js_ventas/jquery-1.11.2.min.js"><\/script>')</script>
        <script src="./js/js_ventas/material.min.js" ></script>
        <script src="./js/js_ventas/sweetalert2.min.js" ></script>
        <script src="./js/js_ventas/main.js" ></script>
        <script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>

         <!-- Estilo Menú -->
        <link rel="stylesheet" href="estilos/menu.css">

        <!-- Estilo Contenido -->
        <link rel="stylesheet" href="estilos/estilos.css">

        <!-- ===== BOX ICONS ===== -->
        <link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css' rel='stylesheet'>

        <!-- ===== CSS ===== -->
        <script src="https://kit.fontawesome.com/c8ea4ccf97.js" crossorigin="anonymous"></script>

        <!--Datatables/Modal  -->

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.min.css"><!-- 
        <link rel="stylesheet" href="https://cdn.datatables.net/1.10.25/css/dataTables.bootstrap.min.css"> -->
         <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.8/css/responsive.bootstrap.min.css">
<!-- 
         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script> -->
                <title>MYPYME</title>

    <script>
        /* function crear_elemento() {
        document.getElementById("demo").innerHTML = `<div class = ' col-md-5'><input type='text'id='telefono'class='form-control' placeholder='Tel&eacute;fono' required='required' /></div>
                                                    `;

        } */

        //Función  crear elemento
        /* function crear_elemento(){
            $('#telefono').after("<input type='text'id='telefono1'class='form-control' placeholder='Tel&eacute;fono' required='required' /><input type='button' class='add' onclick='eliminar_elemento(this);' value = '-'>");
        }

        //Función eliminar elemento
        function eliminar_elemento(valor){
            valor.parentNode.parentNode.removeChild(valor.parentNode);
            
        } */
        
    </script>
    </head>
<body id="body-pd">

        
    <?php
		include_once("segmentos/menu.inc");
	?>

    <!-- HEADER -->
    <div class="home_content home cuerpo" role="main" style="overflow-y: scroll;">
        <div class= "header" id = "userData" style="text-align:right;"></div>
            
        <div class="pad">            
     
            <div class="tabCliente">
                <div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                    <div class="mdl-tabs__tab-bar">
                        <a href="#tabNewProvider" class="mdl-tabs__tab is-active">Agregar Venta</a>
                        <a href="#tabListProvider" class="mdl-tabs__tab">Lista de Ventas</a>
                    </div>
                    <div class="mdl-tabs__panel is-active" id="tabNewProvider">
                    </div>
                </div>
                                            
                <div class="container-fluid">    
                    <br>
                    <div class="row">
                        <div class = "col-md-12" stylve="text-align:left;">
                            <ul class="nav nav-tabs">
                                <li class="active"><a data-toggle="tab" href="#add">Lista Productos</a></li>
                                <li><a data-toggle="tab" href="#lista"> Cat&aacute;logo Productos</a></li>
                            </ul>
                        </div>
                    </div>  
                    <div class="tab-content">
                        
                        <div id="add" class="tab-pane fade in active">
                            <form id="client-form">                  
                                <div class="container-fluid" >    
                                    <br>
                                    <div class="row ">
                                        <!-- <div class = " col-md-1" >
                                            
                                            <button onclick="location.href= 'index.php'" class = "return" ><i class="fas fa-2x fa-long-arrow-alt-left"></i></button> 
                                            
                                        </div> -->
                                        <div class = "col-sm-4" style="color:#154360;">
                                            <h4 >Agregar Nuevo Cliente</h4>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class = "contenido">
                                        <div class="row ">
                                            <div class = "col-md-12" style="text-align:left; color:#F39C12;">
                                                <h5 > Complete el formulario</h5>
                                                <h6>* Espacios obligatorios</h6>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="form-group row">
                                            <label style="color: #154360; font-weight: normal; " class="col-sm-2 col-form-label">Identificaci&oacute;n *</label>
                                            <div class="col-sm-3">
                                                <input 
                                                    type="text" 
                                                    id="cedula" 
                                                    class="form-control"
                                                    placeholder="Identificaci&oacute;n"
                                                    required="required"
                                                    autofocus
                                                />
                                            </div>
                                            
                                        </div>
                                        <div class="row form-group ">
                                            <label style="color: #154360; font-weight: normal; " class="col-sm-2 col-form-label">Nombre Completo *</label>
                                        <div class = " col-sm-6">
                                                <input 
                                                type="text" 
                                                id="nombre" 
                                                class="form-control"
                                                placeholder="Nombre Completo"
                                                required="required"
                                                />
                                            </div>
                                        </div> 
                                        <div class="form-group  row">   
                                            <label style="color: #154360; font-weight: normal; " class="col-sm-2 col-form-label">Fecha Nacimiento </label>
                                        <div class = " col-sm-3">                             
                                                <input 
                                                id="fecha" 
                                                class="date-picker form-control" 
                                                placeholder="Fecha Nacimiento" 
                                                type="text" onfocus="this.type='date'" 
                                                onblur="this.type='text'" onmouseout="timeFunctionLong(this)">
                                                    <script>
                                                        function timeFunctionLong(input) {
                                                            setTimeout(function() {
                                                                input.type = 'text';
                                                            }, 60000);
                                                        }
                                                    </script>
                                            </div>
                                        </div>     
                                        <div class="form-group row">
                                            <label style="color: #154360; font-weight: normal; " class="col-sm-2 col-form-label"> Tel&eacute;fono Celular *</label>
                                        <div class = " col-sm-3">
                                                <input 
                                                type="text" 
                                                id="telefono" 
                                                class="form-control"
                                                placeholder="Tel&eacute;fono"
                                                required="required"
                                                />
                                            </div>
                                            <div class = " col-md-2">
                                                <button class="btnPlus" type="button" data-toggle="collapse" data-target="#collapsePhone" aria-expanded="false" aria-controls="collapsePhone">
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>   
                                        <div class="collapse" id="collapsePhone">
                                            <div class="form-group row">
                                                <label style="color: #154360; font-weight: normal; " class="col-sm-2 col-form-label"></label>
                                                <div class = " col-sm-3" id = "container">
                                                    <input 
                                                    type="text" 
                                                    id="telefono2" 
                                                    class="form-control"
                                                    placeholder="Tel&eacute;fono 2 (Opcional)"
                                                    />
                                                </div> 
                                                <div class = " col-sm-2">
                                                    <button class="btnPlus" type="button" data-toggle="collapse" data-target="#collapsePhone" aria-expanded="false" aria-controls="collapsePhone">
                                                        <i class="fas fa-minus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label style="color: #154360; font-weight: normal; " class="col-sm-2 col-form-label"> Correo Electr&oacute;nico </label>
                                        <div class = " col-sm-4" id = "container">
                                                <input 
                                                type="email" 
                                                id="correo" 
                                                class="form-control"
                                                placeholder="Correo"
                                                required="required"
                                                />
                                            </div>
                                            <div class = " col-sm-2">
                                                <button class="btnPlus" type="button" data-toggle="collapse" data-target="#collapseEmail" aria-expanded="false" aria-controls="collapseEmail">
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>    
                                        <div class="collapse" id="collapseEmail">
                                            <div class="form-group row">
                                                <label style="color: #154360; font-weight: normal; " class="col-sm-2 col-form-label"></label>
                                                <div class = " col-md-4" id = "container">
                                                    <input 
                                                    type="email" 
                                                    id="correo2" name="email[]"
                                                    class="form-control"
                                                    placeholder="Correo 2 (Opcional)"
                                                    />
                                                </div> 
                                                <div class = " col-md-2">
                                                    <button class="btnPlus" type="button" data-toggle="collapse" data-target="#collapseEmail" aria-expanded="false" aria-controls="collapseEmail">
                                                    <i class="fas fa-minus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>   
                                        <div class="form-group row">
                                            <label style="color: #154360; font-weight: normal; " class="col-sm-2 col-form-label"> Direcci&oacute;n Exacta </label>
                                        <div class = " col-sm-6">
                                                <textarea 
                                                id="direccion" 
                                                rows="2" 
                                                class="form-control"
                                                placeholder="Provincia, Cantón, Distrito, otras señas"
                                                required="required"
                                                ></textarea>
                                            </div>
                                        </div>    
                                        <div class="form-group row">
                                            <div class = "col-md-8" style="text-align:right;">
                                                <button class="btnClose " id="btn-task-form"><i class="fas fa-times"></i></button>  
                                                <button class="btnSave " id="btn-task-form"><i class="fas fa-check"></i></button>  
                                            
                                                <br><br> 
                                            </div>  
                                        </div>   
                                    </div>
                                </div>   
                            </form>
                        </div>
                        <div id="lista" class="tab-pane fade">
                            <div class="row container-fluid">
                                    <div id="buttons"></div>
                                    <br>
                            </div>
                            <div class="loader">
                                <div class="linePreloader"></div>
                            </div>
                            <div  class = "main">
                                <table id="clients" class="display table-striped table-bordered" width="100%"></table> 

                            </div> 
                        </div> 
                    </div> 
                </div>
            </div>
        </div>
    </div>

   
   <!-- DataTable/modal -->
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <script src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js"></script>
    <!-- <script src="https://cdn.datatables.net/1.10.25/js/dataTables.bootstrap.min.js"></script>  -->
    <script src="https://cdn.datatables.net/responsive/2.2.8/js/dataTables.responsive.min.js"></script>

    <!-- <script src="https://cdn.datatables.net/responsive/2.2.8/js/responsive.bootstrap.min.js"></script> -->
    <script src="https://cdn.datatables.net/select/1.3.3/js/dataTables.select.min.js"></script>

    <!-- Botones exportar -->
    <script src="https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.html5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.print.min.js"></script>

    <!-- FIREBASE -->
    <!-- The core Firebase JS SDK is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js"></script>
        
    <script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-firestore.js"></script>
    
    <script src="https://www.gstatic.com/firebasejs/8.6.2/firebase-auth.js"></script>

    <script>
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyDBV7dPGPZLlVOmB9dugywOKyvJPtTIhQQ",
            authDomain: "mypyme-5aa3b.firebaseapp.com",
            projectId: "mypyme-5aa3b",
            storageBucket: "mypyme-5aa3b.appspot.com",
            messagingSenderId: "622271328070",
            appId: "1:622271328070:web:3ba2823c762d4988f13f47",
            measurementId: "G-T28FYC21BS"
        
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    </script>
    
    <!--=====  JS =====-->
    <script src="js/cliente.js"></script>  
    <script src="js/addinput.js"></script>  
      <script src="js/preload.js"></script> 
  </body>
</html>
