<!-- 
* Copyright 2018 Carlos Eduardo Alfaro Orellana
  https://www.youtube.com/c/CarlosAlfaro007
-->
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Providers</title>
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
	<script src="./js/js_ventas/jquery.mCustomScrollbar.concat.min.js" ></script>
	<script src="./js/js_ventas/main.js" ></script>
	<script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>

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
</head>
<body id="body-pd">

        
    <?php
		include_once("segmentos/menu.inc");
	?>

    <!-- HEADER -->
    <div class="home_content home cuerpo" role="main" style="overflow-y: scroll;">
        <div class= "header" id = "userData" style="text-align:right;">
        
        </div>



<div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
	<div class="mdl-tabs__tab-bar">
		<a href="#tabNewProvider" class="mdl-tabs__tab is-active">Agregar Venta</a>
		<a href="#tabListProvider" class="mdl-tabs__tab">Lista de Ventas</a>
	</div>
	<div class="mdl-tabs__panel is-active" id="tabNewProvider">
		<div class="mdl-grid">
			<div class="mdl-cell mdl-cell--12-col">
				<div class="full-width panel mdl-shadow--2dp">
					<div class="full-width panel-tittle bg-primary text-center">
						Registrar Venta
					</div>
					<div class="full-width panel-content">
						<form id="sales-form">
							<div class="mdl-grid">
								<div class="mdl-cell mdl-cell--12-col ">
									<legend class="text-condensedLight"><i class="fas fa-money-check-alt"></i> &nbsp; Datalle de la Venta</legend><br>
								</div>
								<div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
									<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
										<input class="mdl-textfield__input" type="text" id="F-CodigoSale" disabled>
										<label class="mdl-textfield__label" for="webProvider">Codigo Venta</label>
										<span class="mdl-textfield__error">Dirección Invalida</span>
									</div>
								</div>
                                <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
                                <body>
									<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
										<select class="mdl-textfield__input" type="text" id="F-cliente" name="cliente">
                                          <option>Seleccione un cliente</option>
                                        </select>
                                </body>
										</select>	
										<span class="mdl-textfield__error">Producto No encontrado</span>
									</div>
								</div>
                                <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
                                <body>
									<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
										<select class="mdl-textfield__input" type="text" id="F-producto" name="provincia">
                                          <option>Seleccione un Producto</option>
                                        </select>
                                </body>
										</select>	
										<span class="mdl-textfield__error">Producto No encontrado</span>
									</div>
								</div>
                                <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
									<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
										<input class="mdl-textfield__input" type="text" id="F-precio">
										<label class="mdl-textfield__label" for="webProvider">Precio</label>
										<span class="mdl-textfield__error">Precio No valido</span>
									</div>
								</div>
                                <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
									<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
										<input class="date-picker mdl-textfield__input" placeholder="Fecha"  type="text" id="F-fecha"                                                     placeholder="Fecha Nacimiento (dd-mm-yyyy)" 
                                                    type="text" 
                                                    required="required" type="text" onfocus="this.type='date'" 
                                                    onmouseover="this.type='date'" onclick="this.type='date'" 
                                                    onblur="this.type='text'" onmouseout="timeFunctionLong(this)">
                                                                    <script>
                                                                        function timeFunctionLong(input) {
                                                                            setTimeout(function() {
                                                                                input.type = 'text';
                                                                            }, 60000);
                                                                        }
                                                                    </script><!-- 
										<span class="mdl-textfield__error">Contacto Invalido</span> -->
									</div>
								</div>



								<div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
									<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
										<input class="mdl-textfield__input" type="text" id="F-cantidad">
										<label class="mdl-textfield__label" for="webProvider">Cantidad</label>
										<span class="mdl-textfield__error">Cantidad no valida</span>
									</div>
								</div>
								<div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
									<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
										<input class="mdl-textfield__input" type="number" id="F-total">
										<label class="mdl-textfield__label" for="webProvider">Total</label>
										<span class="mdl-textfield__error">Total No Valida</span>
									</div>
								</div>
							</div>
							<p class="text-center">
								<button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored bg-primary" id="ingresar_venta">
									<i class="iconify" data-icon="ant-design:check-outlined" data-inline="false"></i>
								</button>
								<div class="mdl-tooltip" for="btn-addProvider">Añadir venta</div>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>


	<div class="mdl-tabs__panel" id="tabListProvider">	

        <div class="pad">            
            
     
                    <div class="tabCliente">
                                                    
                        <div class="container-fluid">    
                            <br>
                            <div class="row ">
                                <div class = "col-md-6" style="text-align:left; color:#154360;">
                                    <h4 >Administraci&oacute;n de Ventas</h4>
                                </div>
                                <div class = "col-md-6" style="text-align:right;">
                                   <!--  <button type="button" class="btnCliente" data-toggle="modal" data-target="#myModal"><i class="fas fa-plus"></i>  Nuevo Cliente</button> -->                                
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
                                <table id="sales" class="display table-striped table-bordered" width="100%"></table> 

                                </div> 
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
    <script src="js/ventas.js"></script>  
      <script src="js/preload.js"></script> 
  </body>
</html>