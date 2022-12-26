import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { addTask, updateTask } from '../../services/api';
import { getProjectId, getProjects } from '../../store/selectors';
import { fetchProjects } from '../../store/api-action';
import TaskHeader from '../task-header/task-header';
import SubtaskItem from '../subtask-item/subtask-item';
import SubtaskInput from '../subtask-input/subtask-input';
import {
  setVisuallyHiddenClass,
  getUniqueId,
  getInitialTaskData,
  initialSubtaskState,
  getDate,
} from '../../utils/const';

function TaskFormModal({ show, onClose, currentTaskId, newId }) {
  const stateProjectId = useSelector(getProjectId);
  const stateProjects = useSelector(getProjects);
  const dispatch = useDispatch();

  const project = { ...stateProjects[stateProjectId] };
  let data = null;

  if (currentTaskId === null) {
    data = getInitialTaskData(newId);
  } else {
    data = project.data.tasks.byId[currentTaskId];
  }

  const [formData, setFormData] = useState(data);
  const [subtaskInput, setSubtaskInput] = useState(initialSubtaskState);

  const handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentTaskId === null) {
      const creationDate = dayjs().format();
      const newTask = { ...formData, date: creationDate };
      addTask(project, newTask);
    } else {
      const updatedTask = { ...formData };
      updateTask(project, updatedTask);
    }
    dispatch(fetchProjects());
    onClose();
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const addSubtask = (subtask) => {
    const id = getUniqueId();
    subtask.id = id;
    const currentSubtasks = [...formData.subtasks];
    currentSubtasks.push(subtask);
    setFormData({ ...formData, subtasks: currentSubtasks });
    setSubtaskInput(initialSubtaskState);
  };

  const handleSubtaskChange = (currentTask) => {
    const task = { ...formData };
    const index = task.subtasks.findIndex((task) => task.id === currentTask.id);
    task.subtasks.splice(index, 1, currentTask);
    setFormData(task);
  };

  const handleSubtaskDelete = (currentTask) => {
    const task = { ...formData };
    const index = task.subtasks.findIndex((task) => task.id === currentTask.id);
    task.subtasks.splice(index, 1);
    setFormData(task);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setFormData(data);
    setSubtaskInput(initialSubtaskState);
  }, [show]);

  return (
    <div className={`modal task-form-modal ${setVisuallyHiddenClass(show)}`}>
      <div className='modal-container'>
        <TaskHeader handleCloseBtn={onClose} id={data.id} edit={false} />
        <div className='task-form-modal__content modal-content'>
          <form
            className='form'
            action='#'
            method='post'
            id='form'
            onSubmit={handleSubmit}>
            <div className='form-group'>
              <p className='form-group__name'>title</p>
              <div className='form-group__field'>
                <input
                  className='form-group__input form-group__input-title'
                  type='text'
                  name='title'
                  id='title'
                  placeholder='Title'
                  maxLength='40'
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className='form-group'>
              <p className='form-group__name'>description</p>
              <div className='form-group__field'>
                <textarea
                  className='form-group__input form-group__input-desc'
                  name='description'
                  id='description'
                  maxLength='200'
                  cols='30'
                  rows='7'
                  placeholder='Description'
                  value={formData.description}
                  onChange={handleChange}></textarea>
              </div>
            </div>

            <div className='form-group'>
              <p className='form-group__name'>priority</p>
              <div className='form-group__field'>
                <select
                  className='form-group__input form-group__input-priority'
                  name='priority'
                  id='priority'
                  value={formData.priority}
                  onChange={handleChange}>
                  <option value='low'>low</option>
                  <option value='medium'>medium</option>
                  <option value='high'>high</option>
                </select>
              </div>
            </div>

            <div className='form-group'>
              <p className='form-group__name'>status</p>
              <div className='form-group__field'>
                <select
                  className='form-group__input form-group__input-status'
                  name='status'
                  id='status'
                  value={formData.status}
                  onChange={handleChange}>
                  <option value='queue'>queue</option>
                  <option value='development'>development</option>
                  <option value='done'>done</option>
                </select>
              </div>
            </div>

            <div className='form-group'>
              <p className='form-group__name'>due date</p>
              <div className='form-group__field'>
                <input
                  className='form-group__input form-group__input-dueDate'
                  type='datetime-local'
                  id='due-date'
                  name='dueDate'
                  value={formData.dueDate && getDate('form', formData.dueDate)}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='form-group'>
              <p className='form-group__name'>attachments</p>
              <div
                className='form-group__field'
                title='Files attachment is unavailable now'>
                <input
                  className='form-group__input form-group__input-file'
                  type='file'
                  name='file'
                  id='files'
                  disabled
                />
              </div>
            </div>

            <div className='form-group'>
              <p className='form-group__name'>subtasks</p>
              <div className='form-group__field'>
                <SubtaskInput
                  addSubtask={addSubtask}
                  subtaskInput={subtaskInput}
                  handleInput={setSubtaskInput}
                />
              </div>
              <section className='form-group__subtasks-list'>
                {formData.subtasks.map((task) => (
                  <SubtaskItem
                    task={task}
                    handleSubtaskChange={handleSubtaskChange}
                    handleSubtaskDelete={handleSubtaskDelete}
                    key={task.id}
                    isForm={true}
                  />
                ))}
              </section>
            </div>

            <button className='form__btn btn-submit btn'>SAVE</button>
          </form>
        </div>
        <footer className='task-form-modal__footer modal-footer footer'></footer>
      </div>
    </div>
  );
}

export default TaskFormModal;
