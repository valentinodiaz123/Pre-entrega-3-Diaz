class Carrito {

    constructor() {
        this.arrayCarrito = JSON.parse(localStorage.getItem("arrayCarrito")) || [];
    }

    guardarStorage() {
        let arrayCarritoJSON = JSON.stringify(this.arrayCarrito)
        localStorage.setItem("arrayCarrito", arrayCarritoJSON)
    }

    agregar(productoAgregar) {
        let esta = this.arrayCarrito.some(element => element.id == productoAgregar.id)

        if (esta) {
            let existeProducto = this.arrayCarrito.find(producto => producto.id == productoAgregar.id)
            existeProducto.cantidad = existeProducto.cantidad + 1
        } else {
            productoAgregar.cantidad = productoAgregar.cantidad + 1
            this.arrayCarrito.push(productoAgregar)
        }
    }
}

async function levantarProductos() {

    let resp = await fetch("../js/simulador_api.json")
    let listaProductos = await resp.json()

    let mainTienda = document.getElementById("main-discos")

    listaProductos.forEach(Producto => {
        mainTienda.innerHTML += `<div class="card-${Producto.clase}">
             <img class="card-img" src=${Producto.img} alt="">
             <div class="card-texto">
               <h5 class="card-h5">${Producto.nombre}</h5>
               <p class="card-p">${Producto.descripcion}</p>
                 <a href="#" class="btn btn-primary" id="p-${Producto.id}">Comprar</a>
             </div>
           </div>`
    })

    listaProductos.forEach(producto => {
        const btn = document.getElementById(`p-${producto.id}`)
        btn.addEventListener("click", () => {
            carrito.agregar(producto)
            carrito.guardarStorage()
            sweetAlertAñadir()
        }
        )
    })

}
function sweetAlertAñadir() {
    Swal.fire({
        background: 'grey',
        position: 'center',
        icon: 'success',
        title: 'Producto añadido al carrito',
        showConfirmButton: false,
        timer: 1500
    })
}


const carrito = new Carrito

let cantidad = 0

levantarProductos()
