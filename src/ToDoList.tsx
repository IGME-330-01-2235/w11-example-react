import { FC, useEffect, useRef, useState } from 'react';
import { ToDosAPI } from './ToDosAPI';
import { ToDo as ToDoType } from './ToDosAPI/ToDo.type';
import { ToDo } from './ToDo';
import { ToDoDialog } from './ToDoDialog';

export const ToDoList: FC = () => {
  const [toDos, setToDos] = useState<ToDoType[]>([]);

  const createDialogRef = useRef<HTMLDialogElement>(null);
  const [createKey, setCreateKey] = useState(0);

  const editDialogRef = useRef<HTMLDialogElement>(null);
  const [editKey, setEditKey] = useState(0);
  const [editSubject, setEditSubject] = useState<ToDoType | null>(null);

  useEffect(() => {
    const fetchToDos = async () => {
      setToDos(await ToDosAPI.read());
    };
    fetchToDos();
  }, []);

  useEffect(() => {
    if (createKey !== 0) {
      createDialogRef.current?.showModal();
    }
  }, [createKey]);

  useEffect(() => {
    if (editKey !== 0) {
      editDialogRef.current?.showModal();
    }
  }, [editKey]);

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
              await ToDosAPI.update.toggle(toDo.id, toDo.complete);
              setToDos(await ToDosAPI.read());
            }}
            editAction={async () => {
              setEditSubject(toDo);
              setEditKey(Date.now());
            }}
          />
        ))}
      </ul>
      <button
        id="add"
        onClick={() => {
          setCreateKey(Date.now());
        }}
      >
        +
      </button>
      {toDos.some((toDo) => toDo.complete) && (
        <button
          onClick={async () => {
            const completedToDos = toDos.filter((toDo) => toDo.complete);
            const deleteCalls = completedToDos.map((toDo) =>
              ToDosAPI.delete(toDo.id),
            );
            await Promise.all(deleteCalls);
            setToDos(await ToDosAPI.read());
          }}
        >
          Delete Completed ToDos
        </button>
      )}

      <ToDoDialog
        key={`create-${createKey}`}
        headingText="What ToDo?"
        buttonText="Create ToDo"
        toDoId=""
        initialTitle=""
        initialDescription=""
        dialogAction={async (id, title, description) => {
          await ToDosAPI.create({
            title: title || 'ToDo Title',
            description: description || 'ToDo Description',
            complete: false,
          });
          setToDos(await ToDosAPI.read());
        }}
        ref={createDialogRef}
      />

      <ToDoDialog
        key={`edit-${editKey}`}
        headingText="Edit ToDo:"
        buttonText="Edit ToDo"
        toDoId={editSubject?.id || ''}
        initialTitle={editSubject?.title || ''}
        initialDescription={editSubject?.description || ''}
        dialogAction={async (id, title, description) => {
          await ToDosAPI.update.edit(id, {
            title,
            description,
          });
          setEditSubject(null);
          setToDos(await ToDosAPI.read());
        }}
        ref={editDialogRef}
      />
    </>
  );
};
