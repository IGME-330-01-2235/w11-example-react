import { FC } from 'react';

import './ToDo.css';

export interface ToDoProps {
  title?: string;
  description?: string;
  complete?: boolean;
  // by taking action functions as props
  // <ToDo> initiates the action, but <ToDoList> handles the logic.
  toggleAction: () => void;
  editAction: () => void;
}

export const ToDo: FC<ToDoProps> = ({
  title = 'ToDo Item',
  description = 'ToDo Description',
  complete = false,
  toggleAction,
  editAction,
}) => {
  return (
    <li>
      {/* When this input value changes, initiate the toggleAction ... whatever that is. */}
      <input type="checkbox" checked={complete} onChange={toggleAction} />
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {/* When this button is clicked, initiate the editAction ... whatever that is. */}
      <button onClick={editAction}>{'✏️'}</button>
    </li>
  );
};
