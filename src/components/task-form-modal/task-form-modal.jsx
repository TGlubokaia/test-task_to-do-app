import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import TaskHeader from '../task-header/task-header';
import { setVisuallyHiddenClass } from '../../utils/const';

function TaskFormModal({ show, onClose, project, id }) {
  const data = {
    id: '1df1',
    title: '',
    description: '',
    priority: 'low',
    status: 'queue',
    dueDate: '',
    files: [],
    date: '',
    subtasks: [],
    comments: [],
  };

  const [formData, setFormData] = useState(data);

  const handleClose = () => {
    setFormData(data);
    onClose();
  };

  const handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      handleClose();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const creationDate = dayjs().format();
    project.tasks.push({ ...formData, date: creationDate });
    console.log(project.tasks[project.tasks.length - 1]);
    const newProject = JSON.stringify(project);
    localStorage.setItem(`${id}`, newProject);
    handleClose();
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={`modal task-form-modal ${setVisuallyHiddenClass(show)}`}>
      <div className='modal-container'>
        <TaskHeader handleCloseBtn={handleClose} id={data.id} />
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
                  value={formData.dueDate}
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

              <div className='form-group__field'></div>
              <section className='form-group__subtasks-list'></section>
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
