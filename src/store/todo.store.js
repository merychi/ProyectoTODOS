import { Todo } from '../tareas/models/todo.models.js';

// - Archivo de funciones principales de la app de  -

// object de los filtros posibles dentro de la app
export const Filtros = {
    Terminados: 'Terminados',
    Pendientes: 'Pendientes',
    All: 'All'
}

// Object de las tareas pre-creadas
const state = {
    todos: [
        new Todo ('Wen Kexing'),
        new Todo ('Wang Yibo'),
        new Todo ('Sebastian Ruiz'),
    ],
    filtros: Filtros.All,
}

//Inicicar la app
const initStore = () => {
    console.log(state);
    console.log ('InitStore fresa');
}

// Se encarga de cargar en el array de TODO lo que se encuentra en la BD local del navegador
const loadStore = () =>{
    if (!localStorage.getItem('state')) return;
    const { todo = [], filtro = Filtros.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todo;
    state.filtros = filtro;
}

//Se llamará en todas las funciones donde se modifique el array del TODO
const saveStateToLocalStorage = () => {
                        //key   ,  valor
    localStorage.setItem('state', JSON.stringify(state));
}

// Mostrar las tareas según un filtro dado
const getTodo = ( filtro = Filtros.All) =>{
    switch (filtro){
        case Filtros.All: 
            return [...state.todos];
        case Filtros.Terminados:
            return state.todos.filter(todos => todos.done);
        case Filtros.Pendientes:
            return state.todos.filter(todos => !todos.done);
        default:
            throw new Error (`filtro ${filtro} no soportado`);       
    }
}

//Agregar una nueva tarea
const addTodo = ( descripcion ) =>{
    if (!descripcion) throw new Error ('Debe añadir una descripcion');

    state.todos.push( new Todo(descripcion) );

    saveStateToLocalStorage();
}

//Cambiar el estado de la tarea
const toggleTodo = ( id ) =>{
    state.todos = state.todos.map(todo =>{
        if (id === todo.id){
            todo.done = !todo.done;
        }
        saveStateToLocalStorage();
        return todo;
    })
    saveStateToLocalStorage();
}

//Eliminar una tarea
const deleteTodo = ( id ) =>{
    state.todos = state.todos.filter(todo => todo.id !== id );
    saveStateToLocalStorage();
}

//Eliminar las tareas completadas
const deleteCompleted = ( ) =>{
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}

//Cambiar el filtro de las tareas
const setFiltro = (newFiltro = Filtros.All) =>{
    if (state.filtros.includes(newFiltro)) throw new Error("Error al colocar el filtro");
    state.filtros = newFiltro;
    saveStateToLocalStorage();
}

//Obtener el filtro actual de las tareas
const getCurrentFiltro = () =>{
    return state.filtros;
    
 }


export default {
    initStore,
    loadStore,
    getTodo,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFiltro,
    getCurrentFiltro
}