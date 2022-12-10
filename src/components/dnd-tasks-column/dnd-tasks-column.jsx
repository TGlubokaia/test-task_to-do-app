import { Droppable } from 'react-beautiful-dnd';
import DndTaskItem from '../dnd-task-item/dnd-task-item';

function DndTaskColumn({ columnId, column }) {
  return (
    <div className='dnd__column' key={columnId}>
      <h2 className='column__title'>{column.name.toUpperCase()}</h2>
      <Droppable droppableId={columnId} key={columnId}>
        {(provided) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='column__container'
            >
              {column.items.map((item, index) => {
                return <DndTaskItem item={item} index={index} key={item.id} />;
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

export default DndTaskColumn;
