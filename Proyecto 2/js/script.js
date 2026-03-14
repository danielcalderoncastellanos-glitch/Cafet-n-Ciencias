// DATOS

var productos = [];
var guardados = localStorage.getItem("menuCafetin");

if (guardados) {
    productos = JSON.parse(guardados);
} else {
    productos = [
        { nombre: "Empanada 🥟", precio: 1},
        { nombre: "Cafe ☕", precio: 2},
        { nombre: "Arepa 🫓", precio: 2},
        { nombre: "Jugo natural 🍹", precio: 3},
        { nombre: "Croissant 🥐", precio: 4}
    ];
}

var carrito = [];
var venta = [];
var historial = [];

// LOG
var logform = document.getElementById("logtipe");

if (logform) {
    logform.addEventListener("submit", function(e){
        e.preventDefault();

        var user = document.getElementById("user").value;
        var pass = document.getElementById("pass").value;
        var errorMsj = document.getElementById("error");

        if (user === "ClienteUCV" && pass === "Central_123") {
            location.href = "cliente.html";
        } else if (user === "caja_01" && pass === "Cajero#123") {
            location.href = "caja.html";
        } else if (user === "adminRoot" && pass === "cafetinAdmin") {
            location.href = "admin.html";
        } else {
            errorMsj.textContent = "Usuario o contraseña incorrectos";
            errorMsj.style.color = "red";
        }
    });
}

// CLIENTE
function mossecc(id){
    var secc = document.querySelectorAll(".secc");
    var btn = document.querySelectorAll(".nav-cl");

    for(var i=0; i<secc.length; i++) {
        secc[i].classList.remove("on");
    }
    for(var i=0; i<btn.length; i++) {
        btn[i].classList.remove("on");
    }

    document.getElementById(id).classList.add("on");
    event.target.classList.add("on");
}


function cargarproduc(){
    var cont = document.getElementById("lisproduc");
    if(!cont) return;

    cont.innerHTML = "";

    for(var i=0; i<productos.length; i++){
        cont.innerHTML +=
        "<div class='product'>" +
        "<h3>" + productos[i].nombre + "</h3>" +
        "<p>💲" + productos[i].precio + "</p>" +
        "<button onclick='addcar(" + i + ")'>Añadir a Carrito</button>" +
        "</div>";
    }
}

function addcar(i){
    carrito.push(productos[i]);
    actcar();
    alert(productos[i].nombre + " añadido al carrito");
}

function actcar(){
    var lista = document.getElementById("carrlis");
    if(!lista) return;

    lista.innerHTML = "";
    var total = 0;

    for(var i=0; i<carrito.length; i++){
        lista.innerHTML +=
        "<li>" + carrito[i].nombre +
        "<span>💲" + carrito[i].precio + "</span></li>";

        total += carrito[i].precio;
    }

    document.getElementById("total").textContent = total.toFixed(2);
    document.getElementById("carrito-count").textContent = carrito.length;
}

function dopedido(){
    if(carrito.length === 0){
        alert("El carrito está vacío");
        return;
    }

    var total = 0;
    for(var i=0; i<carrito.length; i++){
        total += carrito[i].precio;
    }

    historial.push({
        total: total.toFixed(2),
        fecha: new Date().toLocaleString()
    });

    alert("Pedido confirmado por 💲" + total.toFixed(2));
    
    carrito = [];
    actcar();
    acthist();
}

function acthist(){
    var lista = document.getElementById("histlis");
    if(!lista) return;

    lista.innerHTML = "";

    for(var i=0; i<historial.length; i++){
        lista.innerHTML +=
        "<li>Pedido " + (i+1) + " - " + historial[i].fecha +
        "<span>💲" + historial[i].total + "</span></li>";
    }
}

// CAJA
function prodcaja(){
    var cont = document.getElementById("listpcaja");
    if(!cont) return;

    cont.innerHTML = "";

    for(var i=0; i<productos.length; i++){
        cont.innerHTML +=
        "<div class='product'>" +
        "<h3>" + productos[i].nombre + "</h3>" +
        "<p>💲" + productos[i].precio + "</p>" +
        "<button onclick='addv(" + i + ")'>Agregar a venta</button>" +
        "</div>";
    }
}

function addv(i){
    venta.push(productos[i]);
    actventa();
}

function actventa(){
    var lista = document.getElementById("listv");
    if(!lista) return;

    lista.innerHTML = "";
    var total = 0;

    for(var i=0; i<venta.length; i++){
        lista.innerHTML +=
        "<li>" + venta[i].nombre +
        "<span>💲" + venta[i].precio + "</span></li>";
        total += venta[i].precio;
    }

    document.getElementById("totalv").textContent = total.toFixed(2);
}

function procesv(){
    if(venta.length === 0){
        alert("No hay productos en la venta");
        return;
    }

    var total = 0;
    var recibo = "====== RECIBO ======\n";

    for(var i=0; i<venta.length; i++){
        recibo += venta[i].nombre + " .... 💲" + venta[i].precio + "\n";
        total += venta[i].precio;
    }

    recibo += "-------------------\nTOTAL: 💲" + total.toFixed(2) + "\nRecibo Emitido ¡Gracias por su compra!";
    document.getElementById("recibo").textContent = recibo;
    venta = [];
    actventa();
}

// ADMIN
function prodadmin(){
    var lista = document.getElementById("listadmin");
    if(!lista) return;
    lista.innerHTML="";
    for(var i=0;i<productos.length;i++){
        lista.innerHTML+=
        "<li>"+productos[i].nombre+
        " - 💲"+productos[i].precio+
        " <button onclick='elimprod("+i+")'>X</button></li>";
    }
}

var form = document.getElementById("fadminprod");

if(form){
    form.addEventListener("submit",function(e){
        e.preventDefault();
        var nombre = document.getElementById("Prodname").value;
        var precio = parseInt(document.getElementById("Prodprecio").value);
        productos.push({nombre:nombre,precio:precio});
        prodadmin();
        form.reset();
    });
}

function elimprod(i){
    productos.splice(i,1);
    prodadmin();
}