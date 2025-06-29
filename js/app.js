// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = []

cargarEventListeners();
function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso); // Cuando agregas un curso presionando "Agregar"
    carrito.addEventListener('click', eliminarCurso); // Eliminar del carrito

    // 
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    })

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // Resetear arreglo
        limpiarHTML(); // Eiminar el HTML
    })
}

// Funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    }
}

// Eliminar un curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId); // Eliminar del arreglo de articulosCarrito por el data-id
        carritoHTML(); //Itera sobre el carrito y muestra el HTML
    }
}

// Leer contendio del HTML y extraer la información
function leerDatosCurso(curso) {

    // Crear un objeto con el curso del contenido actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)  // Revisa si un elemento ya existe en el carrito

    if (existe) {
        // Actualizamos el carrito
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna lo actualizado
            } else {
                return curso; // retorna lo que no esta duplicado 
            }
        });
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso]; // Agrega el elemento al carrito
    }
    carritoHTML();
}

// Muestra carrito de compras HTML
function carritoHTML() {
    limpiarHTML(); // Limpiear el HTML

    // Recorre el carrito y general el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
               <img src="${imagen}" width="100">
            </td>

            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            
            <td>
                <a href="#" data-id="${id}" class="borrar-curso">X</a>
            </td>
        `;

        contenedorCarrito.appendChild(row); // Agrega el HTML de carrito al tbody
    });

    sincronizarStorage(); // Agregar carrito de compras al storage
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Eliminar los cursos del tbody
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
