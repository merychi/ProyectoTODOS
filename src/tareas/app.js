import html from './app.html?raw';
import  store, {Filtros} from '../store/todo.store';
import { renderTodo, RenderPendientes } from './use-cases';

const ElementID = {
    ClearCompleted: '.clear-completed', // Clases .
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input', // ID #
    TodoFiltro: '.filtro',
    CountPendientesLabel: '#pending-count',
}

/**
 * Función principal para iniciar la app
 * @param {string} elementID 
 */
export const App = ( elementID ) =>{

    const displayTodo = () =>{
        const todos = store.getTodo(store.getCurrentFiltro());
        renderTodo(ElementID.TodoList, todos);
        countPendientes();
    }

    const countPendientes = () =>{
        RenderPendientes(ElementID.CountPendientesLabel);
    }

    (()=> {
        const app = document.createElement( 'div' );
        app.innerHTML = html;
        document.querySelector(elementID).append(app);
        displayTodo(); // Mostrar tareas iniciales en la lista
    })();

    //Referencia HTML
    const newDescriptionInput = document.querySelector(ElementID.NewTodoInput);
    const todoListUl = document.querySelector(ElementID.TodoList);
    const deletedTodo = document.querySelector(ElementID.TodoList);
    const clearCompletedBoton = document.querySelector(ElementID.ClearCompleted);
    const filterLis = document.querySelectorAll(ElementID.TodoFiltro);

    //Evento para añadir una nueva tarea a la lista de tareas desde
    //la barra de texto
    newDescriptionInput.addEventListener('keyup', (event)=>{

        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;

        store.addTodo(event.target.value);
        countPendientes();
        displayTodo();
        event.target.value = ''; // Limpiar input

    })

    // Evento para realizar clic sobre los checked
    todoListUl.addEventListener('click', (event)=>{
        const element = event.target.closest('[data-id]');
        store.toggleTodo( element.getAttribute('data-id') );
        displayTodo();

    })

    // Evento para eliminar definitivamente una tarea de la lista
    deletedTodo.addEventListener('click', (event)=>{

        if(!event.target.classList.contains('destroy')) return;

        const element = event.target.closest('[data-id]');
        store.deleteTodo( element.getAttribute('data-id') );
        countPendientes();
        displayTodo();
        console.log(event.target.classList.contains('destroy'));
    })

    //Evento para elimianr todos los completados

    clearCompletedBoton.addEventListener('click', ()=>{
        store.deleteCompleted();
        countPendientes();
        displayTodo();
    })

    filterLis.forEach(element => {

        element.addEventListener('click', (element)=>{
            filterLis.forEach(el => el.classList.remove('selected') )
            element.target.classList.add('selected');
            console.log(element.target.text);
            switch (element.target.text) {
                case 'Todos':
                    store.setFiltro(Filtros.All)
                    break;
                case 'Completados':
                    store.setFiltro(Filtros.Terminados);
                    break;
                case 'Pendientes':
                    store.setFiltro(Filtros.Pendientes);
                    break;    
                default:
                    break;
            }
            displayTodo();
        })
    })
    
}