import { FC } from 'react';

import './ToDo.css';

// GOOD: a form that's easy to understand, but could be better
// export const ToDoItem = (props) => {
//   return (
//     <li>
//       <input type="checkbox" checked={props.complete} />
//       <div>
//         <h2>{props.title}</h2>
//         <p>{props.description}</p>
//       </div>
//       <button>{'✏️'}</button>
//     </li>
//   );
// };
//
//
//
//
//
//
//
//
//
//
// BETTER: a form that removes duplicated props. - but isn't strongly typed
// export const ToDoItem = (props) => {
//   const {complete, description, title} = props;
//   return (
//     <li>
//       <input type="checkbox" checked={complete} />
//       <div>
//         <h2>{title}</h2>
//         <p>{description}</p>
//       </div>
//       <button>{'✏️'}</button>
//     </li>
//   );
// };
//
//
//
//
//
//
//
//
//
//
// BEST?: using TypeScript to full effect
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
