<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
        <div class= "header" id = "userData" style="text-align:right;">
        
        </div>


            
        <div class="pad">            
            <!-- Modal -->
            <div class="modal fade" id="myModal" role="dialog">
                <div class="modal-dialog">
                
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="headerForm">
                     <h4 class="modal-title">Registro de Clientes</h4>
                     <button type="button" class="btnClose2" data-dismiss="modal" onclick= "limpiar()">X</button>
                    </div>
                    <div class="modal-body">        

                    <div class="container">
                            <div class="row">
                                <div class="">
                                    <div class="card">
                                        <div class="card-body">
                                            <form id="client-form">
                                                <div class="row form-group">
                                                    <div class = " col-md-3">
                                                        <input 
                                                            type="text" 
                                                            id="cedula" 
                                                            class="form-control"
                                                            placeholder="C&eacute;dula"
                                                            required="required"
                                                            autofocus
                                                        />
                                                    </div>
                                                   
                                                </div> 
                                                <div class="row form-group ">
                                                    <div class = " col-md-4">
                                                        <input 
                                                        type="text" 
                                                        id="nombre" 
                                                        class="form-control"
                                                        placeholder="Nombre y Apellidos"
                                                        required="required"
                                                        />
                                                    </div>
                                                </div> 
                                                <div class="form-group  row">   
                                                    <div class = " col-md-3">                             
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
                                                    <div class = " col-md-4">
                                                        <input 
                                                        type="text" 
                                                        id="telefono" 
                                                        class="form-control"
                                                        placeholder="Tel&eacute;fono"
                                                        required="required"
                                                        />
                                                    </div>
                                                    <div class = " col-md-2">
                                                        <button class="add" type="button" data-toggle="collapse" data-target="#collapsePhone" aria-expanded="false" aria-controls="collapsePhone">
                                                            <i class="fas fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>   
                                                <div class="collapse" id="collapsePhone">
                                                    <div class="form-group row">
                                                            <div class = " col-md-4" id = "container">
                                                                <input 
                                                                type="text" 
                                                                id="telefono2" 
                                                                class="form-control"
                                                                placeholder="Tel&eacute;fono 2 (Opcional)"
                                                                />
                                                            </div> <div class = " col-md-2">
                                                               <button class="add" type="button" data-toggle="collapse" data-target="#collapsePhone" aria-expanded="false" aria-controls="collapsePhone">
                                                               <i class="fas fa-minus"></i>
                                                                </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                        <div class = " col-md-4" id = "container">
                                                            <input 
                                                            type="email" 
                                                            id="correo" name="email[]"
                                                            class="form-control"
                                                            placeholder="Correo"
                                                            required="required"
                                                            />
                                                        </div>
                                                        <div class = " col-md-2">
                                                               <!--  <button type="button" class="add" data-toggle="collapse" data-target="collapseEmail" aria-expanded="false" aria-controls="collapseEmail"><i class="fas fa-plus"></i></button>  -->
                                                               <button class="add" type="button" data-toggle="collapse" data-target="#collapseEmail" aria-expanded="false" aria-controls="collapseEmail">
                                                                    <i class="fas fa-plus"></i>
                                                                </button>
                                                        </div>
                                                </div>    
                                                <div class="collapse" id="collapseEmail">
                                                    <div class="form-group row">
                                                            <div class = " col-md-4" id = "container">
                                                                <input 
                                                                type="email" 
                                                                id="correo2" name="email[]"
                                                                class="form-control"
                                                                placeholder="Correo 2 (Opcional)"
                                                                />
                                                            </div> <div class = " col-md-2">
                                                               <!--  <button type="button" class="add" data-toggle="collapse" data-target="collapseEmail" aria-expanded="false" aria-controls="collapseEmail"><i class="fas fa-plus"></i></button>  -->
                                                               <button class="add" type="button" data-toggle="collapse" data-target="#collapseEmail" aria-expanded="false" aria-controls="collapseEmail">
                                                               <i class="fas fa-minus"></i>
                                                                </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- <div class="form-group row">
                                                    
                                                    <div class = " col-md-2">
                                                        <select name="pets" id="pet-select" class="form-control">
                                                            <option value="" disabled selected>Provincia</option>
                                                            <option value="dog">Dog</option>
                                                            <option value="cat">Cat</option>
                                                            <option value="hamster">Hamster</option>
                                                        </select>

                                                    </div>
                                                    <div class = " col-md-2">
                                                        <select name="pets" id="pet-select" class="form-control">
                                                            <option value="">Cantón</option>
                                                            <option value="dog">Dog</option>
                                                            <option value="cat">Cat</option>
                                                            <option value="hamster">Hamster</option>
                                                        </select>
                                                    </div>
                                                    <div class = " col-md-2">
                                                        <select name="pets" id="pet-select" class="form-control">
                                                            <option value="">Distrito</option>
                                                            <option value="dog">Dog</option>
                                                            <option value="cat">Cat</option>
                                                            <option value="hamster">Hamster</option>
                                                        </select>
                                                    </div>
                                                </div>        -->      
                                                <div class="form-group row">
                                                    
                                                    <div class = " col-md-6">
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
                                                    <div class="modal-footer">       
                                                        <button class="btnClose" onclick= "limpiar()" data-dismiss="modal">Cancelar</button>
                                                        <button class="btnSave" id="btn-task-form">Guardar</button>                                   
                                                    </div>
                                                </div>
                                            </form>                 
                                        </div>
                                    </div>
                                </div>
                    
                            </div>
                        </div>

                        
                        
                    </div>
                </div>
                
                </div>
                </div>
     
                    <div class="tabCliente">
                                                    
                        <div class="container-fluid">    
                            <br>
                            <div class="row ">
                                <div class = "col-md-6" style="text-align:left; color:#154360;">
                                    <h4 >Administraci&oacute;n de Clientes</h4>
                                </div>
                                <div class = "col-md-6" style="text-align:right;">
                                   <!--  <button type="button" class="btnCliente" data-toggle="modal" data-target="#myModal"><i class="fas fa-plus"></i>  Nuevo Cliente</button> --><!-- 
                                   <button type="button" class="btnAdd" data-toggle="modal" data-target="#myModal" onclick= "limpiar()"><i class="fas fa-plus"></i> Agregar Cliente -->
                                   
                                    <a href="addCliente.php"><input type="button" class="btnAdd" value = "+ Agregar Cliente "></a>
                                </div>
                            </div>
                            <div class="row container-fluid">
                                <div class=>
                                    <hr>
                                    <div id="buttons"></div>
                                    <br>
                                </div>
                                      
                            <!-- 
                                <div class="loader-wrapper linePreloader" id="loader-wrapper"></div> -->
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
