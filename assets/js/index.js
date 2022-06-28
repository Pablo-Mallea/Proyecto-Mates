// Desafio Incorporando Eventos

class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }

}
const productos = [];

productos.push(new Producto(1, "Mate-1", 1000));
productos.push(new Producto(2, "Mate-2", 1500));
productos.push(new Producto(3, "Mate-3", 2000));

console.log(productos)

const id = productos.map((el) => el.id);
console.log(id)
const nombres = productos.map((el) => el.nombre);
console.log(nombres)
const precios = productos.map((el) => el.precio);
console.log(precios)

const seleccion = []; //Productos que selecciona
const cant = []; //Cantidad de ellos


let carrito = document.getElementById("compras")
let total = 0;


let btn1 = document.getElementById("btn1");
btn1.onclick = () => {
    let cant1 = document.getElementById("cant1").value;

    if (cant1 > 0) {
        cant.push(cant1)
        console.log(cant)
        seleccion.push(1);
        console.log(seleccion)

        contenedor = document.createElement("li");
        contenedor.innerHTML = `${productos[0].nombre} $${productos[0].precio} x${cant[cant.length-1]}`;
        carrito.appendChild(contenedor);
    }

}

let btn2 = document.getElementById("btn2")

btn2.onclick = () => {
    let cant2 = document.getElementById("cant2").value;

    if (cant2 > 0) {
        cant.push(cant2)
        console.log(cant)
        seleccion.push(2);
        console.log(seleccion)

        contenedor = document.createElement("li");
        contenedor.innerHTML = `${productos[1].nombre} $${productos[1].precio} x${cant[cant.length-1]}`;
        carrito.appendChild(contenedor);
    }

}

let btn3 = document.getElementById("btn3")
btn3.onclick = () => {
    let cant3 = 0;
    cant3 = document.getElementById("cant3").value;

    if (cant3 > 0) {
        cant.push(cant3)
        console.log(cant)
        seleccion.push(3);
        console.log(seleccion)

        contenedor = document.createElement("li");
        contenedor.innerHTML = `${productos[2].nombre} $${productos[2].precio} x${cant[cant.length-1]}`;
        carrito.appendChild(contenedor);
    }

}

let calcular = document.getElementById("calcular");
calcular.addEventListener("click", calculo);
let resultado = 0;
let cuotas = 0;

function calculo() {
    const lleva = [];

    for (let i = 0; i <= seleccion.length; i++) {
        for (let j = 0; j < productos.length; j++) {
            if (seleccion[i] == id[j]) {
                lleva[i] = productos.find((el) => el.id === id[j]);
            }
        }
    }
    console.log(lleva);


    for (i = 0; i <= seleccion.length; i++) {
        for (let j = 0; j < productos.length; j++) {
            if (seleccion[i] == id[j]) {
                resultado = cant[i] * precios[j] + resultado;
            }
        }
    }
    console.log(resultado)

    if (resultado > 0) {
        contenedor = document.createElement("p");
        contenedor.innerHTML = `Total: $${resultado}`;
        carrito.appendChild(contenedor);
    
        let pagar = document.getElementById("pagar")
        if (resultado > 0) {
            pagar.onclick = () => {
                cuotas = document.getElementById("cuotas").value;
                console.log(cuotas)
    
                cu = resultado / cuotas;
                console.log(cu)
                cu = cu.toFixed(2)
    
                contenedor = document.createElement("p")
                contenedor.innerHTML = `<p>Total $${resultado} en ${cuotas} cuotas de $ ${cu}</p>`
                pago.appendChild(contenedor)
    
            }
    
        }
        let borrar = document.getElementById("limpiar");
        borrar.onclick = () => {
            location.reload();
        }
    }
}