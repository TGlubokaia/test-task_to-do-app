import { useEffect } from 'react';
import TaskHeader from '../task-header/task-header';
import SubtaskItem from '../subtask-item/subtask-item';
import {
  getDate,
  getDuration,
  setVisuallyHiddenClass,
} from '../../utils/const';

function TaskInfoModal({ show, task, onClose, project }) {
  const handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleSubtaskChange = (event, id) => {
    const index = task.subtasks.findIndex((task) => task.id === id);
    const subtask = task.subtasks[index];
    subtask.done = event.target.checked;
    task.subtasks.splice(index, 1, subtask);
    const taskIndex = project.tasks.findIndex((task) => task.id === id);
    project.tasks.splice(taskIndex, 1, task);
    const newProject = JSON.stringify(project);
    localStorage.setItem(`${project.id}`, newProject);
    console.log(localStorage);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (task) {
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
                {!!task && getDate(true, task.date)}
              </p>
            </div>
            <div className='info-field info-field__duration'>
              <p className='info-field__name'>duration</p>
              <p className='info-field__info info-field__duration-info'>
                {!!task && getDuration(task.date)}
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
                      onChange={handleSubtaskChange}
                      key={task.id}
                    />
                  ))}
              </div>
            </div>
            <div className='info-field info-field__comments'>
              <p className='info-field__name'>comments</p>
              <div className='info-field__info info-field__comments'></div>
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
