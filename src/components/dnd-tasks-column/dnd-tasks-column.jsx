import { Droppable } from 'react-beautiful-dnd';
import DndTaskItem from '../dnd-task-item/dnd-task-item';

function DndTasksColumn({ columnId, column }) {
  return (
    <div className='dnd__column' key={columnId}>
      <h2 className='column__title'>{column.name.toUpperCase()}</h2>
      <Droppable droppableId={columnId} key={columnId}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='column__container'
              style={{
                background: snapshot.isDraggingOver
                  ? 'rgb(144, 136, 212)'
                  : 'rgb(222, 222, 222)',
              }}>
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

export default DndTasksColumn;
