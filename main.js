
import './style.css'
import {App} from './src/tareas/app';
import  todoStore  from './src/store/todo.store';


todoStore.initStore();
App('#app');
