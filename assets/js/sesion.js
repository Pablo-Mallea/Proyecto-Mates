//---------------- Inicio de sesión ----------------------------

let validarUsuario = document.getElementById("validarUsuario")

validarUsuario.onclick = () => {
    let mail = document.getElementById("user").value;
    let password = document.getElementById("password").value;

    let usuarios = JSON.parse(localStorage.getItem("Usuarios"));
    console.log(usuarios)
    if(usuarios){
        if(usuarios.find(el => el.mail === mail && el.password === password)) {

            let userlog = usuarios.filter(el => el.mail )
            sessionStorage.setItem("sesionUsuario", JSON.stringify(userlog))
    
            console.log("usuario correcto")
            Toastify({
                text: "Sesión Iniciada",
                duration: 1500,
                gravity: "top",
                position: "right",
                className: "notificacion",
    
            }).showToast();
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 1000)
    
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Usuario no valido',
                text: 'Revise que los datos sean correctos',
                confirmButtonText: 'Ok'
            });
        }
    }
}
//---------------- Registro de usuario ----------------------

const validarRegistro = document.getElementById("validarRegistro")

validarRegistro.onclick = (event) => {
    event.preventDefault()
    let usuarios = localStorage.getItem("Usuarios") ? JSON.parse(localStorage.getItem("Usuarios")) : [];


    let nuevoUsuario = {
        user: document.getElementById("userId").value,
        mail: document.getElementById("mail").value,
        calle: document.getElementById("calle").value,
        piso: document.getElementById("piso").value,
        password: document.getElementById("passwordId").value,
    }
    
    
    if(usuarios.find(el => el.mail === nuevoUsuario.mail)) {
        Swal.fire({
            icon: 'warning',
            text: 'Este correo ya se encuentra registrado',
            confirmButtonText: 'Ok'
        });

    }else {
        //--------- Registro el nuevo usuario ----------

        let passwordIdCheck = document.getElementById("passwordIdCheck").value;

        if (nuevoUsuario.user != '' && nuevoUsuario.mail != '' && nuevoUsuario.password != '') {
            if(nuevoUsuario.password === passwordIdCheck) {
                usuarios.push(nuevoUsuario)
                Toastify({
                    text: "Usuario creado con exito",
                    duration: 1500,
                    gravity: "top",
                    position: "right",
                    className: "notificacion",
                }).showToast();


            } else {
                Swal.fire({
                    icon: 'error',
                    text: 'Las contraseñas no coninsiden',
                    confirmButtonText: 'Continuar'
                })
            }
            if (localStorage) {
                localStorage.setItem("Usuarios", JSON.stringify(usuarios));
            }
        }
    }
}

//---------- navbar responsive -----------
let btnNav = document.getElementsByClassName("btn-nav")[0];
let navLinks = document.getElementsByClassName("navbar-links")[0];

btnNav.addEventListener('click', () => {
    navLinks.classList.toggle('active')
})
