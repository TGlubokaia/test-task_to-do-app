function TaskHeader({ handleCloseBtn, id, handleShowTaskForm, edit }) {
  return (
    <header className='modal__header modal-header'>
      <h3 className='modal__title'>Task #{id}</h3>
      <div className='modal__btn-wrapper'>
        {edit && (
          <button
            className='form__btn btn-edit btn'
            onClick={handleShowTaskForm}>
            <svg className='btn-edit__svg' height='15' width='15'>
              <use href='/sprite.svg#pencil'></use>
            </svg>
          </button>
        )}
        <button className='form__btn btn-close btn' onClick={handleCloseBtn}>
          <svg className='btn-close__svg' height='15' width='15'>
            <use href='/sprite.svg#cross'></use>
          </svg>
        </button>
      </div>
    </header>
  );
}

export default TaskHeader;
