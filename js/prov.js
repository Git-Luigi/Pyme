
    const db = firebase.firestore();//liga la constante db a firebase
    const auth = firebase.auth(); //liga la constante con la autenticacion de Firebase
    var user = auth.currentUser; // estado actual del usuario
    var usuario; //variable para guardar el UID del user
    const ProvForm = document.getElementById('proveedor-form'); // formulario de registro
    //var table = $('#provs').DataTable(); //tabla que se va a completar con los registros de firebase
    const userData = document.getElementById("userData");
    var editStatus = false;
    var documento = '';
    var id = '';
    var nameU, email, photoUrl, uid, emailVerified;

       /* Función para obtener datos con firebase*/
    
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
    .collection('listProveedores').doc(id).update(updateProv).then(() => {
      limpiar();
        Swal.fire({
          title: 'Actualizacion Completa',
          text: "Desea visualizar la lista de proveedores?",
          icon:'success',
          iconColor: '#28B463',
          showCancelButton: true,
          confirmButtonColor: '#154360',
          cancelButtonText: 'Cancelar',
          cancelButtonColor: '#F39C12',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.isConfirmed) {
            $('[href="#listaProv"]').tab('show');
            document.getElementById('1').style.color = "gray";
            document.getElementById('2').style.color = "orange";
            document.querySelector(".cedula").disabled = false;
          }else{
            document.querySelector(".cedula").disabled = false;
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
    const saveProv = (cedula, nombre, arryTels, arrayEmails, descripcion) => //se crea en forma de función para facilitar las cosas
        //en esta parte ya firebase es el .db entonces se le dice que cree una colección nueva que solo va a contener el documento que se le proporcionará 
        
         
        
        db.collection('proveedor').doc(usuario)
                .collection('listProveedores').doc().set({ //el async-await, es para decir que va a tomar tiempo para que este codigo responda
            cedula,
            nombre,
            arryTels,
            arrayEmails,
            descripcion //son tareas asincronas, una vez que termine de guardar va a devolver una respuesta
        })
        .then(() => {
          limpiar();
          Swal.fire({
            title: 'Registro Completo',
            text: "Desea visualizar la lista de proveedores?",
            icon:'success',
            iconColor: '#28B463',
            showCancelButton: true,
            confirmButtonColor: '#154360',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#F39C12',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result.isConfirmed) {
              $('[href="#listaProv"]').tab('show');
              document.getElementById('1').style.color = "gray";
              document.getElementById('2').style.color = "orange";
            }else{
              
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

            var telefonos= "";
            var correos= "";

            for(let i=0; i<((prov.arryTels).length); i++){
              if(i ==0){
                telefonos = prov.arryTels[i];
              }else{
                telefonos += ", "+ prov.arryTels[i];
              }
            }

            for(let i=0; i < ((prov.arrayEmails).length); i++){
              if(i ==0){
                correos = prov.arrayEmails[i];
              }else{
                correos += ", "+ prov.arrayEmails[i];
              }
            }
            
            
              arrayDatos = arrayDatos.concat([[prov.id, prov.cedula, prov.nombre , telefonos,
                correos , prov.descripcion, 
                '<button class="btnEdit" id="'+(prov.id)+'" onclick="editar(this.id)"><i class="far fa-edit"></i></button> <button id="'+(prov.id)+'" onclick="eliminar(this.id)" class="btnDelete"><i class="far fa-trash-alt"></i></button>'
                 ]]);


                                    
          })

          /// tabla de proves
          $(document).ready(function() {
            
            $('#proveedor').DataTable( {
              destroy: true,
              data: arrayDatos,
              columnDefs: [
                {
                    orderable: false,
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
        deleteProv( iden);
        Swal.fire({
          title:'Eliminado!',
          text: 'El proveedor se ha eliminado.',
          icon:'success',
          iconColor: '#28B463',
          confirmButtonColor: '#154360',
          confirmButtonText: 'Aceptar'
        })
      }else{
        Swal.fire({
          title:'Cancelado!',
          text: 'No se ha eliminado el registro del proveedor.',
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
      text: "Desea modificar los datos del provedor?",
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
      $('[href="#addProveedor"]').tab('show');
      document.getElementById('2').style.color = "gray";
      document.getElementById('1').style.color = "orange";
      document.querySelector(".cedula").disabled = true;

      editStatus = true; 
      id = iden;

      getProvs(iden).then((doc) => {
          if (doc.exists) {
            const dataprov = doc.data()

              ProvForm['correo2'].value = dataprov.arrayEmails[1];
              ProvForm['telefono2'].value = dataprov.arryTels[1];

            ProvForm['telefono'].value = dataprov.arryTels[0];
            ProvForm['correo'].value = dataprov.arrayEmails[0];
            ProvForm['cedula'].value = dataprov.cedula;
            ProvForm['nombre'].value = dataprov.nombre;
            ProvForm['descripcion'].value = dataprov.descripcion;
            
          } 
        });
      });
  }



  function limpiar() {
    ProvForm.reset();
    document.querySelector(".cedula").disabled = false;
    editStatus = false;
    $(".phone").hide();
    $(".email").hide();

  }
  
  function checkProv(ced){
    var result = 'false';
    if(arrayDatos.length > 0){
      for (var i = 0; i < arrayDatos.length; i+=1) {
        if(arrayDatos[i][1] == ced){
          result = 'true';
          return result;
        }
        
      } 
      result = 'false';
    }
    return result;
  }

 
    /* Se obtienen los datos que se escriben en el formulario del cliete */
    ProvForm.addEventListener('submit' , async e => { //crea el evento lo que se requiere que haga
        e.preventDefault();
    
        const cedula = ProvForm['cedula'];//.value;//crea las variables con lo que se le coloque en el campo task-title
        const nombre = ProvForm['nombre'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const telefono = ProvForm['telefono'] ;//.value;//crea las variables con lo que se le coloque en el campo task-description
        const telefono2 = ProvForm['telefono2'] ;
        const descripcion = ProvForm['descripcion'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const correo = ProvForm['correo'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const correo2 = ProvForm['correo2'];
        
        //console.log("ced: " + cedula +"nom: " + nombre + " fec: " + fecha + "tel: " + telefono + "corr: " +correo + "dir: "+direccion)
       // await saveprov(cedula.value, nombre.value, telefono.value, direccion.value, correo.value, fecha.value ); //.value es para que guarde todo el elemento

       var telefonos= [telefono.value, telefono2.value];
       var correos = [correo.value, correo2.value];

        if(!editStatus){

          if(checkProv(cedula.value) =="true"){
            Swal.fire({
              title:'Error!',
              text: 'Este Proveedor ya se encuentra registrado!!',
              icon:'error',
              iconColor: '#C0392B',
              confirmButtonColor: '#154360',
              confirmButtonText: 'Aceptar'
            })
          } else{
            await saveProv(cedula.value, nombre.value, telefonos, correos, descripcion.value ); //.value es para que guarde todo el elemento    

          }
        }else{
            await updateProv(id, {
              cedula: cedula.value,
              nombre: nombre.value,
              arryTels: telefonos,
              arrayEmails: correos,
              descripcion: descripcion.value
  
            })
          
          
        }
        ProvForm.reset(); //Para que cuando se le de guardar devuelvala página en blanco
        nombre.focus();
         /*
        window.location.assign("index.php#tabListprove") */
    
    
        
    
    })

