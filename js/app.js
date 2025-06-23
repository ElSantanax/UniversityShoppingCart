// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar"
    listaCursos.addEventListener('click', agregarCurso);
}

// Funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        console.log('Agregando al carrito');
    }
}