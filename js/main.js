// let para datos variables
//let nombre = "Celeste"
//let edad = 27 
//let plataforma = true

// const cuando son datos que NO cambian
//const dni = 40241405
//edad = 30

//console.log("Alumno: "+nombre+" Edad:" + edad)

// paresint para avisar que son datos númericos, así la operación da con las operaciones matemáticas
//let primero_numero = parseInt (prompt("Ingrese el primer numero"))
//let segundo_numero = parseInt (prompt("Ingrese el segundo numero"))

//let resultado = primero_numero + segundo_numero
//console.log(resultado)

//alert("El resultado de la operacon es: "+resultado)

//let validar = true
//if (validar) {
   // console.log("variable verdadera")
//}

//let fruta = "sandia"
//let mes = "enero"
//let edad = 25

//if (fruta =="sandia") {
//    console.log ("felicitaciones, estamos en el verano")
//} else if (fruta == "mandarina") {
//console.log ("me parece que es otoño")
//} else {
//    console.log ("puede ser cualquier otra fruta")
//}

//or ||
//if (fruta == "sandia" || fruta == "melon") {
//    console.log ("Efectivamente es verano")
//}

//AND && 

//if (fruta == "sandia" && mes == "enero") {
//    console.loge ("fruta y mes veraniego")
//}

//if (edad > 18) {
//    console.log ("sos mayor de edad, podes ingresar")
//} else {
//    consle.log ("sos menor, no podes ingresar")
//}

//FOR - ciclo controlado

//for ("desde"; "hasta"; "actualizacion") {
//}

//for (let i=1; i<=10; i++) {
//    console.log (i)
//}

//let numero = parseInt(prompt("ingrese la tabla de multipliar que desee"))
//for (let i=1; i<=15; i++) {
//    let resultado =i*numero
//    console.log (numero+"x"+i+" :"+resultado)
//}

//cuenta regresiva

//for (let i=10; i>=1; i--) {
//    console.log(i)
//    if(i==2) {
//    console.log ("abortamos")
//    break
//    }
//    if(i==1){
//        console.log("despegue")
//    }
//}

//WHILE - ciclo infinito

//let continuar = true

//while(continuar) {
    //let numero = parseInt(prompt("ingrese la tabla de multipliar que desee"))
//for (let i=1; i<=5; i++) {
    //let resultado =i*numero
    //console.log (numero+"x"+i+" :"+resultado)
    //}
    //let confirmacion = prompt("desea hacer otro calculo? si/no")
    //if(confrimacion=="no"){
     //   continuar=false
     //   console.log ("gracias")
    //}
//}


//let continuar = true

//while (continuar){
//    let menu = parseInt(prompt("ingrese 1 para ver su cuenta, ingrese 2 para extracciones, ingrese 3 para deposito, otro numero para salir"))

//switch(menu) {
//    case 1:
//        console.log("total de la cuenta: $3000")
//        break //te permite salir, sino muestra todo junto
//    case 2:
//        console.log ("limite de extracción: $1.000")
//        break
//    case 3:
//        console.log ("limite de depósito: $500")
//        break
//    default:
//        console.log ("retire su tarjeta")
//        break
//}
//let confirmacion = prompt("desea hacer otro calculo? si/no")
//    if(confrimacion=="no"){
//    continuar=false
//    console.log ("gracias")
//}
//}


let carrito = [];
let total = 0;

const stockInicial = {
    producto1: 1,
    producto2: 1,
    producto3: 1
};

//agregar un producto al carrito
function agregarAlCarrito(producto, precio, stockId) {
    const stockElemento = document.getElementById(stockId);
    let stockActual = parseInt(stockElemento.textContent.replace('Stock disponible: ', ''));

    if (stockActual <= 0) {
        alert('Lo siento, este producto está agotado.');
        mostrarFormularioContacto(stockId);
        return;
    }
    stockElemento.textContent = `Stock disponible: ${stockActual - 1}`;
    carrito.push({ producto, precio });
    total += precio;

    actualizarCarrito();

    actualizarBotones(stockId, true);
}

//actualizar la vista del carrito
function actualizarCarrito() {
    const carritoLista = document.getElementById('carritoLista');
    carritoLista.innerHTML = '';

    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.producto} - $${item.precio.toLocaleString()}`;

        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.onclick = () => eliminarProducto(index);
        li.appendChild(eliminarBtn);

        carritoLista.appendChild(li);
    });

    //total
    document.getElementById('total').textContent = `Total: $${total.toLocaleString()}`;
    document.getElementById('cantidadCarrito').textContent = carrito.length;
}

//eliminar un producto del carrito
function eliminarProducto(index) {
    const producto = carrito.splice(index, 1)[0];
    total -= producto.precio;

    actualizarCarrito();

    const stockElemento = document.getElementById(`stockProducto${index + 1}`);
    const stockInicial = parseInt(stockElemento.getAttribute('data-stock-inicial'));
    stockElemento.textContent = `Stock disponible: ${stockInicial + 1}`;

    actualizarBotones(stockElemento.id, false);
}

//actualizar los botones de agregar y eliminar
function actualizarBotones(stockId, agregado) {
    const productoId = stockId.match(/\d+/)[0]; 
    const agregarBtn = document.getElementById(`agregarProducto${productoId}`);
    const eliminarBtn = document.getElementById(`eliminarProducto${productoId}`);

}

//mostrar el carrito cuando se hace clic en el ícono
function mostrarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.style.display = carritoDiv.style.display === 'none' ? 'block' : 'none';
}

//formulario de contacto si el producto está agotado
function mostrarFormularioContacto(stockId) {
    const productoId = stockId.match(/\d+/)[0];
    const formulario = document.getElementById(`formEmail${productoId}`);
    formulario.style.display = 'block';
}

//enviar el email con el contacto
function enviarEmail(producto) {
    const email = document.getElementById(`email1`).value;
    alert(`¡Gracias por tu interés! Te notificaremos cuando el producto ${producto} esté disponible. Te hemos enviado la información a ${email}`);
}

// Cargar el carrito al inicio de la página
document.addEventListener('DOMContentLoaded', actualizarCarrito);
