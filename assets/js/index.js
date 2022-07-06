//Entrega Final 2

let contenedor_productos = document.getElementById("productos")
let contenedor_carrito = document.getElementById("carrito")
let carrito = [];
console.log(carrito)

//Funciones que llamo
cargarCarrito();
mostrarCarrito();
cargoProductos();

//Cargo los productos del localStorage
function cargarCarrito() {

    carrito = JSON.parse(localStorage.getItem("StorageProductos")) || localStorage.setItem("StorageProductos", JSON.stringify(carrito));
}

//Cargo los productos
function cargoProductos() {
    productos.forEach(productos => {
        contenedor_productos.innerHTML += `
        <div class="card">
            <div class="foto_producto">
                <img class="imagen" src="${productos.imagen}">
            </div>
            <div class="card_body">
                <p>${productos.name}</p>
                <p>$ ${productos.precio}</P>
                <div class="flex-row">
                    
                    <button class="btn-comprar" onClick="seleccionProductos(${productos.id})">Comprar</button>
                </div>
            </div>
            
        </div>
        `
    });
}

//Agrego los productos seleccionados al carrito
let cantidad = [];

function seleccionProductos(id_seleccionado) {
    let indice = id_seleccionado - 1;

    let objeto_seleccionado = {};
    objeto_seleccionado = productos[indice];

    carrito.push(objeto_seleccionado);
    console.log(carrito)

    localStorage.setItem("StorageProductos", JSON.stringify(carrito));
    location.reload()

}

//Muestro los productos del carrito
function mostrarCarrito() {
    carrito.forEach((carrito) => {
        contenedor_carrito.innerHTML += `
        <div class="cards_carrito">
            <div class="info_producto">
                <div class="foto_carrito">
                    <img class="imagen" src="${carrito.imagen}">
                </div>
                <p>${carrito.name}</p>
                <p>$ ${carrito.precio}</P>
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
    location.reload();
}
console.log(carrito)


//Calculo los productos
let calcular = document.getElementById("calcular");

let resultado = 0;
let cuotas = 0;

calcular.onclick = () => {

    for (let i = 0; i < carrito.length; i++) {
        resultado = carrito[i].precio + resultado;
    }
    console.log(resultado)
    let calculo = document.getElementById("calculo")
    calculo.innerHTML = `
        <p>$ ${resultado}</p>

    `
    cuenta = resultado;
    resultado = 0;

}

limpiar.onclick = () => {
    location.reload();
}

let pagar = document.getElementById("pagar")
pagar.onclick = () => {
    let cuotas = 0;

    cuotas = document.getElementById("cuotas").value;
    contenedor_cuotas = document.getElementById("contenedor_cuotas");

    console.log(cuotas)
    if (cuotas > 0 && cuenta > 0) {
        cu = cuenta / cuotas;
        console.log(cu)
        cu = cu.toFixed(2)

        contenedor_cuotas.innerHTML = `<p>Total $${cuenta} en ${cuotas} cuotas de $ ${cu}</p>`
    }
}