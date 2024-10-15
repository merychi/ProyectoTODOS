import todoStore, { Filtros } from "../../store/todo.store";

let element;

export const RenderPendientes = (elementId) =>{
    if (!element) element = document.querySelector(elementId);
    if (!element) throw new Error(`El elemento ${elementId} not found`);
    

    element.innerHTML = todoStore.getTodo(Filtros.Pendientes).length;
}