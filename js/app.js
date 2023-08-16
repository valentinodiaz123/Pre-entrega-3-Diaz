class Producto {

    constructor(nombre, precio, id, cantidad, clase, img, descripcion) {
        this.nombre = nombre
        this.precio = precio
        this.id = id
        this.cantidad = cantidad
        this.clase = clase
        this.img = img
        this.descripcion = descripcion
    }

     AumentarCantidad(){
         this.cantidad = this.cantidad +  1
     }
}

class Carrito{

    constructor(){
        this.arrayCarrito =  JSON.parse(localStorage.getItem("arrayCarrito")) || [];
    }

    guardarStorage(){
        let arrayCarritoJSON =  JSON.stringify(this.arrayCarrito)
        localStorage.setItem("arrayCarrito", arrayCarritoJSON)
    }

    agregar(productoAgregar){
        let esta = this.arrayCarrito.some( element => element.id == productoAgregar.id)
 
        if(esta){
            let existeProducto = this.arrayCarrito.find(producto => producto.id == productoAgregar.id)
            existeProducto.cantidad = existeProducto.cantidad + 1
        }else{
            productoAgregar.AumentarCantidad()
           this.arrayCarrito.push(productoAgregar)
        }
    }
    }

class ControladorProducto{

    constructor(){
        this.ArrayProductos = []
    }

    agregar(producto){
        this.ArrayProductos.push(producto)
    }

    buscarProducto(id){
        return this.ArrayProductos.find(juego => juego.id == id)
    }

    sweetAlertAñadir(){
        Swal.fire({
            background: 'grey',
            position: 'center',
            icon: 'success',
            title: 'Producto añadido al carrito',
            showConfirmButton: false,
            timer: 1500
          })
    }

    mostrarProductosUsuario(){
        let mainTienda = document.getElementById("main-discos")

        this.ArrayProductos.forEach(Producto => {
            mainTienda.innerHTML += `<div class="card-${Producto.clase}">
            <img class="card-img" src=${Producto.img} alt="">
            <div class="card-texto">
              <h5 class="card-h5">${Producto.nombre}</h5>
              <p class="card-p">${Producto.descripcion}</p>
                <a href="#" class="btn btn-primary" id="p-${Producto.id}">Comprar</a>
            </div>
          </div>`
        })

        this.ArrayProductos.forEach ( producto => {
            const btn = document.getElementById (`p-${producto.id}`) 
                                             // ("p-" + producto.id)
            btn.addEventListener("click", () => {
                carrito.agregar(producto)
                carrito.guardarStorage()
                controladorDiscos.sweetAlertAñadir()
                carrito.mostrar()
            }
            )
        })
    }
    
}

const carrito = new Carrito

const controladorDiscos = new ControladorProducto

let cantidad = 0

controladorDiscos.agregar(new Producto("Colores Santos", 500, 1, 0, "colores", "../images/tienda/R-5174760-1523572007-8968.jpg", "Colores Santos: Colaboración de Cerati y Daniel Melero en 1992, fusiona pop y electrónica, explorando sonidos vanguardistas y experimentales"))
controladorDiscos.agregar(new Producto("Amor Amarillo", 200, 2, 0, "amor-amarillo", "../images/tienda/maxresdefault.jpg", "Amor Amarillo: El primer álbum en solitario de Gustavo Cerati, lanzado en 1993, presenta un sonido más experimental y personal después de Soda Stereo, con influencias de pop y electrónica"))
controladorDiscos.agregar(new Producto("Bocanada" , 500, 3, 0, "bocanada", "../images/tienda/Gustavo_Cerati-Bocanada-Frontal-1999-e1439311202313.jpg", "Bocanada es el segundo álbum en solitario de Gustavo Cerati, lanzado en 1999, que combina rock, electrónica y pop con letras introspectivas, destacando su evolución musical tras Soda Stereo."))
controladorDiscos.agregar(new Producto("11 episodios sinfonicos Edicion Vinilo", 1200, 4, 0, "11ep", "../images/tienda/11episodiso.jpeg", "11 Episodios Sinfónicos: Es un álbum en vivo lanzado en 2001, donde Cerati reinterpreta sus canciones con arreglos sinfónicos, mostrando su versatilidad musical y creatividad."))
controladorDiscos.agregar(new Producto("Siempre es hoy", 1000, 5, 0, "SEH", "../images/tienda/R-2763752-1459994209-7284.jpg", "Siempre es Hoy: Álbum de 2002, marca la incursión de Cerati en la música electrónica y experimental, con letras introspectivas y atmósferas modernas."))
controladorDiscos.agregar(new Producto("Ahi vamos", 1000, 6, 0, "ahivamos", "../images/tienda/R-7880445-1450798843-8437.jpg", "Ahí Vamos: Lanzado en 2006, marca el regreso de Cerati al rock con toques electrónicos, presentando canciones emotivas y reflexivas después de un período de pausa creativa."))
controladorDiscos.agregar(new Producto("+ Bien", 100, 7, 0, "bien", "../images/tienda/R-3412093-1336129055.jpg", "+ Bien: Lanzado en 2001 como parte de la banda sonora de + Bien"))
controladorDiscos.agregar(new Producto("Fuerza Natural Edicion Vinilo", 1000, 8, 0, "FN", "../images/tienda/R-2629198-1428259396-9322.jpg","Fuerza Natural: Último álbum de estudio de Cerati, lanzado en 2009, ofrece un sonido orgánico y reflexivo, fusionando rock y folk con letras introspectivas y melódicas." ))
controladorDiscos.agregar(new Producto("Satelite Cerati", 1000, 9, 0, "satelite", "../images/tienda/R-12352328-1533507344-1473.jpg", "Satélite Cerati es un álbum recopilatorio póstumo de Gustavo Cerati, que reúne sus mejores colaboraciones con otras bandas y músicos. Fue lanzado el 10 de agosto de 2018"))

controladorDiscos.mostrarProductosUsuario()
