import DndTaskItem from '../dnd-task-item/dnd-task-item';

function DndTasksColumn({ column }) {
  return (
    <div className='dnd__column'>
      <h2 className='column__title'>{column.name.toUpperCase()}</h2>
      {column.items.map((item) => {
        return (
          <DndTaskItem
            item={item}
            key={item.id}
          />
        );
      })}
    </div>
  );
}

export default DndTasksColumn;
