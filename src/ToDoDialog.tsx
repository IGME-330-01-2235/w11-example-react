import { forwardRef, useState } from 'react';

export interface ToDoDialogProps {
  headingText: string;
  buttonText: string;
  toDoId: string;
  initialTitle: string;
  initialDescription: string;
  dialogAction: (id: string, title: string, description: string) => void;
}

export const ToDoDialog = forwardRef<HTMLDialogElement, ToDoDialogProps>(
  (
    {
      headingText,
      buttonText,
      toDoId,
      initialTitle = '',
      initialDescription = '',
      dialogAction,
    },
    forwardedRef,
  ) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);

    return (
      <dialog ref={forwardedRef}>
        <h1>{headingText}</h1>
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
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>

          <button
            onClick={() => {
              dialogAction(toDoId, title, description);
            }}
          >
            {buttonText}
          </button>
        </form>
      </dialog>
    );
  },
);
