const contenedorProductos = document.getElementById('contendor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarito = document.getElementById('contadorCarrito')

const precioTotal = document.getElementById('precioTotal')

let carrito = [];

document.addEventListener('DOMContentLoaded' , () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
} )


botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
    localStorage.setItem('carrito', JSON.stringify(carrito))
    Toastify({
                text: "El carrito se ha vaciado",
                duration: 3000,
                gravity: 'top',
                position: 'right',
                style: {
                 background: 'rgb(218, 103, 27, 0.7)'
             }
        
            }).showToast();
            
})


platos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
                    <img src=${producto.img} alt="" class="img-card">
                    <h3>${producto.nombre}</h3>
                    <p class="precioProducto">Precio : $ ${producto.precio} </p>
                    <button id= "agregar${producto.id}" class = "boton-agregar"> Agregar </button>

    `
    contenedorProductos.appendChild(div)
    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
        Toastify({
            text: "Se agregó al carrito",
            duration: 1000,
            gravity: 'top',
            position: 'right',
            style: {
             background: 'rgb(218, 103, 27, 0.7)'
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
            
            //console.log(carrito)

    }

actualizarCarrito()
    

}


const eliminarDelCarrito = (prodId) => {
    const item = carrito.find ((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
    localStorage.setItem('carrito', JSON.stringify(carrito))
}



const actualizarCarrito = () => {
    contenedorCarrito.innerHTML= '';
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre} </p>
        <p> Precio : ${prod.precio} </p>
        <p> Cantidad : <span id="cantidad">${prod.cantidad} </span> </p>
        <button onclick = "eliminarDelCarrito(${prod.id})" class= "boton-eliminar"> Eliminar</button>
        
        
        ` 

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    contadorCarito.innerText = carrito.length
    //console.log(carrito.length)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
}

