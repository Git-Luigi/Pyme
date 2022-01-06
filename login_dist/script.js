const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
var usuario = firebase.auth().currentUser;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      location.href ="../index.php"
     
    /* auth.signOut().then(() => {
        console.log('sign out')
    }) */


    } else {
        
    }
  });

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


//FIREBASE REGISTRO EMAIL Y CONTRASEÑA

const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const signupName = document.querySelector('#signup-name').value;
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;

    auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            signupForm.reset();
            console.log('sign up')
        })

})

//INICIAR SESIÓN FIREBASE EMAIL Y CONTRASEÑA

const signinForm = document.querySelector('#login-form')

signinForm.addEventListener('submit', e =>{
    e.preventDefault();

    const email = document.querySelector('#login_email').value;
    const password = document.querySelector('#login_password').value;


    auth.signInWithEmailAndPassword(email, password).then(userCredential => {
        console.log('sign in')
   
    })

})

/*
//LOG OUT FIREBASE

//const logout1 = document.querySelector("#logout")

logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('sign out')
    })

})
*/

//TRAER DATOS DE FIREBASE
const postList = document.querySelector('.posts');
const setupPost = data =>{
    if(data.length){
        let html = '';
        data.forEach(doc =>{
            const post = doc.data()
            const li = `
            <li class="list-group-item list-group-item-action">
                <h5>${post.titulo}</h5>
                <p>${post.descripcion}</p>
            </li>
            `;
            html += li; 
            postList.innerHTML = "picha";
 
        });
        postList.innerHTML = html;
    }else{
        postList.innerHTML = '<p classes="text-center"> Login to see posts </p>'
    }
}


//Events
//list for auth state changes
auth.onAuthStateChanged(user => {
    if (user){
        fs.collection('cliente')
            .get()
            .then((snapshot) =>{
                console.log(snapshot.docs)
                setupPost(snapshot.docs)
            })
    } else{
        setupPost([])
    }
})

//LOGIN WITH GOOGLE
const googleButton = document.querySelector('#googlelogin')
googleButton.addEventListener('click', e => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result =>{
            location.href = "../index.php"
        })
        .catch(err =>{
            console.log(Object)
        })
})

//LOGIN WITH FACEBOOK

const facebookButton = document.querySelector('#facebooklogin')
facebookButton.addEventListener('click', e=>{
    e.preventDefault();
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then(result =>{
            console.log(result)
            console.log('facebook login')
            location.href = "../index.php"
        })
        .catch(err =>{
            console.log(err)
        })
})
