import { FC } from 'react';

import './ToDo.css';

export interface ToDoProps {
  title?: string;
  description?: string;
  complete?: boolean;
}

export const ToDo: FC<ToDoProps> = ({
  title = 'ToDo Item',
  description = 'ToDo Description',
  complete = false,
}) => {
  return (
    <li>
      <input type="checkbox" checked={complete} />
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button>{'✏️'}</button>
    </li>
  );
};
