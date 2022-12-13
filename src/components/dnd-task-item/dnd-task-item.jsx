import { Draggable } from 'react-beautiful-dnd';
import { getDate, getShortTitle, getNumberOfComments } from '../../utils/const';

function DndTaskItem({ item, index, handleShowTaskInfo }) {
  const getCheckedTasksNumber = (tasks) => {
    if (!tasks) {
      return 0;
    }
    const checkedTasks = tasks.filter((task) => task.done === true);
    return checkedTasks.length;
  };

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className='dnd__task'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              color: snapshot.isDragging && 'black',
              ...provided.draggableProps.style,
            }}>
            <div className='task__container'>
              <header className='task__header'>
                <span className='task__number'>#{item.id}</span>
                <div
                  className={`task__priority task__priority--${item.priority}`}>
                  <span>{item.priority}</span>
                </div>
              </header>
              <div className='task__content'>
                <h3 className='task__title'>
                  <a
                    href='#'
                    className='task__title-link'
                    onClick={() => handleShowTaskInfo(item.id)}>
                    {getShortTitle(item.title)}
                  </a>
                </h3>
              </div>
              <footer className='task__footer'>
                <div className='footer__content footer__content-main'>
                  {!!item.files.length && (
                    <div className='footer__icon'>
                      <svg className='task-icon__svg' height='17' width='17'>
                        <use href='/sprite.svg#clip'></use>
                      </svg>
                      <span>{item.files.length}</span>
                    </div>
                  )}
                  {!!item.subtasks.length && (
                    <div className='footer__icon'>
                      <span>
                        {getCheckedTasksNumber(item.subtasks)}/
                        {item.subtasks.length}
                      </span>
                    </div>
                  )}
                  {!!item.comments.length && (
                    <div className='footer__icon'>
                      <svg className='task-icon__svg' height='17' width='17'>
                        <use href='/sprite.svg#comments'></use>
                      </svg>
                      <span>{getNumberOfComments(item.comments)}</span>
                    </div>
                  )}
                </div>
                <div className='footer__content footer__content-end'>
                  {!!item.dueDate && (
                    <div className='footer__icon'>
                      <svg className='task-icon__svg' height='17' width='17'>
                        <use href='/sprite.svg#dueDate'></use>
                      </svg>
                      <span>&nbsp;{getDate(false, item.dueDate)}</span>
                    </div>
                  )}
                </div>
              </footer>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default DndTaskItem;
