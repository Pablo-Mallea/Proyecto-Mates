let prod1 = 1000;
let prod2 = 1500;
let prod3 = 2000;

alert("que cantidad de productos que va a llevar:");
function cuenta (param1, param2, param3){
    let resultado = param1*prod1 + param2*prod2 + param3*prod3;
}

cuenta (+prompt("producto1"), +prompt("producto2"), +prompt("producto3"));