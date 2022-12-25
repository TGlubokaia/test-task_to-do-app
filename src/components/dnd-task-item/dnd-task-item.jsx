import { Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { getProjectId, getEntity } from '../../store/selectors';
import { getDate, getShortTitle } from '../../utils/const';

function DndTaskItem({ id, index, handleShowTaskInfo }) {
  const stateProjectId = useSelector(getProjectId);
  const stateEntity = useSelector((state) => getEntity(state, stateProjectId));
  const task = stateEntity.tasks.byId[id];

  const getCheckedTasksNumber = (tasks) => {
    if (!tasks) {
      return 0;
    }
    const checkedTasks = tasks.filter((task) => task.done === true);
    return checkedTasks.length;
  };

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
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
                <span className='task__number'>#{task.id}</span>
                <div
                  className={`task__priority task__priority--${task.priority}`}>
                  <span>{task.priority}</span>
                </div>
              </header>
              <div className='task__content'>
                <h3 className='task__title'>
                  <a
                    href='#'
                    className='task__title-link'
                    onClick={() => handleShowTaskInfo(task.id)}>
                    {getShortTitle(task.title)}
                  </a>
                </h3>
              </div>
              <footer className='task__footer'>
                <div className='footer__content footer__content-main'>
                  {!!task.files.length && (
                    <div className='footer__icon'>
                      <svg className='task-icon__svg' height='17' width='17'>
                        <use href='/sprite.svg#clip'></use>
                      </svg>
                      <span>{task.files.length}</span>
                    </div>
                  )}
                  {!!task.subtasks.length && (
                    <div className='footer__icon'>
                      <span>
                        {getCheckedTasksNumber(task.subtasks)}/
                        {task.subtasks.length}
                      </span>
                    </div>
                  )}
                  {!!task.comments.length && (
                    <div className='footer__icon'>
                      <svg className='task-icon__svg' height='17' width='17'>
                        <use href='/sprite.svg#comments'></use>
                      </svg>
                      <span>{}</span>
                    </div>
                  )}
                </div>
                <div className='footer__content footer__content-end'>
                  {!!task.dueDate && (
                    <div className='footer__icon'>
                      <svg className='task-icon__svg' height='17' width='17'>
                        <use href='/sprite.svg#dueDate'></use>
                      </svg>
                      <span>&nbsp;{getDate(false, task.dueDate)}</span>
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
