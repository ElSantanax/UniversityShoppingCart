// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = []

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar"
    listaCursos.addEventListener('click', agregarCurso);
}

// Funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
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

    // Agrega Elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
    console.log(articulosCarrito);

    carritoHTML();
}

// Muestra carrito de compras HTML
function carritoHTML() {

    // Limpiear el HTML
    limpiarHTML();

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

        // Agrega el HTML de carrito al tbody
        contenedorCarrito.appendChild(row);
    });
}

// Eliminar los cursos del tbody
function limpiarHTML() {
    // Forma Lenta
    // contenedorCarrito.innerHTML = ''; 

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
