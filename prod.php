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
        <link rel="stylesheet" href="estilos/product.css">

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
        

        function active(valor){
        
            valor.style.color = "orange";
            document.getElementById('2').style.color = "gray";
            document.getElementById('3').style.color = "gray";
        }
        function activeL(valor){
        
            valor.style.color = "orange";
            
            document.getElementById('1').style.color = "gray";
            document.getElementById('3').style.color = "gray";
        }
        function activeC(valor){
        
        valor.style.color = "orange";
        
        document.getElementById('1').style.color = "gray";
        document.getElementById('2').style.color = "gray";
        }

        function check(){
            // Get the checkbox
            var checkBox = document.getElementById("na");

            if (checkBox.checked){
                document.getElementById("fecha").disabled = true;
                document.getElementById("fecha").value = '';
            }else{
                
                document.getElementById("fecha").disabled = false;
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
                            <li class="active" ><a id = "1" onclick = "active(this);" style="color: orange; " data-toggle="tab" href="#addProduct">AGREGAR PRODUCTO</a></li>
                            <li><a style="color: gray; padding-left: 15px" id = "2"  onclick = "activeL(this);" data-toggle="tab" href="#listaProduct">LISTA PRODUCTOS</a></li>
                            <li><a style="color: gray; padding-left: 15px" id = "3"  onclick = "activeC(this);" data-toggle="tab" href="#catagProduct">CATALOGO</a></li>
                        </ul>
                    </div>
                    <div class="tab-content">
                    <div id="addProduct" class="tab-pane fade in active">
                        <form id="product-form">                  
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
                                        <label style="color: #154360; font-weight: normal; " class="col-sm-2 col-form-label">Nombre Producto *</label>
                                        <div class="col-sm-3">
                                            <input 
                                                type="text" 
                                                id="nombre" 
                                                class="form-control"
                                                placeholder="Nombre Producto"
                                                required="required"
                                                autofocus
                                                />
                                        </div>
                                        
                                    </div>
                                    <div class="row form-group ">
                                        <label style="color: #154360; font-weight: normal; " class="col-sm-2 col-form-label">Proveedor *</label>
                                        <div class = " col-sm-3">
                                            <select class="form-control" type="text" id="proveedor" name="proveedor">
                                                <option>Seleccione un proveedor</option>
                                            </select>
                                        </div>
                                    </div> 
                                    <div class="form-group  row">   
                                        <label style="color: #154360; font-weight: normal; " class="col-sm-2 col-form-label">Fecha Caducidad * </label>
                                        <div class = " col-sm-3">                             
                                            <input 
                                            id="fecha" 
                                            class="date-picker form-control" 
                                            placeholder="Fecha Caducidad" 
                                            required="required"
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
                                        <div class = " col-md-2">
                                            <input type="checkbox" id="na" onclick="check()" name="horns">
                                            <label for="na" style="color: #154360; font-weight: normal; ">No Aplica</label>
                                        </div>
                                    </div>     
                                    <div class="form-group row">
                                        <label style="color: #154360; font-weight: normal; " class="col-sm-2 col-form-label"> Cantidad *</label>
                                        <div class = " col-sm-3">
                                            <input type="number" 
                                            id="cantidad" 
                                            name="cantidad" 
                                            class="form-control"
                                            placeholder="Cantidad"
                                            required="required"
                                            min="0"/>
                                        </div>
                                    </div>   
                                    <div class="form-group row">
                                        <label style="color: #154360; font-weight: normal; " class="col-sm-2 col-form-label"> Precio *</label>
                                        <div class = " col-sm-4" id = "container">
                                            <input 
                                            type="text" 
                                            id="precio" 
                                            class="form-control"
                                            placeholder="Precio"
                                            required="required"
                                            />
                                        </div>
                                    </div>    
                                    <div class="form-group row">
                                        <label style="color: #154360; font-weight: normal; " class="col-sm-2 col-form-label"> Imagen </label>
                                        <div class = " col-sm-6">
                                            <input type="file" 
                                            name="adjunto" 
                                            accept=".pdf,.jpg,.png" 
                                            multiple 
                                            id="imagen" 
                                            class="form-control"
                                            placeholder="Imagen"/>
                                        </div>
                                    </div>   
                                    <div class="row form-group ">
                                        <label style="color: #154360; font-weight: normal; " class="col-sm-2 col-form-label">Descripci&oacute;n</label>
                                        <div class = " col-sm-6">
                                            <textarea 
                                                type="text" 
                                                id="descripcion"  
                                                rows="2" 
                                                class="form-control"
                                                placeholder="Descripci&oacute;n"
                                                ></textarea>
                                        </div>
                                    </div>  
                                    <div class="form-group row">
                                        <div class = "col-md-8" style="text-align:right;">
                                            <button class="btnClose " ><i class="fas fa-times"></i></button>  
                                            <button class="btnSave "  id="btn-task-form"><i class="fas fa-check"></i></button>  
                                            <br><br> 
                                        </div>  
                                    </div>   
                                </div>
                            </div>   
                        </form>
                    </div>
                    
	                <div id="listaProduct" class="tab-pane fade">
                             
                        <div class="container-fluid" >   
                            <br>
                            <div class="full-width panel-tittle headerForm text-center">
                                <h5>Productos</h5>
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
                                    <table id="product" class="display table-striped table-bordered" width="100%"></table>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div id="catagProduct" class="tab-pane fade">
                             
                        <div class="container-fluid" >   
                            <br>
                            <div class="full-width panel-tittle headerForm text-center">
                                <h5>Catalogo de Productos</h5>
                            </div>
                            <div class = "contenido">
                                <div class="row">                            
                                        <br>
                                        <div class = "col-md-6" style="text-align:left;">
                                            <label> Exportar como: </label>   
                                            <button id="pdf" class = "buttonAction "><i class="bPdf far fa-file-pdf"></i>  PDF</button>   
                                            
                                        </div>   
                                    </div>  
                                    <div class="row container-fluid">  
                                        <div class="row container " id="tasks-container">
                                        </div> 
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
    
    <script src="https://www.gstatic.com/firebasejs/8.6.5/firebase-storage.js"></script>

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
    <script src="js/products.js"></script>  =
      <script src="js/preload.js"></script> 
  </body>
</html>
