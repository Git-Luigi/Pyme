    const db = firebase.firestore();//liga la constante db a firebase
    const auth = firebase.auth(); //liga la constante con la autenticacion de Firebase
    var user = auth.currentUser; // estado actual del usuario
    var usuario; //variable para guardar el UID del user
    const SaleForm = document.getElementById('sales-form'); // formulario de registro
    const selectP = document.getElementById('F-producto'); // formulario de registro
    const selectC = document.getElementById('F-cliente'); // formulario de registro
    //var table = $('#clients').DataTable(); //tabla que se va a completar con los registros de firebase
    const userData = document.getElementById("userData");
    var editStatus = false;
    
    var codVenta = '';
    var codVentas = '';
    var contador = 0;

    var id = '';
    var nameU, email, photoUrl, uid, emailVerified;

    
    var arrayClientes = [];
    var arrayProdID = [];
    var arrayProd = [];

        /* Función para insertar datos con firebase */
        const saveSale = (codigo, cliente, producto, cantidad, fecha, precio, total) => //se crea en forma de función para facilitar las cosas
        //en esta parte ya firebase es el .db entonces se le dice que cree una colección nueva que solo va a contener el documento que se le proporcionará 
        db.collection('ventas').doc(usuario)
                .collection('listVentas').doc().set({ //el async-await, es para decir que va a tomar tiempo para que este codigo responda
            codigo,
            cliente,
            producto,
            cantidad,
            fecha,
            precio,
            total
             //son tareas asincronas, una vez que termine de guardar va a devolver una respuesta
        })
        .then(() => {
          $('#myModal').modal('hide'); 
          SaleForm.reset();
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
          

            /* Función para obtener datos con firebase ----- NO ESTA CONSULTANDO POR EL MOMENTO*/
    
    
     const getSale = () => db.collection('Ventas').doc(usuario)
     .collection('listVentas').get(); //lo que se le dice es que desde la base de datos de firebase, obtenga todas las "tasks"   
     //importante, hay que ponerle el nombres a como aparece en la colección de firebase 


    const onGetSale = (callback) => db.collection('ventas').doc(usuario)
    .collection('listVentas').onSnapshot(callback);

    const deleteSale = (id) => db.collection('ventas').doc(usuario)
    .collection('listVentas').doc(id).delete();

    const getSales= (id) => db.collection('producventastos').doc(usuario)
    .collection('listVentas').doc(id).get();

    const updateSale= (id, updatedClient) => db.collection('ventas').doc(usuario)
    .collection('listVentas').doc(id).update(updatedClient);

    //var dataSet = [];
    var arrayDatos = [];


    /* VALORES PARA LOS PRODUCTOS */

        
    const getProd = () => db.collection('productos').doc(usuario)
    .collection('listProductos').get(); //lo que se le dice es que desde la base de datos de firebase, obtenga todas las "tasks"   
    //importante, hay que ponerle el nombres a como aparece en la colección de firebase 


    const onGetProd = (callback) => db.collection('productos').doc(usuario)
    .collection('listProductos').onSnapshot(callback);

    

    /* VALORES PARA LOS Clientes */
        
    const getClient = () => db.collection('clientes').doc(usuario)
    .collection('listClientes').get(); //lo que se le dice es que desde la base de datos de firebase, obtenga todas las "tasks"   
    //importante, hay que ponerle el nombres a como aparece en la colección de firebase 


   const onGetClient = (callback) => db.collection('clientes').doc(usuario)
   .collection('listClientes').onSnapshot(callback);



    
  window.addEventListener("DOMContentLoaded", async (e) => {

    /* consultar si hay un usuario activo que esté logeado */
 auth.onAuthStateChanged(function(user) {
   if (user) { 
     //console.log(user.uid) // si hay un usuario activo se muestra el id del user en consola
     usuario = user.uid; // y se guarda el id del usuario en la variable correspondiente 
     nameU = user.displayName;
     email = user.email;
     photoUrl = user.photoURL;
     emailVerified = user.emailVerified;
     console.log(usuario);
     console.log(nameU);
     console.log(photoUrl);

     if(photoUrl == null){
       userData.innerHTML += `
       <img src="imagenes/user.png" alt="" class = "radiusImg"></img>`;
     }
     else{
       userData.innerHTML += `
       <img src="${photoUrl}" alt="" class = "radiusImg"></img>
       
       `;

     }
     /* userData.innerHTML += `
     <label>${nameU}</label>
     `; */

   } else {
     console.log("no")
   }
 });




   const querySnapshot = await getSale();
   const querySnapshotProd = await getProd();
   const querySnapshoclien= await getClient();

     onGetSale((querySnapshot) => {  
       arrayDatos = [];         
       //table.innerHTML = ''
       querySnapshot.forEach((doc) => {
         const sale = doc.data();
         sale.id = doc.id;  
         // guardamos los datos en un array
         arrayDatos = arrayDatos.concat([[sale.id, sale.codigo, sale.cliente, sale.fecha , sale.producto , sale.cantidad, sale.precio, sale.total, 
           '<button class="btnEdit" id="'+(sale.id)+'" onclick="editar(this.id)"><i class="far fa-edit"></i></button> <button id="'+(sale.id)+'" onclick="eliminar(this.id)" class="btnDelete"><i class="far fa-trash-alt"></i></button>'
            ]]);

       })

       /* codVenta = arrayDatos.length;
            var formula = Math.log10((codVenta ^ (codVenta >> 31)) - (codVenta >> 31)) | 0 + 1;

            if(formula == 1){
              codVentas= '00'+ codVenta;
            }
            else  if (formula == 2){
              codVentas = '0'+ codVenta;
            }
            else {
              codVentas = codVenta;
            } */

            if (contador == 0){
          
              onGetClient((querySnapshoclien) =>{
                querySnapshoclien
                .forEach((doc) => {
                  const prod = doc.data();
                  prod.id =doc.id;
                  arrayClientes = arrayClientes.concat([[prod.nombre + " - " + prod.cedula  ]]);
                })
                arrayClientes = arrayClientes.concat([['0 - Cliente Generico']]);
                var array = arrayClientes;
                console.log(array)
         
                // Ordena el Array Alfabeticamente, es muy facil ;)):
                array.sort();
               
                addOptions("cliente", array);
         
        
              })
               
      
              var idProd = '1';
                onGetProd((querySnapshoProd) =>{
                querySnapshoProd
                .forEach((doc) => {
    
                  const prod = doc.data();
                  prod.id =doc.id;/* 
                  console.log(prod.id) */
                  arrayProd = arrayProd.concat([[idProd + " - " +prod.nombre]]);
                  arrayProdID = arrayProd.concat([[prod.id, idProd, prod.nombre]]);
                  idProd++;
                })
                var array2 = arrayProd;
            
                // Ordena el Array Alfabeticamente, es muy facil ;)):
                array2.sort();
                
                addOptions("producto", array2);
            
            
              }) 
              contador++;
            } //cierra if para no repetir datos del datatable

       /// tabla de productos
       $(document).ready(function() {
        $('#ventas').DataTable( {
          destroy: true,
          columnDefs: [
            {
                orderable: false,
                targets: 0
                
            }
          ],
          select: {
              style:    'os',
              selector: 'td:first-child'
          },
          order: [[ 1, 'asc' ]],
          responsive: true,
          language: {
            url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
            
          },
          bFilter: false,
          lengthChange: false,
          bPaginate: false,
          bInfo: false,
          columns: [
                { title: "Producto" },
                { title: "Cantidad" },
                { title: "Precio Uni." },
                { title: "Descuento" },
                { title: "Acciones" }
            ]
        } );

        
      } ); //cierra datatable
      
     });




});


// Rutina para agregar opciones a un <select>
function addOptions(domElement, array) {
  var select = document.getElementsByName(domElement)[0];

  for (value in array) {
  var option = document.createElement("option");
  option.text = array[value];
  select.add(option);
  }
}






 
function eliminar(iden) {
  deleteSale(iden);
  console.log(iden)
}




function editar(iden) {
  $('#myModal').modal('show');
  editStatus = true; 
  id = iden;

  getClients(iden).then((doc) => {
      if (doc.exists) {
        const dataSale = doc.data()
        SaleForm['F-codigoSale'].value = dataSale.codigo;
        SaleForm['F-cliente'].value = dataSale.cliente;
        SaleForm['F-producto'].value = dataSale.producto;
        SaleForm['F-fecha'].value = dataSale.fecha;
        SaleForm['F-cantidad'].value = dataSale.cantidad;
        SaleForm['F-precio'].value = dataSale.precio;
        SaleForm['F-total'].value = dataSale.total;
        SaleForm['btn-task-form'].innerText = 'Actualizar';
      } 
    });
}

function limpiar() {
  SaleForm.reset();
  editStatus = false; 
  SaleForm['btn-task-form'].innerText = 'Guardar';
}
  
    
    /* Se obtienen los datos que se escriben en el formulario del cliete */
    SaleForm.addEventListener('submit' , async e => { //crea el evento lo que se requiere que haga
      e.preventDefault();
  
      const codigo = "VEN - " + codVentas;//.value;//crea las variables con lo que se le coloque en el campo task-title
      const cliente = SaleForm['F-cliente'];//.value;//crea las variables con lo que se le coloque en el campo task-description
      const producto = SaleForm['F-producto'];//.value;//crea las variables con lo que se le coloque en el campo task-description
      const cantidad = SaleForm['F-cantidad'];//.value;//crea las variables con lo que se le coloque en el campo task-description
      const precio = SaleForm['F-precio'];//.value;//crea las variables con lo que se le coloque en el campo task-description
      const fecha = SaleForm['F-fecha'];//.value;//crea las variables con lo que se le coloque en el campo task-description
      const total = SaleForm['F-total'];//.value;//crea las variables con lo que se le coloque en el campo task-description
  
     // await saveClient(cedula.value, nombre.value, telefono.value, direccion.value, correo.value, fecha.value ); //.value es para que guarde todo el elemento
  

      if(!editStatus){
        await saveSale(codigo, cliente.value, producto.value, cantidad.value, fecha.value, precio.value, total.value ); //.value es para que guarde todo el elemento
      }else{
        await updateSale(id, {
          codigo: codigo,
          cliente: cliente.value,
          producto: cantidad.value,
          cantidad: cantidad.value,
          fecha: precio.value,
          precio: fecha.value,
          total: total.value
    
        })
        id = '';
        
      }
      SaleForm.reset(); //Para que cuando se le de guardar devuelvala página en blanco
      $('#myModal').modal('hide'); // cerrar el modal
      codigo.focus();
    
    
      
    
    })

