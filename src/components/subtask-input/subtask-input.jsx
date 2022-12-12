import React from 'react';

function SubtaskInput({ addSubtask, subtaskInput, handleInput }) {
  const handleInputChange = (event) => {
    const value =
      event.target.type === 'text' ? event.target.value : event.target.checked;
    handleInput({ ...subtaskInput, [event.target.name]: value });
  };

  const handleSubmit = () => {
    if (!subtaskInput.content.length) {
      return;
    }
    addSubtask(subtaskInput);
  };

  return (
    <div className='subtask-form'>
      <input
        className='subtask-form__done-input done-input visually-hidden'
        type='checkbox'
        id='form-done'
        name='done'
        onChange={handleInputChange}
        checked={subtaskInput.done && true}
      />
      <label
        className='subtask-form__done-label done-label'
        htmlFor='form-done'>
        done
      </label>
      <input
        className='subtask__text-input form-group__input'
        placeholder='Subtask title'
        type='text'
        id='content'
        name='content'
        maxLength='40'
        onChange={handleInputChange}
        value={subtaskInput.content}
      />

      <button
        className='subtask__btn btn'
        type='button'
        onClick={handleSubmit}
        disabled={!subtaskInput.content.length ? true : false}>
        add
      </button>
    </div>
  );
}
export default SubtaskInput;
