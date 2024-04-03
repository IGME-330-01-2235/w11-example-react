import { FC, useEffect, useRef, useState } from 'react';
import { ToDosAPI } from './ToDosAPI';
import { ToDo as ToDoType } from './ToDosAPI/ToDo.type';
import { ToDo } from './ToDo';

export const ToDoList: FC = () => {
  const [toDos, setToDos] = useState<ToDoType[]>([]);
  const createDialogRef = useRef<HTMLDialogElement>(null);

  const [title, setTitle] = useState('');
  const descriptionRef = useRef<HTMLInputElement>(null);

  const editDialogRef = useRef<HTMLDialogElement>(null);

  const [editId, setEditId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const editDescriptionRef = useRef<HTMLInputElement>(null);

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
        {toDos.map((toDo) => (
          <ToDo
            {...toDo}
            key={toDo.id}
            toggleAction={async () => {
              // Since we define the body of the function out here,
              // we still have access to setToDos
              // so we can kick off the toggle, and update the list.
              // (we wouldn't have that available to us from within the <ToDo> definition)
              await ToDosAPI.update.toggle(toDo.id, toDo.complete);
              setToDos(await ToDosAPI.read());
            }}
            editAction={async () => {
              // Same thing here!
              // With the bonus of being able to set the Id/Title/Description for the edit <dialog>
              setEditId(toDo.id);
              setEditTitle(toDo.title);
              editDescriptionRef.current!.value = toDo.description;
              editDialogRef.current?.showModal();
            }}
          />
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

      {/* Ugh. Duplicating this <dialog> is painful. These two elements are almost the same! */}

      <dialog id="editDialog" ref={editDialogRef}>
        <h1>Edit ToDo:</h1>
        <form method="dialog">
          <div>
            <label>Title</label>
            <input
              id="editTitle"
              type="text"
              name="title"
              placeholder="enter a title"
              value={editTitle}
              onChange={(event) => {
                setEditTitle(event.target.value);
              }}
            />
          </div>
          <div>
            <label>Description</label>
            <input
              id="editDescription"
              name="description"
              type="text"
              placeholder="enter a description"
              ref={editDescriptionRef}
            />
          </div>
          <input type="hidden" id="editId" name="id" />
          <button
            onClick={async () => {
              await ToDosAPI.update.edit(editId, {
                title: editTitle || 'ToDo Title',
                description:
                  editDescriptionRef.current?.value || 'ToDo Description',
              });
              setToDos(await ToDosAPI.read());
            }}
          >
            Edit To-Do
          </button>
        </form>
      </dialog>
    </>
  );
};
