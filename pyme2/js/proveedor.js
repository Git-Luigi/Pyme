
    const db = firebase.firestore();//liga la constante db a firebase
    const auth = firebase.auth(); //liga la constante con la autenticacion de Firebase
    var user = auth.currentUser; // estado actual del usuario
    var usuario; //variable para guardar el UID del user
    const ClientProv = document.getElementById('proveedor-form'); // formulario de registro
    //var table = $('#clients').DataTable(); //tabla que se va a completar con los registros de firebase
    const userData = document.getElementById("userData");
    var editStatus = false;
    var codProv = '';
    var codProvee = '';
    var id = '';
    var nameU, email, photoUrl, uid, emailVerified;
    
    /* Función para insertar datos con firebase */
    const saveProv= (codigo, nombre, telefono, correo, descripcion) => //se crea en forma de función para facilitar las cosas
        //en esta parte ya firebase es el .db entonces se le dice que cree una colección nueva que solo va a contener el documento que se le proporcionará 
        db.collection('proveedor').doc(usuario)
        .collection('listProveedores').doc().set({ //el async-await, es para decir que va a tomar tiempo para que este codigo responda
            codigo,
            nombre,
            telefono,
            correo,
            descripcion //son tareas asincronas, una vez que termine de guardar va a devolver una respuesta
        })
        .then(() => {
          $('#myModal').modal('hide'); 
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
          
    
    
    /* Función para obtener datos con firebase ----- NO ESTA CONSULTANDO POR EL MOMENTO*/
    

     const getProv = () => db.collection('proveedor').doc(usuario)
     .collection('listProveedores').get(); //lo que se le dice es que desde la base de datos de firebase, obtenga todas las "tasks"   
     //importante, hay que ponerle el nombres a como aparece en la colección de firebase 


    const onGetProv = (callback) => db.collection('proveedor').doc(usuario)
    .collection('listProveedores').onSnapshot(callback);

    const deleteProv = (id) => db.collection('proveedor').doc(usuario)
    .collection('listProveedores').doc(id).delete();

    const getProvs= (id) => db.collection('proveedor').doc(usuario)
    .collection('listProveedores').doc(id).get();

    const updateProv= (id, updateProv) => db.collection('proveedor').doc(usuario)
    .collection('listProveedores').doc(id).update(updateProv);

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

      } else {
        console.log("no")
      }
    });

      const querySnapshot = await getProv();
        onGetProv((querySnapshot) => {  
          arrayDatos = [];        
          //table.innerHTML = ''
          querySnapshot.forEach((doc) => {
            const prov = doc.data();
            prov.id = doc.id;  
            // guardamos los datos en un array
            arrayDatos = arrayDatos.concat([[prov.id, prov.codigo, prov.nombre , prov.telefono ,
            prov.correo , prov.descripcion, 
            '<button class="btnEdit" id="'+(prov.id)+'" onclick="editar(this.id)"><i class="far fa-edit"></i></button> <button id="'+(prov.id)+'" onclick="eliminar(this.id)" class="btnDelete"><i class="far fa-trash-alt"></i></button>'
              ]]);
                                    
          })

          codProv = arrayDatos.length;
          var formula = Math.log10((codProv ^ (codProv >> 31)) - (codProv >> 31)) | 0 + 1;

          if (codProv == 0){
            codProv++;
          }
          if(formula == 1){
            codProvee = '00'+ codProv;
          }
          else  if (formula == 2){
            codProvee = '0'+ codProv;
          }
          else {
            codProvee = codProv;
          }

          /// tabla de clientes
          $(document).ready(function() {
            
            $('#proveedor').DataTable( {
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
              order: [[ 1, 'asc' ]],
              responsive: true,
              language: {
                url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
                search: ' ',
                searchPlaceholder: 'buscar proveedor'
              },
              columns: [
                    { title: "docId" },
                    { title: "ID" },
                    { title: "Nombre" },
                    { title: "Tel&eacute;fono" },
                    { title: "Correo" },
                    { title: "Descripci&oacute;n" },
                    { title: "Acciones" }
                ]
            } );
       
            var buttons = new $.fn.dataTable.Buttons( $('#proveedor').DataTable(), {
              buttons: [  
                {
                  //Botón para Excel
                  extend: 'excelHtml5',
                  footer: true,
                  title: 'Proveedores',
                  filename: 'proveedores_MYPYME',

                  //Aquí es donde generas el botón personalizado
                  text: '<button class="btnExcel"><i class="fas fa-file-excel"></i> Exportar Excel</button>',
                  exportOptions: {
                    columns: [  1, 2, 3, 4, 5, 6]
                  }
                },
                {
                    extend: 'pdfHtml5',
                    footer: true,
                    title: 'Proveedores',
                    filename: 'proveedores_MYPYME',

                    //Aquí es donde generas el botón personalizado
                    text: '<button class="btnPDF"><i class="fas fa-file-excel"></i> Exportar PDF</button>',
                    
                    exportOptions: {
                        columns: [  1, 2, 3, 4, 5, 6]
                    }
                }
              ]
            }).container().appendTo($('#buttons'));
        } );

        });
  });

  function eliminar(iden) {
    deleteProv( iden);
    console.log(iden)
  }


  function editar(iden) {
    $('#myModal').modal('show');
    editStatus = true; 
    id = iden;

    getProvs(iden).then((doc) => {
        if (doc.exists) {
          const dataProv = doc.data()
          ClientProv['codigo'].value = dataProv.codigo;
          ClientProv['nombre'].value = dataProv.nombre;
          ClientProv['telefono'].value = dataProv.telefono;
          ClientProv['correo'].value = dataProv.correo;
          ClientProv['descripcion'].value = dataProv.descripcion;
          ClientProv['btn-task-form'].innerText = 'Actualizar';
        } 
      });

  }



  function limpiar() {
    ClientProv.reset();
    editStatus = false; 
    ClientProv['btn-task-form'].innerText = 'Guardar';
  }
    
     /* Se obtienen los datos que se escriben en el formulario del cliete */
     ClientProv.addEventListener('submit' , async e => { //crea el evento lo que se requiere que haga
      e.preventDefault();
  
      const codigo = "PRV - " + codProvee;//.value;//crea las variables con lo que se le coloque en el campo task-title
      const nombre = ClientProv['nombre'];//.value;//crea las variables con lo que se le coloque en el campo task-description
      const telefono = ClientProv['telefono'];//.value;//crea las variables con lo que se le coloque en el campo task-description
      const correo = ClientProv['correo'];//.value;//crea las variables con lo que se le coloque en el campo task-description
      const descripcion = ClientProv['descripcion'];//.value;//crea las variables con lo que se le coloque en el campo task-description
   
      if(!editStatus){
        await saveProv(codigo, nombre.value, telefono.value, correo.value, descripcion.value ); //.value es para que guarde todo el elemento
      }else{
        await updateProv(id, {
          codigo: codigo,
          nombre: nombre.value,
          telefono: telefono.value,
          correo: correo.value,
          descripcion: descripcion.value

        })                    
      }
      ClientProv.reset(); //Para que cuando se le de guardar devuelvala página en blanco
      $('#myModal').modal('hide'); // cerrar el modal
      codigo.focus();
    
    
        
    
    })

