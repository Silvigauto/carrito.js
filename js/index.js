const contenedorProductos = document.getElementById('contendor-productos')


const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarito = document.getElementById('contadorCarrito')

const precioTotal = document.getElementById('precioTotal')

let carrito = [];

// Local Storage

document.addEventListener('DOMContentLoaded' , () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
} )

platos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
                    <img src=${producto.img} alt="" class="img-card">
                    <div class= "card-body">
                    <h3 class= "titulo-card">${producto.nombre}</h3>
                    <p class="precioProducto"> $ ${producto.precio} </p>
                    <button id= "agregar${producto.id}" class = "boton-agregar "> Agregar </button>
                    </div>
    `
    contenedorProductos.appendChild(div)
    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
        Toastify({
            text: `Has agregado: ${producto.nombre}`,
            duration: 1000,
            gravity: 'top',
            position: 'right',
            style: {
             background: 'rgb(218, 103, 27, 0.9)'
         }
    
        }).showToast();
    })
    
})


const agregarAlCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId) 

    if (existe) {
        const prod = carrito.map (prod => {
            if (prod.id === prodId) {
                prod.cantidad++
                prod.precio += prod.precio
                actualizarCarrito()
            }
            
        })
    } else {
        const item = platos.find ((prod) => prod.id === prodId)
        carrito.push(item)

    }

actualizarCarrito()
    

}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML= '';
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
                <img src="${prod.img}" alt="" class= "img-prod">
                <p>${prod.nombre} </p>
                <p> Precio : ${prod.precio} </p>
                <p> Cantidad : <span id="cantidad">${prod.cantidad} </span> </p>
                <button onclick = "eliminarDelCarrito(${prod.id})" class= "boton-eliminar"> <i class="fa-solid fa-trash"></i></button>
       
        ` 

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    contadorCarito.innerText = carrito.length
    
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
}




const eliminarDelCarrito = (prodId) => {
    const item = carrito.find ((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
    localStorage.setItem('carrito', JSON.stringify(carrito))
}



botonVaciar.addEventListener('click', () => {

    if (carrito.length > 0) {
        Swal.fire({
        title: '¿Estas seguro de eliminar el carrito?',
        
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, estoy seguro.'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'Tu carrito se ha vaciado',
            'success'
          )
        carrito.length = 0
        actualizarCarrito()
        localStorage.setItem('carrito', JSON.stringify(carrito))
        }
      })
    } else if (carrito.length === 0) {
        Swal.fire('No tienes nada en el carrito')
    }
    
            
})












