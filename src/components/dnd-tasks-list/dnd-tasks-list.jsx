import DndTasksColumn from '../dnd-tasks-column/dnd-tasks-column';
import { initialColumns, projects  } from '../../mocks/tasks';


function DndTasksList() {
  const tasks = projects['1'].tasks;

  for (let columnId of Object.keys(initialColumns)) {
    initialColumns[columnId].items = tasks.filter((task) => task.status === columnId);
  }

  return (
      <div className="dnd">
        {Object.entries(initialColumns).map(([columnId, column]) => {
          return (
            <DndTasksColumn column={column} key={columnId} />
          );
        })}
      </div>
  );
}


export default DndTasksList;
