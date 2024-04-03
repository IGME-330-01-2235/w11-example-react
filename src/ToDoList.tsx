import { FC, useEffect, useRef, useState } from 'react';
import { ToDosAPI } from './ToDosAPI';
import { ToDo as ToDoType } from './ToDosAPI/ToDo.type';
import { ToDo } from './ToDo';

export const ToDoList: FC = () => {
  const [toDos, setToDos] = useState<ToDoType[]>([]);
  const createDialogRef = useRef<HTMLDialogElement>(null);

  const [title, setTitle] = useState('');
  const descriptionRef = useRef<HTMLInputElement>(null);

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
      <ul>
        {/* This is a neat little way of rendering a <ToDo> for every element in toDos[] */}
        {toDos.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
      <button
        id="add"
        onClick={async () => {
          setTitle('');
          descriptionRef.current!.value = '';
          createDialogRef.current?.showModal();
        }}
      >
        +
      </button>

      <dialog id="createDialog" ref={createDialogRef}>
        <h1>What ToDo?</h1>
        <form method="dialog">
          <div>
            <label>Title</label>
            <input
              type="text"
              placeholder="enter a title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>

          <div>
            <label>Description</label>
            <input
              type="text"
              placeholder="enter a description"
              ref={descriptionRef}
            />
          </div>

          <button
            onClick={async () => {
              await ToDosAPI.create({
                title: title || 'ToDo Title',
                description:
                  descriptionRef.current?.value || 'ToDo Description',
                complete: false,
              });
              setToDos(await ToDosAPI.read());
            }}
          >
            Create To-Do
          </button>
        </form>
      </dialog>
    </>
  );
};
