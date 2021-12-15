<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- tabs -->
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

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
        function active(valor){
        
            valor.style.color = "orange";
            document.getElementById('2').style.color = "gray";
        }
        function activeL(valor){
        
            valor.style.color = "orange";
            
            document.getElementById('1').style.color = "gray";
        }
        
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
                    <div class="tabNav">

                    <ul class="list-inline">
                        <li class="active" ><a id = "1" onclick = "active(this);" style="color: orange; padding-right: 15px" data-toggle="tab" href="#addCliente">AGREGAR CLIENTE</a></li>
                        <li><a style="color: gray; padding-left: 15px" id = "2"  onclick = "activeL(this);" data-toggle="tab" href="#listaClientes">LISTA CLIENTES</a></li>
                    </ul>
                    </div>
                    <div class="tab-content">
                    <div id="addCliente" class="tab-pane fade in active">
                        <form id="client-form">                  
                            <div class="container-fluid" >   

                                <br>
					            <div class="full-width panel-tittle headerForm text-center">
                                        <h5>Registro de nuevo cliente</h5>
                                </div>
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
                                                class="cedula form-control"
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
                                                id="correo2" 
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
                                            <button class="btnClose " ><i class="fas fa-times"></i></button>  
                                            <button class="confirm btnSave "  id="btn-task-form"><i class="fas fa-check"></i></button>  
                                            <br><br> 
                                        </div>  
                                    </div>   
                                </div>
                            </div>   
                        </form>
                    </div>
                    
	                <div id="listaClientes" class="tab-pane fade">
                             
                        <div class="container-fluid" >   
                            <br>
                            <div class="full-width panel-tittle headerForm text-center">
                                <h5>Clientes</h5>
                            </div>
                            <div class = "contenido">
                                <br>
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
                    <br><br>
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
    <script src="js/client.js"></script>  =
      <script src="js/preload.js"></script> 
  </body>
</html>
