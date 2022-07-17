//Incorporando FETCH

document.addEventListener("DOMContentLoaded", () => { 
    //Funciones que llamo al cargar la pagina
    cargarCarrito();
    cargoProductos();
    mostrarCarrito();
})

let contenedor_productos = document.getElementById("productos")
let contenedor_carrito = document.getElementById("carrito")
let carrito = [];

//Obtengo los datos del .json
const getProductos = () =>{
    return new Promise ((resolve, reject) => {
        fetch('./assets/data/productos.json')
        .then(response => response.json())
        .then(data => {resolve(data)})
        .catch(error => {reject(error)})
    })
}

//Cargo los productos del localStorage
const cargarCarrito = () => {
    carrito = JSON.parse(localStorage.getItem("StorageProductos")) || localStorage.setItem("StorageProductos", JSON.stringify(carrito));
    console.log(carrito)
}

//Cargo los productos
const cargoProductos = async() => {
    let data = await getProductos();
    console.log(data)
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
                    <input type="number" id="cant${productos.id}" placeholder="Cantididad..."> 
                    <button class="btn-comprar" onClick="seleccionProductos(${productos.id})">Comprar</button>
                </div>
            </div>
            
        </div>
        `
    });
}


//Agrego los productos seleccionados al carrito

const seleccionProductos = async(id_seleccionado) => {
    let data = await getProductos();
    console.log(data);

    (document.getElementById("cant1")) ? cant1 = document.getElementById("cant1").value: cant1 = 0;
    (document.getElementById("cant2")) ? cant2 = document.getElementById("cant2").value: cant2 = 0;
    (document.getElementById("cant3")) ? cant3 = document.getElementById("cant3").value: cant3 = 0;
    (document.getElementById("cant4")) ? cant4 = document.getElementById("cant4").value: cant4 = 0;
    (document.getElementById("cant5")) ? cant5 = document.getElementById("cant5").value: cant5 = 0;
    (document.getElementById("cant6")) ? cant6 = document.getElementById("cant6").value: cant6 = 0;

    cant1 > 0 ? cantidad = +(cant1) : false
    cant2 > 0 ? cantidad = +(cant2) : false
    cant3 > 0 ? cantidad = +(cant3) : false
    cant4 > 0 ? cantidad = +(cant4) : false
    cant5 > 0 ? cantidad = +(cant5) : false
    cant6 > 0 ? cantidad = +(cant6) : false

    let indice = id_seleccionado - 1;

    let objeto_seleccionado = {};
    objeto_seleccionado = {
        ...data[indice],
        cantidad: cantidad
    }
    console.log(objeto_seleccionado)
    if (!carrito.some((el) => el.id == id_seleccionado)) { //Sino existe el producto en el carrito lo agrego

        carrito.push(objeto_seleccionado);
        console.log(carrito)
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

    } else { //Si existe el producto en el carrito
        Swal.fire({ 
            text: 'Debes eliminar el producto del carrito primero',
            icon: 'info',
            confirmButtonText: 'ok'
        })
    }
}



//Muestro los productos del carrito
const mostrarCarrito = () =>{
    contenedor_carrito.innerHTML = ``
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
//Elimino productos del carrito
function eliminar_producto(id_seleccionado) {
    let eliminar = carrito.filter((e) => e.id != id_seleccionado)
    carrito = eliminar;
    localStorage.setItem("StorageProductos", JSON.stringify(carrito))

    Toastify({ //Libreria toastify
        text: "Producto eliminado del carrito",
        duration: 1500,
        gravity: "top",
        position: "right", 
        className: "notificacion-1",
    }).showToast();

    setTimeout(() => {
        contenedor_carrito.innerHTML=``
        mostrarCarrito();
    }, 1000)
}
console.log(carrito)


//Calculo los productos
let calcular = document.getElementById("calcular");

let resultado = 0;
let cuotas = 0;

calcular.onclick = () => {

    for (let i = 0; i < carrito.length; i++) {
        resultado = carrito[i].precio * carrito[i].cantidad + resultado;
    }
    console.log(resultado)
    let calculo = document.getElementById("calculo")
    calculo.innerHTML = `
        <p>$ ${resultado}</p>

    `
    cuenta = resultado;
    resultado = 0;

}

let pagar = document.getElementById("pagar")
pagar.onclick = () => {
    let cuotas = 0;

    cuotas = document.getElementById("cuotas").value;
    contenedor_cuotas = document.getElementById("contenedor_cuotas");

    console.log(cuotas)
    if ( 12 >= cuotas && cuotas > 0 && cuenta > 0) {
        cu = cuenta / cuotas;
        console.log(cu)
        cu = cu.toFixed(2)

        Swal.fire( {
            icon: 'success',
            html: `<p>Total $${cuenta} en ${cuotas} cuota/s de $ ${cu}</p>`,
            confirmButtonText: 'continuar'
        })
    }
}

//Filtrar productos
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

const filtros = async(e) =>{
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
        ` : false
        });
    }

}

