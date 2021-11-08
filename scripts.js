const url = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
const Clickbutton = document.querySelectorAll(' .button')
const tbody = document.querySelector(' .tbody')
let carrito = []



Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})

function addToCarritoItem(e) {
    const button = e.target
    const item = button.closest(' .card')
    const itemTitle = item.querySelector(' .card-title').textContent;
    const itemPrice = item.querySelector(' .precio').textContent;
    const itemImg = item.querySelector(' .card-img-top').src;



    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1


    }
    addItemCarrito(newItem)

}

function boton(){
alert("Gracias por su compra, vuelva pronto!");}



function addItemCarrito(newItem) {

    const alert = document.querySelector(' .alert')

    setTimeout(function() {
        alert.classList.add('hide')
    }, 2000)
    alert.classList.remove('hide')



    const InputElemento = tbody.getElementsByClassName('input__elemento')
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === newItem.title.trim()) {
            carrito[i].cantidad++;
            const inputValue = InputElemento[i]
            inputValue.value++;
            carritoTotal()
            return null;

        }

    }


    carrito.push(newItem)

    renderCarrito()
}

function renderCarrito() {
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('itemCarrito')
        const content = `

     <th scope="row">1</th>
        <td class="table__productos">
        <img src=${item.img} alt="">
        <h6 class="title">${item.title}</h6>
    </td>
        <td class="table__price"><p>${item.precio}</p></td>
        <td class="table__cantidad">
            <input type="number" min="1" value=${item.cantidad} class="input__elemento">
            <button class="delete bnt bnt-danget">x</button>

        </td>
`

        tr.innerHTML = content;
        tbody.append(tr)

        tr.querySelector(" .delete").addEventListener('click', removeItemCarrito)
        tr.querySelector(" .input__elemento").addEventListener('change', sumaCantidad)

    })
    carritoTotal()

}

function carritoTotal() {
    let Total = 0;
    const itemCartTotal = document.querySelector(' .itemCartTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        Total = Total + precio * item.cantidad

    })

    itemCartTotal.innerHTML = ` Total $${Total}`
    addLocalStorage()

}

function removeItemCarrito(e) {
    const buttonDelete = e.target
    const tr = buttonDelete.closest(" .itemCarrito") 
    const title = tr.querySelector(' .title').textContent;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1)
        }

    }

    const alert = document.querySelector(' .remove')

    setTimeout(function() {
        alert.classList.add('remove')
    }, 2000)
    alert.classList.remove('remove')






    tr.remove()
    carritoTotal()

}

function sumaCantidad(e) {
    const sumaInput = e.target
    const tr = sumaInput.closest(" .itemCarrito")
    const title = tr.querySelector(' .title').textContent;
    carrito.forEach(item => {
        if (item.title.trim() === title) {
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            carritoTotal()
        }

    })

}

function addLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function() {
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if (storage) {
        carrito = storage;
        renderCarrito()
    }
}


$(document).ready(function() {
    $("#buscador").keyup(function() {
        let= nombres = $(".card-title");
        let= buscando = $(this).val().toLowerCase();
        let= item = "";

        for (var i = 0; i < nombres.length; i++) {
           let= item = $(nombres[i]).html().toLowerCase();
        
            for (var x = 0; x < item.length; x++) {
                
                if (buscando.length == 0 || item.indexOf(buscando) >= 0) {
                    
                    $(nombres[i]).parents(".card").show();
                } else {
                    $(nombres[i]).parents(".card").hide();
                }
            }

        }
    });
});


function dolarV() {
    let= itemCartTotal = document.querySelector(' .itemCartTotal');
   let= valorProductoD = 0;
   let= valorProductP = itemCartTotal.innerHTML;
   let= precio = Number(valorProductP.replace("Total $", ''));
    fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
        .then(respuesta => respuesta.json())
        .then(respuestaDecodificada => {
            for (let i of respuestaDecodificada) {
                if (i.casa['nombre'] == "Dolar Blue") {
                    let =dolar = parseInt(i.casa['venta']);
                    let =valorProducto = precio / dolar;
                   let = itemCartTotal.innerHTML = ` Total US$${parseFloat(valorProducto).toFixed(2)}`;
                    $('#vDolar').hide();
                    $('#vPeso').show();

                }
            }
     
        });

}






function pesoV() {
     let= itemCartTotal = document.querySelector(' .itemCartTotal');
     let =valorProductoD = 0;
     let= valorProductP = itemCartTotal.innerHTML;
     let=  precio = Number(valorProductP.replace("Total US$", ''));

    fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
        .then(respuesta => respuesta.json())
        .then(respuestaDecodificada => {
            for (let i of respuestaDecodificada) {
                if (i.casa['nombre'] == "Dolar Blue") {
                   let = dolar = parseInt(i.casa['venta']);
                   let= valorProducto = dolar * precio;
                    

                   let = itemCartTotal.innerHTML = ` Total $${Math.round(valorProducto)}`;
                    $('#vDolar').show();
                    $('#vPeso').hide();
                }
            }
        });
    }

