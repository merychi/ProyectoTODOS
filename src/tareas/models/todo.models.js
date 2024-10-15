import { v4 as uuid } from "uuid";

// Archivo definidor
export class Todo {
    constructor(descripcion){
        this.id = uuid();
        this.descripcion = descripcion;
        this.terminada = false;
        this.creadaFecha = new Date();
    }
}