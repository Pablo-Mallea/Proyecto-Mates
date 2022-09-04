//------------ Funciones que llamo al cargar la pagina --------------

document.addEventListener("DOMContentLoaded", () => {
    cargarCarrito();
    cargoProductos();
    mostrarCarrito();
    sesionIniciada();
})

let contenedor_productos = document.getElementById("productos")
let contenedor_carrito = document.getElementById("carrito")
let carrito = [];

//----------- Obtengo los datos del .json -------------

const getProductos = () => {
    return new Promise((resolve, reject) => {
        fetch('./assets/data/productos.json')
            .then(response => response.json())
            .then(data => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

//---------- Cargo los productos del localStorage ----------

const cargarCarrito = () => {

    carrito = JSON.parse(localStorage.getItem("StorageProductos")) || localStorage.setItem("StorageProductos", JSON.stringify(carrito));

}

//---------- Cargo los productos --------------

const cargoProductos = async () => {

    let data = await getProductos();

    data.forEach(productos => {
        contenedor_productos.innerHTML += `
        <div class="card">
            <div class="foto_producto">
                <img class="imagen" src="${productos.imagen}">
            </div>
            <div class="card_body">
                <p>${productos.name}</p>
                <p>$ ${productos.precio}</P>
                <div class="flex-row">
                    <input type="number" id="cant${productos.id}" placeholder="cantididad" min="1">
                    <button class="btn-comprar" onClick="seleccionProductos(${productos.id})">Comprar</button>
                </div>
            </div>
            
        </div>
        `
    });
}

//----- Agrego los productos seleccionados al carrito -----

const seleccionProductos = async (id_seleccionado) => {
    
    let data = await getProductos();
    
    let cantidad = 0;

    (document.getElementById("cant1")) ? cant1 = document.getElementById("cant1").value: cant1 = 0;
    (document.getElementById("cant2")) ? cant2 = document.getElementById("cant2").value: cant2 = 0;
    (document.getElementById("cant3")) ? cant3 = document.getElementById("cant3").value: cant3 = 0;
    (document.getElementById("cant4")) ? cant4 = document.getElementById("cant4").value: cant4 = 0;
    (document.getElementById("cant5")) ? cant5 = document.getElementById("cant5").value: cant5 = 0;
    (document.getElementById("cant6")) ? cant6 = document.getElementById("cant6").value: cant6 = 0;

    switch (id_seleccionado) {
        case 1:
            cant1 > 0 ? cantidad = +(cant1) : false;
            break;
        case 2:
            cant2 > 0 ? cantidad = +(cant2) : false;
            break;
        case 3:
            cant3 > 0 ? cantidad = +(cant3) : false;
            break;
        case 4:
            cant4 > 0 ? cantidad = +(cant4) : false;
            break;
        case 5:
            cant5 > 0 ? cantidad = +(cant5) : false;
            break;
        case 6:
            cant6 > 0 ? cantidad = +(cant6) : false;
            break;
    }

    if (cantidad > 0) {
        let indice = id_seleccionado - 1;

        let objeto_seleccionado = {};
        objeto_seleccionado = {
            ...data[indice],
            cantidad: cantidad
        }

        if (!carrito.some((el) => el.id == id_seleccionado)) { //Sino existe el producto en el carrito lo agrego

            carrito.push(objeto_seleccionado);
            localStorage.setItem("StorageProductos", JSON.stringify(carrito));

            Toastify({
                text: "Producto agregado al carrito",
                duration: 2000,
                gravity: "top",
                position: "right",
                className: "notificacion",
            }).showToast();

            setTimeout(() => {
                mostrarCarrito()
            }, 1000)

        } else {
            Swal.fire({
                text: 'Debes eliminar el producto del carrito primero',
                icon: 'info',
                confirmButtonText: 'OK'
            })
        }

    } else {
        Swal.fire({
            text: 'Indica la cantidad primero',
            icon: 'info',
            confirmButtonText: 'OK'
        })
    }
    console.log(id_seleccionado)
}

//------- Muestro los productos del carrito -------

const mostrarCarrito = () => {

    contenedor_carrito.innerHTML = ``;
    carrito.forEach((carrito) => {
        contenedor_carrito.innerHTML += `
        <div class="cards_carrito">
            <div class="info_producto">
                <div class="foto_carrito">
                    <img class="imagen" src="${carrito.imagen}">
                </div>
                <p>${carrito.name}</p>
                <p>$ ${carrito.precio}</P>
                <p> x${carrito.cantidad}</p>

            </div>
            <div class="eliminar">
                <button onClick="eliminar_producto(${carrito.id})" class="btn-eliminar">Eliminar</button>
            </div>
        </div>
        `
    });
}

//------- Elimino productos del carrito ------

function eliminar_producto(id_seleccionado) {
    let eliminar = carrito.filter((e) => e.id != id_seleccionado)
    carrito = eliminar;
    localStorage.setItem("StorageProductos", JSON.stringify(carrito))

    Toastify({
        text: "Producto eliminado del carrito",
        duration: 1500,
        gravity: "top",
        position: "right",
        className: "notificacion-1",
    }).showToast();

    setTimeout(() => {
        mostrarCarrito();

    }, 1000)
}

//------ Calculo los productos -------

let calcular = document.getElementById("calcular");
let resultado = 0;
let cuotas = 0;

calcular.onclick = () => {

    for (let i = 0; i < carrito.length; i++) {
        resultado = carrito[i].precio * carrito[i].cantidad + resultado;
    }

    let calculo = document.getElementById("calculo")
    calculo.innerHTML = `
        <p>$ ${resultado}</p>
    `
    cuenta = resultado;
    resultado = 0;
}

let pagar = document.getElementById("pagar")
pagar.onclick = () => {

    let usuario = JSON.parse(sessionStorage.getItem("sesionUsuario"))

    let cuotas = 0;
    cuotas = document.getElementById("cuotas").value;
    contenedor_cuotas = document.getElementById("contenedor_cuotas");

    if (12 >= cuotas && cuotas > 0 && cuenta > 0) {
        cu = cuenta / cuotas;
        console.log(cu)
        cu = cu.toFixed(2)
        if (usuario) {
            Swal.fire({
                icon: 'success',
                html: `<p>Total $${cuenta} en ${cuotas} cuota/s de $ ${cu}</p>`,
                confirmButtonText: 'Continuar'
            })
        } else {
            Swal.fire({
                icon: 'error',
                titel: 'Debes Inicar sesión primero',
                html: `<a href="../pages/login.html" >Accede a tu cuenta o crea una pinchando aquí</a>`,
                confirmButtonText: 'Continuar'
            })
        }
    }
}

//------------- Filtrar productos --------------------

let todos = document.getElementById("btn-todos")
let mates = document.getElementById("btn-mates")
let yerba = document.getElementById("btn-yerba")
let bombilla = document.getElementById("btn-bombilla")

todos.onclick = () => {
    filtros("todos");
}
mates.onclick = () => {
    filtros("mate");
}
yerba.onclick = () => {
    filtros("yerba");
}
bombilla.onclick = () => {
    filtros("bombilla");
}

const filtros = async (e) => {

    if (e == "todos") {
        contenedor_productos.innerHTML = ``;
        cargoProductos();
    } else {
        let data = await getProductos();
        contenedor_productos.innerHTML = ``;
        data.forEach(productos => {

            productos.categoria == e ?
                contenedor_productos.innerHTML += `
            <div class="card">
                <div class="foto_producto">
                    <img class="imagen" src="${productos.imagen}">
                </div>
                <div class="card_body">
                    <p>${productos.name}</p>
                    <p>$ ${productos.precio}</P>
                    <div class="flex-row">
                        <input type="number" id="cant${productos.id}" placeholder="Cantididad..."> 
                        <button class="btn-comprar" onClick="seleccionProductos(${productos.id})">Comprar</button>
                    </div>
                </div>
            </div>
            ` : false;
        });
    }
}

//---------- Si hay inicio de sesión -----------

let sesion = document.getElementById("sesion");

function sesionIniciada() {
    let usuario = JSON.parse(sessionStorage.getItem("sesionUsuario"))
    if (usuario) {
        usuario.find(el => {
            nombre = el.user.toUpperCase();

            sesion.innerHTML = `
                <button id="cerrarSesion" class="btn-inicio" type="button" >${nombre}</button>
            `
        })

        let cerrarSesion = document.getElementById("cerrarSesion");
        cerrarSesion.onclick = () => {
            sessionStorage.removeItem("sesionUsuario");
            window.location.href = "../pages/login.html";
        }
    }
}

//--------- navbar responsive ----------
let btnNav = document.getElementsByClassName("btn-nav")[0];
let navLinks = document.getElementsByClassName("navbar-links")[0];

btnNav.addEventListener('click', () => {
    navLinks.classList.toggle('active')
})