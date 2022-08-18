// Platos traidos con fetch de archivo local platos.json

//arrayPedidos = [];

fetch('js/platos.json') 
.then ( (res) => res.json() )
.then ( (data) =>  {
    data.forEach( (producto) => {
        let pedidos = document.getElementById('pedidos')
        
        pedidos.innerHTML += `
                        <div class="card m-3" style="width: 18rem;">
                            <img src="${producto.img}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${producto.titulo}</h5>
                                <p class="card-text">${producto.descrip}</p>
                                <a href="productos.html" class="btn btn-primary">Ir a realizar pedidos</a>
                            </div>
                        </div>
                `
        
    
    })
    
    //arrayPedidos = data
    

}
)

    


