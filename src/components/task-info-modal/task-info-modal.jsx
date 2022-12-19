import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskHeader from '../task-header/task-header';
import SubtaskItem from '../subtask-item/subtask-item';
import CommentsList from '../comments-list/comments-list';
import { updateData } from '../../services/api';
import { ActionCreator } from '../../store/action';
import { getProjectId, getProjects, getEntity } from '../../store/selectors';
import {
  getDate,
  getDuration,
  setVisuallyHiddenClass,
} from '../../utils/const';

function TaskInfoModal({ show, taskId, onClose }) {
  const stateProjectId = useSelector(getProjectId);
  const stateProjects = useSelector(getProjects);
  const stateEntity = useSelector((state) => getEntity(state, stateProjectId));
  const dispatch = useDispatch();

  const handleUpdate = () => {
    const newProject = { ...stateProjects[stateProjectId] };
    newProject.data = stateEntity;
    updateData(newProject);
  };

  const handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleChange = (event, subtask) => {
    const isChecked = event.target.checked;
    subtask.done = isChecked;
    dispatch(ActionCreator.toggleSubtask([subtask, stateProjectId, taskId]));
    handleUpdate();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  if (show) {
    let project = { ...stateProjects[stateProjectId] };
    const task = project.data.tasks.byId[taskId];

    return (
      <div className={`modal task-info-modal ${setVisuallyHiddenClass(show)}`}>
        <div className='modal-container'>
          <TaskHeader handleCloseBtn={onClose} id={task.id} />
          <div className='task-info-modal__content modal-content'>
            <div className='info-field info-field__title'>
              <p className='info-field__name'>title</p>
              <p className='info-field__info info-field__title-info'>
                {task.title}
              </p>
            </div>
            <div className='info-field info-field__description'>
              <p className='info-field__name'>description</p>
              <p className='info-field__info info-field__description-info'>
                {task.description}
              </p>
            </div>
            <div className='info-field info-field__status'>
              <p className='info-field__name'>status</p>
              <p className='info-field__info info-field__status-info'>
                {task.status}
              </p>
            </div>
            <div className='info-field info-field__priority'>
              <p className='info-field__name'>priority</p>
              <div className='info-field__info info-field__priority-info '>
                <p
                  className={`task__priority task__priority--${task.priority}`}>
                  {task.priority}
                </p>
              </div>
            </div>
            <div className='info-field info-field__date'>
              <p className='info-field__name'>created</p>
              <p className='info-field__info info-field__date-info'>
                {getDate(true, task.date)}
              </p>
            </div>
            <div className='info-field info-field__duration'>
              <p className='info-field__name'>duration</p>
              <p className='info-field__info info-field__duration-info'>
                {getDuration(task.date)}
              </p>
            </div>
            <div className='info-field info-field__dueDate'>
              <p className='info-field__name'>due date</p>
              <p className='info-field__info info-field__dueDate-info'>
                {getDate(true, task.dueDate)}
              </p>
            </div>
            <div className='info-field info-field__files'>
              <p className='info-field__name'>files</p>
              <div className='info-field__info info-field__files-info'></div>
            </div>
            <div className='info-field info-field__subTasks'>
              <p className='info-field__name'>subtasks</p>
              <div className='info-field__info info-field__subTasks'>
                {!!task.subtasks.length &&
                  task.subtasks.map((task) => (
                    <SubtaskItem
                      task={task}
                      onChange={handleChange}
                      key={task.id}
                    />
                  ))}
              </div>
            </div>
            <div className='info-field info-field__comments'>
              <p className='info-field__name'>comments</p>
              <CommentsList taskId={taskId} />
            </div>
          </div>
          <footer className='task-info-modal__footer modal-footer footer'></footer>
        </div>
      </div>
    );
  } else {
    return;
  }
}

export default TaskInfoModal;
