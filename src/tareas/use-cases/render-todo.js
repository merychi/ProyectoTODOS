import { createTodoHtml } from '../use-cases/create-todo-html';

/**
 * Función que permite renderizar las tareas en pantalla
 * @param {string} elementID 
 * @param {array} todos 
 */

let element;

export const renderTodo = (elementID, todos = []) =>{

    if (!element){
        element = document.querySelector(elementID);
    }
    if (!element) throw new Error ('El elemento indicado no es valido');

    element.innerHTML = '';

    todos.forEach( todo =>{
        element.append(createTodoHtml(todo))
    });
}