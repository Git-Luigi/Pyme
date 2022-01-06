
    const db = firebase.firestore();//liga la constante db a firebase
    const auth = firebase.auth(); //liga la constante con la autenticacion de Firebase
    // Create a root reference
    var storageRef = firebase.storage().ref();
    

    var user = auth.currentUser; // estado actual del usuario
    var usuario; //variable para guardar el UID del user

    const ClientProd = document.getElementById('product-form'); // formulario de registro
    const table = document.getElementById("product"); //tabla que se va a completar con los registros de firebase
    const userData = document.getElementById("userData");
    const tasksContainer = document.getElementById("tasks-container");

    var editStatus = false;
    var codigoProdEdit = '';
    var codProd = '';
    var codProduct = '';
    var contador = 0;
    var id = '';
    var nameU, email, photoUrl, uid, emailVerified;
    //var dataSet = [];
    var arrayDatos = [];
    var arrayProv = [];

    
    /* Función para insertar datos con firebase */
    const saveProd = (nombre, proveedor,fechCad, cantidad, precioU, iva, precioF, descripcion) => //se crea en forma de función para facilitar las cosas
        //en esta parte ya firebase es el .db entonces se le dice que cree una colección nueva que solo va a contener el documento que se le proporcionará 
        db.collection('inventario').doc(usuario)
                .collection('listProductos').doc().set({ //el async-await, es para decir que va a tomar tiempo para que este codigo responda
      
            nombre,
            proveedor,
            fechCad,
            cantidad,
            precioU,
            iva,
            precioF,
            descripcion
            //imagen //son tareas asincronas, una vez que termine de guardar va a devolver una respuesta
        })
        .then(() => {
          arrayProv = [];
          Swal.fire({
            title: 'Producto Registrado',
            text: "Desea visualizar la lista de productos?",
            icon:'success',
            iconColor: '#28B463',
            showCancelButton: true,
            confirmButtonColor: '#154360',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#F39C12',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result.isConfirmed) {
              $('[href="#listaProduct"]').tab('show');
              document.getElementById('1').style.color = "gray";
              document.getElementById('2').style.color = "orange";
            }
          })
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            iconColor: '#C0392B',
            title: 'La tarea falló',
            text: 'Por favor intente de nuevo!',
            confirmButtonColor: '#154360',
            confirmButtonText: 'Aceptar'
          })
        });
          
    
    
    /* Función para obtener datos con firebase ----- NO ESTA CONSULTANDO POR EL MOMENTO*/
    
    
     const getProd = () => db.collection('inventario').doc(usuario)
     .collection('listProductos').get(); //lo que se le dice es que desde la base de datos de firebase, obtenga todas las "tasks"   
     //importante, hay que ponerle el nombres a como aparece en la colección de firebase 


    const onGetProd = (callback) => db.collection('inventario').doc(usuario)
    .collection('listProductos').onSnapshot(callback);

    const deleteProd = (id) => db.collection('inventario').doc(usuario)
    .collection('listProductos').doc(id).delete();

    const getProds= (id) => db.collection('inventario').doc(usuario)
    .collection('listProductos').doc(id).get();

    const updateProd= (id, updatedClient) => db.collection('inventario').doc(usuario)
    .collection('listProductos').doc(id).update(updatedClient).then(() => {
      Swal.fire({
        title: 'Producto Actualizado',
        text: "Desea visualizar la lista de productos?",
        icon:'success',
        iconColor: '#28B463',
        showCancelButton: true,
        confirmButtonColor: '#154360',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#F39C12',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
          $('[href="#listaProduct"]').tab('show');
          document.getElementById('1').style.color = "gray";
          document.getElementById('3').style.color = "gray";
          document.getElementById('2').style.color = "orange";
          document.getElementById("fecha").disabled = false;
        }else{
          document.getElementById("fecha").disabled = false;
        }
      })
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        iconColor: '#C0392B',
        title: 'La tarea falló',
        text: 'Por favor intente de nuevo!',
        confirmButtonColor: '#154360',
        confirmButtonText: 'Aceptar'
      })
    });

    
    /* VALORES PARA LOS Clientes */
        
    const getProv = () => db.collection('proveedor').doc(usuario)
     .collection('listProveedores').get();


     const onGetProv = (callback) => db.collection('proveedor').doc(usuario)
     .collection('listProveedores').onSnapshot(callback);

    
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
        
        if(photoUrl == null){
          userData.innerHTML += `
          <img src="imagenes/user.png" alt="" class = "radiusImg"></img>`;
        }
        else{
          userData.innerHTML += `
          <img src="${photoUrl}" alt="" class = "radiusImg"></img>
          
          `;

        }

      } else {
        console.log("no")
      }
    });

      const querySnapshot = await getProd();
        onGetProd((querySnapshot) => {  
          tasksContainer.innerHTML = ""; 
          arrayDatos = [];      
          
          //table.innerHTML = ''
          querySnapshot.forEach((doc) => {
            const prod = doc.data();
            prod.id = doc.id;  
 
            var descrip = '';
            if (prod.descripcion ==  0){
              descrip = 'Producto sin descripción';
            }else{
              descrip = prod.descripcion;
            }
            var caducidad = '';
            if ( prod.fechCad.length == 0){
                caducidad = 'No aplica';
            }else{
              caducidad = prod.fechCad;
            }

            // guardamos los datos en un array
            arrayDatos = arrayDatos.concat([[prod.id, prod.nombre, prod.proveedor, caducidad,
              prod.cantidad , ( "₡" + prod.precioU), (prod.iva + "%"), ( "₡" + prod.precioF), descrip,
              '<button class="btnEdit" id="'+(prod.id)+'" onclick="editar(this.id)"><i class="far fa-edit"></i></button> <button id="'+(prod.id)+'" onclick="eliminar(this.id)" class="btnDelete"><i class="far fa-trash-alt"></i></button>'
                ]]);   
                
                    
                
            })

            if (contador == 0){
              onGetProv((querySnapshoProv) =>{
                querySnapshoProv
                .forEach((doc) => {
                  const prov = doc.data();
                  prov.id =doc.id;
                  arrayProv = arrayProv.concat([[prov.cedula +" - "+ prov.nombre]]);
                })
                arrayProv = arrayProv.concat([['Otro Provedor']]);
                var array = arrayProv;
                console.log(array)
            
                // Ordena el Array Alfabeticamente, es muy facil ;)):
                array.sort();
               
                addOptions("proveedor", array);
            
            
              }) 
              contador++;
            }
            
          /// tabla de clientes
          $(document).ready(function() {
            $('#product').DataTable( {
              destroy: true,
              data: arrayDatos,
              columnDefs: [
                {
                    orderable: false,/* 
                    className: 'select-checkbox', */
                    targets: 0
                    
                },
                {
                    targets: [ 0 ],
                    visible: false,
                    searchable: false
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
                search: ' ',
                searchPlaceholder: 'buscar producto'
              },
              columns: [
                    { title: "docId" },
                    { title: "Nombre" },
                    { title: "Proveedor" },
                    { title: "Caducidad" },
                    { title: "Existencias" },
                    { title: "Precio Unidad" },
                    { title: "IVA" },
                    { title: "Precio Final" },
                    { title: "Descripcion" },
                    { title: "Acciones" }
                ]
            } );

            var buttons = new $.fn.dataTable.Buttons( $('#product').DataTable(), {
              buttons: [  
                {
                  //Botón para Excel
                  extend: 'excelHtml5',
                  footer: true,
                  title: 'Mis Productos',
                  filename: 'productos_MYPYME',

                  //Aquí es donde generas el botón personalizado
                  text: '<button class="btnExcel"><i class="fas fa-file-excel"></i> Exportar Excel</button>',
                  exportOptions: {
                    columns: [  1, 2, 3, 4, 5]
                  }
                },
                {
                    extend: 'pdfHtml5',
                    footer: true,
                    title: 'Mis Productos',
                    filename: 'productos_MYPYME',

                    //Aquí es donde generas el botón personalizado
                    text: '<button class="btnPDF"><i class="fas fa-file-excel"></i> Exportar PDF</button>',
                    
                    exportOptions: {
                        columns: [  1, 2, 3, 4, 5]
                    }
                }
              ]
            }).container().appendTo($('#buttons'));
          } );

        });
    });
     
    
  function eliminar(iden) {

    Swal.fire({
      title: 'Eliminar producto?',
      text: "Esta acción no se podrá revertir!",
      icon: 'warning',
      iconColor: '#F1C40F',
      showCancelButton: true,
      confirmButtonColor: '#154360',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#F39C12',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        borr( iden);
        Swal.fire({
          title:'Eliminado!',
          text: 'El producto se ha eliminado.',
          icon:'success',
          iconColor: '#28B463',
          confirmButtonColor: '#154360',
          confirmButtonText: 'Aceptar'
        })
      }else{
        Swal.fire({
          title:'Cancelado!',
          text: 'No se ha eliminado el producto.',
          icon:'error',
          iconColor: '#C0392B',
          confirmButtonColor: '#154360',
          confirmButtonText: 'Aceptar'
        })
      }
    })
    
    

  }

  function borr (iden) {
    deleteProd( iden);
  }

  function editar(iden) {
    Swal.fire({
      title: 'Editar registro?',
      text: "Desea modificar los datos del Cliente?",
      icon: 'question',
      iconColor: '#F1C40F',
      showCancelButton: true,
      confirmButtonColor: '#154360',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#F39C12',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
          confirmEdit(iden);
      }else{
        limpiar();
        Swal.fire({
          title:'Tarea cancelada!',
          text: 'No se ha modificado el registro.',
          icon:'error',
          iconColor: '#C0392B',
          confirmButtonColor: '#154360',
          confirmButtonText: 'Aceptar'
        })
      }
    })
  }
  function confirmEdit(iden){
    $(document).ready(function() {
      $('[href="#addProduct"]').tab('show');
      document.getElementById('2').style.color = "gray";
      document.getElementById('1').style.color = "orange";

      editStatus = true; 
      id = iden;

      getProds(iden).then((doc) => {
          if (doc.exists) { 
            const dataProd = doc.data()
            
            codigoProdEdit = dataProd.codigo;

            if((dataProd.fechCad).length == 0){
                document.getElementById("na").checked = true;
  
                document.getElementById("fecha").value = "";
                document.getElementById("fecha").disabled = true;

            }else{
              document.getElementById("na").checked = false;

              document.getElementById("fecha").disabled = false;
              ClientProd['fecha'].value = dataProd.fechCad;
            }
            ClientProd['nombre'].value = dataProd.nombre;
            ClientProd['proveedor'].value = dataProd.proveedor;
            ClientProd['descripcion'].value = dataProd.descripcion;
            ClientProd['cantidad'].value = dataProd.cantidad;
            ClientProd['precioU'].value = dataProd.precioU;
            ClientProd['precioF'].value = dataProd.precioF;
            ClientProd['iva'].value = dataProd.iva;
          //ClientProd['imagen'].value = dataProd.imagen;
            
          } 
        });
      });
  }



  function limpiar() {
    ClientForm.reset();
    document.querySelector(".cedula").disabled = false;
    editStatus = false;

  }



   // Rutina para agregar opciones a un <select>
  function addOptions(domElement, array) {
    var select = document.getElementsByName(domElement)[0];
  
    for (value in array) {
    var option = document.createElement("option");
    option.text = array[value];
    select.add(option);
    }
  }
    
    /* Se obtienen los datos que se escriben en el formulario del cliete */
    ClientProd.addEventListener('submit' , async e => { //crea el evento lo que se requiere que haga
        e.preventDefault();


        var file; // use the Blob or File 
        const nombre = ClientProd['nombre'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const proveedor = ClientProd['proveedor'];
        const fechCad = ClientProd['fecha'];
        const cantidad = ClientProd['cantidad'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const precioU = ClientProd['precioU'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const precioF = ClientProd['precioF'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const descripcion = ClientProd['descripcion'];//.value;//crea las variables con lo que se le coloque en el campo task-description
       
      
        var select = document.getElementById('iva');
        var iva = select.options[select.selectedIndex];

        if(!editStatus){
          

          await saveProd(nombre.value, proveedor.value, fechCad.value ,cantidad.value, precioU.value, iva.value, precioF.value, descripcion.value); //.value es para que guarde todo el elemento
         

          
         
        }else{
          await updateProd(id, {
            nombre: nombre.value,
            proveedor: proveedor.value,
            fechCad: fechCad.value ,
            cantidad: cantidad.value,
            precioU: precioU.value, 
            iva: iva.value, 
            precioF: precioF.value, 
            descripcion: descripcion.value
          })  
          

        }
        ClientProd.reset(); //Para que cuando se le de guardar devuelvala página en blanco
        
        document.getElementById("fecha").disabled = false;
        nombre.focus();
    
    
        
    
    })

