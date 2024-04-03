import { FC, useEffect, useState } from 'react';
import { ToDosAPI } from './ToDosAPI';
import { ToDo as ToDoType } from './ToDosAPI/ToDo.type';

export const ToDoList: FC = () => {
  const [toDos, setToDos] = useState<ToDoType[]>([]);

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
      <button
        id="add"
        onClick={async () => {
          await ToDosAPI.create({
            title: 'ToDo Title',
            description: 'ToDo Description',
            complete: false,
          });
          setToDos(await ToDosAPI.read());
        }}
      >
        +
      </button>
    </>
  );
};
