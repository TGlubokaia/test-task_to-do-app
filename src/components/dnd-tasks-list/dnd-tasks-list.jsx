import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DndTasksColumn from '../dnd-tasks-column/dnd-tasks-column';
import { initialColumns } from '../../mocks/tasks';

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    removed.status = destination.droppableId;
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function DndTaskList({ project }) {
  const tasks = project.tasks;

  for (let columnId of Object.keys(initialColumns)) {
    initialColumns[columnId].items = tasks.filter(
      (task) => task.status === columnId
    );
  }

  const [columns, setColumns] = useState(initialColumns);

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div className='dnd'>
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <DndTasksColumn
              columnId={columnId}
              column={column}
              key={columnId}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default DndTaskList;
