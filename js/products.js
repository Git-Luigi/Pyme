
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
    var codProd = '';
    var codProduct = '';
    var id = '';
    var nameU, email, photoUrl, uid, emailVerified;
    
    /* Función para insertar datos con firebase */
    const saveProd = (codigo, nombre, descripcion, cantidad, precio) => //se crea en forma de función para facilitar las cosas
        //en esta parte ya firebase es el .db entonces se le dice que cree una colección nueva que solo va a contener el documento que se le proporcionará 
        db.collection('productos').doc(usuario)
                .collection('listProductos').doc().set({ //el async-await, es para decir que va a tomar tiempo para que este codigo responda
            codigo,
            nombre,
            descripcion,
            cantidad,
            precio
            //imagen //son tareas asincronas, una vez que termine de guardar va a devolver una respuesta
        })
        .then(() => {
          $('#myModal').modal('hide'); // cerrar el modal
         /*  alert("El usuario registrado") */
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
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
    .collection('listProductos').doc(id).update(updatedClient);

    //var dataSet = [];
    var arrayDatos = [];
    

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
          // Create a reference to the file we want to download
          var starsRef;
          
          //table.innerHTML = ''
          querySnapshot.forEach((doc) => {
            const prod = doc.data();
            prod.id = doc.id;  

            /* starsRef = storageRef.child(`${usuario}/productos/${prod.codigo}`);  */
            starsRef = storageRef.child(`${usuario}/productos/${prod.codigo}`).getDownloadURL().then(onResolve, onReject);

            function onResolve(foundURL) {
              tasksContainer.innerHTML += ` 
                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                  <div class="card">
                    <div class="box">
                        <div class="img">
                            <img src="${foundURL}">
                        </div>
                        <h2>${prod.nombre}<br><span>Precio: ${prod.precio}</span></h2>
                        <p>Descripci&oacute;n: <br>${prod.descripcion}.</p>
                        
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
                      <h2>${prod.nombre}<br><span>${prod.precio}</span></h2>
                      <p>${prod.descripcion}.</p>
                      
                  </div>
                </div>
              </div>`;  
            }

            // guardamos los datos en un array
            arrayDatos = arrayDatos.concat([[prod.id, prod.codigo, prod.nombre , prod.descripcion,
              prod.cantidad , prod.precio, 
              '<button class="btnEdit" id="'+(prod.id)+'" onclick="editar(this.id)"><i class="far fa-edit"></i></button> <button id="'+(prod.id)+'" onclick="eliminar(this.id)" class="btnDelete"><i class="far fa-trash-alt"></i></button>'
                ]]);   
                
                    
                
            })

            codProd = arrayDatos.length;
            console.log(codProd);
            var formula = Math.log10((codProd ^ (codProd >> 31)) - (codProd >> 31)) | 0 + 1;

            if(formula == 1){
              codProduct = '00'+ codProd;
            }
            else  if (formula == 2){
              codProduct = '0'+ codProd;
            }
            else {
              codProduct = codProd;
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
                    { title: "ID" },
                    { title: "Nombre" },
                    { title: "Descripci&oacute;n" },
                    { title: "Cantidad" },
                    { title: "Precio Unidad" },
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
    

    getProds(iden).then((doc) => {
      if (doc.exists) {
        const dataProd = doc.data();
        var cod = dataProd.codigo;
        console.log(cod);
        var borr = storageRef.child(`${usuario}/productos/${cod}`)
        borr.delete();
        
        deleteProd( iden);
      } 
    });
    

  }


  function editar(iden) {
    $('#myModal').modal('show');
    editStatus = true; 
    id = iden;

    getProds(iden).then((doc) => {
        if (doc.exists) {
          const dataProd = doc.data();
          console.log(dataProd.imagen)
          ClientProd['codigo'].value = dataProd.codigo;
          ClientProd['nombre'].value = dataProd.nombre;
          ClientProd['descripcion'].value = dataProd.descripcion;
          ClientProd['cantidad'].value = dataProd.cantidad;
          ClientProd['precio'].value = dataProd.precio;
          //ClientProd['imagen'].value = dataProd.imagen;
          ClientProd['btn-task-form'].innerText = 'Actualizar';
        } 
      });

  }



  function limpiar() {
    ClientProd.reset();
    editStatus = false; 
    ClientProd['btn-task-form'].innerText = 'Guardar';
  }

  
    
    /* Se obtienen los datos que se escriben en el formulario del cliete */
    ClientProd.addEventListener('submit' , async e => { //crea el evento lo que se requiere que haga
        e.preventDefault();


        var file; // use the Blob or File API
    
        const codigo = "PRO - " + codProduct;//.value;//crea las variables con lo que se le coloque en el campo task-title
        const nombre = ClientProd['nombre'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const descripcion = ClientProd['descripcion'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const cantidad = ClientProd['cantidad'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const precio = ClientProd['precio'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const imagen = ClientProd['imagen'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        
        
       // await saveClient(cedula.value, nombre.value, telefono.value, direccion.value, correo.value, fecha.value ); //.value es para que guarde todo el elemento
    
        // Create a reference to 'mountains.jpg'
        var imageProd = storageRef.child(`${usuario}/productos/${codigo}`);


        if(!editStatus){
          await saveProd(codigo, nombre.value, descripcion.value, cantidad.value, precio.value); //.value es para que guarde todo el elemento
         
          if(imagen.files.length != 0){
            file = imagen.files[0];
            imageProd.put(file).then(function(snapshot) {
              console.log('exito');
            });
          }else{
            console.log('nada');
          }
         
        }else{
          await updateProd(id, {
            codigo: codigo,
            nombre: nombre.value,
            descripcion: descripcion.value,
            cantidad: cantidad.value,
            precio: precio.value
            //imagen: imagen.value

            

          })  
          
          if(imagen.files.length != 0){
            file = imagen.files[0];
            imageProd.put(file).then(function(snapshot) {
              console.log('exito');
            });
          }else{
            console.log('nada');
          }

        }
        ClientProd.reset(); //Para que cuando se le de guardar devuelvala página en blanco
        $('#myModal').modal('hide'); // cerrar el modal
        codigo.focus();
    
    
        
    
    })

