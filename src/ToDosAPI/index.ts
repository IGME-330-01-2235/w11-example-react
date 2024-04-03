import { createToDo } from './create';
import { readToDos } from './read';
import { editToDo, toggleToDo } from './update';
import { deleteToDo } from './delete';

export const ToDosAPI = {
  create: createToDo,
  read: readToDos,
  update: {
    toggle: toggleToDo,
    edit: editToDo,
  },
  delete: deleteToDo,
};
