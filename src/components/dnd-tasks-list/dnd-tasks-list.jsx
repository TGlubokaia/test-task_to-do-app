import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DndTasksColumn from '../dnd-tasks-column/dnd-tasks-column';
import { initialColumns } from '../../mocks/tasks';

const onDragStart = () => {
  const container = document.querySelector('.dnd');
  container.classList.add('dnd--ondrop');
};

const onDragEnd = (result, columns, setColumns, project) => {
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

    const taskIndex = project.tasks.findIndex((task) => task.id === removed.id);
    project.tasks.splice(taskIndex, 1, removed);
    const newProject = JSON.stringify(project);
    localStorage.setItem(`${project.id}`, newProject);
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
  const container = document.querySelector('.dnd');
  container.classList.remove('dnd--ondrop');
};

function DndTaskList({ project, handleShowTaskInfo }) {
  const tasks = project.tasks;

  for (let columnId of Object.keys(initialColumns)) {
    initialColumns[columnId].items = tasks.filter(
      (task) => task.status === columnId
    );
  }

  const [columns, setColumns] = useState(initialColumns);

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns, project)}
      onDragStart={onDragStart}>
      <div className='dnd'>
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <DndTasksColumn
              columnId={columnId}
              column={column}
              key={columnId}
              handleShowTaskInfo={handleShowTaskInfo}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default DndTaskList;
