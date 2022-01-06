<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="estilos/bootstrap.css" type="text/css" rel="stylesheet" >
    <link href="estilos/styles.css" type="text/css" rel="stylesheet" >
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.dataTables.min.css">    
    
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <title>Factura XML</title>
    
    <link rel="icon" href="img/xml.png">

</head>
<body>
<div class="container">
            <h2>Datos del Emisor</h2><br>
            <?php
                if($_FILES["txtArchi"]["type"]!='text/xml'){
                    header("Location:index.php?error=1");
                }
                $factura = simplexml_load_file($_FILES["txtArchi"]["name"]); 

                $emisor_nom= $factura->Emisor->Nombre;
                $emisor_id= $factura->Emisor->Identificacion->Numero;

                
            
            echo '<p><strong class="encabe">Emisor: </strong>'.$emisor_nom.'</p>';
            echo '<p><strong class="encabe">Identificación: </strong>'.$emisor_id.'</p>';

            echo "<br><h2>Detalle de la Factura</h2><br>";
                
            echo'<table id="example" class="display responsive nowrap" style="width:100%">
                    <thead>
                        <tr>
                            <th>LN</th>
                            <th>Codigo</th>
                            <th>Cantidad</th>
                            <th>UnidadM</th>
                            <th>Detalle</th>
                            <th>PrecioUni</th>
                            <th>MontoTotal</th>
                            <th>SubTotal</th>
                            <th>Impuesto</th>
                            <th>MontoTotalLinea</th>
                        </tr>
                    </thead>
                    <tbody>';
                foreach($factura->DetalleServicio->LineaDetalle as $datos){
                    echo'<tr>
                        <td>00'.$datos->NumeroLinea.'</td>
                        <td>'.$datos->Codigo.'</td>
                        <td>'.$datos->Cantidad.'</td>
                        <td>'.$datos->UnidadMedida.'</td>
                        <td>'.$datos->Detalle.'</td>
                        <td>'.$datos->PrecioUnitario.'</td>
                        <td>'.$datos->MontoTotal.'</td>
                        <td>'.$datos->SubTotal.'</td>
                        <td>'.$datos->SubTotal.'</td>
                        <td>'.$datos->MontoTotalLinea.'</td>
                    </tr>';
                }
                echo '</tbody>
                </table>';
               
            ?>
            <br>
            <div class="row">
                <div class="col-lg-4">
                    <div id="review-cart-totals" class="cart-totals card mb-3">
                    <div class="card-header">
                        <h5 class="legend">Resumen Factura</h5>
                    </div>
                    <div class="card-body">
                        <table class="table table-striped">
                        <tr class="totals key">
                            <td colspan="1" class="text-left">
                            <strong>Total Gravado</strong>
                            </td>
                            <td colspan="1" class="text-right">
                            <strong><?php echo $factura->ResumenFactura->TotalGravado; ?></strong>
                            </td>
                        </tr>
                        <tr class="totals key">
                            <td colspan="1" class="text-left">
                            <strong>Total Descuentos</strong>
                            </td>
                            <td colspan="1" class="text-right">
                            <strong><?php echo $factura->ResumenFactura->TotalDescuentos; ?></strong>
                            </td>
                        </tr>
                        <tr class="totals key">
                            <td colspan="1" class="text-left">
                            <strong>Total Venta Neta</strong>
                            </td>
                            <td colspan="1" class="text-right">
                            <strong><?php echo $factura->ResumenFactura->TotalVentaNeta; ?></strong>
                            </td>
                        </tr>
                        <tr class="totals key">
                            <td colspan="1" class="text-left">
                            <strong>Total Impuesto</strong>
                            </td>
                            <td colspan="1" class="text-right">
                            <strong><?php echo $factura->ResumenFactura->TotalImpuesto; ?></strong>
                            </td>
                        </tr>
                        <tr class="totals key">
                            <td colspan="1" class="text-left">
                            <strong>Total Comprobante</strong>
                            </td>
                            <td colspan="1" class="text-right">
                            <strong><?php echo $factura->ResumenFactura->TotalComprobante; ?></strong>
                            </td>
                        </tr>
                        </table>
                        
                    </div>
                    
                    </div>
                    <a href="index.php" class="btn btn-color btn-block" title="Cargar nueva factura">Cargar Nueva Factura</a>
                </div>
            </div>
            <br><br><br>
        </div>
        <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js"></script>
        <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/responsive/2.2.9/js/dataTables.responsive.min.js"></script>

        <script>
             $(document).ready(function() {
                $('#example').DataTable();
            } );
        </script>
</body>
</html>