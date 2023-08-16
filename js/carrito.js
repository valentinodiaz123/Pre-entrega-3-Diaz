let itemsCarrito = JSON.parse(localStorage.getItem("arrayCarrito")) || []


class Carrito {
   constructor() {
      this.listaCarrito = itemsCarrito
   }
   mostrarCarrito() {
      const mainCarrito = document.getElementById("main-carrito")

      mainCarrito.innerHTML = '';

      itemsCarrito.forEach(producto => {
         mainCarrito.innerHTML +=
            `<div class="card-${producto.clase}">
            <img class="card-img" src=${producto.img} alt="">
            <div class="card-texto">
               <p class="card-p">Disco: ${producto.nombre}</p>
               <p class="card-p">Cantidad: 
               <button class = "btn btn-light" id = "min-${producto.id}" ><i class="fa-solid fa-minus fa-2xs" style="color: #000000;"></i></button> ${producto.cantidad} <button class = "btn btn-light" id = "mas-${producto.id}"><i class="fa-solid fa-plus fa-2xs" style="color: #000000;"></i></button></p> 
               <p class="card-p">Precio individual: $${producto.precio}</p>
               <button id="borrar-${producto.id}"class= "btn btn-danger"><i class="fa-solid fa-trash fa-lg" style="color: #000000;"></i> </button>
            </div>
       </div>`
      });

      this.listaCarrito.forEach(productoArray => {
         let botonEliminar = document.getElementById(`borrar-${productoArray.id}`)
         let botonSumar = document.getElementById(`mas-${productoArray.id}`)
         let botonRestar = document.getElementById(`min-${productoArray.id}`)
         
         botonEliminar.addEventListener("click", () => {
            carrito.eliminar(productoArray)

            if (itemsCarrito.length > 0) {
               carrito.mostrarCarrito()
               carrito.mostrarTotalCompra()
               
            } else {
               carrito.mostrarTotalCompra()
               const mainCarrito = document.getElementById("main-carrito")
               mainCarrito.innerHTML = '';
               mainCarrito.innerHTML += `<h2 class="h2-no-productos"> TODAVIA NO AÑADISTE PRODUCTOS AL CARRITO</h2>`
               console.log("asdfasdf")
            }
         })

         botonSumar.addEventListener("click", () => {
            carrito.sumarCantidad(productoArray)
            carrito.guardarStorage()
            carrito.mostrarCarrito()
            carrito.mostrarTotalCompra()
            
         })

         botonRestar.addEventListener("click", () => {
            carrito.restarCantidad(productoArray)
            carrito.guardarStorage()
            carrito.mostrarCarrito()
            carrito.mostrarTotalCompra()
         })
      })
   }

   sumarCantidad(productoArray) {
      productoArray.cantidad = productoArray.cantidad +  1
   }

   restarCantidad(productoArray){
      if(productoArray.cantidad > 1){
         productoArray.cantidad = productoArray.cantidad - 1
      }else{}
   }

   guardarStorage() {
      let arrayCarritoJSON = JSON.stringify(this.listaCarrito)

      localStorage.setItem("arrayCarrito", arrayCarritoJSON)
   }

   eliminar(productoAeliminar) {
      Swal.fire({
         title: 'Estas seguro de eliminar el producto?',
         text: "Igualmente puedes volver a seleccionarlo en la tienda!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Ok, eliminar!'
       }).then((result) => {
         if (result.isConfirmed) {
           Swal.fire(
             'Eliminado!',
             'Tu producto a sido eliminado exitosamente.',
             'success'
           )
           let producto = this.listaCarrito.find(producto => producto.id == productoAeliminar.id)

           let index = this.listaCarrito.indexOf(producto)
     
           this.listaCarrito.splice(index, 1) 

           carrito.mostrarCarrito()
           carrito.guardarStorage()
         }
       })
   }

   calcularTotal() {
      return totalDinero = this.listaCarrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0)
   }

   mostrarTotalCompra() {
      let mainTotalCarrito = document.getElementById("total-compra")

      mainTotalCarrito.innerHTML = '';

      mainTotalCarrito.innerHTML += 
      `<h2>El total es de: $ ${carrito.calcularTotal()}</h2>`
   }

   botonFinalizar(){
      let botonFinalizar = document.getElementById("boton-f")

      botonFinalizar.innerHTML = '';

      botonFinalizar.innerHTML += 
      `<button id = "boton-finalizar"class="btn btn-primary boton-finalizar">Finalizar Compra</button>`
   }

   finalizarSweetAlert(){
      Swal.fire({
         background: 'grey',
         position: 'center',
         icon: 'success',
         title: 'Tu compra a sido procesada correctamente. Gracias por elegirnos!',
         showConfirmButton: false,
         timer: 1500
       })
   }
}

const carrito = new Carrito

totalDinero = 0


if (itemsCarrito.length > 0) {
   carrito.mostrarCarrito()
   carrito.mostrarTotalCompra()
   carrito.botonFinalizar()

   let botonF = document.getElementById("boton-finalizar")

   botonF.addEventListener("click", () =>{
      carrito.finalizarSweetAlert()
   })
} else {
   const mainCarrito = document.getElementById("main-carrito")
   mainCarrito.innerHTML += `<h2 id = "finalizar" class="h2-no-productos"> TODAVIA NO AÑADISTE PRODUCTOS AL CARRITO</h2>`

}