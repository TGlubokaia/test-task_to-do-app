import { Droppable } from 'react-beautiful-dnd';
import DndTaskItem from '../dnd-task-item/dnd-task-item';

function DndTasksColumn({ columnId, column, handleShowTaskInfo }) {
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
                return (
                  <DndTaskItem
                    task={item}
                    index={index}
                    key={item.id}
                    handleShowTaskInfo={handleShowTaskInfo}
                  />
                );
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
