
    const db = firebase.firestore();//liga la constante db a firebase
    const auth = firebase.auth(); //liga la constante con la autenticacion de Firebase
    var user = auth.currentUser; // estado actual del usuario
    var usuario; //variable para guardar el UID del user
    const ClientForm = document.getElementById('client-form'); // formulario de registro
    //var table = $('#clients').DataTable(); //tabla que se va a completar con los registros de firebase
    const userData = document.getElementById("userData");
    var editStatus = false;
    var documento = '';
    var id = '';
    var ced ='';
    var nameU, email, photoUrl, uid, emailVerified;

       /* Función para obtener datos con firebase ----- NO ESTA CONSULTANDO POR EL MOMENTO*/
    
    
       const getClient = () => db.collection('clientes').doc(usuario)
       .collection('listClientes').get(); //lo que se le dice es que desde la base de datos de firebase, obtenga todas las "tasks"   
       //importante, hay que ponerle el nombres a como aparece en la colección de firebase 
  
  
      const onGetClient = (callback) => db.collection('clientes').doc(usuario)
      .collection('listClientes').onSnapshot(callback);
  
      const deleteClient = (id) => db.collection('clientes').doc(usuario)
      .collection('listClientes').doc(id).delete();
  
      const getClients= (id) => db.collection('clientes').doc(usuario)
      .collection('listClientes').doc(id).get();
  
      const updateClient= (id, updatedClient) => db.collection('clientes').doc(usuario)
      .collection('listClientes').doc(id).update(updatedClient).then(() => {
        Swal.fire({
          title: 'Registro Completo',
          text: "Desea visualizar la lista de clientes?",
          icon:'success',
          iconColor: '#28B463',
          showCancelButton: true,
          confirmButtonColor: '#154360',
          cancelButtonText: 'Cancelar',
          cancelButtonColor: '#F39C12',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.isConfirmed) {
            $('[href="#listaClientes"]').tab('show');
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
  
    
    /* Función para insertar datos con firebase */
    const saveClient = (cedula, nombre, telefono, direccion, correo, fecha) => //se crea en forma de función para facilitar las cosas
        //en esta parte ya firebase es el .db entonces se le dice que cree una colección nueva que solo va a contener el documento que se le proporcionará 
        getClients(usuario).then((doc) => {
          if (doc.exists) {
            const dataClient = doc.data()
            ced = dataClient.cedula;
          } 
        });

        if (ced != cedula){
          db.collection('clientes').doc(usuario)
                .collection('listClientes').doc().set({ //el async-await, es para decir que va a tomar tiempo para que este codigo responda
            cedula,
            nombre,
            telefono,
            direccion,
            correo,
            fecha //son tareas asincronas, una vez que termine de guardar va a devolver una respuesta
          })
          .then(() => {
            Swal.fire({
              title: 'Registro Completo',
              text: "Desea visualizar la lista de clientes?",
              icon:'success',
              iconColor: '#28B463',
              showCancelButton: true,
              confirmButtonColor: '#154360',
              cancelButtonText: 'Cancelar',
              cancelButtonColor: '#F39C12',
              confirmButtonText: 'Confirmar'
            }).then((result) => {
              if (result.isConfirmed) {
                $('[href="#listaClientes"]').tab('show');
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
          
        }else{
          Swal.fire({
            icon: 'error',
            iconColor: '#C0392B',
            title: 'La tarea falló',
            text: 'El usuario ya existe',
            confirmButtonColor: '#154360',
            confirmButtonText: 'Aceptar'
          })
        }


         
        
        
    
    
 
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
        /* userData.innerHTML += `
        <label>${nameU}</label>
        `; */

      } else {
        console.log("no")
      }
    });

      const querySnapshot = await getClient();
        onGetClient((querySnapshot) => {  
          arrayDatos = [];        
          //table.innerHTML = ''
          querySnapshot.forEach((doc) => {
            const client = doc.data();
            client.id = doc.id;  
            // guardamos los datos en un array
            arrayDatos = arrayDatos.concat([[client.id, client.cedula, client.nombre , client.telefono , client.direccion ,
              client.correo , client.fecha, 
              '<button class="btnEdit" id="'+(client.id)+'" onclick="editar(this.id)"><i class="far fa-edit"></i></button> <button id="'+(client.id)+'" onclick="eliminar(this.id)" class="btnDelete"><i class="far fa-trash-alt"></i></button>'
               ]]);
               console.log(arrayDatos)
                                    
          })

          /// tabla de clientes
          $(document).ready(function() {
            
            $('#clients').DataTable( {
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
                searchPlaceholder: 'buscar cliente'
              },
              columns: [
                    { title: "docId" },
                    { title: "ID" },
                    { title: "Nombre" },
                    { title: "Tel&eacute;fono" },
                    { title: "Direcci&oacute;n" },
                    { title: "Correo" },
                    { title: "Fecha" },
                    { title: "Acciones" }
                ]
            } );
       
          var buttons = new $.fn.dataTable.Buttons( $('#clients').DataTable(), {
              buttons: [  
                {
                  //Botón para Excel
                  extend: 'excelHtml5',
                  footer: true,
                  title: 'Clientes',
                  filename: 'clientes_MYPYME',

                  //Aquí es donde generas el botón personalizado
                  text: '<button class="btnExcel"><i class="fas fa-file-excel"></i> Exportar Excel</button>',
                  exportOptions: {
                    columns: [  1, 2, 3, 4, 5, 6]
                  }
                },
                {
                    extend: 'pdfHtml5',
                    footer: true,
                    title: 'Clientes',
                    filename: 'clientes_MYPYME',

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
    Swal.fire({
      title: 'Eliminar registro?',
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
        deleteClient( iden);
        Swal.fire({
          title:'Eliminado!',
          text: 'El registro se ha eliminado.',
          icon:'success',
          iconColor: '#28B463',
          confirmButtonColor: '#154360',
          confirmButtonText: 'Aceptar'
        })
      }else{
        Swal.fire({
          title:'Cancelado!',
          text: 'No se ha eliminado el registro.',
          icon:'error',
          iconColor: '#C0392B',
          confirmButtonColor: '#154360',
          confirmButtonText: 'Aceptar'
        })
      }
    })
    
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
      $('[href="#addCliente"]').tab('show');
      document.getElementById('2').style.color = "gray";
      document.getElementById('1').style.color = "orange";

      editStatus = true; 
      id = iden;

      getClients(iden).then((doc) => {
          if (doc.exists) {
            const dataClient = doc.data()
            ClientForm['cedula'].value = dataClient.cedula;
            ClientForm['nombre'].value = dataClient.nombre;
            ClientForm['telefono'].value = dataClient.telefono;
            ClientForm['direccion'].value = dataClient.direccion;
            ClientForm['correo'].value = dataClient.correo;
            ClientForm['fecha'].value = dataClient.fecha;
          } 
        });
      });
  }



  function limpiar() {
    ClientForm.reset();
    editStatus = false; 
  }
    
  function saveCliente(){

  }
    /* Se obtienen los datos que se escriben en el formulario del cliete */
    ClientForm.addEventListener('submit' , async e => { //crea el evento lo que se requiere que haga
        e.preventDefault();
    
        const cedula = ClientForm['cedula'];//.value;//crea las variables con lo que se le coloque en el campo task-title
        const nombre = ClientForm['nombre'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const telefono = ClientForm['telefono'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const direccion = ClientForm['direccion'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const correo = ClientForm['correo'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const fecha = ClientForm['fecha'];//.value;//crea las variables con lo que se le coloque en el campo task-description
    
        //console.log("ced: " + cedula +"nom: " + nombre + " fec: " + fecha + "tel: " + telefono + "corr: " +correo + "dir: "+direccion)
       // await saveClient(cedula.value, nombre.value, telefono.value, direccion.value, correo.value, fecha.value ); //.value es para que guarde todo el elemento
    

        if(!editStatus){
          await saveClient(cedula.value, nombre.value, telefono.value, direccion.value, correo.value, fecha.value ); //.value es para que guarde todo el elemento
          
        }else{
          await updateClient(id, {
            cedula: cedula.value,
            nombre: nombre.value,
            telefono: telefono.value,
            direccion: direccion.value,
            correo: correo.value,
            fecha: fecha.value

          })
          
        }
        ClientForm.reset(); //Para que cuando se le de guardar devuelvala página en blanco
        cedula.focus(); /*
        window.location.assign("index.php#tabListCliente") */
    
    
        
    
    })

