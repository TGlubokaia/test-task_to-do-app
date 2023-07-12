import { useState, useContext } from 'react';
import ProjectContext from '../../utils/context';
import TaskItemSearch from '../task-item-search/task-item-search';
import { setVisuallyHiddenClass } from '../../utils/const';

function TaskSearchModal({ show, onClose, handleShowTaskInfo }) {
  const project = useContext(ProjectContext);
  const tasks = project.tasks.allIds.map((id) => project.tasks.byId[id]);

  const [searchType, setSearchType] = useState('id');
  const [searchInput, setSearchInput] = useState('');
  const [filteredTasks, setfilteredTasks] = useState(tasks);

  const handleOnChange = (event) => {
    setSearchInput('');
    setfilteredTasks(tasks);
    setSearchType(event.target.value);
  };

  const handleSearch = (value) => {
    setSearchInput(value);
    let newList = [];

    if (searchType === 'title') {
      newList = tasks.filter((task) => {
        const title = task.title.toLowerCase();
        const input = value.toLowerCase();
        return title.includes(input);
      });
      setfilteredTasks(newList);
    } else if (searchType === 'id') {
      newList = tasks.filter((task) => {
        const id = task.id;
        const input = value;
        return id.includes(input);
      });
      setfilteredTasks(newList);
    }
  };

  return (
    <div className={`modal search-modal ${setVisuallyHiddenClass(show)}`}>
      <div className='search-modal__container modal-container '>
        <header className='search-modal__header modal-header'>
          <h3 className='search-modal__title'>Task search</h3>
          <div className='search-modal__btn-wrapper'>
            <button className='form__btn btn-close btn' onClick={onClose}>
              <svg className='btn-close__svg' height='15' width='15'>
                <use href='/sprite.svg#cross'></use>
              </svg>
            </button>
          </div>
        </header>
        <div className='search-modal__content modal-content'>
          <div className='search-modal__form-group'>
            <input
              className='search-modal__text-input form-group__input'
              placeholder='Search...'
              type='text'
              id='content'
              name='content'
              maxLength='40'
              onChange={(event) => handleSearch(event.target.value)}
              value={searchInput}
            />
            <div className='search-modal__btn-wrapper'>
              <div className='form_radio_btn'>
                <input
                  id='radio-1'
                  type='radio'
                  name='radio'
                  value='id'
                  checked={searchType === 'id' ? true : false}
                  onChange={(event) => handleOnChange(event)}></input>
                <label htmlFor='radio-1' className='search-btn btn'>
                  by number
                </label>
              </div>

              <div className='form_radio_btn'>
                <input
                  id='radio-2'
                  type='radio'
                  name='radio'
                  value='title'
                  checked={searchType === 'title' ? true : false}
                  onChange={(event) => handleOnChange(event)}></input>
                <label htmlFor='radio-2' className='search-btn btn'>
                  by name
                </label>
              </div>
            </div>
          </div>
          <div className='search-modal__tasks-list'>
            {filteredTasks.map((task) => (
              <TaskItemSearch
                task={task}
                handleShowTaskInfo={handleShowTaskInfo}
                key={task.id}
              />
            ))}
          </div>
        </div>
        <footer className='search-modal__footer modal-footer footer'></footer>
      </div>
    </div>
  );
}

export default TaskSearchModal;
