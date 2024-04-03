import { FC, useEffect, useRef, useState } from 'react';
import { ToDosAPI } from './ToDosAPI';
import { ToDo as ToDoType } from './ToDosAPI/ToDo.type';

export const ToDoList: FC = () => {
  const [toDos, setToDos] = useState<ToDoType[]>([]);
  // We need a way for our button click to tell the create <dialog> to open.
  // So we use useRef to hold a reference to the HTMLDialogElement
  const createDialogRef = useRef<HTMLDialogElement>(null);

  // There are two ways we can track the value of an <input> element
  // 1 - useState, along with value= and onChange= props/attributes.
  // (use this one when you need to be notified of every change to the value)
  const [title, setTitle] = useState('');
  // 2 - useRef, and asking for descriptionRef.current.value
  // (use this one when you only care about what the value is at a particular point in time)
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
      <ul></ul>
      <button
        id="add"
        onClick={async () => {
          // 1 - clear out the title from the last time the dialog was open (using setState)
          setTitle('');
          // 2 - clear out the description (using useRef)
          descriptionRef.current!.value = '';

          // Use the reference to the current <dialog> element and have it showModal()
          createDialogRef.current?.showModal();
        }}
      >
        +
      </button>

      {/* ref={createDialogRef} ... associates createDialogRef with this <dialog> element */}
      <dialog id="createDialog" ref={createDialogRef}>
        <h1>What ToDo?</h1>
        <form method="dialog">
          <div>
            <label>Title</label>
            <input
              type="text"
              placeholder="enter a title"
              // 1 - the value is shown as whatever is in title (using useState)
              value={title}
              onChange={(event) => {
                // 1 - whenever a change happens to the input, update the title (using useState)
                setTitle(event.target.value);
              }}
            />
          </div>

          <div>
            <label>Description</label>
            <input
              type="text"
              placeholder="enter a description"
              // 2 - ref={descriptionRef} ... assocates descriptionRef with this <input> element
              ref={descriptionRef}
            />
          </div>

          <button
            onClick={async () => {
              await ToDosAPI.create({
                // 1 - get the title value (using useState)
                title: title || 'ToDo Title',
                // 2 - the the description value (using useRef)
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
