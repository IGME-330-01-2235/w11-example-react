import { FC } from 'react';

import './ToDo.css';

export interface ToDoProps {
  title?: string;
  description?: string;
  complete?: boolean;
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
      <input type="checkbox" checked={complete} onChange={toggleAction} />
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button onClick={editAction}>{'✏️'}</button>
    </li>
  );
};
