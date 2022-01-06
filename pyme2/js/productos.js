
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

    var rutaImgUpdate = "";

    
    /* Función para insertar datos con firebase */
    const saveProd = (nombre, cantidad, precioU, descripcion, saveImage) => //se crea en forma de función para facilitar las cosas
        //en esta parte ya firebase es el .db entonces se le dice que cree una colección nueva que solo va a contener el documento que se le proporcionará 
        db.collection('productos').doc(usuario)
                .collection('listProductos').doc().set({ //el async-await, es para decir que va a tomar tiempo para que este codigo responda
      
            nombre,
            cantidad,
            precioU,
            descripcion,
            saveImage
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
    
    
     const getProd = () => db.collection('productos').doc(usuario)
     .collection('listProductos').get(); //lo que se le dice es que desde la base de datos de firebase, obtenga todas las "tasks"   
     //importante, hay que ponerle el nombres a como aparece en la colección de firebase 


    const onGetProd = (callback) => db.collection('productos').doc(usuario)
    .collection('listProductos').onSnapshot(callback);

    const deleteProd = (id) => db.collection('productos').doc(usuario)
    .collection('listProductos').doc(id).delete();

    const getProds= (id) => db.collection('productos').doc(usuario)
    .collection('listProductos').doc(id).get();

    const updateProd= (id, updatedClient) => db.collection('productos').doc(usuario)
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
          document.getElementById("cantidad").disabled = false;
        }else{
          document.getElementById("cantidad").disabled = false;
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

            /* starsRef = storageRef.child(`${usuario}/productos/${prod.codigo}`);  */
            starsRef = storageRef.child(`${prod.saveImage}`).getDownloadURL().then(onResolve, onReject);
 
            function onResolve(foundURL) {
              tasksContainer.innerHTML += ` 
                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                  <div class="card">
                    <div class="box">
                        <div class="img">
                            <img src="${foundURL}">
                        </div>
                        <h2>${prod.nombre}<br><span>Precio: ${prod.precioU}</span></h2>
                        <p>Descripci&oacute;n: <br>${descrip}.</p>
                        
                    </div>
                  </div>
                </div>`;  
            }
          
            function onReject() {
              tasksContainer.innerHTML += ` 
              <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div class="card">
                  <div class="box">
                      <div class="img">
                          <img src="imagenes/default.jpg">
                      </div>
                      <h2>${prod.nombre}<br><span>${prod.precioU}</span></h2>
                      <p>${descrip}.</p>
                      
                  </div>
                </div>
              </div>`;  
            }
 
            var descrip = '';
            if (prod.descripcion ==  0){
              descrip = 'Producto sin descripción';
            }else{
              descrip = prod.descripcion;
            }

            // guardamos los datos en un array
            arrayDatos = arrayDatos.concat([[prod.id, prod.nombre,
              prod.cantidad , ( "₡" + prod.precioU), descrip,
              '<button class="btnEdit" id="'+(prod.id)+'" onclick="editar(this.id)"><i class="far fa-edit"></i></button> <button id="'+(prod.id)+'" onclick="eliminar(this.id)" class="btnDelete"><i class="far fa-trash-alt"></i></button>'
                ]]);   
                
                    
                
            })

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
                    { title: "Existencias" },
                    { title: "Precio Unidad" },
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
            console.log(dataProd.saveImage);

            if((dataProd.saveImage).length != "0"){

              rutaImgUpdate = dataProd.saveImage;
              document.getElementById("imagen").placeholder = "imagen puesss";
            }else{
              /* rutaImgUpdate = dataProd.saveImage; */
              document.getElementById("imagen").disabled = false;
            }

            if(dataProd.cantidad == "No Aplica"){
                document.getElementById("na").checked = true;
  
                document.getElementById("cantidad").value = "";
                document.getElementById("cantidad").disabled = true;

            }else{
              document.getElementById("cantidad").checked = false;

              document.getElementById("cantidad").disabled = false;
              ClientProd['cantidad'].value = dataProd.fechCad;
            }
            ClientProd['nombre'].value = dataProd.nombre;
            ClientProd['descripcion'].value = dataProd.descripcion;
            ClientProd['cantidad'].value = dataProd.cantidad;
            ClientProd['precioU'].value = dataProd.precioU;
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

    /* Se obtienen los datos que se escriben en el formulario del cliete */
    ClientProd.addEventListener('submit' , async e => { //crea el evento lo que se requiere que haga
        e.preventDefault();

        var file;
        const nombre = ClientProd['nombre'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const precio = ClientProd['precioU'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const cantidad = ClientProd['cantidad'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const imagen = ClientProd['imagen'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const descripcion = ClientProd['descripcion'];//.value;//crea las variables con lo que se le coloque en el campo task-description
       
      
        var imageProd;
        var saveImage = "";
        var canti;

        if(imagen.files.length != 0){
          imageProd = storageRef.child(`${usuario}/productos/${imagen.files.item(0).name}`);
          saveImage = (`${usuario}/productos/${imagen.files.item(0).name}`);


          file = imagen.files[0];
          imageProd.put(file)
        }

        if(cantidad.value.length != "0"){
            canti = cantidad.value;
        }else{
          canti = "No Aplica"
        }

        if(!editStatus){
          

          await saveProd(nombre.value, canti, precio.value, descripcion.value, saveImage); //.value es para que guarde todo el elemento
         

          
         
        }else{
          await updateProd(id, {
            nombre: nombre.value,
            cantidad: canti,
            precioU: precio.value, 
            descripcion: descripcion.value,
            saveImage
          })  
          

        }
        ClientProd.reset(); //Para que cuando se le de guardar devuelvala página en blanco
        
        document.getElementById("cantidad").disabled = false;
        nombre.focus();
    
    
        
    
    })

