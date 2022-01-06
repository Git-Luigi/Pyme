
    const db = firebase.firestore();//liga la constante db a firebase
    const auth = firebase.auth(); //liga la constante con la autenticacion de Firebase
    

    var user = auth.currentUser; // estado actual del usuario
    var usuario; //variable para guardar el UID del user

    const ComprasForm = document.getElementById('compras-form'); // formulario de registro
    const table = document.getElementById("compra"); //tabla que se va a completar con los registros de firebase
    const userData = document.getElementById("userData");
    const tasksContainer = document.getElementById("tasks-container");
    var combo = document.getElementById("producto");

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
    var arrayProd = [];
    var arrayProd2 = [];

    
    /* Función para insertar datos con firebase */
    const saveCompra = (nombre, proveedor,fechCad, cantidad, precio, descripcion, imagen) => //se crea en forma de función para facilitar las cosas
        //en esta parte ya firebase es el .db entonces se le dice que cree una colección nueva que solo va a contener el documento que se le proporcionará 
        db.collection('compras').doc(usuario)
                .collection('listCompras').doc().set({ //el async-await, es para decir que va a tomar tiempo para que este codigo responda
            
            nombre,
            proveedor,
            fechCad,
            cantidad,
            precio,
            descripcion,
            imagen
            //imagen //son tareas asincronas, una vez que termine de guardar va a devolver una respuesta
        })
        .then(() => {
          arrayProv = [];
          Swal.fire({
            title: 'Producto Registrado',
            text: "Desea visualizar la lista de compras?",
            icon:'success',
            iconColor: '#28B463',
            showCancelButton: true,
            confirmButtonColor: '#154360',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#F39C12',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result.isConfirmed) {
              $('[href="#listaCompras"]').tab('show');
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
    const getProds= (id) => db.collection('productos').doc(usuario)
    .collection('listProductos').doc(id).get();
    
    
     const getCompra = () => db.collection('compras').doc(usuario)
     .collection('listCompras').get(); //lo que se le dice es que desde la base de datos de firebase, obtenga todas las "tasks"   
     //importante, hay que ponerle el nombres a como aparece en la colección de firebase 


    const onGetCompra  = (callback) => db.collection('compras').doc(usuario)
    .collection('listCompras').onSnapshot(callback);

    const deleteCompra  = (id) => db.collection('compras').doc(usuario)
    .collection('listCompras').doc(id).delete();

    const getCompras= (id) => db.collection('compras').doc(usuario)
    .collection('listCompras').doc(id).get();

    const updateCompra = (id, updatedClient) => db.collection('compras').doc(usuario)
    .collection('listCompras').doc(id).update(updatedClient).then(() => {
      Swal.fire({
        title: 'Producto Actualizado',
        text: "Desea visualizar la lista de compras?",
        icon:'success',
        iconColor: '#28B463',
        showCancelButton: true,
        confirmButtonColor: '#154360',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#F39C12',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
          $('[href="#listaCompras"]').tab('show');
          document.getElementById('1').style.color = "gray";
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

    
    /* VALORES PARA LOS ComboBox */
        
    const getProv = () => db.collection('proveedor').doc(usuario)
     .collection('listProveedores').get();


     const onGetProv = (callback) => db.collection('proveedor').doc(usuario)
     .collection('listProveedores').onSnapshot(callback);

     const getProd = () => db.collection('productos').doc(usuario)
     .collection('listProductos').get(); //lo que se le dice es que desde la base de datos de firebase, obtenga todas las "tasks"   
     //importante, hay que ponerle el nombres a como aparece en la colección de firebase 


    const onGetProd = (callback) => db.collection('productos').doc(usuario)
    .collection('listProductos').onSnapshot(callback);



    
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

      /* const querySnapshot = await getProd();
        onGetProd((querySnapshot) => {  
          tasksContainer.innerHTML = ""; 
          arrayDatos = [];      
          
          //table.innerHTML = ''
          querySnapshot.forEach((doc) => {
            const prod = doc.data();
            prod.id = doc.id;  
           

            // guardamos los datos en un array
            /* arrayDatos = arrayDatos.concat([[prod.id, prod.nombre, prod.proveedor, caducidad,
              prod.cantidad , prod.precio, 
              '<button class="btnEdit" id="'+(prod.id)+'" onclick="editar(this.id)"><i class="far fa-edit"></i></button> <button id="'+(prod.id)+'" onclick="eliminar(this.id)" class="btnDelete"><i class="far fa-trash-alt"></i></button>'
                ]]);    
                
                    
                
            })

            
        }); */
        if (contador == 0){
          console.log(contador);
          
        const querySnapshoProv = await getProv();
          onGetProv((querySnapshoProv) =>{
            querySnapshoProv
            .forEach((doc) => {

              const prov = doc.data();
              prov.id =doc.id;
            console.log(prov.id)
              arrayProv = arrayProv.concat([[prov.cedula + " - " +prov.nombre]]);
            })
            //arrayProv = arrayProv.concat(['Otro Provedor']);
            var array = arrayProv;
            console.log(array)
            //prueba ricardo

        
            // Ordena el Array Alfabeticamente, es muy facil ;)):
            array.sort();
           
            addOptions("proveedor", array);
          }) 

          const querySnapshoProd = await getProd();
            onGetProd((querySnapshoProd) =>{
            querySnapshoProd
            .forEach((doc) => {
              const prod = doc.data();
              prod.id =doc.id;
              console.log(prod.id)
              arrayProd = arrayProd.concat([prod.nombre]);
              arrayProd2 = arrayProd2.concat([prod.id]);
              
            })
            var array = arrayProd;
            var array2= arrayProd2;
        
            // Ordena el Array Alfabeticamente, es muy facil ;)):
            array.sort();
           
            addOptions("producto", array, array2);
        
        
          }) 
          contador++;
        } //cierra if para no repetir datos del datatable
        
      /// tabla de clientes
      $(document).ready(function() {
        $('#compras').DataTable( {
          destroy: true,
          /* data: arrayDatos, */
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
                { title: "IVA" },
                { title: "Precio Final" },
                { title: "Acciones" }
            ]
        } );

        
      } ); //cierra datatable

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
    getProds(iden).then((doc) => {
      if (doc.exists) {
        const dataProd = doc.data();
        var cod = dataProd.codigo;
        console.log(cod);
        var borr = storageRef.child(`${dataProd.imagen}`)
        borr.delete();
        
        deleteProd( iden);
      } 
    });
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
      document.getElementById('3').style.color = "gray";
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
              ComprasForm['fecha'].value = dataProd.fechCad;
            }
            ComprasForm['nombre'].value = dataProd.nombre;
            ComprasForm['proveedor'].value = dataProd.proveedor;
            ComprasForm['descripcion'].value = dataProd.descripcion;
            ComprasForm['cantidad'].value = dataProd.cantidad;
            ComprasForm['precio'].value = dataProd.precio;
          //ComprasForm['imagen'].value = dataProd.imagen;
            
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
  function addOptions(domElement, array, array2) {
    var select = document.getElementsByName(domElement)[0];
    combo.addEventListener("change", function(){
      var sele = combo.value;
      for(value in array2){
          getProds(array2[value]).then((doc) => {
            const dataProd = doc.data()
            if (doc.exists) { 
              if(dataProd.nombre == sele){
                ComprasForm['precio'].value = dataProd.precio;

                                
              }
              
              /* ClientProd['nombre'].value = dataProd.nombre;
              ClientProd['descripcion'].value = dataProd.descripcion;
              ClientProd['precio'].value = dataProd.precio;
              ClientProd['imagen'].value = dataProd.imagen; */
              
            } 
          });        


        
      }

    });


    for (value in array) {
    var option = document.createElement("option");
    option.text = array[value];
    select.add(option);
    }
  }
    
    /* Se obtienen los datos que se escriben en el formulario del cliete */
    ComprasForm.addEventListener('submit' , async e => { //crea el evento lo que se requiere que haga
        e.preventDefault();


        var file; // use the Blob or File 
        const nombre = ComprasForm['nombre'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const proveedor = ComprasForm['proveedor'];
        const fechCad = ComprasForm['fecha'];
        const cantidad = ComprasForm['cantidad'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const precio = ComprasForm['precio'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const imagen = ComprasForm['imagen'];//.value;//crea las variables con lo que se le coloque en el campo task-description
        const descripcion = ComprasForm['descripcion'];//.value;//crea las variables con lo que se le coloque en el campo task-description
       

        if(!editStatus){

          await saveProd(nombre.value, proveedor.value, fechCad.value ,cantidad.value, precio.value, descripcion.value, saveImage); //.value es para que guarde todo el elemento

        }else{
          await updateProd(id, {
            codigo: codigoProdEdit,
            nombre: nombre.value,
            proveedor: proveedor.value,
            fechCad: fechCad.value ,
            cantidad: cantidad.value,
            precio: precio.value,
            descripcion: descripcion.value
          })  
        }
        /* ComprasForm.reset(); //Para que cuando se le de guardar devuelvala página en blanco
        
        document.getElementById("fecha").disabled = false; */
        fecha.focus();
    
    
        
    
    })

