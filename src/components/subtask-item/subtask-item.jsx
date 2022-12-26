import { useState } from 'react';

function SubtaskItem({
  task,
  handleSubtaskChange,
  handleSubtaskDelete,
  isForm,
}) {
  const [input, setInput] = useState(task.content);
  const [edit, setEdit] = useState(false);

  const handleTextSave = (subtask) => {
    subtask.content = input;
    handleSubtaskChange(subtask);
    setEdit(false);
  };

  const handleDoneSave = (event, subtask) => {
    subtask.done = event.target.checked;
    handleSubtaskChange(subtask);
  };

  const handleChange = (event, task) => {
    if (isForm) {
      handleDoneSave(event, task);
    } else {
      handleSubtaskChange(event, task);
    }
  };

  return (
    <article className='subtask-item'>
      <div className='subtask-item__wrapper'>
        <input
          className='subtask-item__done-input done-input visually-hidden'
          type='checkbox'
          id={task.id}
          name='done'
          checked={task.done ? true : false}
          onChange={(event) => handleChange(event, task)}
        />
        <label
          className='subtask-item__done-label done-label'
          htmlFor={task.id}></label>
      </div>

      {!edit && (
        <div className='subtask-item__text-wrapper'>
          <p className='subtask-item__text'>{task.content}</p>
          {isForm && (
            <div className='subtask-item__btn-wrapper'>
              <button
                className='subtask-item__btn extra-btn btn'
                type='button'
                onClick={() => setEdit(true)}>
                edit
              </button>
              <button
                className='subtask-item__btn extra-btn btn'
                type='button'
                onClick={() => handleSubtaskDelete(task)}>
                delete
              </button>
            </div>
          )}
        </div>
      )}

      {edit && (
        <div className='subtask-item__text-wrapper'>
          <input
            className='subtask-form__text-input form-group__input'
            type='text'
            value={input}
            placeholder='Add title'
            id={`${task.id}-content`}
            name={`${task.id}-content`}
            maxLength='40'
            onChange={(event) => setInput(event.target.value)}></input>

          <button
            className='subtask-item__btn extra-btn btn'
            type='button'
            onClick={() => handleTextSave(task)}
            disabled={!input.length ? true : false}>
            save
          </button>
        </div>
      )}
    </article>
  );
}

export default SubtaskItem;
