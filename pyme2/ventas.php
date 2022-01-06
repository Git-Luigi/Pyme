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


        function update(){
            var canti = document.getElementById('cantidad');
            var precioU = document.getElementById('precioU');

            if (precioU.value.length != "0" && canti.value.length != "0"  ){
                var tot = parseFloat(canti.value) * parseFloat(precioU.value)
                    
                    document.getElementById('precioF').value =tot;
                
            }
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
                        <li class="active" ><a id = "1" onclick = "active(this);" style="color: orange; padding-right: 15px" data-toggle="tab" href="#addCompra">REGISTRAR VENTA</a></li>
                    </ul>
                    </div>
                    <div class="tab-content">
                    <div id="addCompra" class="tab-pane fade in active">
                        <form id="sales-form">                  
                            <div class="container-fluid" >   

                                <br>
					            <div class="full-width panel-tittle headerForm text-center">
                                        <h5>Registro de ventas</h5>
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
                                        <div class="col-sm-3">
                                        <label style="color: #154360; font-weight: normal; " >Fecha Venta*</label>
                                            <input 
                                                id="fecha" 
                                                class="date-picker form-control" 
                                                placeholder="Fecha Compra" 
                                                autofocus
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
                                        <div class = " col-sm-6">
                                            <label style="color: #154360; font-weight: normal; ">Cliente*</label>
                                            <select class="form-control" type="text" id="cliente" name="cliente" required >
                                                <option disabled selected value="">Seleccione un cliente</option>
                                            </select>
                                        </div>
                                        
                                        <div class = " col-sm-3">
                                            <label style="color: #154360; font-weight: normal; "> Descuento Venta *</label>
                                            <input type="number" 
                                            id="descuento" 
                                            name="descuento" 
                                            class="form-control"
                                            placeholder="Descuento"
                                            required="required"
                                            min="0" onkeyup="update();"/>
                                        </div>

                                        
                                    </div>
                                    <div class="row form-group ">
                                        <label style="color: #154360; font-weight: bold; " class="col-sm-2 col-form-label">Detalle Productos</label>
                                    </div>    
                                    <div class="form-group row">
                                        <div class = " col-sm-3">
                                            <label style="color: #154360; font-weight: normal; "> Producto *</label>
                                            <select class="form-control" type="text" id="producto" name="producto" required>
                                                <option disabled selected value="">Seleccione un producto</option>
                                            </select>
                                        </div>
                                        <div class = " col-sm-3">
                                            <label style="color: #154360; font-weight: normal; "> Cantidad *</label>
                                            <input type="number" 
                                            id="cantidad" 
                                            name="cantidad" 
                                            class="form-control"
                                            placeholder="Cantidad"
                                            required="required"
                                            min="0" onkeyup="update();"/>
                                        </div>
                                        <div class = " col-sm-3">
                                            <label style="color: #154360; font-weight: normal; "> Precio Unitario *</label>
                                            <input type="number" 
                                            id="precioU" 
                                            name="precioU" 
                                            class="form-control"
                                            placeholder="Precio Unitario"
                                            required="required"
                                            min="0" onkeyup="update();"/>
                                        </div>
                                        <div class = " col-sm-3">
                                            <label style="color: #154360; font-weight: normal; "> Descuento Producto *</label>
                                            <input type="number" 
                                            id="descuento" 
                                            name="descuento" 
                                            class="form-control"
                                            placeholder="Descuento Producto"
                                            required="required"
                                            min="0" onkeyup="update();"/>
                                        </div>
                                    </div> 
                                    <div class="row form-group ">
                                        <div class = " col-sm-2">
                                            <button class="btnAddP "  id="addProd"><i class="fas fa-plus"></i>  Agregar Producto</button>  
                                        </div> 
                                    </div> 
                                    <div class="row form-group ">
                                        <div class = " col-sm-12">
                                            <table id="ventas" class="display table-striped table-bordered" width="100%"></table>  
                                        </div> 
                                    </div>   
                                    <div class="form-group row">
                                        <div class = "col-md-12" style="text-align:right;">
                                            <button class="btnClose " onclick = "limpiar();"><i class="fas fa-times"></i></button>  
                                            <button class="confirm btnSave "  id="btn-task-form"><i class="fas fa-check"></i></button>  
                                            <br><br> 
                                        </div>  
                                    </div>   
                                </div>
                            </div>   
                        </form>
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
    <script src="js/ventas.js"></script>  
  </body>
</html>
