import { ToDo } from './ToDo.type';

export const readToDos = async () => {
  const toDos: ToDo[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const toDoString = localStorage.getItem(key!);
    const toDo: ToDo = JSON.parse(toDoString!);
    toDos.push(toDo);
  }

  console.log('Read ToDos:', toDos);
  return toDos;
};
