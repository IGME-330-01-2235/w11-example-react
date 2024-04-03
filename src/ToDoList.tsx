import { FC, useEffect, useState } from 'react';
import { ToDosAPI } from './ToDosAPI';
import { ToDo as ToDoType } from './ToDosAPI/ToDo.type';

export const ToDoList: FC = () => {
  // The useState hook takes an initial value
  // and returns [currentValue, setterFunction].
  // In this case:
  // toDos - always contains the most recent ToDo objects
  // setToDos - can be called to update the value of toDos
  const [toDos, setToDos] = useState<ToDoType[]>([]);

  // The useEffect hook runs any time one of its dependencies changes.
  // Since this particular one has an empty dependency array (see [] on line 23 below)
  // it only runs once the first time the component renders.
  // In this case:
  // It reads the ToDos from localstorage, and updates the value of toDos with setToDos.
  useEffect(() => {
    const fetchToDos = async () => {
      setToDos(await ToDosAPI.read());
    };
    fetchToDos();
  }, []);

  console.log('render', toDos);

  return (
    <>
      <h1>ToDos:</h1>
      <ul></ul>
    </>
  );
};
