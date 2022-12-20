import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getProjects } from '../../store/selectors';
import { DragDropContext } from 'react-beautiful-dnd';
import DndTasksColumn from '../dnd-tasks-column/dnd-tasks-column';
import { initialColumns } from '../../mocks/tasks';
import { updateData } from '../../services/api';

const onDragStart = () => {
  const container = document.querySelector('.dnd');
  container.classList.add('dnd--ondrop');
};

const onDragEnd = (result, columns, setColumns, setIsDropped) => {
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

    setColumns((prev) => {
      return {
        ...prev,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      };
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);

    setColumns((prev) => {
      return {
        ...prev,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      };
    });
  }
  const container = document.querySelector('.dnd');
  container.classList.remove('dnd--ondrop');
  setIsDropped(true);
};

const dataUpdate = (isDropped, columns, project, setIsDropped) => {
  if (isDropped) {
    let tasks = {};
    let order = [];
    Object.values(columns).map((column) =>
      column.items.map((item) => (tasks[item.id] = item))
    );
    Object.values(columns).map((column) =>
      column.items.map((item) => (order = order.concat([item.id])))
    );

    project.data.tasks.byId = tasks;
    project.data.tasks.allIds = order;
    updateData(project);
    setIsDropped(false);
  }
  return;
};

function DndTaskList({ project, handleShowTaskInfo, tasks }) {
  const tasksArray = tasks.allIds.map((id) => tasks.byId[id]);

  for (let columnId of Object.keys(initialColumns)) {
    initialColumns[columnId].items = tasksArray.filter(
      (task) => task.status === columnId
    );
  }

  const [columns, setColumns] = useState(initialColumns);
  const [isDropped, setIsDropped] = useState(false);

  dataUpdate(isDropped, columns, project, setIsDropped);

  return (
    <DragDropContext
      onDragEnd={(result) =>
        onDragEnd(result, columns, setColumns, setIsDropped)
      }
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
