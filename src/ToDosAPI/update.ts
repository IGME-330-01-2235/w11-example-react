import { ToDo } from './ToDo.type';

export const toggleToDo = async (id: string, checked: boolean) => {
  const existingToDo: ToDo = JSON.parse(localStorage.getItem(id)!);

  const alteredToDo: ToDo = {
    ...existingToDo,
    complete: !checked,
  };

  console.log('Toggling:', alteredToDo);
  localStorage.setItem(id, JSON.stringify(alteredToDo));
};

export const editToDo = async (id: string, editedToDo: Partial<ToDo>) => {
  const existingToDo: ToDo = JSON.parse(localStorage.getItem(id)!);

  const alteredToDo: ToDo = {
    ...existingToDo,
    ...editedToDo,
  };

  console.log('Editing:', alteredToDo);
  localStorage.setItem(id, JSON.stringify(alteredToDo));
};
